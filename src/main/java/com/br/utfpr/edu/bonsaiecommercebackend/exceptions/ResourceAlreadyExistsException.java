package com.br.utfpr.edu.bonsaiecommercebackend.exceptions;

import lombok.Getter;

/**
 * Exceção lançada quando um recurso já existe.
 * Por exemplo: tentativa de criar um usuário com email já existente.
 */
@Getter
public class ResourceAlreadyExistsException extends RuntimeException {
    private final String resourceName;
    private final String fieldName;
    private final Object fieldValue;

    public ResourceAlreadyExistsException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s já existe com %s: %s", resourceName, fieldName, fieldValue));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

}