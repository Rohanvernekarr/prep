import Link from 'next/link';
import { Leaf, Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">
                <Leaf size={18} />
              </div>
              <span className="text-xl font-bold tracking-tight text-emerald-950">
                NutriExplorer
              </span>
            </Link>
            <p className="text-sm text-zinc-500 max-w-xs">
              Empowering you to make healthier food choices with transparent nutrition data.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold text-zinc-900">Features</h3>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li><Link href="#" className="hover:text-emerald-600">Scan Barcode</Link></li>
              <li><Link href="#" className="hover:text-emerald-600">Search Products</Link></li>
              <li><Link href="#" className="hover:text-emerald-600">Category Filter</Link></li>
              <li><Link href="#" className="hover:text-emerald-600">Nutrition Grade</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-zinc-900">Resources</h3>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li><Link href="https://world.openfoodfacts.org/" target="_blank" className="hover:text-emerald-600">Open Food Facts API</Link></li>
              <li><Link href="#" className="hover:text-emerald-600">Documentation</Link></li>
              <li><Link href="#" className="hover:text-emerald-600">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-emerald-600">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-zinc-900">Connect</h3>
            <div className="flex gap-4 text-zinc-500">
              <Link href="#" className="hover:text-emerald-600 transition-colors">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="hover:text-emerald-600 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-100 pt-8 text-center text-sm text-zinc-400">
          © {new Date().getFullYear()} NutriExplorer. All rights reserved. Data provided by Open Food Facts.
        </div>
      </div>
    </footer>
  );
}
