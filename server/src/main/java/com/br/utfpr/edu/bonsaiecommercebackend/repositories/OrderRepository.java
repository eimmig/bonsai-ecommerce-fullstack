package com.br.utfpr.edu.bonsaiecommercebackend.repositories;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.OrderEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, UUID> {

    /**
     * Lista pedidos do usuário com paginação
     * @param userId ID do usuário
     * @param pageable Paginação
     * @return Page de pedidos
     */
    Page<OrderEntity> findByUserId(UUID userId, Pageable pageable);
}
