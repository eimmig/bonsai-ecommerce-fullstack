package com.br.utfpr.edu.bonsaiecommercebackend.dtos.user;

import lombok.Data;

/**
 * DTO de requisição para autenticação (login).
 * Contém email e senha do usuário.
 */
@Data
public class AuthRequestDTO {
    private String email;
    private String password;
}
