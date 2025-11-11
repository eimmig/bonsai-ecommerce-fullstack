package com.br.utfpr.edu.bonsaiecommercebackend.repositories;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.AddressEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AddressRepository extends JpaRepository<AddressEntity, UUID> {

    /**
     * Lista endereços do usuário com paginação
     * @param userId ID do usuário
     * @param pageable Paginação
     * @return Page de endereços
     */
    Page<AddressEntity> findByUserId(UUID userId, Pageable pageable);
}
