package com.br.utfpr.edu.bonsaiEcommerceBackend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "category")
@Data
@EqualsAndHashCode(callSuper = true)
public class CategoryEntity extends GenericEntity {

    @Column(name = "name", nullable = false)
    private String name;
}
