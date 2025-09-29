package com.br.utfpr.edu.bonsaiecommercebackend.controllers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.order.OrderInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.order.OrderOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.OrderEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.OrderModel;
import com.br.utfpr.edu.bonsaiecommercebackend.services.OrderService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.OrderMapper;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/order")
public class OrderController extends GenericController<OrderModel, OrderEntity, OrderInputDTO, OrderOutputDTO> {


    public OrderController(OrderService service, OrderMapper mapper) {
        super(service, mapper);
    }
}
