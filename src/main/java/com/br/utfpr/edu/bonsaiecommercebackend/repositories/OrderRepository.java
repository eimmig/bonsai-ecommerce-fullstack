package com.br.utfpr.edu.bonsaiEcommerceBackend.repositories;

import com.br.utfpr.edu.bonsaiEcommerceBackend.entities.CategoryEntity;
import com.br.utfpr.edu.bonsaiEcommerceBackend.entities.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, UUID> {
}
