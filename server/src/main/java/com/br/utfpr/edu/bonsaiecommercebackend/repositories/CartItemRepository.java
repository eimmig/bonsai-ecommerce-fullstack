package com.br.utfpr.edu.bonsaiecommercebackend.repositories;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.CartItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CartItemRepository extends JpaRepository<CartItemEntity, UUID> {
    
    /**
     * Busca um item do carrinho pelo ID do carrinho e ID do produto
     * @param cartId ID do carrinho
     * @param productId ID do produto
     * @return Optional contendo o item se encontrado
     */
    Optional<CartItemEntity> findByCartIdAndProductId(UUID cartId, UUID productId);
    
    /**
     * Verifica se já existe um item no carrinho para um produto específico
     * @param cartId ID do carrinho
     * @param productId ID do produto
     * @return true se o item existir
     */
    boolean existsByCartIdAndProductId(UUID cartId, UUID productId);
}
