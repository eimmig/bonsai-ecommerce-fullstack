package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.InvalidatedTokenEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.InvalidatedTokenRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.services.TokenBlacklistService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.UUID;

@Service
public class TokenBlacklistServiceImpl implements TokenBlacklistService {
    
    private static final Logger logger = LoggerFactory.getLogger(TokenBlacklistServiceImpl.class);
    
    private final InvalidatedTokenRepository invalidatedTokenRepository;
    private final JwtUtil jwtUtil;
    
    public TokenBlacklistServiceImpl(InvalidatedTokenRepository invalidatedTokenRepository, JwtUtil jwtUtil) {
        this.invalidatedTokenRepository = invalidatedTokenRepository;
        this.jwtUtil = jwtUtil;
    }
    
    @Override
    @Transactional
    public void invalidateToken(String token) {
        try {
            UUID userId = jwtUtil.extractUserId(token);
            Date expiration = jwtUtil.extractExpiration(token);
            LocalDateTime expirationDate = expiration.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
            
            InvalidatedTokenEntity invalidatedToken = new InvalidatedTokenEntity(token, userId, expirationDate);
            invalidatedTokenRepository.save(invalidatedToken);
            
            logger.info("Token invalidado com sucesso para o usuário: {}", userId);
        } catch (Exception e) {
            logger.error("Erro ao invalidar token", e);
            throw new IllegalArgumentException("Token inválido");
        }
    }
    
    @Override
    public boolean isTokenInvalidated(String token) {
        return invalidatedTokenRepository.existsByToken(token);
    }
    
    @Override
    @Transactional
    @Scheduled(cron = "0 0 2 * * ?") // Executa diariamente às 2h da manhã
    public void cleanupExpiredTokens() {
        logger.info("Iniciando limpeza de tokens expirados");
        invalidatedTokenRepository.deleteExpiredTokens(LocalDateTime.now());
        logger.info("Limpeza de tokens expirados concluída");
    }
}
