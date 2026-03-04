import { SupplyNode } from '@/types';

export type SankeyNodeData = {
  id: string;
  name: string;
  type: SupplyNode['type'];
  amount: number;
  percentage: number;
  country?: string;
  description?: string;
};

export type SankeyLinkData = {
  source: string;
  target: string;
  value: number;
};

export function buildSankeyData(productName: string, price: number, nodes: SupplyNode[]) {
  const sankeyNodes: SankeyNodeData[] = [
    {
      id: 'source',
      name: `${productName}`,
      type: 'retail',
      amount: price,
      percentage: 100,
    },
    ...nodes.map((n) => ({
      id: n.id,
      name: n.name,
      type: n.type,
      amount: n.amount,
      percentage: n.percentage,
      country: n.country,
      description: n.description,
    })),
  ];

  const sankeyLinks: SankeyLinkData[] = nodes.map((n) => ({
    source: 'source',
    target: n.id,
    value: n.amount,
  }));

  return { nodes: sankeyNodes, links: sankeyLinks };
}
