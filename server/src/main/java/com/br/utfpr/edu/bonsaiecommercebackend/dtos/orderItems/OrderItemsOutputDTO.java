package com.br.utfpr.edu.bonsaiecommercebackend.dtos.orderItems;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO de saída para pedidos.
 * Mapeamento realizado via MapStruct para melhor performance.
 */
public record OrderItemsOutputDTO(
        UUID id,
        UUID productId,
        UUID orderId,
        Integer quantity,
        BigDecimal price,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
