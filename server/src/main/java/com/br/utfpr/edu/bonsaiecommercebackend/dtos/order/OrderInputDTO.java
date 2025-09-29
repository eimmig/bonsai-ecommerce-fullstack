package com.br.utfpr.edu.bonsaiecommercebackend.dtos.order;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.orderItems.OrderItemInputDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record OrderInputDTO(
        UUID id,

        @NotNull(message = "Data do pedido é obrigatória")
        LocalDateTime orderDate,

        @NotNull(message = "ID do usuário é obrigatório")
        UUID userId,

        @NotEmpty(message = "O pedido deve ter pelo menos um item")
        @Valid
        List<OrderItemInputDTO> orderItems
) {
}
