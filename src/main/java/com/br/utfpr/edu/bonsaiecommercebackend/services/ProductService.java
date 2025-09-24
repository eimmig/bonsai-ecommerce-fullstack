package com.br.utfpr.edu.bonsaiecommercebackend.services;

import com.br.utfpr.edu.bonsaiecommercebackend.models.ProductModel;
import lombok.NonNull;

import java.util.UUID;

public interface ProductService extends GenericService<ProductModel> {
    @NonNull ProductModel save(@NonNull ProductModel productModel, @NonNull UUID categoryId);
    @NonNull ProductModel update(@NonNull UUID id, @NonNull ProductModel productModel, @NonNull UUID categoryId);
}
