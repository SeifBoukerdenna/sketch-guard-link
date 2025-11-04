import { AlertTriangle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AlertModalProps {
  onClose: () => void;
}

const AlertModal = ({ onClose }: AlertModalProps) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            Alerte détectée
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">
              Vulnérabilité critique (CVE-2025-1873) dans Red Hat OpenShift 4.15
            </h3>
            <p className="text-sm text-muted-foreground">
              Cette faille permet une élévation de privilèges via le composant de gestion des 
              routeurs d'entrée, exposant partiellement les clusters du CSSDM.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-destructive">Risques pour le CSSDM</h4>
            <ul className="space-y-1 text-sm">
              <li>• Fuite de données personnelles</li>
              <li>• Interruption de service du portail pédagogique et des outils internes</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Recommandation</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Ouvrir un ticket Red Hat via Micrologic pour obtenir le correctif ou mitigation temporaire</li>
              <li>• Documenter l'incident dans le registre des incidents de confidentialité</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <Button className="flex-1">
              <FileText className="w-4 h-4 mr-2" />
              Générer un rapport
            </Button>
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { AlertModal };
