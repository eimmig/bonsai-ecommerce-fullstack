package com.br.utfpr.edu.bonsaiecommercebackend.dtos.order;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.UUID;

public record OrderInputDTO(
        UUID id,

        @NotNull(message = "Data do pedido é obrigatória")
        LocalDateTime orderDate,

        @NotNull(message = "ID do usuário é obrigatório")
        UUID userId
) {
}
