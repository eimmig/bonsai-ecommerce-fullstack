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

    @Column(name = "order_date", nullable = false)
    @NotNull(message = "Data do pedido é obrigatória")
    @PastOrPresent(message = "Data do pedido não pode ser futura")
    private LocalDateTime orderDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    @NotNull(message = "Usuário é obrigatório")
    private UserEntity user;

}
