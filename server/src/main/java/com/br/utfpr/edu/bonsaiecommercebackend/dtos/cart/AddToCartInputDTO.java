package com.br.utfpr.edu.bonsaiecommercebackend.dtos.cart;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

/**
 * DTO de entrada para adicionar item ao carrinho
 */
public record AddToCartInputDTO(
        @NotNull(message = "ID do produto é obrigatório")
        UUID productId,

        @NotNull(message = "Quantidade é obrigatória")
        @Min(value = 1, message = "Quantidade deve ser pelo menos 1")
        Integer quantity
) {
}
