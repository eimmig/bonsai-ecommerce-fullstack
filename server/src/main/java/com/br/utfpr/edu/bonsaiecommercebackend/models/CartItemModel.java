package com.br.utfpr.edu.bonsaiecommercebackend.models;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

/**
 * Model para representar um item do carrinho.
 * Nota: Não contém referência ao CartModel para evitar referência circular.
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class CartItemModel extends GenericModel {
    private ProductModel product;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;
}
