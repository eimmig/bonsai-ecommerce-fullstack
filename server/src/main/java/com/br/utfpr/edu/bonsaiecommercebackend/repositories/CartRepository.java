package com.br.utfpr.edu.bonsaiecommercebackend.repositories;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.CartEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CartRepository extends JpaRepository<CartEntity, UUID> {
    
    /**
     * Busca o carrinho de um usuário pelo ID do usuário
     * @param userId ID do usuário
     * @return Optional contendo o carrinho se encontrado
     */
    Optional<CartEntity> findByUserId(UUID userId);
    
    /**
     * Busca o carrinho com itens e produtos carregados (evita N+1)
     * @param userId ID do usuário
     * @return Optional contendo o carrinho com itens e produtos
     */
    @Query("SELECT c FROM CartEntity c " +
           "LEFT JOIN FETCH c.items i " +
           "LEFT JOIN FETCH i.product " +
           "WHERE c.user.id = :userId")
    Optional<CartEntity> findByUserIdWithItemsAndProducts(@Param("userId") UUID userId);

    /**
     * Verifica se existe um carrinho para o usuário
     * @param userId ID do usuário
     * @return true se existir carrinho
     */
    boolean existsByUserId(UUID userId);
}
