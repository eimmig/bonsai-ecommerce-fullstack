package com.br.utfpr.edu.bonsaiecommercebackend.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

/**
 * Validador para telefones brasileiros
 * Aceita formatos: (11) 98765-4321, (11) 3456-7890, 11987654321, 1134567890
 */
public class PhoneValidator implements ConstraintValidator<ValidPhone, String> {

    private static final String PHONE_PATTERN = "^\\(?\\d{2}\\)?\\s?9?\\d{4}-?\\d{4}$";

    @Override
    public void initialize(ValidPhone constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isBlank()) {
            return true;
        }

        String cleanValue = value.trim();

        return cleanValue.matches(PHONE_PATTERN);
    }
}
