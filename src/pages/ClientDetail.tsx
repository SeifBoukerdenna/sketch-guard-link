import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, BookOpen, AlertTriangle, FolderOpen, Calendar, Clock, CheckCircle2, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const ClientDetail = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [showScanDialog, setShowScanDialog] = useState(false);

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
              variant="outline" 
              size="sm"
              onClick={() => navigate(`/client/${clientId}/scans`)}
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              Dossiers
            </Button>
            <Button 
              variant={showAlert ? "destructive" : "outline"} 
              size="sm"
              onClick={() => setShowAlert(!showAlert)}
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              {showAlert ? "Alerte active" : "Simuler alerte"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowScanDialog(true)}>
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
                <svg width="100%" height="700" viewBox="0 0 700 700" className="overflow-visible">
                  {(() => {
                    // Determine if there are any vulnerabilities in the tree (only when alert is active)
                    const hasVulnerability = showAlert && suppliers.some(s => s.hasAlert);
                    
                    // CSSDM and Client are parents, so they get warning color if any child has vulnerability
                    const cssdmColor = hasVulnerability ? "hsl(var(--warning))" : "hsl(var(--success))";
                    const clientColor = hasVulnerability ? "hsl(var(--warning))" : "hsl(var(--success))";
                    const cssdmFill = hasVulnerability ? "hsl(var(--warning) / 0.1)" : "hsl(var(--success) / 0.1)";
                    const clientFill = hasVulnerability ? "hsl(var(--warning) / 0.1)" : "hsl(var(--success) / 0.1)";
                    
                    return (
                      <>
                        {/* CSSDM Node */}
                        <circle cx="350" cy="80" r="50" fill={cssdmFill} stroke={cssdmColor} strokeWidth="3" />
                        <text x="350" y="87" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="18" fontWeight="600">
                          CSSDM
                        </text>

                        {/* Line from CSSDM to Client */}
                        <line x1="350" y1="130" x2="350" y2="200" stroke={cssdmColor} strokeWidth="3" />

                        {/* Client Node */}
                        <circle cx="350" cy="260" r="60" fill={clientFill} stroke={clientColor} strokeWidth="3" />
                        <text x="350" y="267" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="19" fontWeight="600">
                          {selectedCompany?.name}
                        </text>

                        {/* Suppliers */}
                        {suppliers.map((supplier, index) => {
                          const totalSuppliers = suppliers.length;
                          const spacing = 200;
                          const startX = 350 - ((totalSuppliers - 1) * spacing) / 2;
                          const supplierX = startX + index * spacing;
                          const supplierY = 440;
                          
                          // Determine node color based on vulnerability status (only when alert is active)
                          const hasDirectVulnerability = showAlert && supplier.hasAlert;
                          const nodeColor = hasDirectVulnerability 
                            ? "hsl(var(--destructive))" 
                            : "hsl(var(--success))";
                          const nodeFill = hasDirectVulnerability 
                            ? "hsl(var(--destructive) / 0.1)" 
                            : "hsl(var(--success) / 0.1)";
                          
                          return (
                            <g key={supplier.name}>
                              {/* Line from Client to Supplier */}
                              <line 
                                x1="350" 
                                y1="320" 
                                x2={supplierX} 
                                y2={supplierY - 55} 
                                stroke={hasDirectVulnerability ? "hsl(var(--destructive))" : clientColor} 
                                strokeWidth={hasDirectVulnerability ? "3" : "2.5"}
                                className={hasDirectVulnerability ? "animate-pulse" : ""}
                              />
                              
                              {/* Supplier Node */}
                              <circle 
                                cx={supplierX} 
                                cy={supplierY} 
                                r="55"
                                fill={nodeFill} 
                                stroke={nodeColor} 
                                strokeWidth="3"
                                className={hasDirectVulnerability ? "animate-pulse" : ""}
                              />
                              <text 
                                x={supplierX} 
                                y={supplierY + 6} 
                                textAnchor="middle" 
                                fill="hsl(var(--foreground))" 
                                fontSize="16" 
                                fontWeight="600"
                              >
                                {supplier.name}
                              </text>
                              
                              {/* Services text */}
                              <text x={supplierX} y={supplierY + 78} textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12">
                                {supplier.services[0]}
                              </text>
                              {supplier.services[1] && (
                                <text x={supplierX} y={supplierY + 95} textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12">
                                  {supplier.services[1]}
                                </text>
                              )}

                              {/* Sub-suppliers */}
                              {supplier.subSuppliers.map((subSupplier, subIndex) => {
                                const subSpacing = 90;
                                const subsCount = supplier.subSuppliers.length;
                                const subStartX = supplierX - ((subsCount - 1) * subSpacing) / 2;
                                const subX = subStartX + subIndex * subSpacing;
                                const subY = 620;
                                
                                // Sub-suppliers are always green (no vulnerabilities in mock data)
                                const subColor = "hsl(var(--success))";
                                const subFill = "hsl(var(--success) / 0.1)";
                                
                                return (
                                  <g key={subSupplier.name}>
                                    {/* Line to sub-supplier */}
                                    <line 
                                      x1={supplierX} 
                                      y1={supplierY + 55} 
                                      x2={subX} 
                                      y2={subY - 35} 
                                      stroke={subColor} 
                                      strokeWidth="2"
                                    />
                                    
                                    {/* Sub-supplier Node */}
                                    <circle 
                                      cx={subX} 
                                      cy={subY} 
                                      r="35" 
                                      fill={subFill} 
                                      stroke={subColor} 
                                      strokeWidth="2"
                                    />
                                    <text 
                                      x={subX} 
                                      y={subY + 5} 
                                      textAnchor="middle" 
                                      fill="hsl(var(--foreground))" 
                                      fontSize="12" 
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
                      </>
                    );
                  })()}
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
                        Vulnérabilité critique (CVE-2025-18723) dans Red Hat OpenShift 4.15
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Cette faille permet une élévation de privilèges via le composant de gestion 
                        des routeurs d'entrée, exposant partiellement les clusters du CSSDM.
                      </p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-destructive/20">
                      <h5 className="font-semibold text-sm">Risques pour la CSSDM</h5>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex gap-2">
                          <span className="text-destructive">•</span>
                          <span>Fuite de données personnelles</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-destructive">•</span>
                          <span>Interruption de service du portail pédagogique et des outils internes</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-destructive/20">
                      <h5 className="font-semibold text-sm">Recommandation</h5>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex gap-2">
                          <span className="text-destructive">•</span>
                          <span>Ouvrir un ticket Red Hat via Micrologic pour obtenir le correctif ou mitigation temporaire</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-destructive">•</span>
                          <span>Documenter l'incident dans le registre des incidents de confidentialité</span>
                        </li>
                      </ul>
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
                    <div className="flex items-center justify-between py-3 border-b border-border/30">
                      <span className="text-muted-foreground">Statut</span>
                      <span className="font-medium text-success">Actif</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border/30">
                      <span className="text-muted-foreground">Fournisseurs surveillés</span>
                      <span className="font-medium">{suppliers.length}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border/30">
                      <span className="text-muted-foreground">Vulnérabilités</span>
                      <span className="font-medium text-success">0 détectée</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-muted-foreground">Niveau de conformité</span>
                      <span className="font-medium text-success">100%</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Scan Summary Dialog */}
      <Dialog open={showScanDialog} onOpenChange={setShowScanDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Résumé du scan quotidien
            </DialogTitle>
            <DialogDescription>
              Aperçu détaillé du dernier scan de sécurité pour {selectedCompany?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-base px-4 py-2 bg-success/10 text-success border-success/30">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Scan actif
              </Badge>
              <Badge variant="outline" className="text-sm">
                Fréquence: Quotidienne
              </Badge>
            </div>

            <Separator />

            {/* Scan Timing Info */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-card/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    Dernier scan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-semibold">Aujourd'hui</p>
                  <p className="text-sm text-muted-foreground">à 08:00</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Prochain scan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-semibold">Demain</p>
                  <p className="text-sm text-muted-foreground">à 08:00</p>
                </CardContent>
              </Card>
            </div>

            <Separator />

            {/* Security Metrics */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Métriques de sécurité
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-success/10 border border-success/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Vulnérabilités détectées</p>
                  <p className="text-3xl font-bold text-success">0</p>
                </div>

                <div className="bg-success/10 border border-success/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Niveau de conformité</p>
                  <p className="text-3xl font-bold text-success">100%</p>
                </div>
              </div>

              <Card className="bg-card/50 border-primary/20">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Fournisseurs scannés</span>
                      <span className="font-semibold">{suppliers.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Services analysés</span>
                      <span className="font-semibold">
                        {suppliers.reduce((acc, s) => acc + s.services.length, 0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Sous-fournisseurs</span>
                      <span className="font-semibold">
                        {suppliers.reduce((acc, s) => acc + s.subSuppliers.length, 0)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowScanDialog(false)}>
                Fermer
              </Button>
              <Button onClick={() => {
                setShowScanDialog(false);
                navigate(`/client/${clientId}/scans`);
              }}>
                Voir historique complet
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientDetail;
