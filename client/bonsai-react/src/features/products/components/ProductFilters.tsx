import { Search } from 'lucide-react';
import type { Category } from '@/types/product.types';
import { Select } from '@/components/ui';

interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categories: Category[];
  isLoadingCategories?: boolean;
}

export const ProductFilters = ({
  searchTerm,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  isLoadingCategories = false,
}: ProductFiltersProps) => {
  const safeCategories = Array.isArray(categories) ? categories : [];
  
  const categoryOptions = [
    { value: '', label: 'Todas as categorias' },
    ...safeCategories.map((cat) => ({ value: cat.name, label: cat.name })),
  ];

  return (
    <div className="product-filters">
      <div className="search-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <Select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        options={categoryOptions}
        disabled={isLoadingCategories}
      />
    </div>
  );
};
