package com.br.utfpr.edu.bonsaiecommercebackend.dtos.user;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * DTO de resposta para autenticação.
 * Retorna o token JWT gerado após login bem-sucedido.
 */
@Data
@AllArgsConstructor
public class AuthResponseDTO {
    private String token;
}
