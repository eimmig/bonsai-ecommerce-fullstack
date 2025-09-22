package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.CategoryEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.ResourceNotFoundException;
import com.br.utfpr.edu.bonsaiecommercebackend.models.CategoryModel;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.CategoryRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.services.CategoryService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.CategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CategoryServiceImpl extends GenericServiceImpl<CategoryModel, CategoryEntity>
        implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        super(categoryRepository, categoryMapper);
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public CategoryModel findByIdOrThrow(UUID id) {
        return categoryRepository.findById(id)
                .map(categoryMapper::toModel)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found for the provided ID."));
    }
}
