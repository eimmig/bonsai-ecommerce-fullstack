package com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.category.CategoryOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.order.OrderInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.order.OrderOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.OrderEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.CategoryModel;
import com.br.utfpr.edu.bonsaiecommercebackend.models.OrderModel;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

/**
 * Mapper responsável por converter entre OrderModel, OrderEntity, OrderInputDTO e OrderOutputDTO.
 * Utiliza ModelMapper para facilitar o mapeamento automático.
 */
@Component
public class OrderMapper extends GenericMapper<OrderModel, OrderEntity, OrderInputDTO, OrderOutputDTO> {
    protected OrderMapper(ModelMapper modelMapper) {
        super(modelMapper);
    }

    @Override
    public OrderOutputDTO toDTO(OrderModel model) {
        return model != null ? OrderOutputDTO.fromModel(model) : null;
    }
}
