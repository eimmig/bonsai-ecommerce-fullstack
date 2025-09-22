package com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.product.ProductInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.product.ProductOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.ProductEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.ProductModel;
import com.br.utfpr.edu.bonsaiecommercebackend.services.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

/**
 * Mapper responsável por converter entre ProductModel, ProductEntity, ProductInputDTO e ProductOutputDTO.
 * Utiliza ModelMapper para facilitar o mapeamento automático.
 */
@Component
public class ProductMapper extends GenericMapper<ProductModel, ProductEntity, ProductInputDTO, ProductOutputDTO> {

    private final CategoryService categoryService;

    public ProductMapper(ModelMapper modelMapper, CategoryService categoryService) {
        super(modelMapper);
        this.categoryService = categoryService;
    }

    @Override
    public ProductOutputDTO toDTO(ProductModel model) {
        return model != null ? ProductOutputDTO.fromModel(model) : null;
    }

    @Override
    public ProductModel toModel(ProductInputDTO dto) {
        var productModel = super.toModel(dto);

        var categoryModel = categoryService.findByIdOrThrow(dto.categoryId());

        productModel.setCategory(categoryModel);
        return productModel;
    }
}