package com.br.utfpr.edu.bonsaiEcommerceBackend.repositories;

import com.br.utfpr.edu.bonsaiEcommerceBackend.entities.AddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AddressRepository extends JpaRepository<AddressEntity, UUID> {
}
