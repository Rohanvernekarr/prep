'use client';

import Link from 'next/link';
import { Leaf, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function Header() {
  const { setIsOpen, totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">
            <Leaf size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight text-emerald-950">
            NutriExplorer
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="text-emerald-950/60 transition-colors hover:text-emerald-950"
          >
            Home
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex gap-2 items-center justify-center rounded-full p-2 text-emerald-950/60 transition-colors hover:bg-emerald-50 hover:text-emerald-950"
          >Cart
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                {totalItems}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
