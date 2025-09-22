package com.br.utfpr.edu.bonsaiecommercebackend.dtos.address;

import com.br.utfpr.edu.bonsaiecommercebackend.models.AddressModel;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO de saída para exibição de endereços.
 * Inclui informações de auditoria (createdAt, updatedAt).
 */
public record AddressOutputDTO(
        UUID id,
        UUID userId,
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
    public static AddressOutputDTO fromModel(AddressModel model) {
        return new AddressOutputDTO(
                model.getId(),
                model.getUser().getId(),
                model.getStreet(),
                model.getComplement(),
                model.getZipCode(),
                model.getNeighborhood(),
                model.getCity(),
                model.getState(),
                model.getNumber(),
                model.getCreatedAt(),
                model.getUpdatedAt()
        );
    }
}