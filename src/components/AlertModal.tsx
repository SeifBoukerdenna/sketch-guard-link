import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AlertModalProps {
  onClose: () => void;
}

export const AlertModal = ({ onClose }: AlertModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-lg border-2 border-destructive shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Vulnérabilité détectée</h2>
                <p className="text-sm text-muted-foreground">Niveau: Critique</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="space-y-4 mb-6">
            {/* CVE Info */}
            <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
              <div className="font-semibold mb-1">CVE-2025-1873</div>
              <div className="text-sm text-muted-foreground">
                Vulnérabilité critique dans Red Hat OpenShift 4.15
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2 text-sm">Description</h3>
              <p className="text-sm text-muted-foreground">
                Une élévation de privilèges via le composant de gestion des routeurs d'entrée,
                exposant partiellement les clusters du CSSDM.
              </p>
            </div>

            {/* Impact */}
            <div>
              <h3 className="font-semibold mb-2 text-sm">Impact métier</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-0.5">•</span>
                  <span>Risque d'interruption du portail pédagogique</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-0.5">•</span>
                  <span>Fuite potentielle de données personnelles</span>
                </li>
              </ul>
            </div>

            {/* Recommendation */}
            <div>
              <h3 className="font-semibold mb-2 text-sm">Recommandation</h3>
              <p className="text-sm text-muted-foreground">
                Ouvrir un ticket Red Hat via Micrologic pour obtenir le correctif ou
                mitigation temporaire.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button className="flex-1" variant="default">
              Ouvrir un ticket
            </Button>
            <Button className="flex-1" variant="outline" onClick={onClose}>
              Marquer comme vu
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};