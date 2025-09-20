
package com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.product.ProductInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.product.ProductOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.CategoryEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.ProductEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.CategoryModel;
import com.br.utfpr.edu.bonsaiecommercebackend.models.ProductModel;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.CategoryRepository;
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