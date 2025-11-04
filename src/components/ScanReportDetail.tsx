import { X, AlertTriangle, CheckCircle2, Shield, Clock, Users, FileWarning } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ScanReport {
  id: string;
  date: string;
  time: string;
  status: "success" | "warning" | "error";
  partnersScanned: number;
  vulnerabilitiesFound: number;
  duration: string;
}

interface VulnerabilityDetail {
  id: string;
  partner: string;
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  cve?: string;
}

interface ScanReportDetailProps {
  report: ScanReport;
  onClose: () => void;
}

// Mock vulnerability data - in real app this would come from backend
const getVulnerabilities = (reportId: string): VulnerabilityDetail[] => {
  if (reportId === "daily-001" || reportId === "weekly-001") {
    return [
      {
        id: "vuln-1",
        partner: "Red Hat",
        severity: "high",
        title: "CVE-2024-12345: OpenShift Authentication Bypass",
        description: "Une vulnérabilité critique a été découverte permettant un contournement de l'authentification.",
        cve: "CVE-2024-12345"
      },
      {
        id: "vuln-2",
        partner: "Red Hat",
        severity: "medium",
        title: "Configuration SSL obsolète",
        description: "Le certificat SSL utilise un algorithme de chiffrement obsolète.",
      },
      {
        id: "vuln-3",
        partner: "Veeam",
        severity: "low",
        title: "Mise à jour disponible",
        description: "Une nouvelle version de Veeam Backup est disponible avec des correctifs de sécurité.",
      },
      {
        id: "vuln-4",
        partner: "Cirrus PaaS",
        severity: "medium",
        title: "Port non sécurisé exposé",
        description: "Un port de gestion est exposé publiquement sans authentification appropriée.",
      }
    ];
  } else if (reportId === "daily-002" || reportId === "weekly-003" || reportId === "monthly-001") {
    return [
      {
        id: "vuln-5",
        partner: "Micrologic",
        severity: "medium",
        title: "Certificat expirant bientôt",
        description: "Le certificat SSL expire dans 15 jours.",
      },
      {
        id: "vuln-6",
        partner: "Cloud Connect",
        severity: "low",
        title: "Dépendance obsolète détectée",
        description: "Une bibliothèque utilisée n'est plus supportée.",
      }
    ];
  }
  return [];
};

export const ScanReportDetail = ({ report, onClose }: ScanReportDetailProps) => {
  const vulnerabilities = getVulnerabilities(report.id);
  
  const getStatusColor = () => {
    switch (report.status) {
      case "success": return "text-success";
      case "warning": return "text-accent";
      case "error": return "text-destructive";
    }
  };

  const getStatusIcon = () => {
    switch (report.status) {
      case "success": return <CheckCircle2 className="w-6 h-6 text-success" />;
      case "warning": return <AlertTriangle className="w-6 h-6 text-accent" />;
      case "error": return <AlertTriangle className="w-6 h-6 text-destructive" />;
    }
  };

  const getSeverityBadge = (severity: "high" | "medium" | "low") => {
    const variants = {
      high: "destructive",
      medium: "default",
      low: "secondary"
    };
    const labels = {
      high: "Élevé",
      medium: "Moyen",
      low: "Faible"
    };
    return <Badge variant={variants[severity] as any}>{labels[severity]}</Badge>;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
          <div className="flex items-start gap-4">
            {getStatusIcon()}
            <div>
              <CardTitle className="text-xl mb-1">Rapport de scan détaillé</CardTitle>
              <p className="text-sm text-muted-foreground">{report.date} à {report.time}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Statut</p>
                  <p className={`font-semibold ${getStatusColor()}`}>
                    {report.status === "success" ? "Sain" : report.status === "warning" ? "Avertissement" : "Critique"}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Partenaires</p>
                  <p className="font-semibold">{report.partnersScanned}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                  <FileWarning className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Vulnérabilités</p>
                  <p className="font-semibold text-destructive">{report.vulnerabilitiesFound}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Durée</p>
                  <p className="font-semibold">{report.duration}</p>
                </div>
              </div>
            </Card>
          </div>

          <Separator />

          {/* Vulnerabilities List */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Vulnérabilités détectées ({vulnerabilities.length})
            </h3>
            
            {vulnerabilities.length === 0 ? (
              <Card className="p-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-3" />
                <p className="text-muted-foreground">Aucune vulnérabilité détectée lors de ce scan.</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {vulnerabilities.map((vuln) => (
                  <Card key={vuln.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getSeverityBadge(vuln.severity)}
                          <Badge variant="outline">{vuln.partner}</Badge>
                          {vuln.cve && <Badge variant="secondary">{vuln.cve}</Badge>}
                        </div>
                        <h4 className="font-semibold mb-1">{vuln.title}</h4>
                        <p className="text-sm text-muted-foreground">{vuln.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button className="flex-1">Exporter en PDF</Button>
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Fermer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
