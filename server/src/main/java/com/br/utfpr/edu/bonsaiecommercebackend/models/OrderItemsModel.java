package com.br.utfpr.edu.bonsaiecommercebackend.models;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class OrderItemsModel extends GenericModel{
    private OrderModel order;
    private ProductModel product;
    private java.math.BigDecimal price;
    private Integer quantity;

    /**
     * Calcula o subtotal do item (preço × quantidade)
     * @return subtotal do item
     */
    public java.math.BigDecimal getSubtotal() {
        if (price == null || quantity == null) {
            return java.math.BigDecimal.ZERO;
        }
        return price.multiply(java.math.BigDecimal.valueOf(quantity));
    }
}
