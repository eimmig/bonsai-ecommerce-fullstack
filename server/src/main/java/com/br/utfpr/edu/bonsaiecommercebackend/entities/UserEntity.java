package com.br.utfpr.edu.bonsaiecommercebackend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Entidade JPA que representa um usuário do sistema.
 * Contém informações de autenticação e identificação.
 */
@Entity
@Table(name = "users")
@Data
@EqualsAndHashCode(callSuper = true, exclude = "addresses")
public class UserEntity extends GenericEntity {

    @Column(name = "name", nullable = false)
    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 2, max = 255, message = "Nome deve ter entre 2 e 255 caracteres")
    private String name;

    @Column(name = "password", nullable = false)
    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 6, message = "Senha deve ter no mínimo 6 caracteres")
    private String password;

    @Column(name = "email", nullable = false, unique = true)
    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ter um formato válido")
    @Size(max = 255, message = "Email não pode ter mais de 255 caracteres")
    private String email;

    @Column(name = "cpf_cnpj", nullable = false, unique = true)
    @Size(max = 18, message = "CPF/CNPJ não pode ter mais de 18 caracteres")
    private String cpfCnpj;

    @Column(name = "phone")
    @Size(max = 20, message = "Telefone não pode ter mais de 20 caracteres")
    private String phone;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AddressEntity> addresses = new ArrayList<>();
}
