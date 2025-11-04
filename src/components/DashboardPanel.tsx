import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, TrendingUp, CheckCircle2, AlertTriangle, DollarSign, FileCheck } from "lucide-react";

export const DashboardPanel = () => {
  return (
    <Card className="bg-background/95 backdrop-blur-md border-glow">
      <CardHeader className="pb-3 bg-muted/30">
        <CardTitle className="flex items-center gap-2 text-base">
          <Shield className="w-5 h-5 text-primary" />
          Tableau de Bord Multi-Rôle
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ciso" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ciso" className="text-xs">CISO</TabsTrigger>
            <TabsTrigger value="ceo" className="text-xs">CEO</TabsTrigger>
            <TabsTrigger value="compliance" className="text-xs">Conformité</TabsTrigger>
          </TabsList>

          {/* CISO View */}
          <TabsContent value="ciso" className="space-y-3 mt-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  <span className="text-xs text-muted-foreground">Critiques</span>
                </div>
                <div className="text-2xl font-bold text-destructive">3</div>
                <div className="text-xs text-muted-foreground">À corriger aujourd'hui</div>
              </div>

              <div className="p-3 rounded-lg bg-warning/10 border border-warning/30">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-warning" />
                  <span className="text-xs text-muted-foreground">Haute priorité</span>
                </div>
                <div className="text-2xl font-bold text-warning">8</div>
                <div className="text-xs text-muted-foreground">Cette semaine</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Surface d'attaque
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span>Ports exposés</span>
                  <Badge className="bg-success text-success-foreground">0</Badge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>Services vulnérables</span>
                  <Badge className="bg-destructive text-destructive-foreground">3</Badge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>Certificats SSL</span>
                  <Badge className="bg-success text-success-foreground">Tous valides</Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* CEO View */}
          <TabsContent value="ceo" className="space-y-3 mt-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-lg bg-success/10 border border-success/30">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground">Économies</span>
                </div>
                <div className="text-2xl font-bold text-success">240K$</div>
                <div className="text-xs text-muted-foreground">Cette année</div>
              </div>

              <div className="p-3 rounded-lg bg-info/10 border border-info/30">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-info" />
                  <span className="text-xs text-muted-foreground">Couverture</span>
                </div>
                <div className="text-2xl font-bold text-info">98%</div>
                <div className="text-xs text-muted-foreground">Partenaires protégés</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-info/10 border border-primary/30">
              <div className="text-xs font-semibold mb-2">Impact Business</div>
              <div className="space-y-1.5">
                {[
                  "Risque d'interruption réduit de 87%",
                  "Conformité DORA/NIS2 maintenue",
                  "0 incident majeur en 6 mois",
                  "ROI: 340% sur 12 mois"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-3 h-3 text-success flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Compliance View */}
          <TabsContent value="compliance" className="space-y-3 mt-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-lg bg-success/10 border border-success/30">
                <div className="flex items-center gap-2 mb-1">
                  <FileCheck className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground">DORA</span>
                </div>
                <div className="text-2xl font-bold text-success">✓</div>
                <div className="text-xs text-muted-foreground">100% conforme</div>
              </div>

              <div className="p-3 rounded-lg bg-success/10 border border-success/30">
                <div className="flex items-center gap-2 mb-1">
                  <FileCheck className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground">NIS2</span>
                </div>
                <div className="text-2xl font-bold text-success">✓</div>
                <div className="text-xs text-muted-foreground">100% conforme</div>
              </div>

              <div className="p-3 rounded-lg bg-success/10 border border-success/30">
                <div className="flex items-center gap-2 mb-1">
                  <FileCheck className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground">Loi 25</span>
                </div>
                <div className="text-2xl font-bold text-success">✓</div>
                <div className="text-xs text-muted-foreground">100% conforme</div>
              </div>

              <div className="p-3 rounded-lg bg-warning/10 border border-warning/30">
                <div className="flex items-center gap-2 mb-1">
                  <FileCheck className="w-4 h-4 text-warning" />
                  <span className="text-xs text-muted-foreground">SOC 2</span>
                </div>
                <div className="text-2xl font-bold text-warning">94%</div>
                <div className="text-xs text-muted-foreground">Audit en cours</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Prochaines échéances
              </div>
              <div className="space-y-1.5">
                {[
                  { date: "15 nov", task: "Renouvellement certificats SSL", status: "warning" },
                  { date: "30 nov", task: "Audit DORA trimestriel", status: "info" },
                  { date: "15 déc", task: "Rapport Loi 25 annuel", status: "info" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2 rounded bg-muted/50">
                    <span className="font-mono text-muted-foreground">{item.date}</span>
                    <span className="flex-1 ml-2">{item.task}</span>
                    <Badge variant="outline" className="text-xs">
                      {item.status === "warning" ? "Urgent" : "Planifié"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
