package com.br.utfpr.edu.bonsaiEcommerceBackend.controllers;

import com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.order.OrderInputDTO;
import com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.order.OrderOutputDTO;
import com.br.utfpr.edu.bonsaiEcommerceBackend.entities.OrderEntity;
import com.br.utfpr.edu.bonsaiEcommerceBackend.models.OrderModel;
import com.br.utfpr.edu.bonsaiEcommerceBackend.services.OrderService;
import com.br.utfpr.edu.bonsaiEcommerceBackend.utils.OrderMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/order")
public class OrderController extends GenericController<OrderModel, OrderEntity, OrderInputDTO, OrderOutputDTO> {

    public OrderController(OrderService service, OrderMapper mapper) {
        super(service, mapper);
    }
}
