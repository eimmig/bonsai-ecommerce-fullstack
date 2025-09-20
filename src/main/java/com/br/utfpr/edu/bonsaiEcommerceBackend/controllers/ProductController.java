package com.br.utfpr.edu.bonsaiEcommerceBackend.controllers;

import com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.product.ProductInputDTO;
import com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.product.ProductOutputDTO;
import com.br.utfpr.edu.bonsaiEcommerceBackend.entities.ProductEntity;
import com.br.utfpr.edu.bonsaiEcommerceBackend.models.ProductModel;
import com.br.utfpr.edu.bonsaiEcommerceBackend.services.ProductService;
import com.br.utfpr.edu.bonsaiEcommerceBackend.utils.mappers.ProductMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductController extends GenericController<ProductModel, ProductEntity, ProductInputDTO, ProductOutputDTO> {

    public ProductController(ProductService service, ProductMapper mapper) {
        super(service, mapper);
    }
}
