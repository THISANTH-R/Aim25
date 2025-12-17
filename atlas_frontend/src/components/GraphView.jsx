import { useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

export default function GraphView({ data }) {
    const fgRef = useRef();

    useEffect(() => {
        // Zoom to fit on mount
        if (fgRef.current && data.graph_nodes.length > 0) {
            setTimeout(() => {
                fgRef.current.d3Force('charge').strength(-300); // Stronger repulsion
                fgRef.current.d3Force('link').distance(70); // Longer links
                fgRef.current.zoomToFit(400, 50);
            }, 500);
        }
    }, [data]);

    const graphData = {
        nodes: data.graph_nodes.map(n => ({ ...n, val: n.type === 'Company' ? 10 : 5 })), // Reduced visual size
        links: data.graph_edges.map(e => ({ source: e.source, target: e.target, label: e.relation }))
    };

    return (
        <div className="w-full h-[600px] border border-white/10 rounded-xl overflow-hidden relative bg-[#0a0a0a]">
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/50 backdrop-blur rounded-full text-xs text-gray-400 border border-white/10 pointer-events-none">
                Interactive Knowledge Graph &bull; Scroll to Zoom &bull; Drag to Move
            </div>

            <ForceGraph2D
                ref={fgRef}
                width={800}
                height={600}
                graphData={graphData}
                nodeLabel="label"

                // Visual Tweaks
                nodeColor={node => {
                    if (node.type === 'Company') return '#3b82f6'; // Blue
                    if (node.type === 'Person') return '#10b981';  // Green
                    if (node.type === 'Product') return '#f59e0b'; // Amber
                    if (node.type === 'Location') return '#ef4444'; // Red
                    return '#8b5cf6';
                }}
                linkColor={() => '#ffffff20'}
                backgroundColor="#050505"

                // Physics
                nodeRelSize={4} // Much smaller nodes
                linkDirectionalArrowLength={3.5}
                linkDirectionalArrowRelPos={1}

                // Labels
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const label = node.label;
                    const fontSize = 12 / globalScale;
                    ctx.font = `${fontSize}px Sans-Serif`;
                    const textWidth = ctx.measureText(label).width;
                    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

                    // Draw Node Circle
                    ctx.fillStyle = node.type === 'Company' ? '#3b82f6' :
                        node.type === 'Person' ? '#10b981' :
                            node.type === 'Product' ? '#f59e0b' :
                                node.type === 'Location' ? '#ef4444' : '#8b5cf6';

                    ctx.beginPath();
                    ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
                    ctx.fill();

                    // Draw Label
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    ctx.fillText(label, node.x, node.y + 8);
                }}
                nodeCanvasObjectMode={() => 'after'} // Draw after default node rendering (or replace it by returning 'replace')
            />
        </div>
    );
}
