package com.br.utfpr.edu.bonsaiecommercebackend.dtos.cart;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 * DTO de entrada para atualizar quantidade de item no carrinho
 */
public record UpdateCartItemInputDTO(
        @NotNull(message = "Quantidade é obrigatória")
        @Min(value = 1, message = "Quantidade deve ser pelo menos 1")
        Integer quantity
) {
}
