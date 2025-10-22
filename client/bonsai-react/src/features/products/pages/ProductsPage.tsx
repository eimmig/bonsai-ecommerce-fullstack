import { useState, useMemo } from 'react';

import { useProducts, useCategories } from '@/hooks/use-products';
import { useAddToCart } from '@/hooks/use-add-to-cart';
import { SEO } from '@/components/seo';
import { ProductGrid, ProductFilters } from '../components';
import type { Product } from '@/types/product.types';
import './ProductsPage.css';

export const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  const { data: productsData, isLoading } = useProducts();
  const { data: categoriesData, isLoading: isLoadingCategories } = useCategories();
  const { handleAddToCart } = useAddToCart();

  const allProducts = productsData?.content || [];
  const categories = categoriesData || [];

  const products = useMemo(() => {
    return allProducts.filter((product: Product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !category || product.category.name === category;
      return matchesSearch && matchesCategory;
    });
  }, [allProducts, searchTerm, category]);

  const seoDescription = category
    ? `Explore nossa seleção de ${category.toLowerCase()} para bonsai. Produtos de qualidade com entrega para todo o Brasil.`
    : 'Confira todos os nossos produtos: bonsais autênticos, ferramentas profissionais, acessórios exclusivos e kits completos.';

  return (
    <div className="products-page">
      <div className="container">
        <SEO
          title="Produtos"
          description={seoDescription}
          keywords={`bonsai, produtos bonsai, ${category.toLowerCase()}, comprar bonsai online, loja bonsai`}
          url="/produtos"
        />

        <h1>
          Todos os <span className="highlight">Bonsais</span>
        </h1>

        <ProductFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          category={category}
          onCategoryChange={setCategory}
          categories={categories}
          isLoadingCategories={isLoadingCategories}
        />

        <p className="products-count">
          {products.length} {products.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
        </p>

        <ProductGrid products={products} isLoading={isLoading} onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
};
