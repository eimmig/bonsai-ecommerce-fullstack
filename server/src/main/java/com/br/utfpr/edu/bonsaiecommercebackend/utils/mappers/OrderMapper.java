package com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.order.OrderInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.order.OrderOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.OrderEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.OrderModel;
import com.br.utfpr.edu.bonsaiecommercebackend.models.UserModel;
import org.mapstruct.*;

import java.util.List;
import java.util.UUID;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        unmappedTargetPolicy = ReportingPolicy.WARN,
        uses = {UserMapper.class, ProductMapper.class, AddressMapper.class, OrderItemsMapper.class}
)
public interface OrderMapper extends DomainMapper<OrderModel, OrderEntity, OrderInputDTO, OrderOutputDTO> {

    @Mapping(target = "orderItems", source = "orderItems")
    OrderEntity toEntity(OrderModel model);

    @Mapping(target = "orderItems", source = "orderItems")
    OrderModel toModel(OrderEntity entity);

    List<OrderModel> toModelList(List<OrderEntity> entities);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "user", source = "userId", qualifiedByName = "mapUserIdToUserModel")
    @Mapping(target = "orderItems", source = "orderItems")
    @Mapping(target = "totalPrice", ignore = true)
    @Mapping(target = "subtotal", ignore = true)
    @Mapping(target = "shippingCost", ignore = true)
    @Mapping(target = "status", ignore = true)
    OrderModel toModel(OrderInputDTO inputDTO);

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "orderItems", source = "orderItems")
    OrderOutputDTO toOutputDTO(OrderModel model);

    List<OrderOutputDTO> toOutputDTOList(List<OrderModel> models);

    /**
     * Mapeia um UUID para um UserModel com apenas o ID preenchido
     */
    @Named("mapUserIdToUserModel")
    default UserModel mapUserIdToUserModel(UUID userId) {
        if (userId == null) {
            return null;
        }
        UserModel userModel = new UserModel();
        userModel.setId(userId);
        return userModel;
    }
}
