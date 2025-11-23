package com.br.utfpr.edu.bonsaiecommercebackend.dtos.orderitems;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.product.ProductOutputDTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO de saída para itens de pedidos.
 * Inclui informações completas do produto para facilitar exibição no frontend.
 * Mapeamento realizado via MapStruct para melhor performance.
 */
public record OrderItemsOutputDTO(
        UUID id,
        ProductOutputDTO product,
        Integer quantity,
        BigDecimal price,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
