package com.br.utfpr.edu.bonsaiecommercebackend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "addresses")
@Data
@EqualsAndHashCode(callSuper = true)
public class AddressEntity extends GenericEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    @NotNull(message = "Usuário é obrigatório")
    private UserEntity user;

    @Column(name = "street", nullable = false)
    @NotBlank(message = "Rua é obrigatória")
    @Size(max = 255, message = "Rua não pode ter mais de 255 caracteres")
    private String street;

    @Column(name = "complement")
    @Size(max = 255, message = "Complemento não pode ter mais de 255 caracteres")
    private String complement;

    @Column(name = "zip_code", nullable = false, length = 10)
    @NotBlank(message = "CEP é obrigatório")
    @Pattern(regexp = "\\d{5}-?\\d{3}", message = "CEP deve estar no formato 12345-678 ou 12345678")
    private String zipCode;

    @Column(name = "neighborhood", nullable = false)
    @NotBlank(message = "Bairro é obrigatório")
    @Size(max = 100, message = "Bairro não pode ter mais de 100 caracteres")
    private String neighborhood;

    @Column(name = "city", nullable = false)
    @NotBlank(message = "Cidade é obrigatória")
    @Size(max = 100, message = "Cidade não pode ter mais de 100 caracteres")
    private String city;

    @Column(name = "state", nullable = false, length = 2)
    @NotBlank(message = "Estado é obrigatório")
    @Size(min = 2, max = 2, message = "Estado deve ter exatamente 2 caracteres")
    @Pattern(regexp = "[A-Z]{2}", message = "Estado deve conter apenas letras maiúsculas")
    private String state;

    @Column(name = "number")
    @Size(max = 20, message = "Número não pode ter mais de 20 caracteres")
    private String number;
}
