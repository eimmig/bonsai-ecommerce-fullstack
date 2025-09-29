package com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.order.OrderInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.order.OrderOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.OrderEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.OrderModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        unmappedTargetPolicy = ReportingPolicy.WARN,
        uses = {UserMapper.class, ProductMapper.class, AddressMapper.class, OrderItemsMapper.class}
)
public interface OrderMapper extends DomainMapper<OrderModel, OrderEntity, OrderInputDTO, OrderOutputDTO> {

    // Remove os mapeamentos incorretos de orderItems se a propriedade não existir na entidade
    OrderEntity toEntity(OrderModel model);

    OrderModel toModel(OrderEntity entity);

    List<OrderModel> toModelList(List<OrderEntity> entities);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "user", ignore = true)
    OrderModel toModel(OrderInputDTO inputDTO);

    @Mapping(target = "userId", source = "user.id")
    OrderOutputDTO toOutputDTO(OrderModel model);

    List<OrderOutputDTO> toOutputDTOList(List<OrderModel> models);
}
