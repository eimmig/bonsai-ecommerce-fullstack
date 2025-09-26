package com.br.utfpr.edu.bonsaiecommercebackend.dtos.user;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO de saída para usuários.
 * Contém apenas os dados que devem ser expostos na API.
 * Mapeamento realizado via MapStruct para melhor performance.
 */
public record UserOutputDTO(
        UUID id,
        String name,
        String email,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}