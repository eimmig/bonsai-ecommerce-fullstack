package com.br.utfpr.edu.bonsaiecommercebackend.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Collections;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.error.ErrorOutputDTO;

/**
 * Handler global para exceções da API, padronizando respostas de erro e logging.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ValidationError handleValidationErrors(MethodArgumentNotValidException ex) {
        ValidationError validationError = new ValidationError();

        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            validationError.getErrors().add(fieldName + ": " + errorMessage);
        });

        return validationError;
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorOutputDTO> handleAuthenticationException(AuthenticationException ex) {
        logger.warn("Erro de autenticação: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorOutputDTO(ex.getMessage(), null));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorOutputDTO> handleGenericException(Exception ex) {
        logger.error("Erro interno não tratado", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorOutputDTO("Erro interno no servidor", Collections.singletonList(ex.getMessage())));
    }
}
