import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, ArrowRight, AlertTriangle } from "lucide-react";

interface CVETranslation {
  cve: string;
  technical: string;
  businessRisk: string;
  impact: string;
  severity: "critical" | "high" | "medium";
  affectedPartners: string[];
}

const mockTranslations: CVETranslation[] = [
  {
    cve: "CVE-2025-1873",
    technical: "Buffer overflow in Red Hat OpenShift authentication module",
    businessRisk: "Risque d'interruption de production",
    impact: "Un attaquant pourrait accéder aux données sensibles et causer un arrêt des services pendant 48-72h",
    severity: "critical",
    affectedPartners: ["Micrologic", "INSO INC"]
  },
  {
    cve: "CVE-2024-8392",
    technical: "SQL injection vulnerability in legacy API endpoint",
    businessRisk: "Exposition de données clients",
    impact: "Fuite potentielle de 50,000+ dossiers clients avec risque réglementaire (RGPD, Loi 25)",
    severity: "high",
    affectedPartners: ["COGNIOM Inc"]
  },
  {
    cve: "CVE-2024-7145",
    technical: "Outdated SSL/TLS protocol support",
    businessRisk: "Non-conformité réglementaire",
    impact: "Échec d'audit DORA/NIS2 potentiel avec sanctions jusqu'à 10M€",
    severity: "medium",
    affectedPartners: ["Zono Canada Corp"]
  }
];

export const AITranslationPanel = () => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-destructive text-destructive-foreground";
      case "high": return "bg-warning text-warning-foreground";
      case "medium": return "bg-info text-info-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="bg-background/95 backdrop-blur-md border-glow">
      <CardHeader className="pb-3 bg-muted/30">
        <CardTitle className="flex items-center gap-2 text-base">
          <Brain className="w-5 h-5 text-primary" />
          Traduction IA - CVE → Risque Métier
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
        {mockTranslations.map((item, idx) => (
          <div 
            key={item.cve}
            className="p-3 rounded-lg border border-border hover:border-primary/50 transition-all animate-slide-in"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* CVE Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{item.cve}</code>
                <Badge className={`text-xs ${getSeverityColor(item.severity)}`}>
                  {item.severity.toUpperCase()}
                </Badge>
              </div>
              <AlertTriangle className="w-4 h-4 text-destructive" />
            </div>

            {/* Translation */}
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="text-xs text-muted-foreground flex-1">
                  <span className="font-semibold">Technique:</span> {item.technical}
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-primary">
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
                <div className="h-px bg-primary/20 flex-1"></div>
              </div>

              <div className="text-xs space-y-1">
                <div className="font-semibold text-foreground">
                  🎯 {item.businessRisk}
                </div>
                <div className="text-muted-foreground">
                  {item.impact}
                </div>
              </div>

              {/* Affected Partners */}
              <div className="flex flex-wrap gap-1 pt-1">
                {item.affectedPartners.map(partner => (
                  <span key={partner} className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded">
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
