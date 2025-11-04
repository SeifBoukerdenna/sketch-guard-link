import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Clock, ChevronDown, ChevronUp, ExternalLink, Minimize2, Maximize2 } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface RecommendationsPanelProps {
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

export const RecommendationsPanel = ({ isMinimized = false, onToggleMinimize }: RecommendationsPanelProps) => {
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  const recommendations = [
    {
      id: 1,
      priority: "HIGH",
      title: "Patcher CVE-2025-1873 immédiatement",
      description: "Vulnérabilité critique Red Hat OpenShift",
      impact: "Réduit risque de 87%",
      action: "Déployer MFA",
      time: "2-4h"
    },
    {
      id: 2,
      priority: "HIGH",
      title: "Renforcer auth. chez Micrologic",
      description: "MFA non activé sur 12 comptes admin",
      impact: "Élimine interruption",
      action: "Vers v.4.2",
      time: "30min"
    },
    {
      id: 3,
      priority: "MEDIUM",
      title: "Renouveler certificats SSL",
      description: "3 certificats expirent dans 15j",
      impact: "Maintient DORA",
      action: "Auto-renouvellement",
      time: "1h"
    }
  ];

  const timelineEvents = [
    {
      time: "16:47",
      title: "Scan terminé",
      description: "847 partenaires - Aucune menace",
      type: "success"
    },
    {
      time: "14:23",
      title: "Attaque prévenue",
      description: "Exploitation bloquée via COGNIOM",
      type: "warning"
    },
    {
      time: "2j",
      title: "Conformité à jour",
      description: "SSL renouvelés (3 partenaires)",
      type: "success"
    }
  ];

  const getPriorityColor = (priority: string) => {
    return priority === "HIGH"
      ? "bg-destructive text-destructive-foreground"
      : "bg-warning text-warning-foreground";
  };

  const getTimelineIcon = (type: string) => {
    return type === "success" ? (
      <CheckCircle2 className="w-3 h-3 text-success" />
    ) : (
      <AlertCircle className="w-3 h-3 text-warning" />
    );
  };

  return (
    <div className={`transition-all ${isMinimized ? 'h-12 overflow-hidden' : ''}`}>
      <Card className="bg-background/95 backdrop-blur-md border-2 shadow-2xl">
        <CardHeader className="pb-2 bg-muted/50 drag-handle cursor-grab active:cursor-grabbing">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xs font-medium">
              <AlertCircle className="w-4 h-4 text-warning" />
              Recommandations Auto
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
          <CardContent className="space-y-2 pt-3">
            {/* Recommendations - Compact */}
            <div className="space-y-2">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="p-2 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-1">
                        <Badge className={getPriorityColor(rec.priority) + " text-xs"}>
                          {rec.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="w-2 h-2 mr-1" />
                          {rec.time}
                        </Badge>
                      </div>
                      <h4 className="text-xs font-semibold mb-1 leading-tight">{rec.title}</h4>
                      <p className="text-xs text-muted-foreground">{rec.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mt-2 pt-2 border-t text-xs">
                    <CheckCircle2 className="w-3 h-3 text-success flex-shrink-0" />
                    <span className="text-muted-foreground text-xs">{rec.impact}</span>
                  </div>

                  <Button size="sm" className="w-full mt-2 h-7 text-xs" variant="outline">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    {rec.action}
                  </Button>
                </div>
              ))}
            </div>

            {/* Collapsible Timeline */}
            <Collapsible open={isTimelineOpen} onOpenChange={setIsTimelineOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between h-8" size="sm">
                  <span className="flex items-center gap-2 text-xs">
                    <Clock className="w-3 h-3" />
                    Timeline
                  </span>
                  {isTimelineOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="mt-2">
                <div className="space-y-2">
                  {timelineEvents.map((event, idx) => (
                    <div key={idx} className="relative pl-5 pb-2 last:pb-0">
                      {idx !== timelineEvents.length - 1 && (
                        <div className="absolute left-1.5 top-5 bottom-0 w-px bg-border" />
                      )}

                      <div className="absolute left-0 top-1">
                        {getTimelineIcon(event.type)}
                      </div>

                      <div className="bg-muted/50 rounded-lg p-2 border">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold">{event.title}</span>
                          <Badge variant="outline" className="text-xs">{event.time}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Network Effect */}
            <div className="pt-2 border-t">
              <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-primary/10 border border-primary/30">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-medium">
                  Chaque membre renforce tous
                </span>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};