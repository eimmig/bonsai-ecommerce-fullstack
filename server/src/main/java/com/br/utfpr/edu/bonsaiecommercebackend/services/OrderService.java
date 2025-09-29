package com.br.utfpr.edu.bonsaiecommercebackend.services;

import com.br.utfpr.edu.bonsaiecommercebackend.models.OrderModel;

import java.util.UUID;

public interface OrderService extends GenericService<OrderModel> {
    OrderModel createOrder(OrderModel orderModel);
    OrderModel updateOrder(UUID id, OrderModel orderModel);
}
