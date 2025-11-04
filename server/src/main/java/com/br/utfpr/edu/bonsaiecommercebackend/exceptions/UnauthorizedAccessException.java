package com.br.utfpr.edu.bonsaiecommercebackend.exceptions;

/**
 * Exception lançada quando um usuário tenta acessar um recurso que não lhe pertence
 */
public class UnauthorizedAccessException extends RuntimeException {
    public UnauthorizedAccessException(String message) {
        super(message);
    }
}

