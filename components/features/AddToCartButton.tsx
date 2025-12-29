'use client';

import { Button } from '@/components/ui/Button';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/types';
import { useState } from 'react';

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button 
        onClick={handleClick}
        className="w-full h-12 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200"
    >
      <ShoppingBag className="mr-2 h-5 w-5" />
      {added ? 'Added to Cart!' : 'Add to Cart'}
    </Button>
  );
}
