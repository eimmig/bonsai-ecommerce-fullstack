package com.br.utfpr.edu.bonsaiecommercebackend.dtos.auth;

/**
 * DTO de resposta para autenticação.
 * Retorna o token JWT gerado após login bem-sucedido.
 */
public record AuthResponseDTO(String token) {
}
