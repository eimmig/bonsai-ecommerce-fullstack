package com.br.utfpr.edu.bonsaiecommercebackend.exceptions;

/**
 * Exceção lançada quando não há estoque suficiente de um produto.
 */
public class InsufficientStockException extends RuntimeException {
    private final Integer availableStock;
    private final Integer requestedQuantity;

    public InsufficientStockException(String message, Integer availableStock, Integer requestedQuantity) {
        super(message);
        this.availableStock = availableStock;
        this.requestedQuantity = requestedQuantity;
    }

    public InsufficientStockException(Integer availableStock) {
        super("Estoque insuficiente. Disponível: " + availableStock);
        this.availableStock = availableStock;
        this.requestedQuantity = null;
    }

    public Integer getAvailableStock() {
        return availableStock;
    }

    public Integer getRequestedQuantity() {
        return requestedQuantity;
    }
}

