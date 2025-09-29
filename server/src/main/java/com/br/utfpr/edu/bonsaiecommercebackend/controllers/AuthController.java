package com.br.utfpr.edu.bonsaiecommercebackend.controllers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.auth.AuthRequestDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.auth.AuthResponseDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.exceptions.AuthenticationException;
import com.br.utfpr.edu.bonsaiecommercebackend.services.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Controller responsável pela autenticação de usuários.
 * Orquestra o fluxo de login e delega a lógica para AuthService.
 */
@RestController
@RequestMapping("/auth")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Realiza o login do usuário.
     * @param request DTO contendo email e senha.
     * @return Token JWT em caso de sucesso ou erro padronizado em caso de falha.
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody @Valid AuthRequestDTO request) {
        try {
            AuthResponseDTO response = authService.authenticate(request);
            return ResponseEntity.ok(response);
        } catch (AuthenticationException ex) {
            logger.warn("Authentication failed: {}", ex.getMessage());
            return ResponseEntity.status(401)
                    .body(null);
        }
    }
}
