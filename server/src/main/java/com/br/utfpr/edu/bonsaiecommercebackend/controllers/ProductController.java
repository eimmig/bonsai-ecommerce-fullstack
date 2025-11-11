package com.br.utfpr.edu.bonsaiecommercebackend.controllers;

import com.br.utfpr.edu.bonsaiecommercebackend.dtos.product.ProductInputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.dtos.product.ProductOutputDTO;
import com.br.utfpr.edu.bonsaiecommercebackend.entities.ProductEntity;
import com.br.utfpr.edu.bonsaiecommercebackend.models.ProductModel;
import com.br.utfpr.edu.bonsaiecommercebackend.services.ProductService;
import com.br.utfpr.edu.bonsaiecommercebackend.utils.mappers.ProductMapper;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

/**
 * Controller para operações de produtos
 */
@RestController
@RequestMapping("/api/products")
public class ProductController extends GenericController<ProductModel, ProductEntity, ProductInputDTO, ProductOutputDTO> {

    private final ProductService productService;
    private final ProductMapper productMapper;

    public ProductController(ProductService service, ProductMapper mapper) {
        super(service, mapper);
        this.productService = service;
        this.productMapper = mapper;
    }

    @Override
    @PostMapping
    public ResponseEntity<ProductOutputDTO> create(@Valid @RequestBody ProductInputDTO inputDTO) throws Exception{
        var model = mapper.toModel(inputDTO);
        var savedModel = productService.save(model);
        var outputDTO = mapper.toOutputDTO(savedModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(outputDTO);
    }

    /**
     * Retorna todos os produtos em destaque
     */
    @GetMapping("/featured")
    public ResponseEntity<List<ProductOutputDTO>> getFeaturedProducts() {
        List<ProductModel> products = productService.findFeaturedProducts();
        List<ProductOutputDTO> outputDTOs = productMapper.toOutputDTOList(products);
        return ResponseEntity.ok(outputDTOs);
    }

    /**
     * Retorna produtos por categoria
     */
    @GetMapping("/category/{categoryName}")
    public ResponseEntity<List<ProductOutputDTO>> getProductsByCategory(@PathVariable String categoryName) {
        List<ProductModel> products = productService.findByCategory(categoryName);
        List<ProductOutputDTO> outputDTOs = productMapper.toOutputDTOList(products);
        return ResponseEntity.ok(outputDTOs);
    }

    /**
     * Busca produtos com filtros avançados
     * @param query texto para buscar em nome e descrição
     * @param minPrice preço mínimo
     * @param maxPrice preço máximo
     * @param category categoria
     * @param featured apenas produtos em destaque
     * @param pageable paginação
     */
    @GetMapping("/search")
    public ResponseEntity<Page<ProductOutputDTO>> searchProducts(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Boolean featured,
            Pageable pageable
    ) {
        Page<ProductModel> productPage = productService.search(query, minPrice, maxPrice, category, featured, pageable);
        Page<ProductOutputDTO> outputPage = productPage.map(productMapper::toOutputDTO);
        return ResponseEntity.ok(outputPage);
    }
}
