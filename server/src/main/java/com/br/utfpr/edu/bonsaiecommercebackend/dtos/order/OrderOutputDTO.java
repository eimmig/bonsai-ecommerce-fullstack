package com.br.utfpr.edu.bonsaiecommercebackend.dtos.order;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.orderItems.OrderItemsOutputDTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * DTO de saída para pedidos.
 * Mapeamento realizado via MapStruct para melhor performance.
 */
public record OrderOutputDTO(
        UUID id,
        LocalDateTime orderDate,
        UUID userId,
        BigDecimal totalPrice,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        List<OrderItemsOutputDTO> orderItems
) {
}
