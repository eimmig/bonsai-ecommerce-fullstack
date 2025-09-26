package com.br.utfpr.edu.bonsaiecommercebackend.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * DTO para validação de erros.
 * Contém uma lista de mensagens para campos inválidos
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ValidationError {
    private List<String> errors = new ArrayList<>();
}
