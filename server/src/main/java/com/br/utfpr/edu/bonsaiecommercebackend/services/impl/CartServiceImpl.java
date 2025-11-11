package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.cart.AddToCartInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.cart.UpdateCartItemInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.CartEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.CartItemEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.ProductEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.UserEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.InsufficientStockException;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.ResourceNotFoundException;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.UnauthorizedAccessException;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private static final Logger logger = LoggerFactory.getLogger(CartServiceImpl.class);

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CartMapper cartMapper;

    @Override
    @Transactional
    public CartModel getCart(UUID userId) {
        // Usar query otimizada com JOIN FETCH para evitar N+1
        Optional<CartEntity> cartOpt = cartRepository.findByUserIdWithItemsAndProducts(userId);

        if (cartOpt.isPresent()) {
            return cartMapper.toModel(cartOpt.get());
        }
        
        // Criar novo carrinho se não existir
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        CartEntity newCart = new CartEntity();
        newCart.setUser(user);
        CartEntity savedCart = cartRepository.save(newCart);
        
        return cartMapper.toModel(savedCart);
    }

    @Override
    @Transactional
    public CartModel addItem(UUID userId, AddToCartInputDTO dto) {
        logger.info("Adicionando item ao carrinho. User: {}, Produto: {}, Quantidade: {}", userId, dto.productId(), dto.quantity());
        CartEntity cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    logger.info("Criando novo carrinho para usuário: {}", userId);
                    UserEntity user = userRepository.findById(userId)
                            .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
                    CartEntity newCart = new CartEntity();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });

        ProductEntity product = productRepository.findById(dto.productId())
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado"));

        // Validar estoque
        if (product.getStock() != null && product.getStock() < dto.quantity()) {
            logger.warn("Estoque insuficiente. Produto: {}, Estoque: {}, Solicitado: {}", dto.productId(), product.getStock(), dto.quantity());
            throw new InsufficientStockException(product.getStock());
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
                throw new InsufficientStockException(product.getStock());
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
                .orElseThrow(() -> new ResourceNotFoundException("Carrinho não encontrado"));

        CartItemEntity item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item não encontrado no carrinho"));

        // Verificar se o item pertence ao carrinho do usuário
        if (!item.getCart().getId().equals(cart.getId())) {
            throw new UnauthorizedAccessException("Item não pertence a este carrinho");
        }

        // Validar estoque
        ProductEntity product = item.getProduct();
        if (product.getStock() != null && product.getStock() < dto.quantity()) {
            throw new InsufficientStockException(product.getStock());
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
                .orElseThrow(() -> new ResourceNotFoundException("Carrinho não encontrado"));

        CartItemEntity item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item não encontrado no carrinho"));

        // Verificar se o item pertence ao carrinho do usuário
        if (!item.getCart().getId().equals(cart.getId())) {
            throw new UnauthorizedAccessException("Item não pertence a este carrinho");
        }

        // Remover da coleção do carrinho ANTES de deletar (evita ObjectDeletedException)
        cart.getItems().remove(item);
        item.setCart(null);

        // Deletar o item
        cartItemRepository.delete(item);

        // Recalcular total do carrinho
        cart.recalculateTotalPrice();
        cartRepository.save(cart);
    }

    @Override
    @Transactional
    public void clearCart(UUID userId) {
        CartEntity cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Carrinho não encontrado"));

        cart.clear();
        cartRepository.save(cart);
    }
}
