import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, BookOpen, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ClientDetail = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const companies = [
    { id: "micrologic", name: "Micrologic" },
    { id: "zens", name: "Zens Canada Corp." },
    { id: "inso", name: "INSO INC" },
    { id: "coginov", name: "COGINOV inc." },
  ];

  const selectedCompany = companies.find((c) => c.id === clientId);

  // Mock data pour l'arbre de fournisseurs
  const supplierTree = {
    micrologic: {
      suppliers: [
        {
          name: "Veeam",
          services: ["Cirrus BaaS", "Cloud Connect"],
          hasAlert: false,
          subSuppliers: [
            { name: "Azure Storage", services: ["Backup Storage"] },
          ]
        },
        {
          name: "Red Hat",
          services: ["Cirrus PaaS", "OpenShift"],
          hasAlert: true,
          subSuppliers: [
            { name: "IBM Cloud", services: ["Infrastructure"] },
          ]
        },
        {
          name: "VMware",
          services: ["vSphere", "ESXi"],
          hasAlert: false,
          subSuppliers: []
        },
      ]
    },
    zens: {
      suppliers: [
        {
          name: "Microsoft Azure",
          services: ["Cloud Services", "Active Directory"],
          hasAlert: false,
          subSuppliers: [
            { name: "Microsoft 365", services: ["Email", "Teams"] },
            { name: "Azure AD", services: ["Identity"] },
          ]
        },
        {
          name: "Cisco",
          services: ["Network Security", "Firewall"],
          hasAlert: false,
          subSuppliers: []
        },
      ]
    },
    inso: {
      suppliers: [
        {
          name: "AWS",
          services: ["EC2", "S3 Storage"],
          hasAlert: false,
          subSuppliers: [
            { name: "CloudFront", services: ["CDN"] },
            { name: "RDS", services: ["Database"] },
          ]
        },
        {
          name: "MongoDB Atlas",
          services: ["Database", "Analytics"],
          hasAlert: true,
          subSuppliers: []
        },
        {
          name: "Datadog",
          services: ["Monitoring", "Logs"],
          hasAlert: false,
          subSuppliers: []
        },
      ]
    },
    coginov: {
      suppliers: [
        {
          name: "Google Cloud",
          services: ["Compute Engine", "Cloud Storage"],
          hasAlert: false,
          subSuppliers: [
            { name: "BigQuery", services: ["Analytics"] },
            { name: "Cloud Functions", services: ["Serverless"] },
          ]
        },
        {
          name: "Salesforce",
          services: ["CRM", "Marketing Cloud"],
          hasAlert: false,
          subSuppliers: []
        },
        {
          name: "Auth0",
          services: ["Authentication", "Identity"],
          hasAlert: true,
          subSuppliers: []
        },
      ]
    },
  };

  const clientData = supplierTree[clientId as keyof typeof supplierTree];
  const suppliers = clientData?.suppliers || [];

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

          <div className="flex gap-3">
            <Button 
              variant={showAlert ? "destructive" : "outline"} 
              size="sm"
              onClick={() => setShowAlert(!showAlert)}
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              {showAlert ? "Alerte active" : "Simuler alerte"}
            </Button>
            <Button variant="outline" size="sm">
              <BookOpen className="w-4 h-4 mr-2" />
              Scan quotidien
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-8 py-12">
        <div className="container mx-auto max-w-7xl space-y-8">
          {/* Client Name */}
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              {selectedCompany?.name || "Client"}
            </h2>
            <p className="text-muted-foreground mt-2">
              Arbre des fournisseurs et services
            </p>
          </div>

          {/* Grid layout for Tree and Scan Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Supplier Tree SVG */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 md:col-span-2">
              <CardContent className="p-12 relative">
                {showAlert && suppliers.some(s => s.hasAlert) && (
                  <div className="absolute top-4 right-4 animate-fade-in">
                    <Badge variant="destructive" className="text-sm">
                      Vulnérabilité détectée
                    </Badge>
                  </div>
                )}
                <svg width="100%" height="700" viewBox="0 0 900 700" className="overflow-visible">
                  {/* CSSDM Node */}
                  <circle cx="450" cy="60" r="45" fill="transparent" stroke="hsl(var(--primary))" strokeWidth="2" />
                  <text x="450" y="65" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="16" fontWeight="600">
                    CSSDM
                  </text>

                  {/* Line from CSSDM to Client */}
                  <line x1="450" y1="105" x2="450" y2="180" stroke="hsl(var(--primary))" strokeWidth="2" />

                  {/* Client Node */}
                  <circle cx="450" cy="230" r="55" fill="transparent" stroke="hsl(var(--primary))" strokeWidth="2.5" />
                  <text x="450" y="235" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="17" fontWeight="600">
                    {selectedCompany?.name}
                  </text>

                  {/* Suppliers */}
                  {suppliers.map((supplier, index) => {
                    const totalSuppliers = suppliers.length;
                    const spacing = 240;
                    const startX = 450 - ((totalSuppliers - 1) * spacing) / 2;
                    const supplierX = startX + index * spacing;
                    const supplierY = 420;
                    const isAlert = showAlert && supplier.hasAlert;
                    
                    return (
                      <g key={supplier.name}>
                        {/* Line from Client to Supplier */}
                        <line 
                          x1="450" 
                          y1="285" 
                          x2={supplierX} 
                          y2={supplierY - 50} 
                          stroke={isAlert ? "hsl(var(--destructive))" : "hsl(var(--border))"} 
                          strokeWidth={isAlert ? "2.5" : "2"}
                          className={isAlert ? "animate-pulse" : ""}
                        />
                        
                        {/* Supplier Node */}
                        <circle 
                          cx={supplierX} 
                          cy={supplierY} 
                          r="48" 
                          fill={isAlert ? "hsl(var(--destructive) / 0.1)" : "transparent"} 
                          stroke={isAlert ? "hsl(var(--destructive))" : "hsl(var(--border))"} 
                          strokeWidth={isAlert ? "2.5" : "2"}
                          className={isAlert ? "animate-pulse" : ""}
                        />
                        <text 
                          x={supplierX} 
                          y={supplierY + 5} 
                          textAnchor="middle" 
                          fill={isAlert ? "hsl(var(--destructive))" : "hsl(var(--foreground))"} 
                          fontSize="15" 
                          fontWeight="600"
                        >
                          {supplier.name}
                        </text>
                        
                        {/* Services text */}
                        <text x={supplierX} y={supplierY + 70} textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11">
                          {supplier.services[0]}
                        </text>
                        {supplier.services[1] && (
                          <text x={supplierX} y={supplierY + 85} textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11">
                            {supplier.services[1]}
                          </text>
                        )}

                        {/* Sub-suppliers */}
                        {supplier.subSuppliers.map((subSupplier, subIndex) => {
                          const subSpacing = 100;
                          const subsCount = supplier.subSuppliers.length;
                          const subStartX = supplierX - ((subsCount - 1) * subSpacing) / 2;
                          const subX = subStartX + subIndex * subSpacing;
                          const subY = 600;
                          
                          return (
                            <g key={subSupplier.name}>
                              {/* Line to sub-supplier */}
                              <line 
                                x1={supplierX} 
                                y1={supplierY + 48} 
                                x2={subX} 
                                y2={subY - 30} 
                                stroke="hsl(var(--border) / 0.5)" 
                                strokeWidth="1.5"
                                strokeDasharray="4,4"
                              />
                              
                              {/* Sub-supplier Node */}
                              <circle 
                                cx={subX} 
                                cy={subY} 
                                r="30" 
                                fill="transparent" 
                                stroke="hsl(var(--border) / 0.6)" 
                                strokeWidth="1.5"
                              />
                              <text 
                                x={subX} 
                                y={subY + 4} 
                                textAnchor="middle" 
                                fill="hsl(var(--muted-foreground))" 
                                fontSize="11" 
                                fontWeight="500"
                              >
                                {subSupplier.name.length > 12 
                                  ? subSupplier.name.substring(0, 12) + '...' 
                                  : subSupplier.name}
                              </text>
                            </g>
                          );
                        })}
                      </g>
                    );
                  })}
                </svg>
              </CardContent>
            </Card>

            {/* Scan Quotidien Section */}
            <Card className={`backdrop-blur-sm border-border/50 md:col-span-1 ${
              showAlert ? 'bg-destructive/10 border-destructive/30' : 'bg-card/50'
            }`}>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  {showAlert ? (
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  ) : (
                    <BookOpen className="w-5 h-5 text-primary" />
                  )}
                  <h3 className="text-xl font-bold">
                    {showAlert ? "Alerte détectée" : "Scan quotidien"}
                  </h3>
                </div>
                
                {showAlert ? (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Badge variant="destructive" className="mb-3 animate-pulse">
                        Critique
                      </Badge>
                      <h4 className="font-bold text-destructive">
                        Vulnérabilité détectée
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Une vulnérabilité critique a été identifiée chez le fournisseur{' '}
                        <span className="font-semibold text-destructive">
                          {suppliers.find(s => s.hasAlert)?.name}
                        </span>
                        {' '}affectant les services{' '}
                        {suppliers.find(s => s.hasAlert)?.services.join(' et ')}.
                      </p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-destructive/20">
                      <h5 className="font-semibold text-sm">Messages importants</h5>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex gap-2">
                          <span className="text-destructive">•</span>
                          <span>Mise à jour de sécurité requise immédiatement</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-destructive">•</span>
                          <span>Risque d'accès non autorisé aux données</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-destructive">•</span>
                          <span>Impact sur {selectedCompany?.name}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-destructive/20">
                      <h5 className="font-semibold text-sm">Étapes recommandées</h5>
                      <ol className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex gap-2">
                          <span className="font-semibold">1.</span>
                          <span>Contacter Red Hat pour le patch de sécurité</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-semibold">2.</span>
                          <span>Vérifier les logs d'accès récents</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-semibold">3.</span>
                          <span>Appliquer le correctif dans les 24h</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                ) : (
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
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientDetail;
