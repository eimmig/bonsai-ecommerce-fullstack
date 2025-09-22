package com.br.utfpr.edu.bonsaiecommercebackend.dtos.product;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.category.CategoryOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.models.ProductModel;

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
    public static ProductOutputDTO fromModel(ProductModel model) {
        return new ProductOutputDTO(
                model.getId(),
                model.getName(),
                model.getDescription(),
                model.getPrice(),
                model.getImageUrl(),
                CategoryOutputDTO.fromModel(model.getCategory()),
                model.getCreatedAt(),
                model.getUpdatedAt()
        );
    }
}
