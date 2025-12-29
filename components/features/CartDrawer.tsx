'use client';

import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useEffect } from 'react';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, totalItems } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      <div className="relative h-full w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        <div className="flex items-center justify-between border-b border-zinc-100 p-6">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-emerald-600" />
            <h2 className="text-lg font-bold text-zinc-900">Your Cart ({totalItems})</h2>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-zinc-300">
                <ShoppingBag size={32} />
              </div>
              <p className="text-zinc-500 font-medium">Your cart is empty</p>
              <Button onClick={() => setIsOpen(false)} variant="outline">Start Shopping</Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.code} className="flex gap-4">
                 <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-zinc-100 bg-zinc-50 p-2">
                    {item.image_front_url || item.image_url ? (
                        <img 
                            src={item.image_front_url || item.image_url} 
                            alt={item.product_name}
                            className="h-full w-full object-contain mix-blend-multiply"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-zinc-300">
                            <span className="text-xs">No img</span>
                        </div>
                    )}
                 </div>
                 <div className="flex flex-1 flex-col justify-between">
                    <div>
                        <h4 className="font-semibold text-zinc-900 line-clamp-2 text-sm">{item.product_name}</h4>
                        <p className="text-xs text-zinc-500">{item.brands}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 border border-zinc-200 rounded-lg p-1">
                            <button 
                                onClick={() => updateQuantity(item.code, item.cartQuantity - 1)}
                                className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-zinc-100 text-zinc-600"
                            >
                                <Minus size={14} />
                            </button>
                            <span className="text-sm font-medium w-4 text-center">{item.cartQuantity}</span>
                            <button 
                                onClick={() => updateQuantity(item.code, item.cartQuantity + 1)}
                                className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-zinc-100 text-zinc-600"
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                        <button 
                            onClick={() => removeFromCart(item.code)}
                            className="text-zinc-400 hover:text-red-500 transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                 </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-zinc-100 p-6 space-y-4 bg-zinc-50/50">
            <div className="flex justify-between text-sm">
               <span className="text-zinc-500">Subtotal</span>
               <span className="font-medium text-zinc-900">Calculated at checkout</span>
            </div>
            <Button className="w-full h-12 text-base bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200">
                Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
