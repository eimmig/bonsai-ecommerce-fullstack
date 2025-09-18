package com.br.utfpr.edu.bonsaiEcommerceBackend.models;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserModel extends GenericModel {
    private String name;
    private String password;
    private String email;
}
