package com.br.utfpr.edu.bonsaiecommercebackend.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.UUID;

/**
 * Utilitário para obter informações do usuário autenticado
 */
@Component
public class AuthenticationUtil {

    /**
     * Obtém o ID do usuário autenticado a partir do contexto de segurança
     * @return UUID do usuário autenticado
     * @throws RuntimeException se o usuário não estiver autenticado
     */
    public static UUID getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Usuário não autenticado");
        }
        
        String userId = authentication.getName();
        
        if (userId == null || userId.equals("anonymousUser")) {
            throw new RuntimeException("Usuário não autenticado");
        }
        
        try {
            return UUID.fromString(userId);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("ID de usuário inválido no token");
        }
    }

    /**
     * Verifica se existe um usuário autenticado
     * @return true se houver usuário autenticado
     */
    public static boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null 
            && authentication.isAuthenticated() 
            && !authentication.getName().equals("anonymousUser");
    }
}
