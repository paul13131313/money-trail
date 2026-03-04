'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EstimateForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const priceNum = parseInt(price, 10);
    if (!name.trim()) {
      setError('商品名を入力してください');
      return;
    }
    if (!priceNum || priceNum <= 0) {
      setError('正しい価格を入力してください');
      return;
    }

    setLoading(true);
    router.push(`/product/custom?name=${encodeURIComponent(name.trim())}&price=${priceNum}`);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100">
      <h2
        className="text-sm font-black text-[#EB3322] tracking-widest uppercase mb-3"
        style={{ fontFamily: "var(--font-display), 'Unbounded', sans-serif" }}
      >
        AI ESTIMATE
      </h2>
      <p className="text-xs text-gray-500 mb-3 font-medium">
        好きな商品名と価格を入力すると、AIがコスト内訳を推定します
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="商品名（例: ラーメン1杯）"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#EB3322] focus:ring-1 focus:ring-[#EB3322]/20"
          disabled={loading}
        />
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">&yen;</span>
          <input
            type="number"
            placeholder="価格"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={1}
            className="w-full sm:w-32 pl-8 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#EB3322] focus:ring-1 focus:ring-[#EB3322]/20"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#1a1a1a] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#333] transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              分析中…
            </span>
          ) : '分析する'}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
    </form>
  );
}
