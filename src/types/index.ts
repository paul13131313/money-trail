export type NodeType = 'retail' | 'distribution' | 'manufacturing' | 'material' | 'labor' | 'other';

export type Category = 'product' | 'life' | 'entertainment' | 'dark';

export type SupplyNode = {
  id: string;
  name: string;
  nameEn?: string;
  type: NodeType;
  amount: number;
  percentage: number;
  country?: string;
  description?: string;
};

export type ProductData = {
  id: string;
  name: string;
  price: number;
  category: Category;
  isRealData: boolean;
  dataSource?: string;
  nodes: SupplyNode[];
};

export const CATEGORY_LABELS: Record<Category, string> = {
  product: '商品',
  life: '人生',
  entertainment: 'エンタメ',
  dark: '闇',
};

export const NODE_COLORS: Record<NodeType, string> = {
  retail: '#EB3322',
  distribution: '#FF6B35',
  manufacturing: '#3B82F6',
  material: '#10B981',
  labor: '#FFC737',
  other: '#8B5CF6',
};

// Build a map of node id → unique color for a product's nodes
export function buildNodeColorMap(nodes: SupplyNode[]): Map<string, string> {
  const map = new Map<string, string>();
  nodes.forEach((node, i) => {
    map.set(node.id, CHART_PALETTE[i % CHART_PALETTE.length]);
  });
  return map;
}

// Unique colors for each node position (no duplicates within a chart)
export const CHART_PALETTE = [
  '#EB3322', // red
  '#FF6B35', // orange
  '#3B82F6', // blue
  '#10B981', // emerald
  '#FFC737', // yellow
  '#8B5CF6', // purple
  '#F472B6', // pink
  '#06B6D4', // cyan
  '#84CC16', // lime
  '#F59E0B', // amber
  '#6366F1', // indigo
  '#14B8A6', // teal
];

export const NODE_TYPE_LABELS: Record<NodeType, string> = {
  retail: '小売・ブランド',
  distribution: '流通・輸送',
  manufacturing: '製造',
  material: '素材・原料',
  labor: '労働者賃金',
  other: '税・その他',
};
