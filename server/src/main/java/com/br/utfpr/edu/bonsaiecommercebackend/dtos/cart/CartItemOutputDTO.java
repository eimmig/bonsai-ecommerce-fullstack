package com.br.utfpr.edu.bonsaiecommercebackend.dtos.cart;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.product.ProductOutputDTO;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * DTO de saída para item do carrinho
 */
public record CartItemOutputDTO(
        UUID id,
        ProductOutputDTO product,
        Integer quantity,
        BigDecimal unitPrice,
        BigDecimal totalPrice
) {
}
