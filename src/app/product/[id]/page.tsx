'use client';

import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { products } from '@/data/products';
import { ProductData, SupplyNode, NODE_COLORS, NODE_TYPE_LABELS, buildNodeColorMap } from '@/types';
import dynamic from 'next/dynamic';
const SankeyChart = dynamic(() => import('@/components/SankeyChart'), { ssr: false });
import NodeDetail from '@/components/NodeDetail';
import DataBadge from '@/components/DataBadge';

function ProductPageInner() {
  const params = useParams();
  const searchParams = useSearchParams();
  const isCustom = params.id === 'custom';

  const [customProduct, setCustomProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedNode, setSelectedNode] = useState<SupplyNode | null>(null);

  // For custom AI estimation
  useEffect(() => {
    if (!isCustom) return;
    const name = searchParams.get('name');
    const priceStr = searchParams.get('price');
    if (!name || !priceStr) {
      setError('商品名と価格が指定されていません');
      return;
    }
    const price = parseInt(priceStr, 10);
    if (!price || price <= 0) {
      setError('正しい価格を指定してください');
      return;
    }

    setLoading(true);
    setError('');

    fetch('/api/estimate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productName: name, price }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          return;
        }
        setCustomProduct({
          id: 'custom',
          name,
          price,
          category: 'product',
          isRealData: false,
          nodes: data.nodes,
        });
      })
      .catch(() => setError('API呼び出しに失敗しました'))
      .finally(() => setLoading(false));
  }, [isCustom, searchParams]);

  const product = isCustom ? customProduct : products.find((p) => p.id === params.id) || null;
  const nodeColorMap = product ? buildNodeColorMap(product.nodes) : new Map<string, string>();

  // Loading state for custom
  if (isCustom && loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <svg className="animate-spin h-10 w-10 text-[#EB3322] mx-auto" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg font-semibold">AIがコスト内訳を分析中…</p>
          <p className="text-gray-400 text-sm mt-1">数秒お待ちください</p>
        </div>
      </div>
    );
  }

  // Error or not found
  if (isCustom && error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4 text-lg font-semibold">{error}</p>
          <Link href="/" className="bg-[#EB3322] text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-opacity inline-block">
            &larr; トップに戻る
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4 text-lg">商品が見つかりません</p>
          <Link href="/" className="bg-[#EB3322] text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-opacity inline-block">
            &larr; トップに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#EB3322] py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link
            href="/"
            className="bg-white text-[#EB3322] px-4 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
          >
            &larr; BACK
          </Link>
          <span
            className="text-white font-black text-xl"
            style={{ fontFamily: "var(--font-display), 'Unbounded', sans-serif" }}
          >
            MONEY TRAIL
          </span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Product info */}
        <div className="mb-6">
          <h1
            className="text-3xl sm:text-4xl font-black text-[#1a1a1a] mb-2"
            style={{ fontFamily: "var(--font-display), 'Unbounded', sans-serif" }}
          >
            {product.name}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span
              className="text-[#EB3322] text-3xl font-black"
              style={{ fontFamily: "var(--font-display), 'Unbounded', sans-serif" }}
            >
              &yen;{product.price.toLocaleString()}
            </span>
            <DataBadge isRealData={product.isRealData} dataSource={product.dataSource} />
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(Object.keys(NODE_COLORS) as Array<keyof typeof NODE_COLORS>).map((type) => (
            <div key={type} className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1 rounded-full">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: NODE_COLORS[type] }}
              />
              <span className="text-gray-600 text-xs font-semibold">{NODE_TYPE_LABELS[type]}</span>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          {/* Sankey chart */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 overflow-hidden">
            <SankeyChart product={product} onNodeClick={setSelectedNode} />
            <p className="text-gray-400 text-xs mt-2 font-medium text-center">
              ノードをクリックして詳細を表示
            </p>
          </div>

          {/* Detail panel */}
          <div className="lg:sticky lg:top-6 lg:self-start space-y-4">
            {selectedNode ? (
              <NodeDetail
                node={selectedNode}
                productPrice={product.price}
                onClose={() => setSelectedNode(null)}
                nodeColor={selectedNode ? nodeColorMap.get(selectedNode.id) : undefined}
              />
            ) : (
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <div className="text-4xl mb-2">👆</div>
                <p className="text-gray-400 text-sm font-semibold">
                  ノードをクリックすると<br />詳細が表示されます
                </p>
              </div>
            )}

            {/* Quick breakdown */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3
                className="text-xs text-[#EB3322] tracking-widest uppercase mb-3 font-black"
                style={{ fontFamily: "var(--font-display), 'Unbounded', sans-serif" }}
              >
                BREAKDOWN
              </h3>
              <div className="space-y-1">
                {[...product.nodes]
                  .sort((a, b) => b.amount - a.amount)
                  .map((node) => (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className="w-full flex items-center gap-2 text-left hover:bg-gray-50 rounded-xl px-3 py-2 transition-colors"
                    >
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: nodeColorMap.get(node.id) || NODE_COLORS[node.type] }}
                      />
                      <span className="text-xs text-[#1a1a1a] flex-1 truncate font-semibold">
                        {node.name}
                      </span>
                      <span className="text-xs text-gray-400 shrink-0 font-bold">
                        {node.percentage}%
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-[#EB3322]" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    }>
      <ProductPageInner />
    </Suspense>
  );
}
