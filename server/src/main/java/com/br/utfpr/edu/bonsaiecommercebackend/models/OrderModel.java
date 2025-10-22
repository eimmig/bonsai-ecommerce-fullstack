package com.br.utfpr.edu.bonsaiecommercebackend.models;

import com.br.utfpr.edu.bonsaiecommercebackend.enums.OrderStatus;
import com.br.utfpr.edu.bonsaiecommercebackend.enums.PaymentMethod;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class OrderModel extends GenericModel{
    private LocalDateTime orderDate;
    private UserModel user;
    private BigDecimal totalPrice;
    private BigDecimal subtotal;
    private BigDecimal shippingCost;
    private OrderStatus status;
    private AddressModel deliveryAddress;
    private PaymentMethod paymentMethod;
    private List<OrderItemsModel> orderItems = new ArrayList<>();
}
