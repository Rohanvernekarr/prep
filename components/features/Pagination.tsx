import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number; 
  onPageChange: (page: number) => void;
  loading: boolean;
}

export function Pagination({ currentPage, onPageChange, loading }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 || loading}
      >
        <ChevronLeft size={16} />
      </Button>
      <span className="text-sm font-medium">
        Page {currentPage}
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={loading} 
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}
