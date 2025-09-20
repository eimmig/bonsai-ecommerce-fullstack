package com.br.utfpr.edu.bonsaiecommercebackend.dtos.category;

import java.time.LocalDateTime;
import java.util.UUID;

public record CategoryOutputDTO(
        UUID id,
        String nome,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}