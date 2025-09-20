package com.br.utfpr.edu.bonsaiecommercebackend.dtos.address;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.util.UUID;

public record AddressInputDTO(
        UUID id,

        @NotNull(message = "ID do usuário é obrigatório")
        Long userId,

        @NotBlank(message = "Logradouro é obrigatório")
        @Size(max = 200, message = "Logradouro deve ter no máximo 200 caracteres")
        String street,

        @Size(max = 100, message = "Complemento deve ter no máximo 100 caracteres")
        String complement,

        @NotBlank(message = "CEP é obrigatório")
        @Pattern(regexp = "\\d{5}-?\\d{3}", message = "CEP deve ter formato válido (12345-678 ou 12345678)")
        String zipCode,

        @NotBlank(message = "Bairro é obrigatório")
        @Size(max = 100, message = "Bairro deve ter no máximo 100 caracteres")
        String neighborhood,

        @NotBlank(message = "Cidade é obrigatória")
        @Size(max = 100, message = "Cidade deve ter no máximo 100 caracteres")
        String city,

        @NotBlank(message = "Estado é obrigatório")
        @Pattern(regexp = "[A-Z]{2}", message = "Estado deve ter 2 letras maiúsculas (ex: SP, RJ)")
        String state,

        @Size(max = 20, message = "Número deve ter no máximo 20 caracteres")
        String number
) {
}