package com.br.utfpr.edu.bonsaiEcommerceBackend.utils.mappers;

import com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.category.CategoryInputDTO;
import com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.category.CategoryOutputDTO;
import com.br.utfpr.edu.bonsaiEcommerceBackend.entities.CategoryEntity;
import com.br.utfpr.edu.bonsaiEcommerceBackend.models.CategoryModel;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper extends GenericMapper<CategoryModel, CategoryEntity, CategoryInputDTO, CategoryOutputDTO> {
}
