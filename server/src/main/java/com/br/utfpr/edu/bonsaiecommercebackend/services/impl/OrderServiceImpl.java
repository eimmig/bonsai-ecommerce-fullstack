package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.OrderEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.OrderItemsEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.ProductEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.UserEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.ResourceNotFoundException;
import com.br.utfpr.edu.bonsaiecommercebackend.models.OrderItemsModel;
import com.br.utfpr.edu.bonsaiecommercebackend.models.OrderModel;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.OrderRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.ProductRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.UserRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.services.OrderService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.OrderMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.UUID;

@Service
public class OrderServiceImpl extends GenericServiceImpl<OrderModel, OrderEntity> implements OrderService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderMapper orderMapper;

    public OrderServiceImpl(OrderRepository repository, OrderMapper mapper, UserRepository userRepository, ProductRepository productRepository) {
        super(repository, mapper);
        this.orderRepository = repository;
        this.orderMapper = mapper;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @Override
    @Transactional
    public OrderModel createOrder(OrderModel orderModel) {
        if (orderModel == null) {
            throw new IllegalArgumentException("OrderModel não pode ser null");
        }

        if (orderModel.getUser() == null || orderModel.getUser().getId() == null) {
            throw new IllegalArgumentException("Usuário é obrigatório para criar um pedido");
        }

        UserEntity user = userRepository.findById(orderModel.getUser().getId()).orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        orderEntity.setUser(user);

        processOrderItems(orderEntity, orderModel);

        calculateTotalPrice(orderEntity);

        OrderEntity savedEntity = orderRepository.save(orderEntity);
        return orderMapper.toModel(savedEntity);
    }

    @Override
    @Transactional
    public OrderModel updateOrder(UUID id, OrderModel orderModel) {
        if (orderModel == null) {
            throw new IllegalArgumentException("OrderModel não pode ser null");
        }

        if (orderModel.getUser() == null || orderModel.getUser().getId() == null) {
            throw new IllegalArgumentException("Usuário é obrigatório para atualizar um pedido");
        }

        OrderEntity existingOrder = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Pedido não encontrado"));

        UserEntity user = userRepository.findById(orderModel.getUser().getId()).orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        existingOrder.setUser(user);
        existingOrder.setOrderDate(orderModel.getOrderDate());

        existingOrder.getOrderItems().clear();
        processOrderItems(existingOrder, orderModel);

        calculateTotalPrice(existingOrder);

        OrderEntity savedEntity = orderRepository.save(existingOrder);
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

            ProductEntity product = productRepository.findById(itemModel.getProduct().getId()).orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado: " + itemModel.getProduct().getId()));

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
     * Adiciona item ao pedido - lógica de negócio movida da entidade
     */
    private void addItemToOrder(OrderEntity order, OrderItemsEntity item) {
        order.getOrderItems().add(item);
        item.setOrder(order);
    }

    /**
     * Remove item do pedido - lógica de negócio movida da entidade
     */
    private void removeItemFromOrder(OrderEntity order, OrderItemsEntity item) {
        order.getOrderItems().remove(item);
        item.setOrder(null);
    }

    /**
     * Calcula o preço total do pedido - lógica de negócio movida da entidade
     */
    private void calculateTotalPrice(OrderEntity order) {
        if (order.getOrderItems() == null || order.getOrderItems().isEmpty()) {
            order.setTotalPrice(BigDecimal.ZERO);
            return;
        }

        BigDecimal totalPrice = order.getOrderItems().stream().filter(item -> item.getPrice() != null && item.getQuantity() != null).map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()))).reduce(BigDecimal.ZERO, BigDecimal::add);

        order.setTotalPrice(totalPrice);
    }
}
