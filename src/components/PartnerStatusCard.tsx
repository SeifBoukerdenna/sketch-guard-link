import { Shield, CheckCircle2, AlertTriangle, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PartnerStatus {
  name: string;
  status: "healthy" | "alert";
  certificates: string;
  ports: string;
  scanFrequency: string;
  lastScan: string;
  vulnerabilities?: number;
}

const partnerStatuses: PartnerStatus[] = [
  {
    name: "CSSDM",
    status: "healthy",
    certificates: "Tous les certificats sont à jour",
    ports: "Aucun port ouvert",
    scanFrequency: "Quotidien",
    lastScan: "Il y a 2 heures",
  },
  {
    name: "Micrologic",
    status: "alert",
    certificates: "1 certificat expirant sous 30 jours",
    ports: "Aucun port ouvert",
    scanFrequency: "Quotidien",
    lastScan: "Il y a 1 heure",
    vulnerabilities: 1,
  },
  {
    name: "Zono Canada Corp.",
    status: "healthy",
    certificates: "Tous les certificats sont à jour",
    ports: "Aucun port ouvert",
    scanFrequency: "Hebdomadaire",
    lastScan: "Il y a 3 jours",
  },
  {
    name: "INSO NC",
    status: "healthy",
    certificates: "Tous les certificats sont à jour",
    ports: "Aucun port ouvert",
    scanFrequency: "Quotidien",
    lastScan: "Il y a 4 heures",
  },
  {
    name: "COGNICON Inc.",
    status: "healthy",
    certificates: "Tous les certificats sont à jour",
    ports: "Aucun port ouvert",
    scanFrequency: "Hebdomadaire",
    lastScan: "Il y a 2 jours",
  },
];

export const PartnerStatusCard = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          État des partenaires
        </h3>
      </div>

      <div className="space-y-4">
        {partnerStatuses.map((partner) => (
          <div
            key={partner.name}
            className={`p-4 rounded-lg border-2 transition-all hover:shadow-lg ${
              partner.status === "alert"
                ? "bg-destructive/5 border-destructive/50 border-glow-alert"
                : "bg-card border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  partner.status === "alert" ? "bg-destructive/20" : "bg-success/20"
                }`}>
                  {partner.status === "alert" ? (
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{partner.name}</h4>
                  <p className="text-sm text-muted-foreground">{partner.lastScan}</p>
                </div>
              </div>
              <Badge variant={partner.status === "alert" ? "destructive" : "default"}>
                {partner.status === "alert" ? `${partner.vulnerabilities} alerte` : "Sécurisé"}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-3">
              <div>
                <p className="text-muted-foreground mb-1">Certificats</p>
                <p className="font-medium">{partner.certificates}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Ports</p>
                <p className="font-medium">{partner.ports}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Fréquence scan</p>
                <p className="font-medium">{partner.scanFrequency}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                <FileText className="w-3 h-3 mr-1" />
                Voir détails
              </Button>
              {partner.status === "alert" && (
                <Button variant="destructive" size="sm" className="text-xs">
                  Voir l'alerte
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
