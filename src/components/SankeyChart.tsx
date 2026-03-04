'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { sankey as d3Sankey, sankeyLinkHorizontal, SankeyNode, SankeyLink } from 'd3-sankey';
import { ProductData, SupplyNode, NODE_COLORS } from '@/types';
import { buildSankeyData, SankeyNodeData, SankeyLinkData } from '@/lib/sankey';

type Props = {
  product: ProductData;
  onNodeClick: (node: SupplyNode | null) => void;
};

type SNode = SankeyNode<SankeyNodeData, SankeyLinkData>;
type SLink = SankeyLink<SankeyNodeData, SankeyLinkData>;

export default function SankeyChart({ product, onNodeClick }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const hasDrawnRef = useRef(false);

  // Measure once on mount, then on resize
  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const w = Math.max(rect.width, 300);
      setDimensions({
        width: w,
        height: Math.max(Math.min(w * 0.65, 600), 350),
      });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    const onResize = () => {
      hasDrawnRef.current = false;
      updateDimensions();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [updateDimensions]);

  // Draw chart
  useEffect(() => {
    if (!svgRef.current || !dimensions) return;

    const { width, height } = dimensions;
    const labelWidth = width > 500 ? 220 : 140;
    const margin = { top: 30, right: labelWidth, bottom: 20, left: 10 };

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const data = buildSankeyData(product.name, product.price, product.nodes);

    const sankeyGenerator = d3Sankey<SankeyNodeData, SankeyLinkData>()
      .nodeId((d) => d.id)
      .nodeWidth(24)
      .nodePadding(14)
      .nodeAlign((node) => {
        return (node as SNode & { id: string }).id === 'source' ? 0 : 1;
      })
      .extent([
        [margin.left, margin.top],
        [width - margin.right, height - margin.bottom],
      ]);

    const { nodes, links } = sankeyGenerator({
      nodes: data.nodes.map((d) => ({ ...d })),
      links: data.links.map((d) => ({ ...d })),
    });

    const g = svg.append('g');

    // Links
    g.append('g')
      .attr('fill', 'none')
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('d', sankeyLinkHorizontal())
      .attr('stroke', (d) => {
        const target = d.target as SNode;
        return NODE_COLORS[target.type] || '#888';
      })
      .attr('stroke-opacity', 0.5)
      .attr('stroke-width', (d) => Math.max(1, d.width || 0))
      .style('mix-blend-mode', 'multiply');

    // Nodes
    const nodeGroup = g
      .append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('cursor', (d) => (d.id === 'source' ? 'default' : 'pointer'))
      .on('click', (_event, d) => {
        if (d.id === 'source') return;
        const original = product.nodes.find((n) => n.id === d.id);
        if (original) onNodeClick(original);
      })
      .on('mouseenter', (_event, d) => {
        if (d.id === 'source') return;
        setHoveredNode(d.id);
      })
      .on('mouseleave', () => {
        setHoveredNode(null);
      });

    // Node rectangles - no animation, just show
    nodeGroup
      .append('rect')
      .attr('x', (d) => d.x0 || 0)
      .attr('y', (d) => d.y0 || 0)
      .attr('height', (d) => Math.max(1, (d.y1 || 0) - (d.y0 || 0)))
      .attr('width', (d) => (d.x1 || 0) - (d.x0 || 0))
      .attr('fill', (d) => {
        if (d.id === 'source') return '#EB3322';
        return NODE_COLORS[d.type] || '#888';
      })
      .attr('rx', 6)
      .attr('opacity', 1);

    // Source node label
    nodeGroup
      .filter((d) => d.id === 'source')
      .append('text')
      .attr('x', (d) => ((d.x0 || 0) + (d.x1 || 0)) / 2)
      .attr('y', (d) => (d.y0 || 0) - 10)
      .attr('text-anchor', 'middle')
      .attr('fill', '#EB3322')
      .attr('font-size', '13px')
      .attr('font-family', "'Unbounded', sans-serif")
      .attr('font-weight', '800')
      .text((d) => `¥${d.amount.toLocaleString()}`);

    // Target node labels
    nodeGroup
      .filter((d) => d.id !== 'source')
      .append('text')
      .attr('x', (d) => (d.x1 || 0) + 10)
      .attr('y', (d) => ((d.y0 || 0) + (d.y1 || 0)) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'start')
      .attr('fill', '#1a1a1a')
      .attr('font-size', '12px')
      .attr('font-family', "'Poppins', sans-serif")
      .attr('font-weight', '700')
      .text((d) => {
        const name = d.name.length > 12 ? d.name.slice(0, 12) + '\u2026' : d.name;
        return `${name} ${d.percentage}%`;
      });

    // Amount labels for non-source nodes
    nodeGroup
      .filter((d) => d.id !== 'source')
      .append('text')
      .attr('x', (d) => (d.x1 || 0) + 10)
      .attr('y', (d) => ((d.y0 || 0) + (d.y1 || 0)) / 2 + 16)
      .attr('dy', '0.35em')
      .attr('fill', '#1a1a1a')
      .attr('fill-opacity', 0.55)
      .attr('font-size', '11px')
      .attr('font-family', "'Poppins', sans-serif")
      .attr('font-weight', '500')
      .text((d) => `¥${d.amount.toLocaleString()}`);

    hasDrawnRef.current = true;
  }, [product, dimensions, onNodeClick]);

  // Hover highlight effect
  useEffect(() => {
    if (!svgRef.current || !hasDrawnRef.current) return;
    const svg = d3.select(svgRef.current);

    svg.selectAll<SVGPathElement, SLink>('path')
      .transition()
      .duration(200)
      .attr('stroke-opacity', (d) => {
        if (!hoveredNode) return 0.5;
        const target = d.target as SNode;
        return target.id === hoveredNode ? 0.8 : 0.1;
      });

    svg.selectAll<SVGRectElement, SNode>('rect')
      .transition()
      .duration(200)
      .attr('opacity', (d) => {
        if (!hoveredNode) return 1;
        if (d.id === 'source' || d.id === hoveredNode) return 1;
        return 0.3;
      });
  }, [hoveredNode]);

  const w = dimensions?.width || 800;
  const h = dimensions?.height || 500;

  return (
    <div ref={containerRef} className="w-full">
      <svg
        ref={svgRef}
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        className="w-full h-auto"
      />
    </div>
  );
}
