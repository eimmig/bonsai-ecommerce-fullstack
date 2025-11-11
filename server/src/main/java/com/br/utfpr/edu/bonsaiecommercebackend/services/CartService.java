package com.br.utfpr.edu.bonsaiecommercebackend.services;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.cart.AddToCartInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.cart.UpdateCartItemInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.models.CartModel;

import java.util.UUID;

/**
 * Service para operações de carrinho de compras
 */
public interface CartService {
    
    /**
     * Obtém o carrinho do usuário. Cria um novo se não existir.
     * @param userId ID do usuário
     * @return Modelo do carrinho
     */
    CartModel getCart(UUID userId);
    
    /**
     * Adiciona um item ao carrinho ou atualiza a quantidade se já existir
     * @param userId ID do usuário
     * @param dto Dados do item a adicionar
     * @return Carrinho atualizado
     */
    CartModel addItem(UUID userId, AddToCartInputDTO dto);
    
    /**
     * Atualiza a quantidade de um item no carrinho
     * @param userId ID do usuário
     * @param itemId ID do item
     * @param dto Novos dados do item
     * @return Carrinho atualizado
     */
    CartModel updateItem(UUID userId, UUID itemId, UpdateCartItemInputDTO dto);
    
    /**
     * Remove um item do carrinho
     * @param userId ID do usuário
     * @param itemId ID do item
     */
    void removeItem(UUID userId, UUID itemId);
    
    /**
     * Limpa todos os itens do carrinho
     * @param userId ID do usuário
     */
    void clearCart(UUID userId);
}
