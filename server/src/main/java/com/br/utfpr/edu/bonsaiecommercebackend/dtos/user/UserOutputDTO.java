package com.br.utfpr.edu.bonsaiecommercebackend.dtos.user;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.address.AddressOutputDTO;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
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
        String cpfCnpj,
        String phone,
        LocalDate birthDate,
        List<AddressOutputDTO> addresses,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}