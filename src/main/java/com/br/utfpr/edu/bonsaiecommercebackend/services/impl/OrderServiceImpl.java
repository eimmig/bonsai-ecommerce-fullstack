package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.OrderEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.OrderModel;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.OrderRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.services.OrderService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.OrderMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.br.utfpr.edu.bonsaiecommercebackend.services.UserService;
import com.br.utfpr.edu.bonsaiecommercebackend.models.UserModel;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.ResourceNotFoundException;

@Service
public class OrderServiceImpl extends GenericServiceImpl<OrderModel, OrderEntity>
    implements OrderService {
    private final UserService userService;

    public OrderServiceImpl(OrderRepository repository, OrderMapper mapper, UserService userService) {
        super(repository, mapper);
        this.userService = userService;
    }

    @Override
    @Transactional
    public OrderModel save(OrderModel model) {
        if (model.getUser() == null || model.getUser().getId() == null) {
            throw new ResourceNotFoundException("User is required for the order.");
        }
        UserModel user = userService.findByIdOrThrow(model.getUser().getId());
        model.setUser(user);
        return super.save(model);
    }
}
