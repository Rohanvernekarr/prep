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
    <div className="relative z-10 space-y-4 rounded-3xl border border-zinc-100 bg-white/90 p-5 shadow-xl shadow-zinc-200/50 backdrop-blur-xl transition-all md:sticky md:top-20">
      <form onSubmit={handleSearch} className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1 group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-600 transition-colors">
            {searchType === 'name' ? <Search size={20} /> : <Barcode size={20} />}
          </div>
          <Input
            type="text"
            placeholder={searchType === 'name' ? "Search 2M+ products..." : "Scan or enter barcode..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 border-zinc-200 bg-white/50 pl-10 text-base shadow-sm hover:border-emerald-300 focus-visible:ring-emerald-500 transition-all rounded-xl"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(''); onSearch('', searchType); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="flex gap-2">
            <Select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as 'name' | 'barcode')}
                className="h-12 w-[140px] border-zinc-200 bg-white/50 font-medium rounded-xl hover:border-emerald-300 focus:ring-emerald-500"
            >
                <option value="name">Product Name</option>
                <option value="barcode">Barcode</option>
            </Select>
            <Button type="submit" className="h-12 bg-emerald-600 px-8 text-base font-semibold hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-200">
                Search
            </Button>
        </div>
      </form>

      <div className="flex flex-col gap-3 md:flex-row md:items-center justify-between border-t border-zinc-100 pt-3">
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
          <Filter size={16} className="text-emerald-600" />
          <span>Refine results:</span>
        </div>
        
        <div className="flex flex-col gap-3 sm:flex-row w-full md:w-auto">
            <Select
            value={initialCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="h-10 w-full md:w-[220px] rounded-lg border-zinc-200 bg-white/50 text-sm"
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
            className="h-10 w-full md:w-[220px] rounded-lg border-zinc-200 bg-white/50 text-sm"
            >
            <option value="name_asc">Name (A-Z)</option>
            <option value="name_desc">Name (Z-A)</option>
            <option value="grade_asc">Nutrition Grade (A to E)</option>
            <option value="grade_desc">Nutrition Grade (E to A)</option>
            </Select>
        </div>
      </div>
    </div>
  );
}
