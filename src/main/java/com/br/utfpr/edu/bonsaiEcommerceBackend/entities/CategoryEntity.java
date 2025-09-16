package com.br.utfpr.edu.bonsaiEcommerceBackend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "category")
@Data
@EqualsAndHashCode(callSuper = true)
public class CategoryEntity extends GenericEntity {

    @Column(nullable = false)
    private String nome;
}
