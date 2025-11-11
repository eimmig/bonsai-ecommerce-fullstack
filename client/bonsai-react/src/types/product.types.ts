export interface Category {
  id: string;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;        
  category: Category;
  imageUrl: string;
  stock: number;           
  featured: boolean;       
  createdAt: string | null;
  updatedAt: string | null;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ProductsResponse {
  content: Product[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
  sort: Sort;
  empty: boolean;
}
