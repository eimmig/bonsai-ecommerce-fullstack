package com.br.utfpr.edu.bonsaiecommercebackend.dtos.address;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO de saída para exibição de endereços.
 * Inclui informações de auditoria (createdAt, updatedAt).
 * Mapeamento realizado via MapStruct para melhor performance.
 */
public record AddressOutputDTO(
        UUID id,
        String street,
        String number,
        String complement,
        String zipCode,
        String neighborhood,
        String city,
        String state,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}