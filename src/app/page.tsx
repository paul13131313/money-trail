'use client';

import { useState } from 'react';
import { Category } from '@/types';
import ProductGrid from '@/components/ProductGrid';
import CategoryTabs from '@/components/CategoryTabs';
import EstimateForm from '@/components/EstimateForm';

export default function Home() {
  const [category, setCategory] = useState<Category | 'all'>('all');

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#EB3322] py-10 px-4 text-center">
        <div className="max-w-5xl mx-auto">
          <h1
            className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-3"
            style={{ fontFamily: "var(--font-display), 'Unbounded', sans-serif" }}
          >
            MONEY TRAIL
          </h1>
          <p className="text-white/80 text-lg sm:text-xl font-semibold">
            あなたが払ったお金は、どこへ消えるのか?
          </p>
        </div>
      </header>

      {/* Product Grid */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        {/* AI Estimate Form */}
        <div className="mb-6">
          <EstimateForm />
        </div>

        {/* Category Tabs */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3">
          <CategoryTabs selected={category} onChange={setCategory} />
        </div>

        <ProductGrid category={category} />
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 px-4 text-center text-sm text-gray-400 font-medium">
        <p>
          データは公開情報および業界レポートに基づいています。AI推定データは参考値です。
        </p>
      </footer>
    </main>
  );
}
