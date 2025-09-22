package com.br.utfpr.edu.bonsaiecommercebackend.dtos.order;

import com.br.utfpr.edu.bonsaiecommercebackend.models.OrderModel;

import java.time.LocalDateTime;
import java.util.UUID;

public record OrderOutputDTO(
        UUID id,
        LocalDateTime orderDate,
        UUID userId,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static OrderOutputDTO fromModel(OrderModel model) {
        return new OrderOutputDTO(
                model.getId(),
                model.getOrderDate(),
                model.getUser().getId(),
                model.getCreatedAt(),
                model.getUpdatedAt()
        );
    }
}
