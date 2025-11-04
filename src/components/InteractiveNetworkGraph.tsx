import { memo, useState, useCallback } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  Connection,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { CustomNode } from "./CustomNode";

interface Partner {
  id: string;
  name: string;
  status: "healthy" | "warning" | "alert";
  description: string;
  vulnerabilities?: number;
}

// Initial network data - simplified
const initialPartners: Partner[] = [
  { id: "1", name: "CSSDM", status: "healthy", description: "Organisation centrale" },
  { id: "2", name: "Micrologic", status: "healthy", description: "Fournisseur principal" },
  { id: "3", name: "Veeam", status: "healthy", description: "Sauvegarde" },
  { id: "4", name: "Red Hat", status: "alert", description: "OpenShift", vulnerabilities: 1 },
  { id: "5", name: "Cirrus PaaS", status: "healthy", description: "Platform as a Service" },
  { id: "6", name: "Cloud Connect", status: "healthy", description: "Connectivité cloud" },
];

// Create nodes with simple circular layout
const createInitialNodes = (): Node<Partner>[] => {
  return initialPartners.map((partner, index) => {
    let position = { x: 400, y: 300 };

    if (index === 0) {
      // Center node (CSSDM)
      position = { x: 400, y: 200 };
    } else if (index === 1) {
      // Main supplier
      position = { x: 400, y: 350 };
    } else {
      // Others in a circle around Micrologic
      const angle = ((index - 2) * 2 * Math.PI) / 4;
      const radius = 180;
      position = {
        x: 400 + Math.cos(angle) * radius,
        y: 350 + Math.sin(angle) * radius,
      };
    }

    return {
      id: partner.id,
      type: "custom",
      position,
      data: partner,
    };
  });
};

// Initial edges - simple connections
const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#00766F", strokeWidth: 2 } },
  { id: "e2-3", source: "2", target: "3", style: { stroke: "#00766F", strokeWidth: 1.5 } },
  { id: "e2-4", source: "2", target: "4", style: { stroke: "#ef4444", strokeWidth: 2 }, animated: true },
  { id: "e2-5", source: "2", target: "5", style: { stroke: "#00766F", strokeWidth: 1.5 } },
  { id: "e2-6", source: "2", target: "6", style: { stroke: "#00766F", strokeWidth: 1.5 } },
];

const nodeTypes = {
  custom: CustomNode,
};

const InteractiveNetworkGraph = memo(() => {
  const [nodes, setNodes, onNodesChange] = useNodesState(createInitialNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node<Partner> | null>(null);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        animated: true,
        style: { stroke: "#00766F", strokeWidth: 2 },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node<Partner>) => {
      setSelectedNode(node);
      console.log("Selected node:", node.data.name);
    },
    []
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={2}
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls />
        <MiniMap
          nodeStrokeWidth={3}
          zoomable
          pannable
          className="bg-background border border-border"
        />
      </ReactFlow>

      {/* Node Details Panel - Simple */}
      {selectedNode && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-card border rounded-lg shadow-lg p-4 w-80">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">{selectedNode.data.name}</h3>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {selectedNode.data.description}
          </p>
          <div className="flex items-center justify-between text-sm">
            <span>Statut:</span>
            <span
              className={`font-medium ${selectedNode.data.status === "healthy"
                ? "text-success"
                : selectedNode.data.status === "alert"
                  ? "text-destructive"
                  : "text-warning"
                }`}
            >
              {selectedNode.data.status === "healthy"
                ? "Sécurisé"
                : selectedNode.data.status === "alert"
                  ? "Alerte"
                  : "Attention"}
            </span>
          </div>
          {selectedNode.data.vulnerabilities && (
            <div className="mt-3 p-2 bg-destructive/10 rounded border border-destructive/30 text-sm">
              {selectedNode.data.vulnerabilities} vulnérabilité(s) détectée(s)
            </div>
          )}
        </div>
      )}
    </div>
  );
});

InteractiveNetworkGraph.displayName = "InteractiveNetworkGraph";

export { InteractiveNetworkGraph };