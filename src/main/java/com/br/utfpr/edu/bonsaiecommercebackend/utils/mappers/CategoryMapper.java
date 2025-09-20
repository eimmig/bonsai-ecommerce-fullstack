package com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.category.CategoryInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.category.CategoryOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.CategoryEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.CategoryModel;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper extends GenericMapper<CategoryModel, CategoryEntity, CategoryInputDTO, CategoryOutputDTO> {
    protected CategoryMapper(ModelMapper modelMapper) {
        super(modelMapper);
    }
}
