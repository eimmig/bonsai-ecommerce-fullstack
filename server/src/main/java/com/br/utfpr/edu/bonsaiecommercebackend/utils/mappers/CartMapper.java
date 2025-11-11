package com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.cart.CartOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.CartEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.CartModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(
    componentModel = "spring",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
    unmappedTargetPolicy = ReportingPolicy.WARN,
    uses = {UserMapper.class, CartItemMapper.class}
)
public interface CartMapper {

    CartEntity toEntity(CartModel model);

    @Mapping(target = "user", source = "user")
    @Mapping(target = "items", source = "items")
    CartModel toModel(CartEntity entity);

    List<CartModel> toModelList(List<CartEntity> entities);

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "items", source = "items")
    CartOutputDTO toOutputDTO(CartModel model);

    List<CartOutputDTO> toOutputDTOList(List<CartModel> models);
}
