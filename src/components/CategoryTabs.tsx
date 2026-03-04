'use client';

import { Category, CATEGORY_LABELS } from '@/types';

type Props = {
  selected: Category | 'all';
  onChange: (cat: Category | 'all') => void;
};

const CATEGORY_ICONS: Record<Category | 'all', string> = {
  all: '🔍',
  product: '🛒',
  life: '🏠',
  entertainment: '🎬',
  dark: '🖤',
};

export default function CategoryTabs({ selected, onChange }: Props) {
  const tabs: (Category | 'all')[] = ['all', 'product', 'life', 'entertainment', 'dark'];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const isActive = selected === tab;
        const label = tab === 'all' ? 'すべて' : CATEGORY_LABELS[tab];
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              isActive
                ? 'bg-[#1a1a1a] text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
            }`}
          >
            {CATEGORY_ICONS[tab]} {label}
          </button>
        );
      })}
    </div>
  );
}
