package com.br.utfpr.edu.bonsaiEcommerceBackend.models;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(callSuper = true)
public class OrderModel extends GenericModel{
    private LocalDateTime orderDate;
    private UserModel userId;
}
