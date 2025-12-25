import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const grade = product.nutrition_grades?.toUpperCase() || '?';
  
  const gradeColors: Record<string, string> = {
    A: 'bg-green-500',
    B: 'bg-lime-500',
    C: 'bg-yellow-500',
    D: 'bg-orange-500',
    E: 'bg-red-500',
    '?': 'bg-gray-400',
  };

  return (
    <Link href={`/product/${product.code}`} className="group block h-full">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-zinc-300 border-zinc-200 bg-white">
        <div className="relative aspect-square overflow-hidden bg-zinc-50 p-6">
          {product.image_front_url || product.image_url ? (
            <img
              src={product.image_front_url || product.image_url}
              alt={product.product_name || 'Product Image'}
              className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-zinc-400">
              No Image
            </div>
          )}
          <div className={`absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm ring-2 ring-white ${gradeColors[grade] || gradeColors['?']}`}>
            {grade}
          </div>
        </div>
        <CardHeader className="p-4 pb-2">
          <h3 className="line-clamp-2 text-base font-semibold text-zinc-900 group-hover:text-zinc-700">
            {product.product_name || 'Unknown Product'}
          </h3>
          <p className="text-sm text-zinc-500 line-clamp-1">
            {product.brands || 'Unknown Brand'}
          </p>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="mt-2 flex flex-wrap gap-1">
             {product.categories_tags?.slice(0, 2).map((tag) => (
                <span key={tag} className="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-600">
                    {tag.replace('en:', '').replace(/-/g, ' ')}
                </span>
             ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
