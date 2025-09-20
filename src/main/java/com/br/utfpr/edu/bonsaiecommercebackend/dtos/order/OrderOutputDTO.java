package com.br.utfpr.edu.bonsaiecommercebackend.dtos.order;

import java.time.LocalDateTime;
import java.util.UUID;

public record OrderOutputDTO(
        UUID id,
        LocalDateTime orderDate,
        UUID userId,
        LocalDateTime createdAt,
        LocalDateTime updatedAt

) {
}
