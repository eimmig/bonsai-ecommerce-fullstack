package com.br.utfpr.edu.bonsaiecommercebackend.controllers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.order.OrderInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.order.OrderOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.OrderEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.OrderModel;
import com.br.utfpr.edu.bonsaiecommercebackend.services.OrderService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.OrderMapper;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/order")
public class OrderController extends GenericController<OrderModel, OrderEntity, OrderInputDTO, OrderOutputDTO> {

    private final OrderService orderService;

    public OrderController(OrderService service, OrderMapper mapper) {
        super(service, mapper);
        this.orderService = service;
    }

    @PostMapping
    public ResponseEntity<OrderOutputDTO> create(@Valid @RequestBody OrderInputDTO inputDTO) {

        OrderModel model = mapper.toModel(inputDTO);
        OrderModel savedModel = orderService.createOrder(model);
        OrderOutputDTO outputDTO = mapper.toOutputDTO(savedModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(outputDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderOutputDTO> update(@PathVariable UUID id, @Valid @RequestBody OrderInputDTO inputDTO) {
        OrderModel model = mapper.toModel(inputDTO);
        OrderModel updatedModel = orderService.updateOrder(id, model);
        OrderOutputDTO outputDTO = mapper.toOutputDTO(updatedModel);
        return ResponseEntity.ok(outputDTO);
    }
}
