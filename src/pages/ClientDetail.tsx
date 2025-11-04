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
                {showAlert && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="destructive" className="text-sm">
                      Vulnérabilité détectée
                    </Badge>
                  </div>
                )}
                <svg width="100%" height="600" viewBox="0 0 800 600" className="overflow-visible">
                  {/* CSSDM Node */}
                  <circle cx="400" cy="80" r="50" fill="transparent" stroke="hsl(var(--primary))" strokeWidth="2" />
                  <text x="400" y="85" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="16" fontWeight="500">
                    CSSDM
                  </text>

                  {/* Line from CSSDM to Client */}
                  <line x1="400" y1="130" x2="400" y2="230" stroke="hsl(var(--primary))" strokeWidth="2" />

                  {/* Client Node */}
                  <circle cx="400" cy="280" r="60" fill="transparent" stroke="hsl(var(--primary))" strokeWidth="2" />
                  <text x="400" y="285" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="16" fontWeight="500">
                    {selectedCompany?.name}
                  </text>

                  {suppliers.length > 0 && (
                    <>
                      {/* Left Supplier (Veeam or first) */}
                      <line x1="400" y1="340" x2="250" y2="480" stroke="hsl(var(--border))" strokeWidth="2" />
                      <circle cx="250" cy="480" r="45" fill="transparent" stroke="hsl(var(--border))" strokeWidth="2" />
                      <text x="250" y="485" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="15" fontWeight="500">
                        {suppliers[0]?.name}
                      </text>
                      <text x="250" y="545" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12">
                        ({suppliers[0]?.services.join(", ")})
                      </text>

                      {suppliers.length > 1 && (
                        <>
                          {/* Right Supplier (Red Hat or second) - Red when alert active */}
                          <line 
                            x1="400" 
                            y1="340" 
                            x2="550" 
                            y2="480" 
                            stroke={showAlert ? "hsl(var(--destructive))" : "hsl(var(--border))"} 
                            strokeWidth="2" 
                          />
                          <circle 
                            cx="550" 
                            cy="480" 
                            r="45" 
                            fill="transparent" 
                            stroke={showAlert ? "hsl(var(--destructive))" : "hsl(var(--border))"} 
                            strokeWidth="2" 
                          />
                          <text 
                            x="550" 
                            y="485" 
                            textAnchor="middle" 
                            fill={showAlert ? "hsl(var(--destructive))" : "hsl(var(--foreground))"} 
                            fontSize="15" 
                            fontWeight="500"
                          >
                            {suppliers[1]?.name}
                          </text>
                          <text x="550" y="545" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12">
                            ({suppliers[1]?.services.join(", ")})
                          </text>
                        </>
                      )}
                    </>
                  )}
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
                      <Badge variant="destructive" className="mb-3">
                        Critique
                      </Badge>
                      <h4 className="font-bold text-destructive">
                        Vulnérabilité détectée
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Une vulnérabilité critique a été identifiée chez le fournisseur Red Hat affectant les services Cirrus PaaS et OpenShift.
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
