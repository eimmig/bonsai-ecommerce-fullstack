package com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.orderItems.OrderItemsInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.orderItems.OrderItemsOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.OrderItemsEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.OrderItemsModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, unmappedTargetPolicy = ReportingPolicy.WARN, uses = {ProductMapper.class})
public interface OrderItemsMapper extends DomainMapper<OrderItemsModel, OrderItemsEntity, OrderItemsInputDTO, OrderItemsOutputDTO>  {

    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "orderId", source = "order.id")
    OrderItemsOutputDTO toOutputDTO(OrderItemsModel model);

    @Mapping(target = "product", ignore = true)
    @Mapping(target = "order", ignore = true)
    OrderItemsModel toModel(OrderItemsInputDTO inputDTO);

    List<OrderItemsOutputDTO> toOutputDTOList(List<OrderItemsModel> models);
}


