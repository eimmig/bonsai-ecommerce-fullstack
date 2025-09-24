package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.ProductEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.ForeignKeyConstraintException;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.ResourceNotFoundException;
import com.br.utfpr.edu.bonsaiecommercebackend.models.ProductModel;
import com.br.utfpr.edu.bonsaiecommercebackend.models.CategoryModel;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.ProductRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.services.CategoryService;
import com.br.utfpr.edu.bonsaiecommercebackend.services.ProductService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.ProductMapper;

import lombok.NonNull;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ProductServiceImpl extends GenericServiceImpl<ProductModel, ProductEntity>
        implements ProductService {

    private final CategoryService categoryService;

    public ProductServiceImpl(ProductRepository repository, ProductMapper mapper, CategoryService categoryService) {
        super(repository, mapper);
        this.categoryService = categoryService;
    }

    @Override
    public @NonNull ProductModel save(@NonNull ProductModel productModel, @NonNull UUID categoryId) {
        try {
            CategoryModel category = categoryService.findByIdOrThrow(categoryId);
            productModel.setCategory(category);
            
            return super.save(productModel);
        } catch (ResourceNotFoundException e) {
            throw new ForeignKeyConstraintException("Category", "id", categoryId,
                "Não é possível criar produto: categoria não encontrada");
        }
    }

    @Override
    public @NonNull ProductModel update(@NonNull UUID id, @NonNull ProductModel productModel, @NonNull UUID categoryId) {
        try {
            findByIdOrThrow(id);
            CategoryModel category = categoryService.findByIdOrThrow(categoryId);
            productModel.setCategory(category);

            return super.update(id, productModel);
        } catch (ResourceNotFoundException e) {
            throw new ForeignKeyConstraintException("Category", "id", categoryId,
                "Não é possível atualizar produto: categoria não encontrada");
        }
    }

    @Override
    public ProductModel update(UUID id, ProductModel model) throws RuntimeException {
        try {
            findByIdOrThrow(id);

            if (model.getCategory() != null && model.getCategory().getId() != null) {
                CategoryModel category = categoryService.findByIdOrThrow(model.getCategory().getId());
                model.setCategory(category);
            }

            return super.update(id, model);
        } catch (ResourceNotFoundException e) {
            if (e.getMessage().contains("Category")) {
                throw new ForeignKeyConstraintException("Category", "id",
                    model.getCategory() != null ? model.getCategory().getId() : null,
                    "Não é possível atualizar produto: categoria não encontrada");
            }
            throw e;
        }
    }
}
