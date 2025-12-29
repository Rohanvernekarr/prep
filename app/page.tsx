'use client';

import { useState, useEffect, useCallback } from 'react';
import { getProducts, searchProducts, getProductsByCategory, getProductByBarcode } from '@/lib/api';
import { Product } from '@/lib/types';
import { SearchFilters } from '@/components/features/SearchFilters';
import { ProductGrid } from '@/components/features/ProductGrid';
import { LoadMore } from '@/components/features/Pagination';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'barcode'>('name');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('name_asc');
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async (isLoadMore = false) => {
    setLoading(true);
    try {
      let data;
      
      if (searchType === 'barcode' && query) {
        const product = await getProductByBarcode(query);
        setProducts(product ? [product] : []);
        setHasMore(false);
        setLoading(false);
        return;
      }

      const currentPage = isLoadMore ? page : 1;
      
      if (query) {
        data = await searchProducts(query, currentPage);
      } else if (category) {
        data = await getProductsByCategory(category, currentPage);
      } else {
        data = await getProducts(currentPage);
      }

      let newProducts = data.products || [];
      
      if (sortBy === 'name_asc') {
        newProducts.sort((a, b) => (a.product_name || '').localeCompare(b.product_name || ''));
      } else if (sortBy === 'name_desc') {
        newProducts.sort((a, b) => (b.product_name || '').localeCompare(a.product_name || ''));
      } else if (sortBy === 'grade_asc') {
        newProducts.sort((a, b) => (a.nutrition_grades || 'z').localeCompare(b.nutrition_grades || 'z'));
      } else if (sortBy === 'grade_desc') {
        newProducts.sort((a, b) => (b.nutrition_grades || 'a').localeCompare(a.nutrition_grades || 'a'));
      }

      if (isLoadMore) {
        setProducts(prev => [...prev, ...newProducts]);
      } else {
        setProducts(newProducts);
      }

      setHasMore(newProducts.length > 0 && newProducts.length === 24); // Assuming pageSize is 24
      
    } catch (error) {
      console.error('Failed to fetch data', error);
      if (!isLoadMore) setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [page, query, searchType, category, sortBy]);

   useEffect(() => {
    fetchData(false);
  }, []); 

  useEffect(() => {
    
    setPage(1);
    fetchData(false);
  }, [query, searchType, category, sortBy]);

  useEffect(() => {
    if (page > 1) {
      fetchData(true);
    }
  }, [page]); 

  const handleSearch = (newQuery: string, type: 'name' | 'barcode') => {
    if (query !== newQuery || searchType !== type) {
        setQuery(newQuery);
        setSearchType(type);
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    if (category !== newCategory) {
        setCategory(newCategory);
        setQuery(''); 
    }
  };

  const handleSortChange = (newSort: string) => {
    if (sortBy !== newSort) {
        setSortBy(newSort);
    }
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-3 duration-700">
          Discover Better Food
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
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

      <ProductGrid 
        products={products} 
        loading={loading && page === 1}
      />

      <LoadMore
        onLoadMore={handleLoadMore}
        loading={loading}
        hasMore={hasMore}
      />
    </div>
  );
}
