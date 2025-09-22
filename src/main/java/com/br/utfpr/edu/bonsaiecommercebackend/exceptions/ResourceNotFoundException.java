package com.br.utfpr.edu.bonsaiecommercebackend.exceptions;

/**
 * Exception thrown when a related resource is not found in the database.
 */
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
