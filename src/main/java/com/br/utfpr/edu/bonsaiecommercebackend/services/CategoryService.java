package com.br.utfpr.edu.bonsaiecommercebackend.services;

import com.br.utfpr.edu.bonsaiecommercebackend.models.CategoryModel;
import java.util.UUID;

public interface CategoryService extends GenericService<CategoryModel> {
    CategoryModel findByIdOrThrow(UUID id);
}
