'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { products } from '@/data/products';
import { SupplyNode, NODE_COLORS, NODE_TYPE_LABELS, buildNodeColorMap } from '@/types';
import SankeyChart from '@/components/SankeyChart';
import NodeDetail from '@/components/NodeDetail';
import DataBadge from '@/components/DataBadge';

export default function ProductPage() {
  const params = useParams();
  const product = products.find((p) => p.id === params.id);
  const [selectedNode, setSelectedNode] = useState<SupplyNode | null>(null);
  const nodeColorMap = product ? buildNodeColorMap(product.nodes) : new Map<string, string>();

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
