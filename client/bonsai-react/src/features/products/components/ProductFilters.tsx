import { Search } from 'lucide-react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { useTranslation } from '@/hooks/use-translation';
import type { Category } from '@/types/product.types';

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
  const { t } = useTranslation();
  const safeCategories = Array.isArray(categories) ? categories : [];
  
  const categoryOptions = [
    { value: '', label: t('products.allCategories') },
    ...safeCategories.map((cat) => ({ value: cat.name, label: cat.name })),
  ];

  return (
    <div className="product-filters">
      <div className="search-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder={t('products.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <FormControl  disabled={isLoadingCategories}>
        <Select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          displayEmpty
          sx={{
            backgroundColor: 'var(--color-background-light)',
            borderRadius: '8px',
            width: 200,
            height: '45px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--color-border)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--primary-color)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--primary-color)',
            },
          }}
        >
          {categoryOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
