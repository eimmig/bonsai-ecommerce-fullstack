package com.br.utfpr.edu.bonsaiecommercebackend.dtos.order;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.address.AddressInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.orderitems.OrderItemsInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.enums.PaymentMethod;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * DTO de entrada para criação de pedidos
 */
public record OrderInputDTO(
        UUID id,

        @NotNull(message = "Data do pedido é obrigatória")
        LocalDateTime orderDate,

        @NotEmpty(message = "O pedido deve ter pelo menos um item")
        @Valid
        List<OrderItemsInputDTO> orderItems,

        @NotNull(message = "Endereço de entrega é obrigatório")
        @Valid
        AddressInputDTO deliveryAddress,

        @NotNull(message = "Método de pagamento é obrigatório")
        PaymentMethod paymentMethod,

        @NotNull(message = "Custo do frete é obrigatório")
        @PositiveOrZero(message = "Custo do frete deve ser zero ou positivo")
        BigDecimal shippingCost
) {
}