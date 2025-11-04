import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, AlertTriangle, ArrowRight, Minimize2, Maximize2, ExternalLink } from "lucide-react";

interface AITranslationPanelProps {
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

export const AITranslationPanel = ({ isMinimized = false, onToggleMinimize }: AITranslationPanelProps) => {
  return (
    <div className={`transition-all ${isMinimized ? 'h-12 overflow-hidden' : ''}`}>
      <Card className="bg-background/95 backdrop-blur-md border-2 shadow-2xl">
        <CardHeader className="pb-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 drag-handle cursor-grab active:cursor-grabbing">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xs font-medium">
              <Sparkles className="w-4 h-4 text-purple-500" />
              Traduction IA - CVE → Risque Métier
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
            {/* CVE Input Section */}
            <div className="p-3 rounded-lg bg-muted/50 border-2 border-dashed">
              <div className="flex items-start gap-2">
                <Badge className="bg-destructive text-destructive-foreground text-xs flex-shrink-0">
                  CRITICAL
                </Badge>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold font-mono">CVE-2025-1873</span>
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold">Technique:</span> Buffer overflow in Red Hat OpenShift
                  </p>
                </div>
              </div>
            </div>

            {/* AI Translation */}
            <div className="flex justify-center">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                <Sparkles className="w-3 h-3 text-purple-500 animate-pulse" />
                <span className="text-xs font-semibold">IA contextualise</span>
              </div>
            </div>

            {/* Business Risk Output */}
            <div className="p-3 rounded-lg bg-gradient-to-br from-destructive/10 to-warning/10 border-2 border-destructive/30">
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-destructive mb-1">
                    Risque d'interruption de production
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Accès données sensibles + arrêt services 48-72h
                  </p>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Système:</span>
                      <Badge variant="outline" className="text-xs">Micrologic</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Exposées:</span>
                      <Badge variant="outline" className="text-xs">INSO INC</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Impact:</span>
                      <Badge className="bg-destructive text-destructive-foreground text-xs">~250K$</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <Button size="sm" className="w-full mt-2" variant="destructive">
                <ExternalLink className="w-3 h-3 mr-1" />
                Voir recommandations
              </Button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-success/10">
                <div className="text-lg font-bold text-success">94%</div>
                <div className="text-xs text-muted-foreground">Confiance</div>
              </div>
              <div className="p-2 rounded-lg bg-warning/10">
                <div className="text-lg font-bold text-warning">8.9</div>
                <div className="text-xs text-muted-foreground">CVSS</div>
              </div>
              <div className="p-2 rounded-lg bg-info/10">
                <div className="text-lg font-bold text-info">12h</div>
                <div className="text-xs text-muted-foreground">Délai</div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};