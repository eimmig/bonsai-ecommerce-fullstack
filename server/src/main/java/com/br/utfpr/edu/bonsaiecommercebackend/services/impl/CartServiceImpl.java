package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.cart.AddToCartInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.cart.UpdateCartItemInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.CartEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.CartItemEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.ProductEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.UserEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.CartItemModel;
import com.br.utfpr.edu.bonsaiecommercebackend.models.CartModel;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.CartItemRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.CartRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.ProductRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.UserRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.services.CartService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.CartMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CartMapper cartMapper;

    @Override
    @Transactional
    public CartModel getCart(UUID userId) {
        Optional<CartEntity> cartOpt = cartRepository.findByUserId(userId);
        
        if (cartOpt.isPresent()) {
            return cartMapper.toModel(cartOpt.get());
        }
        
        // Criar novo carrinho se não existir
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        CartEntity newCart = new CartEntity();
        newCart.setUser(user);
        CartEntity savedCart = cartRepository.save(newCart);
        
        return cartMapper.toModel(savedCart);
    }

    @Override
    @Transactional
    public CartModel addItem(UUID userId, AddToCartInputDTO dto) {
        CartEntity cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    UserEntity user = userRepository.findById(userId)
                            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
                    CartEntity newCart = new CartEntity();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });

        ProductEntity product = productRepository.findById(dto.productId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        // Validar estoque
        if (product.getStock() != null && product.getStock() < dto.quantity()) {
            throw new RuntimeException("Estoque insuficiente. Disponível: " + product.getStock());
        }

        // Verificar se o item já existe no carrinho
        Optional<CartItemEntity> existingItemOpt = cartItemRepository
                .findByCartIdAndProductId(cart.getId(), dto.productId());

        CartItemEntity item;
        if (existingItemOpt.isPresent()) {
            // Atualizar quantidade do item existente
            item = existingItemOpt.get();
            int newQuantity = item.getQuantity() + dto.quantity();
            
            // Validar estoque novamente com a nova quantidade
            if (product.getStock() != null && product.getStock() < newQuantity) {
                throw new RuntimeException("Estoque insuficiente. Disponível: " + product.getStock());
            }
            
            item.setQuantity(newQuantity);
        } else {
            // Criar novo item
            item = new CartItemEntity();
            item.setCart(cart);
            item.setProduct(product);
            item.setQuantity(dto.quantity());
        }

        // Calcular preços
        item.recalculatePrices();
        cartItemRepository.save(item);

        // Recalcular total do carrinho
        cart.recalculateTotalPrice();
        CartEntity savedCart = cartRepository.save(cart);

        return cartMapper.toModel(savedCart);
    }

    @Override
    @Transactional
    public CartModel updateItem(UUID userId, UUID itemId, UpdateCartItemInputDTO dto) {
        CartEntity cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Carrinho não encontrado"));

        CartItemEntity item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item não encontrado no carrinho"));

        // Verificar se o item pertence ao carrinho do usuário
        if (!item.getCart().getId().equals(cart.getId())) {
            throw new RuntimeException("Item não pertence a este carrinho");
        }

        // Validar estoque
        ProductEntity product = item.getProduct();
        if (product.getStock() != null && product.getStock() < dto.quantity()) {
            throw new RuntimeException("Estoque insuficiente. Disponível: " + product.getStock());
        }

        // Atualizar quantidade e recalcular preços
        item.setQuantity(dto.quantity());
        item.recalculatePrices();
        cartItemRepository.save(item);

        // Recalcular total do carrinho
        cart.recalculateTotalPrice();
        CartEntity savedCart = cartRepository.save(cart);

        return cartMapper.toModel(savedCart);
    }

    @Override
    @Transactional
    public void removeItem(UUID userId, UUID itemId) {
        CartEntity cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Carrinho não encontrado"));

        CartItemEntity item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item não encontrado no carrinho"));

        // Verificar se o item pertence ao carrinho do usuário
        if (!item.getCart().getId().equals(cart.getId())) {
            throw new RuntimeException("Item não pertence a este carrinho");
        }

        cartItemRepository.delete(item);

        // Recalcular total do carrinho
        cart.recalculateTotalPrice();
        cartRepository.save(cart);
    }

    @Override
    @Transactional
    public void clearCart(UUID userId) {
        CartEntity cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Carrinho não encontrado"));

        cart.clear();
        cartRepository.save(cart);
    }
}
