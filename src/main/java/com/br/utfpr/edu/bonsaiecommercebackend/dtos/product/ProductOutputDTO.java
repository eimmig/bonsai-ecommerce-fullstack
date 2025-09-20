package com.br.utfpr.edu.bonsaiecommercebackend.dtos.product;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.category.CategoryOutputDTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

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