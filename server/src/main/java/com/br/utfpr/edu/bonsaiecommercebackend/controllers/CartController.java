package com.br.utfpr.edu.bonsaiecommercebackend.controllers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.cart.AddToCartInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.cart.CartOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.cart.UpdateCartItemInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.models.CartModel;
import com.br.utfpr.edu.bonsaiecommercebackend.services.CartService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.AuthenticationUtil;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.CartMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Controller para operações de carrinho de compras
 */
@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final CartMapper cartMapper;

    /**
     * Obtém o carrinho do usuário autenticado
     */
    @GetMapping
    public ResponseEntity<CartOutputDTO> getCart() {
        UUID userId = AuthenticationUtil.getCurrentUserId();
        CartModel cart = cartService.getCart(userId);
        return ResponseEntity.ok(cartMapper.toOutputDTO(cart));
    }

    /**
     * Adiciona um item ao carrinho
     */
    @PostMapping("/items")
    public ResponseEntity<CartOutputDTO> addItem(@Valid @RequestBody AddToCartInputDTO dto) {
        UUID userId = AuthenticationUtil.getCurrentUserId();
        CartModel cart = cartService.addItem(userId, dto);
        return ResponseEntity.ok(cartMapper.toOutputDTO(cart));
    }

    /**
     * Atualiza a quantidade de um item no carrinho
     */
    @PutMapping("/items/{itemId}")
    public ResponseEntity<CartOutputDTO> updateItem(
            @PathVariable UUID itemId,
            @Valid @RequestBody UpdateCartItemInputDTO dto
    ) {
        UUID userId = AuthenticationUtil.getCurrentUserId();
        CartModel cart = cartService.updateItem(userId, itemId, dto);
        return ResponseEntity.ok(cartMapper.toOutputDTO(cart));
    }

    /**
     * Remove um item do carrinho
     */
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> removeItem(@PathVariable UUID itemId) {
        UUID userId = AuthenticationUtil.getCurrentUserId();
        cartService.removeItem(userId, itemId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Limpa todos os itens do carrinho
     */
    @DeleteMapping
    public ResponseEntity<Void> clearCart() {
        UUID userId = AuthenticationUtil.getCurrentUserId();
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}
