import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, FolderOpen, Calendar, CheckCircle2, AlertTriangle, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const ScansFolder = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [openQuotidien, setOpenQuotidien] = useState(true);
  const [openHebdomadaire, setOpenHebdomadaire] = useState(false);
  const [openMensuel, setOpenMensuel] = useState(false);

  const companies = [
    { id: "micrologic", name: "Micrologic" },
    { id: "zens", name: "Zens Canada Corp." },
    { id: "inso", name: "INSO INC" },
    { id: "coginov", name: "COGINOV inc." },
  ];

  const selectedCompany = companies.find((c) => c.id === clientId);

  // Mock data pour les scans
  const scans = {
    quotidien: [
      {
        id: 1,
        date: "2025-11-04",
        time: "08:00",
        status: "completed",
        vulnerabilities: 0,
        fournisseurs: 3,
      },
      {
        id: 2,
        date: "2025-11-03",
        time: "08:00",
        status: "completed",
        vulnerabilities: 1,
        fournisseurs: 3,
      },
      {
        id: 3,
        date: "2025-11-02",
        time: "08:00",
        status: "completed",
        vulnerabilities: 0,
        fournisseurs: 3,
      },
    ],
    hebdomadaire: [
      {
        id: 1,
        date: "2025-11-01",
        weekNumber: 44,
        status: "completed",
        vulnerabilities: 2,
        fournisseurs: 3,
        recommendations: 5,
      },
      {
        id: 2,
        date: "2025-10-25",
        weekNumber: 43,
        status: "completed",
        vulnerabilities: 0,
        fournisseurs: 3,
        recommendations: 3,
      },
    ],
    mensuel: [
      {
        id: 1,
        date: "2025-10-01",
        month: "Octobre 2025",
        status: "completed",
        vulnerabilities: 3,
        fournisseurs: 3,
        recommendations: 12,
        conformity: 98,
      },
      {
        id: 2,
        date: "2025-09-01",
        month: "Septembre 2025",
        status: "completed",
        vulnerabilities: 1,
        fournisseurs: 3,
        recommendations: 8,
        conformity: 99,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-background">
        <div className="container mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(`/client/${clientId}`)}
              className="mr-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">CSSDM</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-8 py-12">
        <div className="container mx-auto max-w-7xl space-y-8">
          {/* Page Title */}
          <div className="flex items-center gap-4">
            <FolderOpen className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Dossier de scans - {selectedCompany?.name}
              </h2>
              <p className="text-muted-foreground mt-2">
                Historique complet des scans de sécurité
              </p>
            </div>
          </div>

          {/* Scans quotidiens */}
          <Collapsible open={openQuotidien} onOpenChange={setOpenQuotidien}>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CollapsibleTrigger className="w-full">
                <CardHeader className="hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-bold">Scans quotidiens</h3>
                      <Badge variant="secondary">{scans.quotidien.length}</Badge>
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openQuotidien ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {scans.quotidien.map((scan) => (
                      <Card key={scan.id} className="bg-background border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span className="text-lg">{scan.date}</span>
                            {scan.vulnerabilities === 0 ? (
                              <CheckCircle2 className="w-5 h-5 text-success" />
                            ) : (
                              <AlertTriangle className="w-5 h-5 text-destructive" />
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Heure</span>
                            <span className="font-medium">{scan.time}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Fournisseurs</span>
                            <span className="font-medium">{scan.fournisseurs}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Vulnérabilités</span>
                            <Badge variant={scan.vulnerabilities === 0 ? "default" : "destructive"}>
                              {scan.vulnerabilities}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Scans hebdomadaires */}
          <Collapsible open={openHebdomadaire} onOpenChange={setOpenHebdomadaire}>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CollapsibleTrigger className="w-full">
                <CardHeader className="hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-bold">Scans hebdomadaires</h3>
                      <Badge variant="secondary">{scans.hebdomadaire.length}</Badge>
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openHebdomadaire ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scans.hebdomadaire.map((scan) => (
                      <Card key={scan.id} className="bg-background border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span className="text-lg">Semaine {scan.weekNumber}</span>
                            {scan.vulnerabilities === 0 ? (
                              <CheckCircle2 className="w-5 h-5 text-success" />
                            ) : (
                              <AlertTriangle className="w-5 h-5 text-destructive" />
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Date</span>
                            <span className="font-medium">{scan.date}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Fournisseurs surveillés</span>
                            <span className="font-medium">{scan.fournisseurs}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Vulnérabilités</span>
                            <Badge variant={scan.vulnerabilities === 0 ? "default" : "destructive"}>
                              {scan.vulnerabilities}
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Recommandations</span>
                            <span className="font-medium">{scan.recommendations}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Scans mensuels */}
          <Collapsible open={openMensuel} onOpenChange={setOpenMensuel}>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CollapsibleTrigger className="w-full">
                <CardHeader className="hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-bold">Scans mensuels</h3>
                      <Badge variant="secondary">{scans.mensuel.length}</Badge>
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openMensuel ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scans.mensuel.map((scan) => (
                      <Card key={scan.id} className="bg-background border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span className="text-lg">{scan.month}</span>
                            {scan.vulnerabilities === 0 ? (
                              <CheckCircle2 className="w-5 h-5 text-success" />
                            ) : (
                              <AlertTriangle className="w-5 h-5 text-destructive" />
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Fournisseurs surveillés</span>
                            <span className="font-medium">{scan.fournisseurs}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Vulnérabilités détectées</span>
                            <Badge variant={scan.vulnerabilities === 0 ? "default" : "destructive"}>
                              {scan.vulnerabilities}
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Recommandations</span>
                            <span className="font-medium">{scan.recommendations}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Conformité</span>
                            <Badge variant="default" className="bg-success">
                              {scan.conformity}%
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>
      </main>
    </div>
  );
};

export default ScansFolder;
