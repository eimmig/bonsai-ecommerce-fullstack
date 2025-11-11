package com.br.utfpr.edu.bonsaiecommercebackend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "carts")
@Data
@EqualsAndHashCode(callSuper = true)
public class CartEntity extends GenericEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @NotNull(message = "Usuário é obrigatório")
    private UserEntity user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<CartItemEntity> items = new ArrayList<>();

    @Column(name = "total_price", nullable = false)
    @NotNull(message = "Preço total é obrigatório")
    private BigDecimal totalPrice = BigDecimal.ZERO;

    /**
     * Adiciona um item ao carrinho ou atualiza a quantidade se já existir
     */
    public void addItem(CartItemEntity item) {
        items.add(item);
        item.setCart(this);
        recalculateTotalPrice();
    }

    /**
     * Remove um item do carrinho
     */
    public void removeItem(CartItemEntity item) {
        items.remove(item);
        item.setCart(null);
        recalculateTotalPrice();
    }

    /**
     * Recalcula o preço total do carrinho
     */
    public void recalculateTotalPrice() {
        this.totalPrice = items.stream()
                .map(CartItemEntity::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    /**
     * Limpa todos os itens do carrinho
     */
    public void clear() {
        items.clear();
        this.totalPrice = BigDecimal.ZERO;
    }
}
