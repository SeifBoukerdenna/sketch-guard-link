import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Play, Pause, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AttackStep {
  time: string;
  partner: string;
  event: string;
  severity: "critical" | "high" | "medium";
}

const mockAttackScenario: AttackStep[] = [
  { time: "14:32:15", partner: "Micrologic", event: "Vulnérabilité détectée: CVE-2025-1873", severity: "critical" },
  { time: "14:32:18", partner: "INSO INC", event: "Propagation du risque détectée", severity: "high" },
  { time: "14:32:22", partner: "CSSDM", event: "Alerte: Partenaire compromis détecté", severity: "high" },
  { time: "14:32:25", partner: "COGNIOM Inc", event: "Scan préventif déclenché", severity: "medium" },
  { time: "14:32:28", partner: "Zono Canada Corp", event: "Scan préventif déclenché", severity: "medium" },
  { time: "14:32:30", partner: "Collective", event: "Tous les partenaires notifiés", severity: "medium" }
];

export const AttackSimulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [visibleEvents, setVisibleEvents] = useState<AttackStep[]>([]);

  useEffect(() => {
    if (isRunning && currentStep < mockAttackScenario.length) {
      const timer = setTimeout(() => {
        setVisibleEvents(prev => [...prev, mockAttackScenario[currentStep]]);
        setCurrentStep(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (currentStep >= mockAttackScenario.length) {
      setIsRunning(false);
    }
  }, [isRunning, currentStep]);

  const handleStart = () => {
    if (currentStep >= mockAttackScenario.length) {
      handleReset();
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setVisibleEvents([]);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-destructive text-destructive-foreground";
      case "high": return "bg-warning text-warning-foreground";
      case "medium": return "bg-info text-info-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="bg-background/95 backdrop-blur-md border-glow-alert">
      <CardHeader className="pb-3 bg-destructive/10">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive animate-pulse" />
            Simulation d'Attaque en Temps Réel
          </div>
          <div className="flex gap-1">
            {!isRunning && currentStep < mockAttackScenario.length && (
              <Button size="sm" variant="outline" onClick={handleStart}>
                <Play className="w-4 h-4" />
              </Button>
            )}
            {isRunning && (
              <Button size="sm" variant="outline" onClick={handlePause}>
                <Pause className="w-4 h-4" />
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 max-h-80 overflow-y-auto">
        {visibleEvents.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            Cliquez sur Play pour démarrer la simulation
          </div>
        )}
        {visibleEvents.map((event, idx) => (
          <div 
            key={idx}
            className="flex items-start gap-3 p-2 rounded-lg bg-muted/50 animate-slide-in border-l-4 border-primary"
          >
            <div className="text-xs font-mono text-muted-foreground whitespace-nowrap">
              {event.time}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold truncate">{event.partner}</span>
                <Badge className={`text-xs ${getSeverityColor(event.severity)}`}>
                  {event.severity}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                {event.event}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
