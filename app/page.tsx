'use client';

import { useState, useEffect, useCallback } from 'react';
import { getProducts, searchProducts, getProductsByCategory, getProductByBarcode } from '@/lib/api';
import { Product } from '@/lib/types';
import { SearchFilters } from '@/components/features/SearchFilters';
import { ProductGrid } from '@/components/features/ProductGrid';
import { Pagination } from '@/components/features/Pagination';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'barcode'>('name');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('name_asc');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let data;
      
      if (searchType === 'barcode' && query) {
        const product = await getProductByBarcode(query);
        setProducts(product ? [product] : []);
        setLoading(false);
        return;
      }

      if (query) {
        data = await searchProducts(query, page);
      } else if (category) {
        data = await getProductsByCategory(category, page);
      } else {
        data = await getProducts(page);
      }

      let sortedProducts = [...(data.products || [])];
      
      if (sortBy === 'name_asc') {
        sortedProducts.sort((a, b) => (a.product_name || '').localeCompare(b.product_name || ''));
      } else if (sortBy === 'name_desc') {
        sortedProducts.sort((a, b) => (b.product_name || '').localeCompare(a.product_name || ''));
      } else if (sortBy === 'grade_asc') {
        sortedProducts.sort((a, b) => (a.nutrition_grades || 'z').localeCompare(b.nutrition_grades || 'z'));
      } else if (sortBy === 'grade_desc') {
        sortedProducts.sort((a, b) => (b.nutrition_grades || 'a').localeCompare(a.nutrition_grades || 'a'));
      }

      setProducts(sortedProducts);
    } catch (error) {
      console.error('Failed to fetch data', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [page, query, searchType, category, sortBy]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (newQuery: string, type: 'name' | 'barcode') => {
    setQuery(newQuery);
    setSearchType(type);
    setPage(1);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setQuery(''); 
    setPage(1);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Discover Better Food
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          Explore thousands of food products, check nutrition grades, and make healthier choices with NutriExplorer.
        </p>
      </div>

      <SearchFilters
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        initialQuery={query}
        initialCategory={category}
        initialSort={sortBy}
      />

      <ProductGrid products={products} loading={loading} />

      <Pagination
        currentPage={page}
        totalPages={100}
        onPageChange={setPage}
        loading={loading}
      />
    </div>
  );
}
