package com.br.utfpr.edu.bonsaiecommercebackend.dtos.address;

import java.time.LocalDateTime;
import java.util.UUID;

public record AddressOutputDTO(
        UUID id,
        Long userId,
        String street,
        String complement,
        String zipCode,
        String neighborhood,
        String city,
        String state,
        String number,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}