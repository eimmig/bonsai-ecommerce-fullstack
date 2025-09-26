package com.br.utfpr.edu.bonsaiecommercebackend.repositories;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, UUID> {
}
