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
import { NodeEditPanel } from "./NodeEditPanel";

interface Partner {
  id: string;
  name: string;
  status: "healthy" | "warning" | "alert";
  vulnerabilities?: number;
  description: string;
  lastScan: string;
}

interface InteractiveNetworkGraphProps {
  selectedPartner?: string;
  onNodesChange?: (nodes: Node<Partner>[]) => void;
  onEdgesChange?: (edges: Edge[]) => void;
}

// Network configurations for different partners
const networkConfigs: Record<string, { partners: Partner[], edges: Edge[] }> = {
  "Micrologic": {
    partners: [
      { id: "1", name: "CSSDM", status: "healthy", description: "Organisation centrale", lastScan: "2024-01-15" },
      { id: "2", name: "Micrologic", status: "healthy", description: "Fournisseur principal", lastScan: "2024-01-15" },
      { id: "3", name: "Veeam", status: "healthy", description: "Sauvegarde", lastScan: "2024-01-15" },
      { id: "4", name: "Red Hat", status: "alert", description: "OpenShift", lastScan: "2024-01-15", vulnerabilities: 1 },
      { id: "5", name: "Cirrus BaaS", status: "healthy", description: "Backup as a Service", lastScan: "2024-01-15" },
      { id: "6", name: "Cirrus PaaS", status: "healthy", description: "Platform as a Service", lastScan: "2024-01-15" },
      { id: "7", name: "Cloud Connect", status: "healthy", description: "Connectivité cloud", lastScan: "2024-01-15" },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#00766F", strokeWidth: 2 } },
      { id: "e2-3", source: "2", target: "3", style: { stroke: "#00766F", strokeWidth: 1.5 } },
      { id: "e2-4", source: "2", target: "4", style: { stroke: "#D92026", strokeWidth: 2 }, animated: true },
      { id: "e2-5", source: "2", target: "5", style: { stroke: "#00766F", strokeWidth: 1.5 } },
      { id: "e2-6", source: "2", target: "6", style: { stroke: "#00766F", strokeWidth: 1.5 } },
      { id: "e2-7", source: "2", target: "7", style: { stroke: "#00766F", strokeWidth: 1.5 } },
    ]
  },
  "default": {
    partners: [
      { id: "1", name: "CSSDM", status: "healthy", description: "Organisation centrale", lastScan: "2024-01-15" },
      { id: "2", name: "Partenaire", status: "healthy", description: "Fournisseur", lastScan: "2024-01-15" },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#00766F", strokeWidth: 2 } },
    ]
  }
};

// Create nodes from partners
const createNodes = (partners: Partner[]): Node<Partner>[] => {
  return partners.map((partner, index) => {
    const isCentral = index === 0;
    const isSecondary = index === 1;
    
    let position = { x: 400, y: 300 };
    
    if (isSecondary) {
      position = { x: 400, y: 150 };
    } else if (!isCentral) {
      const angle = ((index - 2) * 2 * Math.PI) / Math.max(1, partners.length - 2);
      const radius = 250;
      position = {
        x: 400 + Math.cos(angle) * radius,
        y: 150 + Math.sin(angle) * radius,
      };
    }
    
    return {
      id: partner.id,
      type: "custom",
      position,
      data: { ...partner, isCentral },
    };
  });
};

const nodeTypes = {
  custom: CustomNode,
};

const InteractiveNetworkGraph = memo(({ selectedPartner = "Micrologic", onNodesChange, onEdgesChange }: InteractiveNetworkGraphProps) => {
  const config = networkConfigs[selectedPartner] || networkConfigs["default"];
  const initialNodes = createNodes(config.partners);
  const initialEdges = config.edges;

  const [nodes, setNodes, onNodesChangeInternal] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChangeInternal] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node<Partner> | null>(null);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdges = addEdge({ ...params, animated: true, style: { stroke: "#00766F", strokeWidth: 2 } }, edges);
      setEdges(newEdges);
      onEdgesChange?.(newEdges);
    },
    [edges, setEdges, onEdgesChange]
  );

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node<Partner>) => {
    setSelectedNode(node);
  }, []);

  const handleNodeUpdate = useCallback((updatedNode: Node<Partner>) => {
    setNodes((nds) => {
      const newNodes = nds.map((n) => (n.id === updatedNode.id ? updatedNode : n));
      onNodesChange?.(newNodes);
      return newNodes;
    });
    setSelectedNode(null);
  }, [setNodes, onNodesChange]);

  const handleNodesChange = useCallback((changes: any) => {
    onNodesChangeInternal(changes);
    onNodesChange?.(nodes);
  }, [onNodesChangeInternal, onNodesChange, nodes]);

  return (
    <>
      <div className="h-[500px] border border-border rounded-lg overflow-hidden bg-background">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={handleNodesChange}
          onEdgesChange={onEdgesChangeInternal}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
          nodesDraggable={true}
          nodesConnectable={true}
          elementsSelectable={true}
          zoomOnScroll={true}
          panOnScroll={false}
          className="bg-background"
        >
          <Background className="bg-background" variant={BackgroundVariant.Dots} />
          <Controls className="bg-card border-border" />
          <MiniMap 
            className="bg-card border-border" 
            nodeColor={(node) => {
              const status = (node.data as Partner).status;
              return status === "alert" ? "#D92026" : "#00766F";
            }} 
          />
        </ReactFlow>
      </div>
      
      {selectedNode && (
        <NodeEditPanel
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          onSave={handleNodeUpdate}
        />
      )}
    </>
  );
});

InteractiveNetworkGraph.displayName = "InteractiveNetworkGraph";

export { InteractiveNetworkGraph };
