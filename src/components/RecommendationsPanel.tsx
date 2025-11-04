import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, ExternalLink, CheckCircle2 } from "lucide-react";

interface Recommendation {
  id: string;
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  action: string;
  estimatedTime: string;
  impact: string;
}

const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    priority: "high",
    title: "Patcher CVE-2025-1873 immédiatement",
    description: "Vulnérabilité critique dans Red Hat OpenShift 4.15",
    action: "Mettre à jour vers version 4.15.3",
    estimatedTime: "2-4 heures",
    impact: "Élimine risque d'interruption production"
  },
  {
    id: "2",
    priority: "high",
    title: "Renforcer authentification chez Micrologic",
    description: "MFA non activé sur 12 comptes administrateurs",
    action: "Déployer MFA obligatoire",
    estimatedTime: "30 minutes",
    impact: "Réduit risque de compromission de 87%"
  },
  {
    id: "3",
    priority: "medium",
    title: "Renouveler certificats SSL",
    description: "3 certificats expirent dans 15 jours",
    action: "Renouveler via Let's Encrypt",
    estimatedTime: "1 heure",
    impact: "Maintient conformité DORA/NIS2"
  },
  {
    id: "4",
    priority: "medium",
    title: "Audit de conformité Loi 25",
    description: "Mise à jour requise suite à nouveau règlement",
    action: "Générer rapport automatique",
    estimatedTime: "15 minutes",
    impact: "Évite sanctions jusqu'à 25M$"
  }
];

export const RecommendationsPanel = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-info text-info-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="bg-background/95 backdrop-blur-md border-glow-warning">
      <CardHeader className="pb-3 bg-warning/10">
        <CardTitle className="flex items-center gap-2 text-base">
          <Lightbulb className="w-5 h-5 text-warning" />
          Recommandations Automatiques
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
        {mockRecommendations.map((rec, idx) => (
          <div 
            key={rec.id}
            className="p-3 rounded-lg border border-border hover:border-primary/50 transition-all animate-slide-in"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge className={`text-xs ${getPriorityColor(rec.priority)}`}>
                  {rec.priority.toUpperCase()}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  ⏱️ {rec.estimatedTime}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">{rec.title}</h4>
              <p className="text-xs text-muted-foreground">{rec.description}</p>
              
              <div className="flex items-start gap-2 text-xs bg-muted/50 p-2 rounded">
                <CheckCircle2 className="w-3 h-3 text-success mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{rec.impact}</span>
              </div>

              {/* Action */}
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full text-xs mt-2"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                {rec.action}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
