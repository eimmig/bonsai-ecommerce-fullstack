package com.br.utfpr.edu.bonsaiecommercebackend.entities;

import com.br.utfpr.edu.bonsaiecommercebackend.enums.OrderStatus;
import com.br.utfpr.edu.bonsaiecommercebackend.enums.PaymentMethod;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Entidade que representa um pedido
 */
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

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private OrderStatus status;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "delivery_address_id")
    private AddressEntity deliveryAddress;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", length = 20)
    private PaymentMethod paymentMethod;

    @Column(name = "subtotal", precision = 10, scale = 2)
    private BigDecimal subtotal;

    @Column(name = "shipping_cost", precision = 10, scale = 2)
    private BigDecimal shippingCost;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItemsEntity> orderItems = new ArrayList<>();

    public OrderEntity() {
        this.orderDate = LocalDateTime.now();
        this.totalPrice = BigDecimal.ZERO;
        this.subtotal = BigDecimal.ZERO;
        this.shippingCost = BigDecimal.ZERO;
        this.status = OrderStatus.PENDING;
    }

    public OrderEntity(UserEntity user) {
        this();
        this.user = user;
    }

    /**
     * Calcula o total do pedido (subtotal + frete)
     */
    public void calculateTotalPrice() {
        this.totalPrice = this.subtotal.add(this.shippingCost);
    }
}
