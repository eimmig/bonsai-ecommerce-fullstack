package com.br.utfpr.edu.bonsaiecommercebackend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "addresses")
@Data
@EqualsAndHashCode(callSuper = true)
public class AddressEntity extends GenericEntity {

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "street", nullable = false)
    private String street;

    @Column(name = "complement")
    private String complement;

    @Column(name = "zip_code", nullable = false, length = 10)
    private String zipCode;

    @Column(name = "neighborhood", nullable = false)
    private String neighborhood;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "state", nullable = false, length = 2)
    private String state;

    @Column(name = "number")
    private String number;
}
