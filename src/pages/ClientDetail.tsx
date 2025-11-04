import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReactFlow, { 
  Node, 
  Edge, 
  Controls, 
  Background,
  BackgroundVariant,
  MarkerType
} from "reactflow";
import "reactflow/dist/style.css";

const ClientDetail = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const companies = [
    { id: "micrologic", name: "Micrologic" },
    { id: "zens", name: "Zens Canada Corp." },
    { id: "inso", name: "INSO INC" },
    { id: "coginov", name: "COGINOV inc." },
  ];

  const selectedCompany = companies.find((c) => c.id === clientId);

  // Mock data pour l'arbre de fournisseurs
  const supplierTree = {
    micrologic: [
      {
        name: "Veeam",
        services: ["Cirrus BaaS", "Cloud Connect"],
      },
      {
        name: "Red Hat",
        services: ["Cirrus PaaS", "OpenShift"],
      },
    ],
    zens: [
      {
        name: "Microsoft Azure",
        services: ["Cloud Services", "Active Directory"],
      },
    ],
    inso: [
      {
        name: "AWS",
        services: ["EC2", "S3 Storage"],
      },
    ],
    coginov: [
      {
        name: "Google Cloud",
        services: ["Compute Engine", "Cloud Storage"],
      },
    ],
  };

  const suppliers = supplierTree[clientId as keyof typeof supplierTree] || [];

  // Créer les nœuds et edges pour le graphe
  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = [
      {
        id: "cssdm",
        data: { label: "CSSDM" },
        position: { x: 400, y: 50 },
        style: {
          background: "hsl(var(--primary) / 0.1)",
          border: "2px solid hsl(var(--primary))",
          borderRadius: "50%",
          width: 100,
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "14px",
        },
      },
      {
        id: "client",
        data: { label: selectedCompany?.name || "Client" },
        position: { x: 350, y: 200 },
        style: {
          background: "hsl(var(--secondary) / 0.2)",
          border: "2px solid hsl(var(--secondary))",
          borderRadius: "50%",
          width: 120,
          height: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "600",
          fontSize: "13px",
          padding: "10px",
          textAlign: "center",
        },
      },
    ];

    const edges: Edge[] = [
      {
        id: "cssdm-client",
        source: "cssdm",
        target: "client",
        type: "smoothstep",
        animated: true,
        style: { stroke: "hsl(var(--primary))", strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "hsl(var(--primary))",
        },
      },
    ];

    // Ajouter les fournisseurs
    suppliers.forEach((supplier, index) => {
      const supplierId = `supplier-${index}`;
      const xOffset = (index - (suppliers.length - 1) / 2) * 250;
      
      nodes.push({
        id: supplierId,
        data: { 
          label: (
            <div className="text-center">
              <div className="font-semibold">{supplier.name}</div>
              <div className="text-xs mt-1 opacity-70">
                {supplier.services.join(", ")}
              </div>
            </div>
          )
        },
        position: { x: 400 + xOffset, y: 380 },
        style: {
          background: "hsl(var(--muted))",
          border: "2px solid hsl(var(--border))",
          borderRadius: "12px",
          padding: "16px",
          minWidth: 160,
          fontWeight: "500",
          fontSize: "12px",
        },
      });

      edges.push({
        id: `client-${supplierId}`,
        source: "client",
        target: supplierId,
        type: "smoothstep",
        animated: false,
        style: { stroke: "hsl(var(--muted-foreground) / 0.3)", strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "hsl(var(--muted-foreground) / 0.3)",
        },
      });
    });

    return { nodes, edges };
  }, [selectedCompany, suppliers]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-background">
        <div className="container mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="mr-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">CSSDM</h1>
          </div>

          <Button variant="outline" size="sm">
            <BookOpen className="w-4 h-4 mr-2" />
            Scan quotidien
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-8 py-12">
        <div className="container mx-auto max-w-6xl space-y-8">
          {/* Client Name */}
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              {selectedCompany?.name || "Client"}
            </h2>
            <p className="text-muted-foreground mt-2">
              Arbre des fournisseurs et services
            </p>
          </div>

          {/* Supplier Graph */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-0">
              <div style={{ height: "500px", width: "100%" }}>
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  fitView
                  attributionPosition="bottom-left"
                >
                  <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
                  <Controls />
                </ReactFlow>
              </div>
            </CardContent>
          </Card>

          {/* Scan Quotidien Section */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">Scan quotidien</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border/30">
                  <span className="text-muted-foreground">Dernier scan</span>
                  <span className="font-medium">Aujourd'hui à 08:00</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border/30">
                  <span className="text-muted-foreground">Prochain scan</span>
                  <span className="font-medium">Demain à 08:00</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border/30">
                  <span className="text-muted-foreground">Fréquence</span>
                  <span className="font-medium">Quotidien</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-muted-foreground">Statut</span>
                  <span className="font-medium text-success">Actif</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ClientDetail;
