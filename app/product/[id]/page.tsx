import { getProductByBarcode } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductByBarcode(id);

  if (!product) {
    return (
      <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link href="/">
          <Button>Go Back Home</Button>
        </Link>
      </div>
    );
  }

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
    <div className="container mx-auto px-4 py-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
      <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900">
        <ArrowLeft size={16} />
        Back to Search
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
             {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.product_name}
                  className="h-full w-full object-contain mix-blend-multiply"
                />
             ) : (
                <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-zinc-400">
                  No Image
                </div>
             )}
            <div className={`absolute top-4 right-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white shadow-md ring-4 ring-white ${gradeColors[grade] || gradeColors['?']}`}>
              {grade}
            </div>
          </div>

          <Card className="border-zinc-200">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between border-b border-zinc-100 py-2">
                <span className="font-medium text-zinc-700">Brand</span>
                <span className="text-zinc-500">{product.brands || 'Unknown'}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 py-2">
                <span className="font-medium text-zinc-700">Quantity</span>
                <span className="text-zinc-500">{product.quantity || 'Unknown'}</span>
              </div>
               <div className="flex justify-between border-b border-zinc-100 py-2">
                <span className="font-medium text-zinc-700">Nova Group</span>
                <span className="text-zinc-500">{product.nova_group || '?'}</span>
              </div>
               <div className="flex justify-between py-2">
                <span className="font-medium text-zinc-700">EcoScore</span>
                <span className="text-zinc-500 uppercase">{product.ecoscore_grade || '?'}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">{product.product_name}</h1>
            <p className="mt-2 text-lg text-zinc-500">{product.categories}</p>
          </div>

          <Card className="border-zinc-200">
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-zinc-600">
                {product.ingredients_text || 'Ingredients list not available.'}
              </p>
              {product.labels_tags && product.labels_tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.labels_tags.map((label) => (
                    <span key={label} className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700">
                      <Check size={12} />
                      {label.replace('en:', '').replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-zinc-200">
            <CardHeader>
              <CardTitle>Nutrition Facts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-100">
                      <th className="py-2 text-left font-medium text-zinc-700">Nutrient</th>
                      <th className="py-2 text-right font-medium text-zinc-700">Per 100g</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-100">
                      <td className="py-2 text-zinc-600">Energy</td>
                      <td className="py-2 text-right text-zinc-900">{product.nutriments?.["energy-kcal_100g"] || product.nutriments?.["energy-kcal"] || 0} kcal</td>
                    </tr>
                    <tr className="border-b border-zinc-100">
                      <td className="py-2 text-zinc-600">Fat</td>
                      <td className="py-2 text-right text-zinc-900">{product.nutriments?.fat_100g || 0} g</td>
                    </tr>
                    <tr className="border-b border-zinc-100">
                      <td className="py-2 pl-4 text-zinc-400">Saturated Fat</td>
                      <td className="py-2 text-right text-zinc-400">{product.nutriments?.["saturated-fat_100g"] || 0} g</td>
                    </tr>
                    <tr className="border-b border-zinc-100">
                      <td className="py-2 text-zinc-600">Carbohydrates</td>
                      <td className="py-2 text-right text-zinc-900">{product.nutriments?.carbohydrates_100g || 0} g</td>
                    </tr>
                    <tr className="border-b border-zinc-100">
                      <td className="py-2 pl-4 text-zinc-400">Sugars</td>
                      <td className="py-2 text-right text-zinc-400">{product.nutriments?.sugars_100g || 0} g</td>
                    </tr>
                    <tr className="border-b border-zinc-100">
                      <td className="py-2 text-zinc-600">Proteins</td>
                      <td className="py-2 text-right text-zinc-900">{product.nutriments?.proteins_100g || 0} g</td>
                    </tr>
                    <tr className="border-b border-zinc-100">
                      <td className="py-2 text-zinc-600">Salt</td>
                      <td className="py-2 text-right text-zinc-900">{product.nutriments?.salt_100g || 0} g</td>
                    </tr>
                     <tr>
                      <td className="py-2 text-zinc-600">Fiber</td>
                      <td className="py-2 text-right text-zinc-900">{product.nutriments?.fiber_100g || 0} g</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-zinc-400 flex items-center gap-1">
                <AlertCircle size={12} />
                Values are approximate and based on available data.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
