package com.br.utfpr.edu.bonsaiecommercebackend.dtos.product;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.category.CategoryOutputDTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO de saída para produtos.
 * Contém dados do produto e categoria aninhada.
 * Mapeamento realizado via MapStruct para melhor performance.
 */
public record ProductOutputDTO(
        UUID id,
        String name,
        String description,
        BigDecimal price,
        String imageUrl,
        CategoryOutputDTO category,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
