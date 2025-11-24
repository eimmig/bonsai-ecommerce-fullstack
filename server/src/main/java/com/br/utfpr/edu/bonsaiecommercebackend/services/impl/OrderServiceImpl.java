package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.OrderEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.OrderItemsEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.ProductEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.UserEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.enums.OrderStatus;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.ResourceNotFoundException;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.UnauthorizedAccessException;
import com.br.utfpr.edu.bonsaiecommercebackend.models.OrderItemsModel;
import com.br.utfpr.edu.bonsaiecommercebackend.models.OrderModel;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.OrderRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.ProductRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.UserRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.services.OrderService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.AuthenticationUtil;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private static final Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderMapper orderMapper;

    @Override
    @Transactional
    public OrderModel createOrder(OrderModel orderModel) {
        UUID userId = AuthenticationUtil.getCurrentUserId();

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        OrderEntity orderEntity = orderMapper.toEntity(orderModel);
        orderEntity.setUser(user);

        if (orderEntity.getStatus() == null) {
            orderEntity.setStatus(OrderStatus.PENDING);
        }

        processOrderItems(orderEntity, orderModel);
        calculateTotalPrice(orderEntity);

        OrderEntity savedEntity = orderRepository.save(orderEntity);
        return orderMapper.toModel(savedEntity);
    }

    @Override
    public OrderModel getOrder(UUID orderId) {
        UUID userId = AuthenticationUtil.getCurrentUserId();

        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido não encontrado"));

        if (!order.getUser().getId().equals(userId)) {
            throw new UnauthorizedAccessException("Você não tem permissão para acessar este pedido");
        }

        return orderMapper.toModel(order);
    }

    @Override
    public Page<OrderModel> getAllOrders(Pageable pageable) {
        UUID userId = AuthenticationUtil.getCurrentUserId();

        Page<OrderEntity> orders = orderRepository.findByUserId(userId, pageable);
        return orders.map(orderMapper::toModel);
    }

    @Override
    @Transactional
    public OrderModel cancelOrder(UUID orderId) {
        UUID userId = AuthenticationUtil.getCurrentUserId();
        logger.info("Cancelando pedido: {} para usuário: {}", orderId, userId);

        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido não encontrado"));

        if (!order.getUser().getId().equals(userId)) {
            logger.warn("Tentativa não autorizada de cancelar pedido. User: {}, Order: {}", userId, orderId);
            throw new UnauthorizedAccessException("Usuário não tem permissão para cancelar este pedido");
        }

        if (order.getStatus() == OrderStatus.DELIVERED || order.getStatus() == OrderStatus.CANCELLED) {
            logger.warn("Tentativa de cancelar pedido com status inválido: {}", order.getStatus());
            throw new IllegalArgumentException("Pedido não pode ser cancelado (status: " + order.getStatus() + ")");
        }

        order.setStatus(OrderStatus.CANCELLED);
        OrderEntity savedEntity = orderRepository.save(order);
        logger.info("Pedido cancelado com sucesso. ID: {}", orderId);
        return orderMapper.toModel(savedEntity);
    }

    /**
     * Processa os itens do pedido - lógica de negócio movida da entidade
     */
    private void processOrderItems(OrderEntity orderEntity, OrderModel orderModel) {
        if (orderModel.getOrderItems() == null || orderModel.getOrderItems().isEmpty()) {
            orderEntity.setOrderItems(new ArrayList<>());
            return;
        }

        orderEntity.getOrderItems().clear();

        for (OrderItemsModel itemModel : orderModel.getOrderItems()) {
            if (itemModel.getProduct() == null || itemModel.getProduct().getId() == null) {
                throw new IllegalArgumentException("Produto é obrigatório para cada item do pedido");
            }

            ProductEntity product = productRepository.findById(itemModel.getProduct().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado: " + itemModel.getProduct().getId()));

            if (itemModel.getQuantity() == null || itemModel.getQuantity() < 1) {
                throw new IllegalArgumentException("Quantidade deve ser maior que zero");
            }

            OrderItemsEntity itemEntity = new OrderItemsEntity();
            itemEntity.setProduct(product);
            itemEntity.setPrice(product.getPrice());
            itemEntity.setQuantity(itemModel.getQuantity());
            itemEntity.setOrder(orderEntity);

            if (itemEntity.getPrice() == null) {
                throw new IllegalStateException("Preço do produto não pode ser null: " + product.getId());
            }

            addItemToOrder(orderEntity, itemEntity);
        }
    }

    /**
     * Adiciona item ao pedido
     */
    private void addItemToOrder(OrderEntity order, OrderItemsEntity item) {
        order.getOrderItems().add(item);
        item.setOrder(order);
    }

    /**
     * Calcula o preço total do pedido
     */
    private void calculateTotalPrice(OrderEntity order) {
        if (order.getOrderItems() == null || order.getOrderItems().isEmpty()) {
            order.setTotalPrice(BigDecimal.ZERO);
            order.setSubtotal(BigDecimal.ZERO);
            return;
        }

        BigDecimal subtotal = order.getOrderItems().stream()
                .filter(item -> item.getPrice() != null && item.getQuantity() != null)
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        order.setSubtotal(subtotal);

        if (order.getShippingCost() == null) {
            order.setShippingCost(BigDecimal.ZERO);
        }

        order.calculateTotalPrice();
    }
}

