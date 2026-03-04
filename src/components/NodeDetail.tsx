'use client';

import { SupplyNode, NODE_COLORS, NODE_TYPE_LABELS } from '@/types';

type Props = {
  node: SupplyNode | null;
  productPrice: number;
  onClose: () => void;
};

export default function NodeDetail({ node, productPrice, onClose }: Props) {
  if (!node) return null;

  const color = NODE_COLORS[node.type];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-in">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div
            className="text-xs px-3 py-1 rounded-full inline-block mb-2 font-bold text-white"
            style={{ backgroundColor: color }}
          >
            {NODE_TYPE_LABELS[node.type]}
          </div>
          <h3
            className="text-lg text-[#1a1a1a] font-extrabold"
            style={{ fontFamily: "var(--font-display), 'Unbounded', sans-serif" }}
          >
            {node.name}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-lg hover:bg-gray-200 transition-colors"
        >
          &times;
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span
            className="text-3xl font-black"
            style={{ color, fontFamily: "var(--font-display), 'Unbounded', sans-serif" }}
          >
            &yen;{node.amount.toLocaleString()}
          </span>
          <span className="text-[#1a1a1a]/50 text-sm font-semibold">
            / &yen;{productPrice.toLocaleString()}
          </span>
        </div>

        <div className="w-full bg-[#1a1a1a]/10 rounded-full h-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${node.percentage}%`, backgroundColor: color }}
          />
        </div>
        <div className="text-right text-sm font-bold" style={{ color }}>
          {node.percentage}%
        </div>

        {node.country && (
          <div className="text-sm text-[#1a1a1a]/70 font-medium">
            <span className="text-[#1a1a1a]/40 mr-2 font-bold text-xs">ORIGIN</span>
            {node.country}
          </div>
        )}

        {node.description && (
          <div
            className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-3 border-l-4 font-medium"
            style={{ borderColor: color }}
          >
            {node.description}
          </div>
        )}
      </div>
    </div>
  );
}
