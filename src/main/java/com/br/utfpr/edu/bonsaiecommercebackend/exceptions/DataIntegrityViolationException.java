package com.br.utfpr.edu.bonsaiecommercebackend.exceptions;

import lombok.Getter;

/**
 * Exceção lançada quando há violação de integridade de dados.
 * Por exemplo: tentativa de deletar um usuário que possui endereços.
 */
@Getter
public class DataIntegrityViolationException extends RuntimeException {
    private final String entityName;
    private final String reason;

    public DataIntegrityViolationException(String entityName, String reason, Throwable cause) {
        super(String.format("Violação de integridade na entidade %s: %s", entityName, reason), cause);
        this.entityName = entityName;
        this.reason = reason;
    }

}