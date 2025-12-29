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
    A: 'bg-emerald-500 shadow-emerald-200',
    B: 'bg-lime-500 shadow-lime-200',
    C: 'bg-yellow-400 shadow-yellow-200',
    D: 'bg-orange-400 shadow-orange-200',
    E: 'bg-red-500 shadow-red-200',
    '?': 'bg-zinc-300 shadow-zinc-200',
  };

  return (
    <Link href={`/product/${product.code}`} className="group block h-full">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/50 border-zinc-100 bg-white">
        <div className="relative aspect-square overflow-hidden bg-zinc-50/50 p-8">
          {product.image_front_url || product.image_url ? (
            <img
              src={product.image_front_url || product.image_url}
              alt={product.product_name || 'Product Image'}
              className="h-full w-full object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-zinc-300">
               <span className="text-4xl">📷</span>
               <span className="text-sm font-medium">No Image</span>
            </div>
          )}
          <div className={`absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white shadow-lg ring-2 ring-white/50 backdrop-blur-sm ${gradeColors[grade] || gradeColors['?']}`}>
            {grade}
          </div>
        </div>
        <CardHeader className="p-5 pb-2">
          <h3 className="line-clamp-2 text-lg font-bold tracking-tight text-zinc-900 group-hover:text-emerald-700 transition-colors">
            {product.product_name || 'Unknown Product'}
          </h3>
          <p className="text-sm font-medium text-zinc-500 line-clamp-1">
            {product.brands || 'Unknown Brand'}
          </p>
        </CardHeader>
        <CardContent className="p-5 pt-2">
          <div className="flex flex-wrap gap-2">
             {product.categories_tags?.slice(0, 3).map((tag) => (
                <span key={tag} className="inline-flex items-center rounded-full border border-zinc-100 bg-zinc-50/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-600">
                    {tag.replace('en:', '').split('-').slice(-1)[0]}
                </span>
             ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
