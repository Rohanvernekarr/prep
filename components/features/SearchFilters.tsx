'use client';

import { useState, useEffect } from 'react';
import { Search, Barcode, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { getCategories } from '@/lib/api';

interface SearchFiltersProps {
  onSearch: (query: string, type: 'name' | 'barcode') => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  initialQuery?: string;
  initialCategory?: string;
  initialSort?: string;
}

export function SearchFilters({
  onSearch,
  onCategoryChange,
  onSortChange,
  initialQuery = '',
  initialCategory = '',
  initialSort = 'name_asc',
}: SearchFiltersProps) {
  const [query, setQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState<'name' | 'barcode'>('name');
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      setLoadingCategories(true);
      const data = await getCategories();
      const formatted = data.tags
        .filter((t) => t.products > 1000) 
        .sort((a, b) => b.products - a.products)
        .slice(0, 50)
        .map((t) => ({
          id: t.name, 
          name: t.name,
        }));
      setCategories(formatted);
      setLoadingCategories(false);
    }
    fetchCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, searchType);
  };

  return (
    <div className="space-y-4 rounded-xl border border-emerald-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
      <form onSubmit={handleSearch} className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {searchType === 'name' ? <Search size={18} /> : <Barcode size={18} />}
          </div>
          <Input
            type="text"
            placeholder={searchType === 'name' ? "Search products..." : "Enter barcode..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(''); onSearch('', searchType); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="flex gap-2">
            <Select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as 'name' | 'barcode')}
                className="w-[130px]"
            >
                <option value="name">Name</option>
                <option value="barcode">Barcode</option>
            </Select>
            <Button type="submit">Search</Button>
        </div>
      </form>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter size={16} />
          <span>Filters:</span>
        </div>
        
        <Select
          value={initialCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full md:w-[200px]"
          disabled={loadingCategories}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Select>

        <Select
          value={initialSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full md:w-[200px]"
        >
          <option value="name_asc">Name (A-Z)</option>
          <option value="name_desc">Name (Z-A)</option>
          <option value="grade_asc">Nutrition Grade (Best First)</option>
          <option value="grade_desc">Nutrition Grade (Worst First)</option>
        </Select>
      </div>
    </div>
  );
}
