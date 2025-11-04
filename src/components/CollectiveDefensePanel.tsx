import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, TrendingDown, Users, Zap, Network, Minimize2, Maximize2 } from "lucide-react";

interface CollectiveDefensePanelProps {
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

export const CollectiveDefensePanel = ({ isMinimized = false, onToggleMinimize }: CollectiveDefensePanelProps) => {
  return (
    <div className={`transition-all ${isMinimized ? 'h-12 overflow-hidden' : ''}`}>
      <Card className="bg-background/95 backdrop-blur-md border-2 shadow-2xl">
        <CardHeader className="pb-2 bg-gradient-to-r from-primary/20 to-info/20 drag-handle cursor-grab active:cursor-grabbing">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xs font-medium">
              <Network className="w-4 h-4 text-primary" />
              Collective Defense Mesh
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
          <CardContent className="space-y-3 pt-3">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-success/10 border border-success/30">
                <div className="flex items-center gap-1 mb-1">
                  <TrendingDown className="w-3 h-3 text-success" />
                  <span className="text-xs text-muted-foreground font-semibold">Économies</span>
                </div>
                <div className="text-2xl font-bold text-success">-82%</div>
                <div className="text-xs text-muted-foreground">~240K$/an</div>
              </div>

              <div className="p-2 rounded-lg bg-info/10 border border-info/30">
                <div className="flex items-center gap-1 mb-1">
                  <Users className="w-3 h-3 text-info" />
                  <span className="text-xs text-muted-foreground font-semibold">Écosystème</span>
                </div>
                <div className="text-2xl font-bold text-info">847</div>
                <div className="text-xs text-muted-foreground">Entreprises</div>
              </div>

              <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
                <div className="flex items-center gap-1 mb-1">
                  <Zap className="w-3 h-3 text-primary" />
                  <span className="text-xs text-muted-foreground font-semibold">Détection</span>
                </div>
                <div className="text-2xl font-bold text-primary">2.3min</div>
                <div className="text-xs text-muted-foreground">Alerte</div>
              </div>

              <div className="p-2 rounded-lg bg-warning/10 border border-warning/30">
                <div className="flex items-center gap-1 mb-1">
                  <Shield className="w-3 h-3 text-warning" />
                  <span className="text-xs text-muted-foreground font-semibold">Scans</span>
                </div>
                <div className="text-2xl font-bold text-warning">12.4K</div>
                <div className="text-xs text-muted-foreground">Ce mois</div>
              </div>
            </div>

            {/* Collective Advantages */}
            <div className="p-2 rounded-lg bg-muted/50 border">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Avantages collectifs
              </div>
              <div className="space-y-1.5">
                {[
                  "Intelligence sur 847 organisations",
                  "Coûts divisés par 5",
                  "Détection instantanée",
                  "Conformité automatisée"
                ].map((advantage, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span className="text-xs">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Network Effect */}
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 via-info/20 to-success/20 p-3 border-2 border-primary/30">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <Badge className="bg-primary text-primary-foreground text-xs">EFFET RÉSEAU</Badge>
                </div>
                <p className="text-xs font-semibold mb-1">
                  Chaque membre renforce tous
                </p>
                <p className="text-xs text-muted-foreground">
                  Bouclier collectif en temps réel
                </p>
              </div>
            </div>

            {/* Participants */}
            <div className="p-2 rounded-lg border bg-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-muted-foreground">Partenaires actifs</span>
                <Badge variant="outline" className="text-xs">5 directs</Badge>
              </div>
              <div className="flex -space-x-2">
                {["CSSDM", "Micrologic", "Zono", "INSO", "COGNIOM"].map((partner, idx) => (
                  <div
                    key={idx}
                    className="w-7 h-7 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center"
                    title={partner}
                  >
                    <span className="text-xs font-bold text-primary">
                      {partner.substring(0, 2)}
                    </span>
                  </div>
                ))}
                <div className="w-7 h-7 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                  <span className="text-xs font-bold">+842</span>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};