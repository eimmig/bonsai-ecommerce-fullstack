package com.br.utfpr.edu.bonsaiEcommerceBackend.controllers;

import com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.category.CategoryInputDTO;
import com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.category.CategoryOutputDTO;
import com.br.utfpr.edu.bonsaiEcommerceBackend.entities.CategoryEntity;
import com.br.utfpr.edu.bonsaiEcommerceBackend.models.CategoryModel;
import com.br.utfpr.edu.bonsaiEcommerceBackend.services.CategoryService;
import com.br.utfpr.edu.bonsaiEcommerceBackend.utils.mappers.CategoryMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/categories")
public class CategoryController extends GenericController<CategoryModel, CategoryEntity, CategoryInputDTO, CategoryOutputDTO> {

    public CategoryController(CategoryService service, CategoryMapper mapper) {
        super(service, mapper);
    }
}
