import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, CheckCircle2, FileText, AlertTriangle, XCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState("");
  const [hasAlert, setHasAlert] = useState(false);

  const handleCompanyChange = (value: string) => {
    if (value === "micrologic") {
      setSelectedCompany(value);
      navigate(`/client/${value}`);
    }
  };

  const companies = [
    { id: "micrologic", name: "Micrologic" },
    { id: "zens", name: "Zens Canada Corp." },
    { id: "inso", name: "INSO INC" },
    { id: "coginov", name: "COGINOV inc." },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-background">
        <div className="container mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">CSSDM</h1>
          </div>

          {/* Toggle Button */}
          <Button
            onClick={() => setHasAlert(!hasAlert)}
            variant={hasAlert ? "destructive" : "default"}
            size="sm"
            className="font-medium"
          >
            {hasAlert ? "État critique" : "État sécurisé"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-8">
        <div className="flex items-center gap-12 w-full max-w-6xl justify-center">
          {/* Company dropdown */}
          <div className="w-96 flex-shrink-0">
            <Select value={selectedCompany} onValueChange={handleCompanyChange}>
              <SelectTrigger className="w-full bg-primary text-primary-foreground border-none hover:bg-primary/80 transition-all h-auto py-4 px-5 shadow-lg shadow-primary/20 rounded-xl font-medium">
                <SelectValue placeholder="Sélectionner un client" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border/50 rounded-xl shadow-2xl z-50">
                {companies.map((company) => (
                  <SelectItem 
                    key={company.id} 
                    value={company.id}
                    disabled={company.id !== "micrologic"}
                    className={company.id === "micrologic" ? "hover:bg-muted/50 cursor-pointer rounded-lg" : "opacity-50 cursor-not-allowed rounded-lg"}
                  >
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Card - Positive State */}
          {!hasAlert && (
            <div className="flex-1">
              <Card className="bg-card/50 backdrop-blur-sm border border-success/20 shadow-xl shadow-success/5 rounded-2xl overflow-hidden">
                <CardContent className="p-12 space-y-8">
                  {/* Main Status Section */}
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-foreground/90">État de sécurité</h2>
                    <div className="space-y-5">
                      <div className="flex items-start gap-4 group">
                        <div className="p-1.5 rounded-full bg-success/10 mt-0.5">
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        </div>
                        <div>
                          <p className="text-success text-base font-medium leading-relaxed">
                            Aucunes vulnérabilités détectées
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Toutes les dépendances sont à jour et sécurisées
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 group">
                        <div className="p-1.5 rounded-full bg-success/10 mt-0.5">
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        </div>
                        <div>
                          <p className="text-success text-base font-medium leading-relaxed">
                            Tous les certificats sont à jour
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Certificats SSL valides jusqu'au 15 mars 2026
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 group">
                        <div className="p-1.5 rounded-full bg-success/10 mt-0.5">
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        </div>
                        <div>
                          <p className="text-success text-base font-medium leading-relaxed">
                            Aucun port ouvert
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Pare-feu actif, tous les services sont sécurisés
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 group">
                        <div className="p-1.5 rounded-full bg-success/10 mt-0.5">
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        </div>
                        <div>
                          <p className="text-success text-base font-medium leading-relaxed">
                            Sauvegardes à jour
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Dernière sauvegarde effectuée il y a 2 heures
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Section */}
                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/30">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-success">100%</div>
                      <div className="text-sm text-muted-foreground mt-1">Disponibilité</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-foreground">0</div>
                      <div className="text-sm text-muted-foreground mt-1">Incidents</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-foreground">24</div>
                      <div className="text-sm text-muted-foreground mt-1">Services actifs</div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-6 border-t border-border/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground/70" />
                        <p className="text-muted-foreground text-sm">
                          Scan quotidien effectué à 08:00
                        </p>
                      </div>
                      <a
                        href="#"
                        className="text-sm text-primary hover:text-primary/80 font-medium transition-colors underline-offset-4 hover:underline"
                      >
                        Voir le rapport complet
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Alert State - Negative */}
          {hasAlert && (
            <div className="flex-1">
              <Card className="bg-card/50 backdrop-blur-sm border border-destructive/30 shadow-xl shadow-destructive/10 rounded-2xl overflow-hidden">
                <CardContent className="p-12 space-y-8">
                  {/* Alert Header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-destructive/20">
                    <div className="p-2 rounded-full bg-destructive/10">
                      <AlertTriangle className="w-6 h-6 text-destructive" />
                    </div>
                    <h2 className="text-xl font-bold text-destructive">Alerte détectée</h2>
                  </div>

                  {/* Critical Alert */}
                  <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                      <div className="space-y-2">
                        <p className="text-destructive font-semibold text-base">
                          Vulnérabilité critique (CVE-2025-18723) dans Red Hat OpenShift 4.15
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Cette faille permet une élévation de privilèges via le composant de gestion 
                          des routeurs d'entrée, exposant partiellement les clusters du CSSDM.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Risks Section */}
                  <div>
                    <h3 className="text-base font-semibold text-destructive mb-4">Risques pour la CSSDM</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">Fuite de données personnelles</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          Interruption de service du portail pédagogique et des outils internes
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-card/30 border border-border/30 rounded-xl p-6 space-y-4">
                    <h3 className="text-base font-semibold text-foreground/90">Recommandations</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          Ouvrir un ticket Red Hat via Micrologic pour obtenir le correctif ou mitigation temporaire
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          Documenter l'incident dans le registre des incidents de confidentialité
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Section */}
                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/30">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-warning">87%</div>
                      <div className="text-sm text-muted-foreground mt-1">Disponibilité</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-destructive">3</div>
                      <div className="text-sm text-muted-foreground mt-1">Incidents</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-foreground">21</div>
                      <div className="text-sm text-muted-foreground mt-1">Services actifs</div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-6 border-t border-border/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground/70" />
                        <p className="text-muted-foreground text-sm">
                          Alerte détectée à 14:23
                        </p>
                      </div>
                      <a
                        href="#"
                        className="text-sm text-primary hover:text-primary/80 font-medium transition-colors underline-offset-4 hover:underline"
                      >
                        Voir le rapport d'incident
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;