package com.br.utfpr.edu.bonsaiEcommerceBackend.models;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class CategoryModel extends GenericModel {
    private String nome;
}
