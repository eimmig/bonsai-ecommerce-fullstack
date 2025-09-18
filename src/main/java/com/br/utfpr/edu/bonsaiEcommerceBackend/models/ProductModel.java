package com.br.utfpr.edu.bonsaiEcommerceBackend.models;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@Data
@EqualsAndHashCode(callSuper = true)
public class ProductModel extends GenericModel {
    private String name;
    private String description;
    private String imageUrl;
    private BigDecimal price;
    private CategoryModel category;
}
