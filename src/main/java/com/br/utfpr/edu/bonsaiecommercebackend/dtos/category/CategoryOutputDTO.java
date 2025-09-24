package com.br.utfpr.edu.bonsaiecommercebackend.dtos.category;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO de saída para categorias.
 * Mapeamento realizado via MapStruct para melhor performance.
 */
public record CategoryOutputDTO(
        UUID id,
        String name,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}