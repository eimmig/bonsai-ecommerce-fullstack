package com.br.utfpr.edu.bonsaiecommercebackend.validators;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

/**
 * Annotation para validar telefone brasileiro
 */
@Documented
@Constraint(validatedBy = PhoneValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidPhone {
    String message() default "Telefone inválido";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
