package com.br.utfpr.edu.bonsaiecommercebackend.services;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.order.OrderInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.order.OrderOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.models.OrderModel;

import java.util.UUID;

public interface OrderService extends GenericService<OrderModel> {
    OrderOutputDTO createOrder(OrderInputDTO dto);
    OrderOutputDTO updateOrder(UUID id, OrderInputDTO dto);
}
