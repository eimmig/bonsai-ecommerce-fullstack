package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.CategoryEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.CategoryModel;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.CategoryRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.services.CategoryService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.CategoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl extends GenericServiceImpl<CategoryModel, CategoryEntity>
        implements CategoryService {

    private static final Logger logger = LoggerFactory.getLogger(CategoryServiceImpl.class);

    public CategoryServiceImpl(CategoryRepository repository, CategoryMapper mapper) {
        super(repository, mapper);
    }
}
