package com.br.utfpr.edu.bonsaiecommercebackend.dtos.auth;

/**
 * DTO de requisição para autenticação (login).
 * Contém email e senha do usuário.
 */
public record AuthRequestDTO(String email, String password) {
}
