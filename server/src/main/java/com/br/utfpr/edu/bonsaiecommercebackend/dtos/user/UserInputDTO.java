package com.br.utfpr.edu.bonsaiecommercebackend.dtos.user;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.address.AddressInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.validators.ValidCpfCnpj;
import com.br.utfpr.edu.bonsaiecommercebackend.validators.ValidPhone;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/**
 * DTO de entrada para cadastro e atualização de usuários.
 * Contém validações para nome, senha, email e campos opcionais.
 */
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
        String email,

        @ValidCpfCnpj
        String cpfCnpj,

        @ValidPhone
        String phone,

        @Past(message = "Data de nascimento deve estar no passado")
        LocalDate birthDate,

        @Valid
        List<AddressInputDTO> addresses
) {
}