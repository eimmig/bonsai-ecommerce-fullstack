package com.br.utfpr.edu.bonsaiecommercebackend.dtos.order;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.orderItems.OrderItemsOutputDTO;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO de saída para pedidos.
 * Mapeamento realizado via MapStruct para melhor performance.
 */
public record OrderOutputDTO(
        UUID id,
        LocalDateTime orderDate,
        UUID userId,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        OrderItemsOutputDTO orderItems
) {
}
