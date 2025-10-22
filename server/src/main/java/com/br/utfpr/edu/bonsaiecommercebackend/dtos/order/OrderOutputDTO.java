package com.br.utfpr.edu.bonsaiecommercebackend.dtos.order;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.address.AddressOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.orderitems.OrderItemsOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.enums.OrderStatus;
import com.br.utfpr.edu.bonsaiecommercebackend.enums.PaymentMethod;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * DTO de saída para pedidos.
 * Mapeamento realizado via MapStruct para melhor performance.
 */
public record OrderOutputDTO(
        UUID id,
        LocalDateTime orderDate,
        UUID userId,
        BigDecimal totalPrice,
        BigDecimal subtotal,
        BigDecimal shippingCost,
        OrderStatus status,
        AddressOutputDTO deliveryAddress,
        PaymentMethod paymentMethod,
        List<OrderItemsOutputDTO> orderItems,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}