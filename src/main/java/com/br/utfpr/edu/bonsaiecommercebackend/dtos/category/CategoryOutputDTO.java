package com.br.utfpr.edu.bonsaiecommercebackend.dtos.category;

import com.br.utfpr.edu.bonsaiecommercebackend.models.CategoryModel;

import java.time.LocalDateTime;
import java.util.UUID;

public record CategoryOutputDTO(
        UUID id,
        String name,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static CategoryOutputDTO fromModel(CategoryModel model) {
        return new CategoryOutputDTO(
                model.getId(),
                model.getName(),
                model.getCreatedAt(),
                model.getUpdatedAt()
        );
    }
}