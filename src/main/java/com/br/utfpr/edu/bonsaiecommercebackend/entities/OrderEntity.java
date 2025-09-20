package com.br.utfpr.edu.bonsaiEcommerceBackend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
@EqualsAndHashCode(callSuper = true)
public class OrderEntity extends GenericEntity {

    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private UserEntity userId;

}
