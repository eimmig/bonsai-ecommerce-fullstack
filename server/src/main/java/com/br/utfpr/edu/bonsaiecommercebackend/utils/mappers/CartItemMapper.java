package com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.cart.CartItemOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.CartItemEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.CartItemModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(
    componentModel = "spring",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
    unmappedTargetPolicy = ReportingPolicy.WARN,
    uses = {ProductMapper.class}
)
public interface CartItemMapper {

    CartItemEntity toEntity(CartItemModel model);

    @Mapping(target = "product", source = "product")
    CartItemModel toModel(CartItemEntity entity);

    List<CartItemModel> toModelList(List<CartItemEntity> entities);

    @Mapping(target = "product", source = "product")
    CartItemOutputDTO toOutputDTO(CartItemModel model);

    List<CartItemOutputDTO> toOutputDTOList(List<CartItemModel> models);
}
