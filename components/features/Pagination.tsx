import { Button } from '@/components/ui/Button';
import { Loader2 } from 'lucide-react';

interface LoadMoreProps {
  onLoadMore: () => void;
  loading: boolean;
  hasMore: boolean;
}

export function LoadMore({ onLoadMore, loading, hasMore }: LoadMoreProps) {
  if (!hasMore) return null;

  return (
    <div className="flex items-center justify-center py-12">
      <Button
        variant="outline"
        size="lg"
        onClick={onLoadMore}
        disabled={loading}
        className="min-w-[200px] border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 transition-all duration-300 shadow-sm hover:shadow-md"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading more...
          </>
        ) : (
          'Load More Products'
        )}
      </Button>
    </div>
  );
}
