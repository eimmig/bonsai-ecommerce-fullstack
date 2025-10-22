package com.br.utfpr.edu.bonsaiecommercebackend.models;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@Data
@EqualsAndHashCode(callSuper = true)
public class CartItemModel extends GenericModel {
    private CartModel cart;
    private ProductModel product;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;

    public void recalculatePrices() {
        // Calcular preço unitário com desconto
        BigDecimal productPrice = product.getPrice();
        BigDecimal discount = product.getDiscount();
        
        if (discount != null && discount.compareTo(BigDecimal.ZERO) > 0) {
            BigDecimal discountAmount = productPrice.multiply(discount).divide(BigDecimal.valueOf(100));
            this.unitPrice = productPrice.subtract(discountAmount);
        } else {
            this.unitPrice = productPrice;
        }
        
        // Calcular preço total
        this.totalPrice = this.unitPrice.multiply(BigDecimal.valueOf(quantity));
    }
}
