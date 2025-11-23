package com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.orderitems.OrderItemsInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.orderitems.OrderItemsOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.OrderItemsEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.OrderItemsModel;
import org.mapstruct.*;

import java.util.List;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        unmappedTargetPolicy = ReportingPolicy.WARN,
        uses = {ProductMapper.class}
)
public interface OrderItemsMapper extends DomainMapper<OrderItemsModel, OrderItemsEntity, OrderItemsInputDTO, OrderItemsOutputDTO> {

    @Mapping(target = "order", ignore = true)
    OrderItemsModel toModel(OrderItemsEntity entity);

    List<OrderItemsModel> toModelList(List<OrderItemsEntity> entities);

    @Mapping(target = "order", ignore = true)
    OrderItemsEntity toEntity(OrderItemsModel model);

    List<OrderItemsEntity> toEntityList(List<OrderItemsModel> models);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "product.id", source = "productId")
    @Mapping(target = "order", ignore = true)
    @Mapping(target = "price", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    OrderItemsModel toModel(OrderItemsInputDTO dto);

    @Mapping(target = "product", source = "product")
    @Mapping(target = "price", source = "price")
    @Mapping(target = "createdAt", source = "createdAt")
    @Mapping(target = "updatedAt", source = "updatedAt")
    OrderItemsOutputDTO toOutputDTO(OrderItemsModel model);

    List<OrderItemsOutputDTO> toOutputDTOList(List<OrderItemsModel> models);
}
