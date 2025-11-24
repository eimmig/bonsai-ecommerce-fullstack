package com.br.utfpr.edu.bonsaiecommercebackend.services.impl;

import com.br.utfpr.edu.bonsaiecommercebackend.entities.ProductEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.ProductModel;
import com.br.utfpr.edu.bonsaiecommercebackend.repositories.ProductRepository;
import com.br.utfpr.edu.bonsaiecommercebackend.services.ProductService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.ProductMapper;
import jakarta.persistence.criteria.Predicate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;


@Service
public class ProductServiceImpl extends GenericServiceImpl<ProductModel, ProductEntity>
        implements ProductService {

    private static final Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductServiceImpl(ProductRepository repository, ProductMapper mapper) {
        super(repository, mapper);
        this.productRepository = repository;
        this.productMapper = mapper;
    }

    @Override
    public List<ProductModel> findFeaturedProducts() {
        List<ProductEntity> entities = productRepository.findByFeaturedTrue();
        return productMapper.toModelList(entities);
    }

    @Override
    public List<ProductModel> findByCategory(String categoryName) {
        List<ProductEntity> entities = productRepository.findByCategoryName(categoryName);
        return productMapper.toModelList(entities);
    }

    @Override
    public Page<ProductModel> search(String query, BigDecimal minPrice, BigDecimal maxPrice,
                                     String category, Boolean featured, Pageable pageable) {
        logger.debug("Buscando produtos com filtros - query: {}, categoria: {}, featured: {}", query, category, featured);
        Specification<ProductEntity> spec = (root, criteriaQuery, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (query != null && !query.isBlank()) {
                String likePattern = "%" + query.toLowerCase() + "%";
                Predicate namePredicate = criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("name")), likePattern);
                Predicate descriptionPredicate = criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("description")), likePattern);
                predicates.add(criteriaBuilder.or(namePredicate, descriptionPredicate));
            }

            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
            }

            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            if (category != null && !category.isBlank()) {
                predicates.add(criteriaBuilder.equal(
                    criteriaBuilder.lower(root.get("category").get("name")), 
                    category.toLowerCase()));
            }

            if (featured != null && featured) {
                predicates.add(criteriaBuilder.isTrue(root.get("featured")));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        Page<ProductEntity> entityPage = productRepository.findAll(spec, pageable);
        return entityPage.map(productMapper::toModel);
    }
}
