package com.br.utfpr.edu.bonsaiEcommerceBackend.models;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class AddressModel extends GenericModel {
    private Long userId;
    private String street;
    private String complement;
    private String zipCode;
    private String neighborhood;
    private String city;
    private String state;
    private String number;
}