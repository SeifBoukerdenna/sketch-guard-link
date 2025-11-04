import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

          {/* Supplier Tree */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Root: CSSDM */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">CSSDM</p>
                  </div>
                </div>

                {/* Connection Line */}
                <div className="ml-6 border-l-2 border-border/50 pl-8 space-y-6">
                  {/* Selected Client */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {selectedCompany?.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{selectedCompany?.name}</p>
                    </div>
                  </div>

                  {/* Suppliers */}
                  {suppliers.length > 0 && (
                    <div className="ml-5 border-l-2 border-border/50 pl-8 space-y-6">
                      {suppliers.map((supplier, index) => (
                        <div key={index}>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center">
                              <span className="text-xs font-medium">
                                {supplier.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{supplier.name}</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {supplier.services.map((service, sIndex) => (
                                  <span
                                    key={sIndex}
                                    className="text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground"
                                  >
                                    {service}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
