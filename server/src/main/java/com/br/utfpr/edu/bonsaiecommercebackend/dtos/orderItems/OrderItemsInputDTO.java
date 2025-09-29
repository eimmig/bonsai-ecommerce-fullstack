package com.br.utfpr.edu.bonsaiecommercebackend.dtos.orderItems;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.UUID;

public record OrderItemsInputDTO(
        UUID id,

        @NotNull(message = "ID do pedido é obrigatório")
        UUID orderId,


        @NotNull(message = "ID do produto é obrigatório")
        UUID productId,

        @NotNull(message = "Quantidade é obrigatória")
        Integer quantity,

        @NotNull(message = "Preço é obrigatório")
        BigDecimal price


) {

}
