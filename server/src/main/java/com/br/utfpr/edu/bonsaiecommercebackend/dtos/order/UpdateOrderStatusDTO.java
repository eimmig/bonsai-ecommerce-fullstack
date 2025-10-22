package com.br.utfpr.edu.bonsaiecommercebackend.dtos.order;

import com.br.utfpr.edu.bonsaiecommercebackend.enums.OrderStatus;
import jakarta.validation.constraints.NotNull;

/**
 * DTO para atualização de status do pedido (admin)
 */
public record UpdateOrderStatusDTO(
        @NotNull(message = "Status é obrigatório")
        OrderStatus status
) {
}
