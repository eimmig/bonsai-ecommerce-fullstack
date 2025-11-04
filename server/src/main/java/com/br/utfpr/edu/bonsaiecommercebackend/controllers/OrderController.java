package com.br.utfpr.edu.bonsaiecommercebackend.controllers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.order.OrderInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.order.OrderOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.models.OrderModel;
import com.br.utfpr.edu.bonsaiecommercebackend.services.OrderService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.OrderMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Controller para operações de pedidos
 * Service busca userId internamente via AuthenticationUtil
 */
@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final OrderMapper orderMapper;

    /**
     * Cria pedido para o usuário autenticado
     */
    @PostMapping
    public ResponseEntity<OrderOutputDTO> createOrder(@Valid @RequestBody OrderInputDTO dto) {
        OrderModel orderModel = orderMapper.toModel(dto);
        OrderModel createdOrder = orderService.createOrder(orderModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(orderMapper.toOutputDTO(createdOrder));
    }

    /**
     * Lista pedidos do usuário autenticado
     */
    @GetMapping
    public ResponseEntity<Page<OrderOutputDTO>> getOrders(@PageableDefault(size = 20, sort = "orderDate") Pageable pageable) {
        Page<OrderModel> orders = orderService.getAllOrders(pageable);
        return ResponseEntity.ok(orders.map(orderMapper::toOutputDTO));
    }

    /**
     * Busca pedido específico (valida propriedade)
     */
    @GetMapping("/{id}")
    public ResponseEntity<OrderOutputDTO> getOrder(@PathVariable UUID id) {
        OrderModel order = orderService.getOrder(id);
        return ResponseEntity.ok(orderMapper.toOutputDTO(order));
    }

    /**
     * Cancela pedido do usuário autenticado
     */
    @PutMapping("/{id}/cancel")
    public ResponseEntity<OrderOutputDTO> cancelOrder(@PathVariable UUID id) {
        OrderModel cancelledOrder = orderService.cancelOrder(id);
        return ResponseEntity.ok(orderMapper.toOutputDTO(cancelledOrder));
    }
}

