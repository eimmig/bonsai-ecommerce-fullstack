package com.br.utfpr.edu.bonsaiecommercebackend.repositories;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, UUID>, JpaSpecificationExecutor<ProductEntity> {
    
    /**
     * Busca todos os produtos em destaque
     */
    List<ProductEntity> findByFeaturedTrue();
    
    /**
     * Busca produtos por categoria
     */
    List<ProductEntity> findByCategoryName(String categoryName);
}
