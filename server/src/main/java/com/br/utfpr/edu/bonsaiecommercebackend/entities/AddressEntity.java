package com.br.utfpr.edu.bonsaiecommercebackend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Entidade JPA que representa um endereço.
 * Pode ser usado como endereço de usuário ou endereço de entrega de pedidos.
 */
@Entity
@Table(name = "addresses")
@Data
@EqualsAndHashCode(callSuper = true, exclude = "user")
public class AddressEntity extends GenericEntity {

    @Column(name = "street", nullable = false)
    @NotBlank(message = "Rua é obrigatória")
    @Size(max = 255, message = "Rua não pode ter mais de 255 caracteres")
    private String street;

    @Column(name = "number")
    @Size(max = 20, message = "Número não pode ter mais de 20 caracteres")
    private String number;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
