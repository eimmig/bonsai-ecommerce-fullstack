
package com.br.utfpr.edu.bonsaiEcommerceBackend.utils;

import com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.product.ProductInputDTO;
import com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.product.ProductOutputDTO;
import com.br.utfpr.edu.bonsaiEcommerceBackend.entities.CategoryEntity;
import com.br.utfpr.edu.bonsaiEcommerceBackend.entities.ProductEntity;
import com.br.utfpr.edu.bonsaiEcommerceBackend.models.CategoryModel;
import com.br.utfpr.edu.bonsaiEcommerceBackend.models.ProductModel;
import com.br.utfpr.edu.bonsaiEcommerceBackend.repositories.CategoryRepository;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper extends GenericMapper<ProductModel, ProductEntity, ProductInputDTO, ProductOutputDTO> {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public ProductMapper(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public ProductModel toModel(ProductInputDTO dto) {
        if (dto == null) return null;

        ProductModel model = modelMapper.map(dto, ProductModel.class);

        // Lidar com categoryId -> CategoryModel
        if (dto.categoryId() != null) {
            CategoryEntity categoryEntity = categoryRepository.findById(dto.categoryId()).orElse(null);
            if (categoryEntity != null) {
                CategoryModel categoryModel = categoryMapper.toModel(categoryEntity);
                model.setCategory(categoryModel);
            }
        }

        return model;
    }
}