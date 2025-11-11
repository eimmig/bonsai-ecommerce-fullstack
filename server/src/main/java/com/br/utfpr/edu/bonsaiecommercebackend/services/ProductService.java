package com.br.utfpr.edu.bonsaiecommercebackend.services;

import com.br.utfpr.edu.bonsaiecommercebackend.models.ProductModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;

public interface ProductService extends GenericService<ProductModel> {
    
    /**
     * Busca todos os produtos em destaque
     */
    List<ProductModel> findFeaturedProducts();
    
    /**
     * Busca produtos por categoria
     */
    List<ProductModel> findByCategory(String categoryName);
    
    /**
     * Busca produtos com filtros avançados
     * @param query texto para buscar em nome e descrição
     * @param minPrice preço mínimo
     * @param maxPrice preço máximo
     * @param category categoria
     * @param featured apenas produtos em destaque
     * @param pageable paginação
     * @return página de produtos
     */
    Page<ProductModel> search(String query, BigDecimal minPrice, BigDecimal maxPrice, 
                             String category, Boolean featured, Pageable pageable);
}
