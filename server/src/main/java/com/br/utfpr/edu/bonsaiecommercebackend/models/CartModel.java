package com.br.utfpr.edu.bonsaiecommercebackend.models;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class CartModel extends GenericModel {
    private UserModel user;
    private List<CartItemModel> items = new ArrayList<>();
    private BigDecimal totalPrice = BigDecimal.ZERO;

    public void recalculateTotalPrice() {
        this.totalPrice = items.stream()
                .map(CartItemModel::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
