package com.br.utfpr.edu.bonsaiecommercebackend.utils;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * Utilitário para cálculos de preços.
 * Centraliza a lógica de cálculo de preços com desconto seguindo o princípio DRY.
 */
@Component
public class PriceCalculator {

    /**
     * Calcula o preço unitário com desconto aplicado
     *
     * @param price Preço base do produto
     * @param discount Percentual de desconto (0-100)
     * @return Preço com desconto aplicado
     */
    public BigDecimal calculateUnitPrice(BigDecimal price, BigDecimal discount) {
        if (price == null) {
            throw new IllegalArgumentException("Preço não pode ser nulo");
        }

        if (discount == null || discount.compareTo(BigDecimal.ZERO) <= 0) {
            return price;
        }

        BigDecimal discountAmount = price
                .multiply(discount)
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);

        return price.subtract(discountAmount);
    }

    /**
     * Calcula o preço total baseado no preço unitário e quantidade
     *
     * @param unitPrice Preço unitário do produto
     * @param quantity Quantidade de itens
     * @return Preço total (unitPrice * quantity)
     */
    public BigDecimal calculateTotalPrice(BigDecimal unitPrice, Integer quantity) {
        if (unitPrice == null) {
            throw new IllegalArgumentException("Preço unitário não pode ser nulo");
        }

        if (quantity == null || quantity <= 0) {
            throw new IllegalArgumentException("Quantidade deve ser maior que zero");
        }

        return unitPrice.multiply(BigDecimal.valueOf(quantity));
    }

    /**
     * Calcula o preço final diretamente do preço base, desconto e quantidade
     *
     * @param price Preço base do produto
     * @param discount Percentual de desconto (0-100)
     * @param quantity Quantidade de itens
     * @return Preço total com desconto aplicado
     */
    public BigDecimal calculateFinalPrice(BigDecimal price, BigDecimal discount, Integer quantity) {
        BigDecimal unitPrice = calculateUnitPrice(price, discount);
        return calculateTotalPrice(unitPrice, quantity);
    }
}

