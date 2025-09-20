package com.br.utfpr.edu.bonsaiecommercebackend.dtos.user;

import lombok.Data;

@Data
public class AuthRequestDTO {
    private String email;
    private String password;
}

