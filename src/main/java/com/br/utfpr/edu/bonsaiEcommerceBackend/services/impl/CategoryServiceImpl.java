package com.br.utfpr.edu.bonsaiEcommerceBackend.services.impl;

import com.br.utfpr.edu.bonsaiEcommerceBackend.entities.CategoryEntity;
import com.br.utfpr.edu.bonsaiEcommerceBackend.models.CategoryModel;
import com.br.utfpr.edu.bonsaiEcommerceBackend.repositories.CategoryRepository;
import com.br.utfpr.edu.bonsaiEcommerceBackend.services.CategoryService;
import com.br.utfpr.edu.bonsaiEcommerceBackend.utils.mappers.CategoryMapper;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl extends GenericServiceImpl<CategoryModel, CategoryEntity>
        implements CategoryService {
    public CategoryServiceImpl(CategoryRepository repository, CategoryMapper mapper) {
        super(repository, mapper);
    }
}
