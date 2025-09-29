package com.br.utfpr.edu.bonsaiecommercebackend.dtos.orderItems;

import jakarta.validation.constraints.*;
import java.util.UUID;

public record OrderItemInputDTO(
        UUID id,

        @NotNull(message = "ID do produto é obrigatório")
        UUID productId,

        @NotNull(message = "Quantidade é obrigatória")
        @Min(value = 1, message = "Quantidade deve ser pelo menos 1")
        @Max(value = 999, message = "Quantidade não pode exceder 999")
        Integer quantity
) {
}
