package com.br.utfpr.edu.bonsaiEcommerceBackend.repositories;

import com.br.utfpr.edu.bonsaiEcommerceBackend.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, UUID> {
    Optional<UserEntity> findByEmail(String email);
}
