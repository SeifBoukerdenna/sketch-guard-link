import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, TrendingUp, CheckCircle2, AlertTriangle, DollarSign, FileCheck, Minimize2, Maximize2 } from "lucide-react";

interface DashboardPanelProps {
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

export const DashboardPanel = ({ isMinimized = false, onToggleMinimize }: DashboardPanelProps) => {
  return (
    <div className={`transition-all ${isMinimized ? 'h-12 overflow-hidden' : ''}`}>
      <Card className="bg-background/95 backdrop-blur-md border-2 shadow-2xl">
        <CardHeader className="pb-2 bg-muted/50 drag-handle cursor-grab active:cursor-grabbing">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xs font-medium">
              <Shield className="w-4 h-4 text-primary" />
              Dashboard Multi-Rôle
            </CardTitle>
            {onToggleMinimize && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={onToggleMinimize}
              >
                {isMinimized ? (
                  <Maximize2 className="w-3 h-3" />
                ) : (
                  <Minimize2 className="w-3 h-3" />
                )}
              </Button>
            )}
          </div>
        </CardHeader>
        {!isMinimized && (
          <CardContent className="pt-3">
            <Tabs defaultValue="ciso" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-3 h-8">
                <TabsTrigger value="ciso" className="text-xs">CISO</TabsTrigger>
                <TabsTrigger value="ceo" className="text-xs">CEO</TabsTrigger>
                <TabsTrigger value="compliance" className="text-xs">Conformité</TabsTrigger>
              </TabsList>

              {/* CISO View */}
              <TabsContent value="ciso" className="space-y-3 mt-0">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-destructive" />
                      <span className="text-xs text-muted-foreground font-semibold">Critiques</span>
                    </div>
                    <div className="text-2xl font-bold text-destructive">3</div>
                    <div className="text-xs text-muted-foreground">Aujourd'hui</div>
                  </div>

                  <div className="p-3 rounded-lg bg-warning/10 border border-warning/30">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-warning" />
                      <span className="text-xs text-muted-foreground font-semibold">Priorité</span>
                    </div>
                    <div className="text-2xl font-bold text-warning">8</div>
                    <div className="text-xs text-muted-foreground">Cette semaine</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-muted/50 border">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Surface d'attaque
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span>Ports exposés</span>
                      <Badge className="bg-success text-success-foreground text-xs">0</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span>Services vulnérables</span>
                      <Badge className="bg-destructive text-destructive-foreground text-xs">3</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span>Certificats SSL</span>
                      <Badge className="bg-success text-success-foreground text-xs">Valides</Badge>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* CEO View */}
              <TabsContent value="ceo" className="space-y-3 mt-0">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-lg bg-success/10 border border-success/30">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-success" />
                      <span className="text-xs text-muted-foreground font-semibold">Économies</span>
                    </div>
                    <div className="text-2xl font-bold text-success">240K$</div>
                    <div className="text-xs text-muted-foreground">Cette année</div>
                  </div>

                  <div className="p-3 rounded-lg bg-info/10 border border-info/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4 text-info" />
                      <span className="text-xs text-muted-foreground font-semibold">Couverture</span>
                    </div>
                    <div className="text-2xl font-bold text-info">98%</div>
                    <div className="text-xs text-muted-foreground">Partenaires</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-info/10 border border-primary/30">
                  <div className="text-xs font-semibold mb-2">Impact Business</div>
                  <div className="space-y-1.5">
                    {[
                      "Risque réduit de 87%",
                      "Conformité maintenue",
                      "0 incident en 6 mois"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="w-3 h-3 text-success flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-primary/20">
                    <div className="text-xs text-muted-foreground">ROI 12 mois</div>
                    <div className="text-xl font-bold text-primary">340%</div>
                  </div>
                </div>
              </TabsContent>

              {/* Compliance View */}
              <TabsContent value="compliance" className="space-y-3 mt-0">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-lg bg-success/10 border border-success/30">
                    <div className="flex items-center gap-2 mb-1">
                      <FileCheck className="w-4 h-4 text-success" />
                      <span className="text-xs text-muted-foreground font-semibold">DORA</span>
                    </div>
                    <div className="text-2xl font-bold text-success">✓</div>
                    <div className="text-xs text-muted-foreground">Conforme</div>
                  </div>

                  <div className="p-3 rounded-lg bg-success/10 border border-success/30">
                    <div className="flex items-center gap-2 mb-1">
                      <FileCheck className="w-4 h-4 text-success" />
                      <span className="text-xs text-muted-foreground font-semibold">NIS2</span>
                    </div>
                    <div className="text-2xl font-bold text-success">✓</div>
                    <div className="text-xs text-muted-foreground">Certifié</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-muted/50 border">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Statut réglementaire
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { label: "Loi 25 (QC)", status: "Conforme" },
                      { label: "RGPD", status: "Conforme" },
                      { label: "ISO 27001", status: "En cours" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span>{item.label}</span>
                        <Badge variant="outline" className="text-xs">{item.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        )}
      </Card>
    </div>
  );
};