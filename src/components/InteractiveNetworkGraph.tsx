import { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import { Shield, AlertTriangle, CheckCircle2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CustomNode } from "./CustomNode";

const nodeTypes = {
  custom: CustomNode,
};

interface Partner {
  id: string;
  name: string;
  status: "healthy" | "alert" | "warning";
  vulnerabilities?: number;
  description: string;
  lastScan: string;
}

const initialPartners: Partner[] = [
  {
    id: "cssdm",
    name: "CSSDM",
    status: "healthy",
    description: "Centre principal",
    lastScan: "Il y a 2 heures",
  },
  {
    id: "micrologic",
    name: "Micrologic",
    status: "alert",
    vulnerabilities: 1,
    description: "Fournisseur infrastructure",
    lastScan: "Il y a 1 heure",
  },
  {
    id: "zono",
    name: "Zono Canada",
    status: "healthy",
    description: "Services cloud",
    lastScan: "Il y a 3 jours",
  },
  {
    id: "inso",
    name: "INSO NC",
    status: "healthy",
    description: "Sécurité réseau",
    lastScan: "Il y a 4 heures",
  },
  {
    id: "cognicon",
    name: "COGNICON",
    status: "healthy",
    description: "Solutions logicielles",
    lastScan: "Il y a 2 jours",
  },
];

const initialNodes: Node[] = initialPartners.map((partner, index) => {
  const angle = index === 0 ? 0 : ((index - 1) * (360 / (initialPartners.length - 1))) * (Math.PI / 180);
  const radius = index === 0 ? 0 : 250;
  const x = index === 0 ? 400 : 400 + Math.cos(angle) * radius;
  const y = index === 0 ? 300 : 300 + Math.sin(angle) * radius;

  return {
    id: partner.id,
    type: "custom",
    position: { x, y },
    data: partner,
  };
});

const initialEdges: Edge[] = initialPartners
  .slice(1)
  .map((partner) => ({
    id: `e-cssdm-${partner.id}`,
    source: "cssdm",
    target: partner.id,
    animated: partner.status === "alert",
    style: {
      stroke: partner.status === "alert" ? "hsl(var(--destructive))" : "hsl(var(--primary))",
      strokeWidth: 2,
    },
    type: "smoothstep",
  }));

export const InteractiveNetworkGraph = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Partner | null>(null);

  const onConnect = useCallback(
    (params: Connection) => {
      const edge = {
        ...params,
        animated: true,
        style: { stroke: "hsl(var(--primary))", strokeWidth: 2 },
        type: "smoothstep",
      };
      setEdges((eds) => addEdge(edge, eds));
      toast.success("Connexion créée entre les partenaires");
    },
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node.data as Partner);
  }, []);

  const addNewNode = useCallback(() => {
    const newId = `partner-${Date.now()}`;
    const newNode: Node = {
      id: newId,
      type: "custom",
      position: { x: Math.random() * 500 + 200, y: Math.random() * 400 + 100 },
      data: {
        id: newId,
        name: `Nouveau Partenaire ${nodes.length}`,
        status: "healthy",
        description: "Nouveau partenaire ajouté",
        lastScan: "Jamais",
      } as Partner,
    };
    setNodes((nds) => nds.concat(newNode));
    toast.success("Nouveau partenaire ajouté au réseau");
  }, [nodes.length, setNodes]);

  const deleteSelectedNode = useCallback(() => {
    if (selectedNode && selectedNode.id !== "cssdm") {
      setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
      setEdges((eds) => eds.filter((e) => e.source !== selectedNode.id && e.target !== selectedNode.id));
      setSelectedNode(null);
      toast.success("Partenaire supprimé du réseau");
    } else if (selectedNode?.id === "cssdm") {
      toast.error("Impossible de supprimer le nœud central");
    }
  }, [selectedNode, setNodes, setEdges]);

  return (
    <Card className="p-4 md:p-6 border-glow animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-2">Réseau de partenaires interactif</h2>
          <p className="text-sm text-muted-foreground">
            Pan • Zoom • Déplacer les nœuds • Créer des connexions
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-success/10 border border-success/30 rounded-lg">
          <CheckCircle2 className="w-4 h-4 text-success" />
          <span className="text-xs font-medium text-success">{nodes.length} partenaires actifs</span>
        </div>
      </div>

      <div className="h-[500px] md:h-[600px] rounded-xl border-2 border-border overflow-hidden bg-secondary/20">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
          defaultEdgeOptions={{
            type: "smoothstep",
            animated: false,
            style: { strokeWidth: 2 },
          }}
        >
          <Controls className="!bg-card !border-border" />
          <MiniMap
            className="!bg-card !border-border"
            nodeColor={(node) => {
              const partner = node.data as Partner;
              return partner.status === "alert" ? "hsl(var(--destructive))" : "hsl(var(--primary))";
            }}
          />
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="hsl(var(--primary))" />
          
          <Panel position="top-right" className="flex gap-2">
            <Button onClick={addNewNode} size="sm" className="bg-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-1" />
              Ajouter
            </Button>
            {selectedNode && selectedNode.id !== "cssdm" && (
              <Button onClick={deleteSelectedNode} size="sm" variant="destructive">
                Supprimer
              </Button>
            )}
          </Panel>
        </ReactFlow>
      </div>

      {/* Selected Node Details */}
      {selectedNode && (
        <Card className="mt-4 p-4 bg-card/50 backdrop-blur-sm border-primary/50 animate-scale-in">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedNode.status === "alert" ? "bg-destructive/20" : "bg-success/20"
                }`}
              >
                {selectedNode.id === "cssdm" ? (
                  <Shield className="w-6 h-6 text-primary" />
                ) : selectedNode.status === "alert" ? (
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-success" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg">{selectedNode.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedNode.description}</p>
              </div>
            </div>
            <Badge variant={selectedNode.status === "alert" ? "destructive" : "default"}>
              {selectedNode.status === "alert" ? "Alerte" : "Sécurisé"}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Dernier scan</p>
              <p className="font-medium">{selectedNode.lastScan}</p>
            </div>
            {selectedNode.vulnerabilities && (
              <div>
                <p className="text-muted-foreground text-xs">Vulnérabilités</p>
                <p className="font-medium text-destructive">{selectedNode.vulnerabilities} critique(s)</p>
              </div>
            )}
          </div>

          <div className="mt-3 p-3 bg-accent/10 rounded-lg border border-accent/30">
            <p className="text-xs text-muted-foreground">
              💡 <strong>Astuce:</strong> Glissez les nœuds pour les repositionner • Cliquez et glissez entre les nœuds
              pour créer des connexions • Utilisez la molette pour zoomer
            </p>
          </div>
        </Card>
      )}
    </Card>
  );
};
