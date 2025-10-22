package com.br.utfpr.edu.bonsaiecommercebackend.dtos.user;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.address.AddressInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.validators.ValidCpfCnpj;
import com.br.utfpr.edu.bonsaiecommercebackend.validators.ValidPhone;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Past;

import java.time.LocalDate;
import java.util.List;

/**
 * DTO para atualização de perfil de usuário
 */
public record UpdateUserProfileDTO(
        String name,

        @Email(message = "Email deve ter um formato válido")
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
