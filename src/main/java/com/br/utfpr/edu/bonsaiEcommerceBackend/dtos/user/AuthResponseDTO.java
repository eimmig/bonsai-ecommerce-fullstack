package com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponseDTO {
    private String token;
}
