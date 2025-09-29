package com.br.utfpr.edu.bonsaiecommercebackend.controllers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.product.ProductInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.product.ProductOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.ProductEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.ProductModel;
import com.br.utfpr.edu.bonsaiecommercebackend.services.ProductService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.ProductMapper;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductController extends GenericController<ProductModel, ProductEntity, ProductInputDTO, ProductOutputDTO> {

    private final ProductService productService;

    public ProductController(ProductService service, ProductMapper mapper) {
        super(service, mapper);
        this.productService = service;
    }

    @Override
    @PostMapping
    public ResponseEntity<ProductOutputDTO> create(@Valid @RequestBody ProductInputDTO inputDTO) throws Exception{
        var model = mapper.toModel(inputDTO);
        var savedModel = productService.save(model);
        var outputDTO = mapper.toOutputDTO(savedModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(outputDTO);
    }
}
