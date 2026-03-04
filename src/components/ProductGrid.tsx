'use client';

import Link from 'next/link';
import { products } from '@/data/products';
import DataBadge from './DataBadge';

const PRODUCT_ICONS: Record<string, string> = {
  coffee: '\u2615',
  tshirt: '\uD83D\uDC55',
  iphone: '\uD83D\uDCF1',
  sneakers: '\uD83D\uDC5F',
  chocolate: '\uD83C\uDF6B',
  gasoline: '\u26FD',
  water: '\uD83D\uDCA7',
  banana: '\uD83C\uDF4C',
  gyudon: '\uD83C\uDF5A',
  jeans: '\uD83D\uDC56',
};

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {products.map((product, i) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          className="group bg-white border-2 border-gray-100 rounded-2xl p-4 transition-all duration-200 hover:scale-[1.03] hover:shadow-xl hover:border-[#EB3322]/30 shadow-sm bounce-in"
          style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
        >
          <div className="text-4xl mb-2">
            {PRODUCT_ICONS[product.id] || '\uD83D\uDCE6'}
          </div>
          <h3
            className="text-[#1a1a1a] text-sm font-extrabold mb-1 leading-tight"
            style={{ fontFamily: "var(--font-display), 'Unbounded', sans-serif" }}
          >
            {product.name}
          </h3>
          <div className="text-[#EB3322] font-black text-xl mb-2">
            &yen;{product.price.toLocaleString()}
          </div>
          <DataBadge isRealData={product.isRealData} />
        </Link>
      ))}
    </div>
  );
}
