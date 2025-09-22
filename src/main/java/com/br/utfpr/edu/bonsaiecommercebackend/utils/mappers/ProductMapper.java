package com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.product.ProductInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.product.ProductOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.ProductEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.ProductModel;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

/**
 * Mapper responsável por converter entre ProductModel, ProductEntity, ProductInputDTO e ProductOutputDTO.
 * Utiliza ModelMapper para facilitar o mapeamento automático.
 */
@Component
public class ProductMapper extends GenericMapper<ProductModel, ProductEntity, ProductInputDTO, ProductOutputDTO> {
    
    public ProductMapper(ModelMapper modelMapper) {
        super(modelMapper);
    }
}