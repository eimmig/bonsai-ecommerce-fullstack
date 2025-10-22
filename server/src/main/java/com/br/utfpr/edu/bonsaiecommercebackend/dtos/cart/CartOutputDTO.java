package com.br.utfpr.edu.bonsaiecommercebackend.dtos.cart;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * DTO de saída para o carrinho completo
 */
public record CartOutputDTO(
        UUID id,
        UUID userId,
        List<CartItemOutputDTO> items,
        BigDecimal totalPrice,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
