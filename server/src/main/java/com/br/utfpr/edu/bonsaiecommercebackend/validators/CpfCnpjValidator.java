package com.br.utfpr.edu.bonsaiecommercebackend.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

/**
 * Validador para CPF e CNPJ brasileiros
 */
public class CpfCnpjValidator implements ConstraintValidator<ValidCpfCnpj, String> {

    @Override
    public void initialize(ValidCpfCnpj constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isBlank()) {
            return true; // Validação de obrigatoriedade é feita por @NotBlank
        }

        String cleanValue = value.replaceAll("[^0-9]", "");

        if (cleanValue.length() == 11) {
            return isValidCPF(cleanValue);
        } else if (cleanValue.length() == 14) {
            return isValidCNPJ(cleanValue);
        }

        return false;
    }

    /**
     * Valida CPF usando algoritmo oficial
     */
    private boolean isValidCPF(String cpf) {
        // CPF com todos os dígitos iguais é inválido
        if (cpf.matches("(\\d)\\1{10}")) {
            return false;
        }

        try {
            // Calcula primeiro dígito verificador
            int sum = 0;
            for (int i = 0; i < 9; i++) {
                sum += Character.getNumericValue(cpf.charAt(i)) * (10 - i);
            }
            int firstDigit = 11 - (sum % 11);
            if (firstDigit >= 10) firstDigit = 0;

            // Calcula segundo dígito verificador
            sum = 0;
            for (int i = 0; i < 10; i++) {
                sum += Character.getNumericValue(cpf.charAt(i)) * (11 - i);
            }
            int secondDigit = 11 - (sum % 11);
            if (secondDigit >= 10) secondDigit = 0;

            // Verifica se os dígitos verificadores estão corretos
            return Character.getNumericValue(cpf.charAt(9)) == firstDigit &&
                   Character.getNumericValue(cpf.charAt(10)) == secondDigit;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Valida CNPJ usando algoritmo oficial
     */
    private boolean isValidCNPJ(String cnpj) {
        // CNPJ com todos os dígitos iguais é inválido
        if (cnpj.matches("(\\d)\\1{13}")) {
            return false;
        }

        try {
            // Calcula primeiro dígito verificador
            int[] weights1 = {5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
            int sum = 0;
            for (int i = 0; i < 12; i++) {
                sum += Character.getNumericValue(cnpj.charAt(i)) * weights1[i];
            }
            int firstDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);

            // Calcula segundo dígito verificador
            int[] weights2 = {6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
            sum = 0;
            for (int i = 0; i < 13; i++) {
                sum += Character.getNumericValue(cnpj.charAt(i)) * weights2[i];
            }
            int secondDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);

            // Verifica se os dígitos verificadores estão corretos
            return Character.getNumericValue(cnpj.charAt(12)) == firstDigit &&
                   Character.getNumericValue(cnpj.charAt(13)) == secondDigit;
        } catch (Exception e) {
            return false;
        }
    }
}
