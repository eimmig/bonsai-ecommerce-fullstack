package com.br.utfpr.edu.bonsaiecommercebackend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@Entity
@Table(name = "cart_items", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"cart_id", "product_id"})
})
@Data
@EqualsAndHashCode(callSuper = true)
public class CartItemEntity extends GenericEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false)
    @NotNull(message = "Carrinho é obrigatório")
    private CartEntity cart;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    @NotNull(message = "Produto é obrigatório")
    private ProductEntity product;

    @Column(name = "quantity", nullable = false)
    @NotNull(message = "Quantidade é obrigatória")
    @Min(value = 1, message = "Quantidade deve ser pelo menos 1")
    private Integer quantity;

    @Column(name = "unit_price", nullable = false)
    @NotNull(message = "Preço unitário é obrigatório")
    private BigDecimal unitPrice;

    @Column(name = "total_price", nullable = false)
    @NotNull(message = "Preço total é obrigatório")
    private BigDecimal totalPrice;

    /**
     * Calcula o preço unitário considerando desconto
     */
    public void calculateUnitPrice() {
        BigDecimal productPrice = product.getPrice();
        BigDecimal discount = product.getDiscount();
        
        if (discount != null && discount.compareTo(BigDecimal.ZERO) > 0) {
            BigDecimal discountAmount = productPrice.multiply(discount).divide(BigDecimal.valueOf(100));
            this.unitPrice = productPrice.subtract(discountAmount);
        } else {
            this.unitPrice = productPrice;
        }
    }

    /**
     * Calcula o preço total do item (unitPrice * quantity)
     */
    public void calculateTotalPrice() {
        this.totalPrice = this.unitPrice.multiply(BigDecimal.valueOf(quantity));
    }

    /**
     * Recalcula ambos os preços
     */
    public void recalculatePrices() {
        calculateUnitPrice();
        calculateTotalPrice();
    }
}
