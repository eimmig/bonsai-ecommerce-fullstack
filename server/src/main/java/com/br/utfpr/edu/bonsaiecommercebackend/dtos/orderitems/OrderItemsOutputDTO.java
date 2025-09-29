package com.br.utfpr.edu.bonsaiecommercebackend.dtos.orderitems;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO de saída para itens de pedidos.
 * Mapeamento realizado via MapStruct para melhor performance.
 */
public record OrderItemsOutputDTO(
        UUID id,
        UUID productId,
        Integer quantity,
        BigDecimal price,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
