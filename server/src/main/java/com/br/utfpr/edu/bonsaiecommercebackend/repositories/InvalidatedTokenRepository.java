package com.br.utfpr.edu.bonsaiecommercebackend.repositories;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.InvalidatedTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Repository
public interface InvalidatedTokenRepository extends JpaRepository<InvalidatedTokenEntity, UUID> {
    
    boolean existsByToken(String token);
    
    /**
     * Remove tokens expirados da blacklist (limpeza periódica)
     */
    @Modifying
    @Transactional
    @Query("DELETE FROM InvalidatedTokenEntity t WHERE t.expirationDate < :now")
    void deleteExpiredTokens(LocalDateTime now);
}
