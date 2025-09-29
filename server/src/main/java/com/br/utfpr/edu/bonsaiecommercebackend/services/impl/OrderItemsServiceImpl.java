package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.OrderItemsEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.OrderItemsModel;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.OrderItemsRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.services.OrderItemsService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.OrderItemsMapper;
import org.springframework.stereotype.Service;

@Service
public class OrderItemsServiceImpl extends GenericServiceImpl<OrderItemsModel, OrderItemsEntity>
        implements OrderItemsService {

    public OrderItemsServiceImpl(OrderItemsRepository repository, OrderItemsMapper mapper) {
        super(repository, mapper);
    }
}
