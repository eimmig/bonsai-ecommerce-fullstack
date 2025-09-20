package com.br.utfpr.edu.bonsaiecommercebackend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "categories")
@Data
@EqualsAndHashCode(callSuper = true)
public class CategoryEntity extends GenericEntity {

    @Column(name = "name", nullable = false)
    private String name;
}
