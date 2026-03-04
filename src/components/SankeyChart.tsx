'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { sankey as d3Sankey, sankeyLinkHorizontal, SankeyNode, SankeyLink } from 'd3-sankey';
import { ProductData, SupplyNode, CHART_PALETTE } from '@/types';
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

    // Assign unique colors to each non-source node
    const nodeColorMap = new Map<string, string>();
    const SOURCE_COLOR = '#1a1a1a';
    nodeColorMap.set('source', SOURCE_COLOR);
    const targetNodes = nodes.filter((n) => n.id !== 'source');
    targetNodes.forEach((n, i) => {
      nodeColorMap.set(n.id, CHART_PALETTE[i % CHART_PALETTE.length]);
    });

    // Links - each link uses its target node's color (one continuous color per flow)
    g.append('g')
      .attr('fill', 'none')
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('d', sankeyLinkHorizontal())
      .attr('stroke', (d) => {
        const target = d.target as SNode;
        return nodeColorMap.get(target.id) || '#888';
      })
      .attr('stroke-opacity', 0.85)
      .attr('stroke-width', (d) => Math.max(1, d.width || 0));

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

    // Source node: draw colored segments matching each link's color
    const sourceNode = nodes.find((n) => n.id === 'source');
    if (sourceNode) {
      const sx = sourceNode.x0 || 0;
      const sw = (sourceNode.x1 || 0) - sx;
      const sourceLinks = links.filter((l) => (l.source as SNode).id === 'source');

      sourceLinks.forEach((link, i) => {
        const target = link.target as SNode;
        const color = nodeColorMap.get(target.id) || '#888';
        const y0 = link.y0 || 0;
        const linkW = link.width || 0;
        const halfW = linkW / 2;
        const segY = y0 - halfW;
        const segH = linkW;
        const r = Math.min(5, sw / 2, segH / 2);

        // First segment: rounded top-left, last: rounded bottom-left, middle: flat left
        const isFirst = i === 0;
        const isLast = i === sourceLinks.length - 1;
        const rTL = isFirst ? r : 0;
        const rBL = isLast ? r : 0;

        const path = `M${sx + rTL},${segY} L${sx + sw},${segY} L${sx + sw},${segY + segH} L${sx + rBL},${segY + segH}` +
          (rBL > 0 ? ` Q${sx},${segY + segH} ${sx},${segY + segH - rBL}` : ` L${sx},${segY + segH}`) +
          ` L${sx},${segY + rTL}` +
          (rTL > 0 ? ` Q${sx},${segY} ${sx + rTL},${segY}` : '') +
          ' Z';

        g.append('path')
          .attr('class', 'node-shape source-segment')
          .attr('data-target-id', target.id)
          .attr('d', path)
          .attr('fill', color)
          .attr('opacity', 1);
      });
    }

    // Target node shapes - flat left, rounded right
    nodeGroup
      .filter((d) => d.id !== 'source')
      .append('path')
      .attr('class', 'node-shape')
      .attr('d', (d) => {
        const x = d.x0 || 0;
        const y = d.y0 || 0;
        const w = (d.x1 || 0) - x;
        const h = Math.max(1, (d.y1 || 0) - y);
        const r = Math.min(5, w / 2, h / 2);
        return `M${x},${y} L${x + w - r},${y} Q${x + w},${y} ${x + w},${y + r} L${x + w},${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} L${x},${y + h} Z`;
      })
      .attr('fill', (d) => nodeColorMap.get(d.id) || '#888')
      .attr('opacity', 1);

    // Source node label
    nodeGroup
      .filter((d) => d.id === 'source')
      .append('text')
      .attr('x', (d) => ((d.x0 || 0) + (d.x1 || 0)) / 2)
      .attr('y', (d) => (d.y0 || 0) - 10)
      .attr('text-anchor', 'middle')
      .attr('fill', '#1a1a1a')
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
        if (!hoveredNode) return 1;
        const target = d.target as SNode;
        return target.id === hoveredNode ? 1 : 0.15;
      });

    // Target node shapes
    svg.selectAll<SVGPathElement, SNode>('.node-shape:not(.source-segment)')
      .transition()
      .duration(200)
      .attr('opacity', (d) => {
        if (!hoveredNode) return 1;
        if (d.id === hoveredNode) return 1;
        return 0.3;
      });

    // Source segments - highlight the one matching hovered target
    svg.selectAll('.source-segment').each(function() {
      const el = d3.select(this);
      const targetId = el.attr('data-target-id');
      el.transition()
        .duration(200)
        .attr('opacity', () => {
          if (!hoveredNode) return 1;
          return targetId === hoveredNode ? 1 : 0.3;
        });
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
