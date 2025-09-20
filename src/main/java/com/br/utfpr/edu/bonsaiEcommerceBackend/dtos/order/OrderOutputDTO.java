package com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.order;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.springframework.data.jpa.domain.AbstractAuditable_.createdBy;

public record OrderOutputDTO(
        UUID id,
        LocalDateTime orderDate,
        UUID userId,
        LocalDateTime createdAt,
        LocalDateTime updatedAt

) {
}
