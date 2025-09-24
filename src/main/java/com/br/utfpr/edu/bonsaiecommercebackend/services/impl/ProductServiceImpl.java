package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.ProductEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.ProductModel;
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
        productModel.setCategory(categoryService.findByIdOrThrow(categoryId));
        return super.save(productModel);
    }
}
