package com.br.utfpr.edu.bonsaiEcommerceBackend.dtos.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.UUID;

public record UserInputDTO(
        UUID id,

        @NotBlank(message = "Nome é obrigatório")
        @Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
        String name,

        @NotBlank(message = "Senha é obrigatória")
        @Size(min = 6, max = 50, message = "Senha deve ter entre 6 e 50 caracteres")
        String password,

        @NotBlank(message = "Email é obrigatório")
        @Email(message = "Email deve ter formato válido")
        @Size(max = 150, message = "Email deve ter no máximo 150 caracteres")
        String email
) {
}