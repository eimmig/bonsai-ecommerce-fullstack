package com.br.utfpr.edu.bonsaiecommercebackend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
@EqualsAndHashCode(callSuper = true)
public class OrderEntity extends GenericEntity {

    @NotNull(message = "Usuário é obrigatório")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate;


    public OrderEntity() {
        this.orderDate = LocalDateTime.now();
    }

    public OrderEntity(UserEntity user) {
        this();
        this.user = user;
    }

}
