package com.br.utfpr.edu.bonsaiecommercebackend.controllers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.order.OrderInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.order.OrderOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.order.UpdateOrderStatusDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.OrderEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.OrderModel;
import com.br.utfpr.edu.bonsaiecommercebackend.services.OrderService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.AuthenticationUtil;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.OrderMapper;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Controller para operações de pedidos
 */
@RestController
@RequestMapping("/api/order")
public class OrderController extends GenericController<OrderModel, OrderEntity, OrderInputDTO, OrderOutputDTO> {

    private final OrderService orderService;
    private final OrderMapper orderMapper;

    public OrderController(OrderService service, OrderMapper mapper) {
        super(service, mapper);
        this.orderService = service;
        this.orderMapper = mapper;
    }

    /**
     * Cancela um pedido (apenas o próprio usuário)
     */
    @PutMapping("/{id}/cancel")
    public ResponseEntity<OrderOutputDTO> cancelOrder(@PathVariable UUID id) {
        UUID userId = AuthenticationUtil.getCurrentUserId();
        OrderModel cancelledOrder = orderService.cancelOrder(id, userId);
        return ResponseEntity.ok(orderMapper.toOutputDTO(cancelledOrder));
    }

    /**
     * Atualiza o status de um pedido (apenas admin - será implementado controle de acesso)
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<OrderOutputDTO> updateStatus(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateOrderStatusDTO dto
    ) {
        OrderModel updatedOrder = orderService.updateStatus(id, dto.status());
        return ResponseEntity.ok(orderMapper.toOutputDTO(updatedOrder));
    }
}
