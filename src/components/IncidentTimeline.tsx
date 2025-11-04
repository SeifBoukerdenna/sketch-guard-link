import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle2, AlertTriangle, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TimelineEvent {
  time: string;
  date: string;
  title: string;
  description: string;
  type: "resolved" | "detected" | "prevented";
  severity?: "critical" | "high" | "medium";
}

const mockTimeline: TimelineEvent[] = [
  {
    time: "14:32",
    date: "Aujourd'hui",
    title: "Vulnérabilité critique détectée",
    description: "CVE-2025-1873 détecté chez Micrologic - Propagation bloquée",
    type: "detected",
    severity: "critical"
  },
  {
    time: "09:15",
    date: "Aujourd'hui",
    title: "Scan quotidien terminé",
    description: "847 partenaires scannés - Aucune nouvelle menace",
    type: "resolved"
  },
  {
    time: "16:45",
    date: "Hier",
    title: "Attaque prévenue",
    description: "Tentative d'exploitation détectée et bloquée via COGNIOM Inc",
    type: "prevented",
    severity: "high"
  },
  {
    time: "11:20",
    date: "2 jours",
    title: "Mise à jour de conformité",
    description: "Certificats SSL renouvelés pour 3 partenaires",
    type: "resolved"
  },
  {
    time: "08:30",
    date: "3 jours",
    title: "Vulnérabilité corrigée",
    description: "CVE-2024-8392 patché sur tous les systèmes affectés",
    type: "resolved",
    severity: "high"
  }
];

export const IncidentTimeline = () => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "resolved": return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "detected": return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case "prevented": return <Shield className="w-4 h-4 text-warning" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "resolved": return "border-success/50 bg-success/5";
      case "detected": return "border-destructive/50 bg-destructive/5";
      case "prevented": return "border-warning/50 bg-warning/5";
      default: return "border-border bg-muted/50";
    }
  };

  return (
    <Card className="bg-background/95 backdrop-blur-md border-glow">
      <CardHeader className="pb-3 bg-muted/30">
        <CardTitle className="flex items-center gap-2 text-base">
          <Clock className="w-5 h-5 text-primary" />
          Timeline des Incidents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border"></div>
          
          {mockTimeline.map((event, idx) => (
            <div key={idx} className="relative pl-14 pb-4 last:pb-0 animate-slide-in" style={{ animationDelay: `${idx * 50}ms` }}>
              {/* Time badge */}
              <div className="absolute left-0 top-0 flex flex-col items-end">
                <span className="text-xs font-semibold">{event.time}</span>
                <span className="text-xs text-muted-foreground">{event.date}</span>
              </div>
              
              {/* Icon */}
              <div className="absolute left-5 top-1 w-5 h-5 rounded-full bg-background border-2 border-border flex items-center justify-center">
                {getTypeIcon(event.type)}
              </div>

              {/* Content */}
              <div className={`p-3 rounded-lg border ${getTypeColor(event.type)}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold">{event.title}</span>
                  {event.severity && (
                    <Badge variant="outline" className="text-xs">
                      {event.severity}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
