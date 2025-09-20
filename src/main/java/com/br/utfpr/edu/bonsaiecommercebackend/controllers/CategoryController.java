package com.br.utfpr.edu.bonsaiecommercebackend.controllers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.category.CategoryInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.category.CategoryOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.CategoryEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.CategoryModel;
import com.br.utfpr.edu.bonsaiecommercebackend.services.CategoryService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.CategoryMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/categories")
public class CategoryController extends GenericController<CategoryModel, CategoryEntity, CategoryInputDTO, CategoryOutputDTO> {

    public CategoryController(CategoryService service, CategoryMapper mapper) {
        super(service, mapper);
    }
}
