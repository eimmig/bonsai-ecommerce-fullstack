package com.br.utfpr.edu.bonsaiecommercebackend.models;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserModel extends GenericModel {
    private String name;
    private String password;
    private String email;
    private String cpfCnpj;
    private String phone;
    private LocalDate birthDate;
    private List<AddressModel> addresses = new ArrayList<>();
}
