package com.br.utfpr.edu.bonsaiEcommerceBackend.services.impl;

import com.br.utfpr.edu.bonsaiEcommerceBackend.entities.ProductEntity;
import com.br.utfpr.edu.bonsaiEcommerceBackend.models.ProductModel;
import com.br.utfpr.edu.bonsaiEcommerceBackend.repositories.ProductRepository;
import com.br.utfpr.edu.bonsaiEcommerceBackend.services.ProductService;
import com.br.utfpr.edu.bonsaiEcommerceBackend.utils.mappers.ProductMapper;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl extends GenericServiceImpl<ProductModel, ProductEntity>
        implements ProductService {
    public ProductServiceImpl(ProductRepository repository, ProductMapper mapper) {
        super(repository, mapper);
    }
}
