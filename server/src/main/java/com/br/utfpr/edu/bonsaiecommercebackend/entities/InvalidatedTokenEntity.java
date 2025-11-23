package com.br.utfpr.edu.bonsaiecommercebackend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Entidade para armazenar tokens invalidados (blacklist)
 */
@Entity
@Table(name = "invalidated_tokens", indexes = {
    @Index(name = "idx_token", columnList = "token"),
    @Index(name = "idx_expiration", columnList = "expiration_date")
})
@Data
@NoArgsConstructor
public class InvalidatedTokenEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(name = "token", nullable = false, unique = true, length = 500)
    private String token;
    
    @Column(name = "user_id", nullable = false)
    private UUID userId;
    
    @Column(name = "invalidated_at", nullable = false)
    private LocalDateTime invalidatedAt;
    
    @Column(name = "expiration_date", nullable = false)
    private LocalDateTime expirationDate;
    
    public InvalidatedTokenEntity(String token, UUID userId, LocalDateTime expirationDate) {
        this.token = token;
        this.userId = userId;
        this.invalidatedAt = LocalDateTime.now();
        this.expirationDate = expirationDate;
    }
}
