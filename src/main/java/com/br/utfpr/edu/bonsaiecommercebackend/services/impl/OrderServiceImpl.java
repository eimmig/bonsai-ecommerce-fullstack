package com.br.utfpr.edu.bonsaiEcommerceBackend.services.impl;

import com.br.utfpr.edu.bonsaiEcommerceBackend.entities.OrderEntity;
import com.br.utfpr.edu.bonsaiEcommerceBackend.models.OrderModel;
import com.br.utfpr.edu.bonsaiEcommerceBackend.repositories.OrderRepository;
import com.br.utfpr.edu.bonsaiEcommerceBackend.services.OrderService;
import com.br.utfpr.edu.bonsaiEcommerceBackend.utils.OrderMapper;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl extends GenericServiceImpl<OrderModel, OrderEntity>
    implements OrderService {
    public OrderServiceImpl(OrderRepository repository, OrderMapper mapper) {
        super(repository, mapper);
    }
}
