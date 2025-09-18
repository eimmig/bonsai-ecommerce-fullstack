package com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.user;

import java.time.LocalDateTime;
import java.util.UUID;

public record UserOutputDTO(
        UUID id,
        String name,
        String email,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}