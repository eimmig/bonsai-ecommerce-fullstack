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
import java.util.ArrayList;
import java.util.List;

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

    @ExceptionHandler(UnauthorizedAccessException.class)
    public ResponseEntity<ErrorOutputDTO> handleUnauthorizedAccessException(UnauthorizedAccessException ex) {
        logger.warn("Acesso não autorizado: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new ErrorOutputDTO(ex.getMessage(), null));
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorOutputDTO> handleResourceNotFoundException(ResourceNotFoundException ex) {
        logger.warn("Recurso não encontrado: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorOutputDTO(ex.getMessage(), null));
    }

    @ExceptionHandler(ForeignKeyConstraintException.class)
    public ResponseEntity<ErrorOutputDTO> handleForeignKeyConstraintException(ForeignKeyConstraintException ex) {
        logger.warn("Chave estrangeira inválida: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorOutputDTO(ex.getMessage(), 
                       Collections.singletonList(String.format("Campo %s com valor %s não é válido", 
                                                ex.getFieldName(), ex.getFieldValue()))));
    }

    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<ErrorOutputDTO> handleResourceAlreadyExistsException(ResourceAlreadyExistsException ex) {
        logger.warn("Recurso já existe: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorOutputDTO(ex.getMessage(), 
                       Collections.singletonList(String.format("%s com %s '%s' já existe", 
                                                ex.getResourceName(), ex.getFieldName(), ex.getFieldValue()))));
    }

    @ExceptionHandler(org.springframework.dao.DataIntegrityViolationException.class)
    public ResponseEntity<ErrorOutputDTO> handleDataIntegrityViolationException(
            org.springframework.dao.DataIntegrityViolationException ex) {
        logger.warn("Violação de integridade de dados: {}", ex.getMessage());

        String message = "Erro de integridade de dados";
        String detail = "Operação não pode ser executada";
        
        if (ex.getMessage() != null) {
            if (ex.getMessage().contains("foreign key constraint")) {
                message = "Referência inválida";
                detail = "O registro referenciado não existe";
            } else if (ex.getMessage().contains("unique constraint") || ex.getMessage().contains("duplicate key")) {
                message = "Dados duplicados";
                detail = "Já existe um registro com essas informações";
            } else if (ex.getMessage().contains("not-null constraint")) {
                message = "Campo obrigatório";
                detail = "Todos os campos obrigatórios devem ser preenchidos";
            }
        }
        
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorOutputDTO(message, Collections.singletonList(detail)));
    }

    @ExceptionHandler(jakarta.validation.ConstraintViolationException.class)
    public ResponseEntity<ErrorOutputDTO> handleConstraintViolationException(
            jakarta.validation.ConstraintViolationException ex) {
        logger.warn("Violação de constraint de validação: {}", ex.getMessage());
        
        List<String> errors = new ArrayList<>();
        ex.getConstraintViolations().forEach(violation -> 
            errors.add(violation.getPropertyPath() + ": " + violation.getMessage())
        );
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorOutputDTO("Erro de validação", errors));
    }

    @ExceptionHandler(jakarta.persistence.EntityNotFoundException.class)
    public ResponseEntity<ErrorOutputDTO> handleEntityNotFoundException(
            jakarta.persistence.EntityNotFoundException ex) {
        logger.warn("Entidade não encontrada: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorOutputDTO("Registro não encontrado", 
                       Collections.singletonList(ex.getMessage())));
    }

    @ExceptionHandler(org.springframework.web.servlet.resource.NoResourceFoundException.class)
    public ResponseEntity<ErrorOutputDTO> handleNoResourceFoundException(
            org.springframework.web.servlet.resource.NoResourceFoundException ex) {
        logger.warn("Recurso não encontrado: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorOutputDTO("Endpoint não encontrado",
                       Collections.singletonList("O recurso solicitado não existe: " + ex.getResourcePath())));
    }

    @ExceptionHandler(StackOverflowError.class)
    public ResponseEntity<ErrorOutputDTO> handleStackOverflowError(StackOverflowError ex) {
        logger.error("StackOverflowError detectado - possível referência circular", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorOutputDTO("Erro de processamento",
                       Collections.singletonList("Erro interno: referência circular ou recursão infinita detectada")));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorOutputDTO> handleGenericException(Exception ex) {
        logger.error("Erro interno não tratado", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorOutputDTO("Erro interno no servidor", Collections.singletonList(ex.getMessage())));
    }
}
