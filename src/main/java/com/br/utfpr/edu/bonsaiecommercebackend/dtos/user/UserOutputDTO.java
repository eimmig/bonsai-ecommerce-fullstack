package com.br.utfpr.edu.bonsaiecommercebackend.dtos.user;

import com.br.utfpr.edu.bonsaiecommercebackend.models.UserModel;

import java.time.LocalDateTime;
import java.util.UUID;

public record UserOutputDTO(
        UUID id,
        String name,
        String email,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static UserOutputDTO fromModel(UserModel model) {
        return new UserOutputDTO(
                model.getId(),
                model.getName(),
                model.getEmail(),
                model.getCreatedAt(),
                model.getUpdatedAt()
        );
    }
}