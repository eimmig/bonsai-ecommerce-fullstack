package com.br.utfpr.edu.bonsaiecommercebackend.dtos.orderItems;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.UUID;

public record OrderItemsInputDTO(
        UUID id,

        @NotNull(message = "ID do produto é obrigatório")
        UUID productId,

        @NotNull(message = "Quantidade é obrigatória")
        @Min(value = 1, message = "Quantidade deve ser pelo menos 1")
        @Max(value = 999, message = "Quantidade não pode exceder 999")
        Integer quantity

) {

}
