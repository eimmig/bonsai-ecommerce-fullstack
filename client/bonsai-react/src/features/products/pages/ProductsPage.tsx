import { useState, useMemo } from 'react';

import { useProducts, useCategories } from '@/hooks/use-products';
import { useAddToCart } from '@/hooks/use-add-to-cart';
import { useTranslation } from '@/hooks/use-translation';
import { SEO } from '@/components/seo';
import { ProductGrid, ProductFilters } from '../components';
import type { Product } from '@/types/product.types';
import './ProductsPage.css';

export const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const { t } = useTranslation();

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
    ? t('products.seoDescriptionCategory', { category: category.toLowerCase() })
    : t('products.seoDescription');

  return (
    <div className="products-page">
      <div className="container">
        <SEO
          title={t('products.title')}
          description={seoDescription}
          keywords={`bonsai, produtos bonsai, ${category.toLowerCase()}, comprar bonsai online, loja bonsai`}
          url="/produtos"
        />

        <h1>
          {t('products.allBonsais.part1')} <span className="highlight">{t('products.allBonsais.part2')}</span>
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
          {products.length} {t(products.length === 1 ? 'products.productFound' : 'products.productsFound')}
        </p>

        <ProductGrid products={products} isLoading={isLoading} onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
};
