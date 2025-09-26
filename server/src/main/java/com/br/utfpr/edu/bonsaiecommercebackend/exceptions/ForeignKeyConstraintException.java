package com.br.utfpr.edu.bonsaiecommercebackend.exceptions;

import lombok.Getter;

/**
 * Exceção lançada quando uma chave estrangeira referenciada não existe.
 * Por exemplo: ao tentar criar um endereço com um usuário inexistente.
 */
@Getter
public class ForeignKeyConstraintException extends RuntimeException {
    private final String entityName;
    private final String fieldName;
    private final Object fieldValue;

    public ForeignKeyConstraintException(String entityName, String fieldName, Object fieldValue, String message) {
        super(message);
        this.entityName = entityName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

}