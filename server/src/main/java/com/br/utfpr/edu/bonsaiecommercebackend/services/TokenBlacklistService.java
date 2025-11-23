package com.br.utfpr.edu.bonsaiecommercebackend.services;

public interface TokenBlacklistService {
    
    /**
     * Adiciona um token à blacklist
     */
    void invalidateToken(String token);
    
    /**
     * Verifica se um token está na blacklist
     */
    boolean isTokenInvalidated(String token);
    
    /**
     * Remove tokens expirados da blacklist
     */
    void cleanupExpiredTokens();
}
