import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, TrendingDown, Users, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const CollectiveDefensePanel = () => {
  return (
    <Card className="bg-background/95 backdrop-blur-md border-glow-info">
      <CardHeader className="pb-3 bg-info/10">
        <CardTitle className="flex items-center gap-2 text-base">
          <Shield className="w-5 h-5 text-info" />
          Collective Defense Mesh
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="w-4 h-4 text-success" />
              <span className="text-xs text-muted-foreground">Économies audit</span>
            </div>
            <div className="text-2xl font-bold text-success">-82%</div>
            <div className="text-xs text-muted-foreground mt-1">~240K$ économisés/an</div>
          </div>

          <div className="p-3 rounded-lg bg-gradient-to-br from-info/10 to-info/5 border border-info/20">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-info" />
              <span className="text-xs text-muted-foreground">Écosystème</span>
            </div>
            <div className="text-2xl font-bold text-info">847</div>
            <div className="text-xs text-muted-foreground mt-1">Entreprises protégées</div>
          </div>

          <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Détection</span>
            </div>
            <div className="text-2xl font-bold text-primary">2.3min</div>
            <div className="text-xs text-muted-foreground mt-1">Temps moyen d'alerte</div>
          </div>

          <div className="p-3 rounded-lg bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-warning" />
              <span className="text-xs text-muted-foreground">Scans partagés</span>
            </div>
            <div className="text-2xl font-bold text-warning">12.4K</div>
            <div className="text-xs text-muted-foreground mt-1">Ce mois-ci</div>
          </div>
        </div>

        {/* Benefits List */}
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Avantages collectifs
          </div>
          <div className="space-y-1.5">
            {[
              "Intelligence mutualisée sur 847 organisations",
              "Coûts d'audit divisés par 5 en moyenne",
              "Détection instantanée des menaces émergentes",
              "Conformité DORA/NIS2/Loi 25 automatisée"
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-info mt-1.5 flex-shrink-0"></div>
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Network Effect Badge */}
        <div className="p-3 rounded-lg bg-gradient-to-r from-primary/20 via-info/20 to-success/20 border border-primary/30">
          <div className="flex items-center gap-2">
            <Badge className="bg-primary text-primary-foreground">EFFET RÉSEAU</Badge>
            <span className="text-xs text-foreground">
              Chaque nouveau membre renforce la protection de tous
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
