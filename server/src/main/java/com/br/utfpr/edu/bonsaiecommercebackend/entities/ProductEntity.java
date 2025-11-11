package com.br.utfpr.edu.bonsaiecommercebackend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Data
@EqualsAndHashCode(callSuper = true)
public class ProductEntity extends GenericEntity {
    
    @Column(name = "name", nullable = false)
    @NotBlank(message = "Nome do produto é obrigatório")
    @Size(max = 255, message = "Nome do produto não pode ter mais de 255 caracteres")
    private String name;

    @Column(name = "description", nullable = false, length = 1000)
    @NotBlank(message = "Descrição do produto é obrigatória")
    @Size(max = 1000, message = "Descrição não pode ter mais de 1000 caracteres")
    private String description;

    @Column(name = "price", nullable = false)
    @NotNull(message = "Preço é obrigatório")
    @DecimalMin(value = "0.01", message = "Preço deve ser maior que zero")
    @Digits(integer = 10, fraction = 2, message = "Preço deve ter no máximo 10 dígitos inteiros e 2 decimais")
    private BigDecimal price;

    @Column(name = "image_url", nullable = false)
    @NotBlank(message = "URL da imagem é obrigatória")
    @Size(max = 500, message = "URL da imagem não pode ter mais de 500 caracteres")
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", referencedColumnName = "id", nullable = false)
    @NotNull(message = "Categoria é obrigatória")
    private CategoryEntity category;

    @Column(name = "discount")
    @DecimalMin(value = "0.0", message = "Desconto não pode ser negativo")
    @DecimalMax(value = "100.0", message = "Desconto não pode ser maior que 100%")
    @Digits(integer = 3, fraction = 2, message = "Desconto deve ter no máximo 3 dígitos inteiros e 2 decimais")
    private BigDecimal discount = BigDecimal.ZERO;

    @Column(name = "stock", nullable = false)
    @NotNull(message = "Estoque é obrigatório")
    @Min(value = 0, message = "Estoque não pode ser negativo")
    private Integer stock = 0;

    @Column(name = "featured", nullable = false)
    @NotNull(message = "Featured é obrigatório")
    private Boolean featured = false;
}
