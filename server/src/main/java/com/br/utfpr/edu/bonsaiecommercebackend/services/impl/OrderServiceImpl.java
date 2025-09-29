package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.OrderEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.OrderModel;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.OrderRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.services.OrderService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.OrderMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.order.OrderInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.order.OrderOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.UserEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.ResourceNotFoundException;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.UserRepository;

@Service
public class OrderServiceImpl extends GenericServiceImpl<OrderModel, OrderEntity>
    implements OrderService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    public OrderServiceImpl(OrderRepository repository, OrderMapper mapper, UserRepository userRepository) {
        super(repository, mapper);
        this.orderRepository = repository;
        this.orderMapper = mapper;
        this.userRepository = userRepository;
    }

    @Transactional
    public OrderOutputDTO createOrder(OrderInputDTO dto) {
        UUID userId = dto.userId();
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
        OrderEntity order = new OrderEntity();
        order.setUser(user);
        order.setOrderDate(dto.orderDate());
        OrderEntity saved = orderRepository.save(order);
        OrderModel model = orderMapper.toModel(saved);
        return orderMapper.toOutputDTO(model);
    }

    @Transactional
    public OrderOutputDTO updateOrder(UUID id, OrderInputDTO dto) {
        OrderEntity order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido não encontrado"));
        UUID userId = dto.userId();
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
        order.setUser(user);
        order.setOrderDate(dto.orderDate());
        OrderEntity saved = orderRepository.save(order);
        OrderModel model = orderMapper.toModel(saved);
        return orderMapper.toOutputDTO(model);
    }
}
