package com.br.utfpr.edu.bonsaiecommercebackend.enums;

/**
 * Métodos de pagamento disponíveis
 */
public enum PaymentMethod {
    /**
     * Cartão de crédito
     */
    CREDIT_CARD,
    
    /**
     * Cartão de débito
     */
    DEBIT_CARD,
    
    /**
     * PIX (pagamento instantâneo)
     */
    PIX,
    
    /**
     * Boleto bancário
     */
    BOLETO
}
