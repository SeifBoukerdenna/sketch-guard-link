import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, CheckCircle2, FileText, AlertTriangle, XCircle, LogOut, Plus, Settings } from "lucide-react";
import { toast } from "sonner";
import { VendorIntegrationFlow } from "@/components/VendorIntegrationFlow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState("");
  const [hasAlert, setHasAlert] = useState(false);
  const [isAddVendorOpen, setIsAddVendorOpen] = useState(false);
  const [isVendorIntegrationOpen, setIsVendorIntegrationOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [legalName, setLegalName] = useState("");
  const [domainName, setDomainName] = useState("");
  const [vendors, setVendors] = useState([
    { id: "micrologic", name: "Micrologic" },
    { id: "zens", name: "Zens Canada Corp." },
    { id: "inso", name: "INSO INC" },
    { id: "coginov", name: "COGINOV inc." },
  ]);

  const handleCompanyChange = (value: string) => {
    if (value === "add-vendor") {
      setIsAddVendorOpen(true);
      return;
    }
    if (value === "micrologic") {
      setSelectedCompany(value);
      navigate(`/client/${value}`);
    }
  };

  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault();

    if (!legalName.trim() || !domainName.trim()) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    const newVendorId = legalName.toLowerCase().replace(/\s+/g, "-");
    const newVendor = {
      id: newVendorId,
      name: legalName,
    };

    setVendors([...vendors, newVendor]);
    toast.success("Vendor ajouté avec succès! Un email d'invitation a été envoyé.");

    setLegalName("");
    setDomainName("");
    setIsAddVendorOpen(false);
  };

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

          <div className="flex items-center gap-3">
            {/* Vendor Integration Button */}
            <Button
              onClick={() => setIsVendorIntegrationOpen(true)}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Settings className="w-4 h-4" />
              Intégration de fournisseur
            </Button>

            {/* Toggle Button */}
            <Button
              onClick={() => setHasAlert(!hasAlert)}
              variant={hasAlert ? "destructive" : "default"}
              size="sm"
              className="font-medium"
            >
              {hasAlert ? "État critique" : "État sécurisé"}
            </Button>

            {/* Logout Button */}
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Se déconnecter
            </Button>
          </div>
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
                {vendors.map((company) => (
                  <SelectItem
                    key={company.id}
                    value={company.id}
                    disabled={company.id !== "micrologic"}
                    className={company.id === "micrologic" ? "hover:bg-muted/50 cursor-pointer rounded-lg" : "opacity-50 cursor-not-allowed rounded-lg"}
                  >
                    {company.name}
                  </SelectItem>
                ))}
                <Separator className="my-2" />
                <SelectItem
                  value="add-vendor"
                  className="hover:bg-primary/10 cursor-pointer rounded-lg font-medium text-primary"
                >
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Ajouter un vendor</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Card - Positive State */}
          {!hasAlert && (
            <div className="flex-1">
              <Card className="bg-card/50 backdrop-blur-sm border border-success/20 shadow-xl shadow-success/5 rounded-2xl overflow-hidden">
                <CardContent className="p-8 space-y-6">
                  {/* Main Status Section */}
                  <div>
                    <h2 className="text-lg font-bold mb-4 text-foreground/90">État de sécurité - État global</h2>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 group">
                        <div className="p-1.5 rounded-full bg-success/10 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                        </div>
                        <div>
                          <p className="text-success text-sm font-medium leading-relaxed">
                            Aucunes vulnérabilités détectées
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Toutes les dépendances sont à jour et sécurisées
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 group">
                        <div className="p-1.5 rounded-full bg-success/10 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                        </div>
                        <div>
                          <p className="text-success text-sm font-medium leading-relaxed">
                            Tous les certificats sont à jour
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Certificats SSL valides jusqu'au 15 mars 2026
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 group">
                        <div className="p-1.5 rounded-full bg-success/10 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                        </div>
                        <div>
                          <p className="text-success text-sm font-medium leading-relaxed">
                            Aucun port ouvert
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Pare-feu actif, tous les services sont sécurisés
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Section */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/30">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">100%</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Disponibilité</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">0</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Incidents</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">24</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Services actifs</div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-border/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground/70" />
                        <p className="text-muted-foreground text-xs">
                          Scan quotidien effectué à 08:00
                        </p>
                      </div>
                      <button
                        onClick={() => setIsReportOpen(true)}
                        className="text-xs text-primary hover:text-primary/80 font-medium transition-colors underline-offset-4 hover:underline"
                      >
                        Voir le rapport complet
                      </button>
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
                <CardContent className="p-8 space-y-6">
                  {/* Alert Header */}
                  <div className="flex items-center gap-3 pb-3 border-b border-destructive/20">
                    <div className="p-2 rounded-full bg-destructive/10">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                    </div>
                    <h2 className="text-lg font-bold text-destructive">Alerte détectée</h2>
                  </div>

                  {/* Critical Alert */}
                  <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4 space-y-3">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                      <div className="space-y-1.5">
                        <p className="text-destructive font-semibold text-sm">
                          Vulnérabilité critique (CVE-2025-18723) dans Red Hat OpenShift 4.15
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Cette faille permet une élévation de privilèges via le composant de gestion
                          des routeurs d'entrée, exposant partiellement les clusters du CSSDM.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Risks Section */}
                  <div>
                    <h3 className="text-sm font-semibold text-destructive mb-3">Risques pour la CSSDM</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 flex-shrink-0" />
                        <p className="text-xs text-muted-foreground">Fuite de données personnelles</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 flex-shrink-0" />
                        <p className="text-xs text-muted-foreground">
                          Interruption de service du portail pédagogique et des outils internes
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-card/30 border border-border/30 rounded-xl p-4 space-y-3">
                    <h3 className="text-sm font-semibold text-foreground/90">Recommandations</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <p className="text-xs text-muted-foreground">
                          Ouvrir un ticket Red Hat via Micrologic pour obtenir le correctif ou mitigation temporaire
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <p className="text-xs text-muted-foreground">
                          Documenter l'incident dans le registre des incidents de confidentialité
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Section */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/30">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-warning">87%</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Disponibilité</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-destructive">3</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Incidents</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">21</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Services actifs</div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-border/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground/70" />
                        <p className="text-muted-foreground text-xs">
                          Alerte détectée à 14:23
                        </p>
                      </div>
                      <button
                        onClick={() => setIsReportOpen(true)}
                        className="text-xs text-primary hover:text-primary/80 font-medium transition-colors underline-offset-4 hover:underline"
                      >
                        Voir le rapport d'incident
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* Rapport Complet Dialog */}
      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {hasAlert ? "Rapport d'incident complet" : "Rapport de scan complet"}
            </DialogTitle>
            <DialogDescription>
              {hasAlert
                ? "Détails de l'alerte de sécurité détectée"
                : "Scan quotidien effectué le 5 novembre 2025 à 08:00"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Summary Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Résumé du scan</h3>
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-card/50">
                  <CardContent className="p-4 text-center">
                    <div className={`text-2xl font-bold ${hasAlert ? 'text-warning' : 'text-success'}`}>
                      {hasAlert ? '87%' : '100%'}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Disponibilité</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-4 text-center">
                    <div className={`text-2xl font-bold ${hasAlert ? 'text-destructive' : 'text-foreground'}`}>
                      {hasAlert ? '3' : '0'}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Incidents</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {hasAlert ? '21' : '24'}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Services actifs</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Vulnerabilities Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Vulnérabilités</h3>
              {hasAlert ? (
                <div className="space-y-2">
                  <Card className="bg-destructive/5 border-destructive/20">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-sm">CVE-2025-18723</p>
                            <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-md font-medium">
                              Critique
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Red Hat OpenShift 4.15 - Élévation de privilèges via le composant de gestion des routeurs d'entrée
                          </p>
                          <div className="pt-2 border-t border-border/30">
                            <p className="text-xs text-muted-foreground">
                              <span className="font-medium">Composant affecté:</span> OpenShift Router
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <span className="font-medium">Score CVSS:</span> 9.8 (Critique)
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <span className="font-medium">Vecteur d'attaque:</span> Réseau / Aucune authentification requise
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="bg-success/5 border-success/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <p className="text-sm text-success font-medium">
                        Aucune vulnérabilité détectée
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Certificates Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Certificats SSL/TLS</h3>
              <Card className="bg-card/50">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      <span className="text-sm font-medium">*.cssdm.gouv.qc.ca</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Valide</span>
                  </div>
                  <div className="text-xs text-muted-foreground pl-6">
                    Émis par: Let's Encrypt • Expire le: 15 mars 2026
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Network Security Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Sécurité réseau</h3>
              <Card className="bg-card/50">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ports ouverts</span>
                    <span className="text-sm font-medium">{hasAlert ? '3' : '0'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pare-feu</span>
                    <span className="text-sm font-medium text-success">Actif</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Protection DDoS</span>
                    <span className="text-sm font-medium text-success">Actif</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">WAF</span>
                    <span className="text-sm font-medium text-success">Actif</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dependencies Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Dépendances</h3>
              <Card className="bg-card/50">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Packages npm</span>
                    <span className="text-sm font-medium">247 / 247 à jour</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Composants système</span>
                    <span className="text-sm font-medium">18 / 18 à jour</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Images Docker</span>
                    <span className="text-sm font-medium">12 / 12 sécurisées</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {hasAlert && (
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-destructive">Actions requises</h3>
                <Card className="bg-destructive/5 border-destructive/20">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                      <p className="text-sm">
                        Ouvrir un ticket Red Hat via Micrologic pour obtenir le correctif ou mitigation temporaire
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                      <p className="text-sm">
                        Documenter l'incident dans le registre des incidents de confidentialité
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                      <p className="text-sm">
                        Notifier les équipes de sécurité et établir un plan de mitigation
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Vendor Integration Flow */}
      <VendorIntegrationFlow
        open={isVendorIntegrationOpen}
        onOpenChange={setIsVendorIntegrationOpen}
      />

      {/* Add Vendor Dialog */}
      <Dialog open={isAddVendorOpen} onOpenChange={setIsAddVendorOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau vendor</DialogTitle>
            <DialogDescription>
              Remplissez les informations du vendor. Nous enverrons un email avec un lien sécurisé
              pour qu'ils puissent déposer leur SBOM sur notre plateforme.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddVendor} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="legalName">Nom légal</Label>
              <Input
                id="legalName"
                placeholder="Ex: Acme Corporation Inc."
                value={legalName}
                onChange={(e) => setLegalName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="domainName">Nom de domaine</Label>
              <Input
                id="domainName"
                placeholder="Ex: acme.com"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
                required
              />
            </div>
            <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
              <p className="text-sm text-muted-foreground">
                📧 Un email sera automatiquement envoyé au vendor avec un lien sécurisé
                pour accéder à notre plateforme et déposer leur SBOM.
              </p>
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddVendorOpen(false);
                  setLegalName("");
                  setDomainName("");
                }}
              >
                Annuler
              </Button>
              <Button type="submit">
                Ajouter le fournisseur
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;