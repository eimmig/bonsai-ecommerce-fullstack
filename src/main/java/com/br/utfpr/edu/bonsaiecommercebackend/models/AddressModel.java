package com.br.utfpr.edu.bonsaiecommercebackend.models;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class AddressModel extends GenericModel {
    private UserModel user;
    private String street;
    private String complement;
    private String zipCode;
    private String neighborhood;
    private String city;
    private String state;
    private String number;
}