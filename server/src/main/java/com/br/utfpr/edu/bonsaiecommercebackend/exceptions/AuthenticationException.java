package com.br.utfpr.edu.bonsaiecommercebackend.exceptions;

public class AuthenticationException extends RuntimeException {
    public AuthenticationException(String message) {
        super(message);
    }
}

