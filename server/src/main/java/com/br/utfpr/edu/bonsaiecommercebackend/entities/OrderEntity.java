package com.br.utfpr.edu.bonsaiecommercebackend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @Column(name = "total_price", precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItemsEntity> orderItems = new ArrayList<>();

    public OrderEntity() {
        this.orderDate = LocalDateTime.now();
        this.totalPrice = BigDecimal.ZERO;
    }

    public OrderEntity(UserEntity user) {
        this();
        this.user = user;
    }

    // Métodos helper para gerenciar a relação bidirecional
    public void addItem(OrderItemsEntity item) {
        orderItems.add(item);
        item.setOrder(this);
        calculateTotalPrice();
    }

    public void removeItem(OrderItemsEntity item) {
        orderItems.remove(item);
        item.setOrder(null);
        calculateTotalPrice();
    }

    /**
     * Calcula o preço total do pedido somando o subtotal de cada item
     * (preço do produto * quantidade)
     */
    public void calculateTotalPrice() {
        this.totalPrice = orderItems.stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
