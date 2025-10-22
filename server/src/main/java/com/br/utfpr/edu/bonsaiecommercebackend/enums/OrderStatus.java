package com.br.utfpr.edu.bonsaiecommercebackend.enums;

/**
 * Status possíveis de um pedido
 */
public enum OrderStatus {
    /**
     * Pedido criado, aguardando processamento
     */
    PENDING,
    
    /**
     * Pedido em processamento
     */
    PROCESSING,
    
    /**
     * Pedido enviado para entrega
     */
    SHIPPED,
    
    /**
     * Pedido entregue ao cliente
     */
    DELIVERED,
    
    /**
     * Pedido cancelado
     */
    CANCELLED
}
