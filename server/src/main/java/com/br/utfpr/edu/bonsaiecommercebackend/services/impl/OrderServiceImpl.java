package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.order.OrderInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.order.OrderOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.orderItems.OrderItemInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.OrderEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.OrderItemsEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.ProductEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.UserEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.ResourceNotFoundException;
import com.br.utfpr.edu.bonsaiecommercebackend.models.OrderModel;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.OrderRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.ProductRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.UserRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.services.OrderService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.OrderMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class OrderServiceImpl extends GenericServiceImpl<OrderModel, OrderEntity>
    implements OrderService {

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

    @Transactional
    public OrderOutputDTO createOrder(OrderInputDTO dto) {
        UUID userId = dto.userId();
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        OrderEntity order = new OrderEntity();
        order.setUser(user);
        order.setOrderDate(dto.orderDate());

        // Adiciona os itens ao pedido
        addItemsToOrder(order, dto);

        // Garante que o preço total seja calculado antes de salvar
        order.calculateTotalPrice();

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

        // Limpa os itens existentes e adiciona os novos
        order.getItems().clear();
        addItemsToOrder(order, dto);

        // Garante que o preço total seja calculado antes de salvar
        order.calculateTotalPrice();

        OrderEntity saved = orderRepository.save(order);
        OrderModel model = orderMapper.toModel(saved);
        return orderMapper.toOutputDTO(model);
    }

    private void addItemsToOrder(OrderEntity order, OrderInputDTO dto) {
        for (OrderItemInputDTO itemDTO : dto.orderItems()) {
            ProductEntity product = productRepository.findById(itemDTO.productId())
                    .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado: " + itemDTO.productId()));

            OrderItemsEntity item = new OrderItemsEntity();
            item.setProduct(product);
            item.setPrice(product.getPrice()); // Usa o preço atual do produto
            item.setQuantity(itemDTO.quantity());

            // Usa o método helper para manter a relação bidirecional
            order.addItem(item);
        }
    }
}
