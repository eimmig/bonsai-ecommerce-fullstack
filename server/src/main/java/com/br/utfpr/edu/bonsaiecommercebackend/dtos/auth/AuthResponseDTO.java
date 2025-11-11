package com.br.utfpr.edu.bonsaiecommercebackend.dtos.auth;

import java.util.UUID;

/**
 * DTO de resposta para autenticação.
 * Retorna o token JWT e informações básicas do usuário após login bem-sucedido.
 */
public record AuthResponseDTO(
        String token,
        UUID userId,
        String email,
        String name
) {
}
