package com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.product.ProductInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.product.ProductOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.ProductEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.ProductModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(
    componentModel = "spring",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
    unmappedTargetPolicy = ReportingPolicy.WARN,
    uses = {CategoryMapper.class}
)
public interface ProductMapper extends DomainMapper<ProductModel, ProductEntity, ProductInputDTO, ProductOutputDTO> {

    ProductEntity toEntity(ProductModel model);

    ProductModel toModel(ProductEntity entity);

    List<ProductModel> toModelList(List<ProductEntity> entities);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "category.id", source = "categoryId")
    ProductModel toModel(ProductInputDTO inputDTO);


    @Mapping(target = "category", source = "category")
    ProductOutputDTO toOutputDTO(ProductModel model);

    List<ProductOutputDTO> toOutputDTOList(List<ProductModel> models);
}