import { AlertTriangle, Shield, FileWarning, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const AlertModal = () => {
  return (
    <Card className="p-8 border-destructive/50 border-2 border-glow-alert bg-destructive/5">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-destructive">Alerte détectée</h2>
            <Badge variant="destructive" className="text-xs">Critique</Badge>
          </div>
          <p className="text-muted-foreground">Détecté le {new Date().toLocaleDateString("fr-FR", { 
            day: "numeric", 
            month: "long", 
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <FileWarning className="w-5 h-5 text-destructive" />
            Vulnérabilité critique (CVE-2025-1873) dans Red Hat OpenShift 4.15
          </h3>
          <p className="text-foreground/90 leading-relaxed">
            Cette faille permet une élévation de privilèges via le composant de gestion des routeurs d'entrée, 
            exposant partiellement les clusters du CSSDM.
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h4 className="font-semibold mb-4 flex items-center gap-2 text-destructive">
            <Shield className="w-5 h-5" />
            Risques pour la CSSDM
          </h4>
          <ul className="space-y-2 text-foreground/90">
            <li className="flex items-start gap-2">
              <span className="text-destructive mt-1">•</span>
              <span>Fuite de données personnelles</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive mt-1">•</span>
              <span>Interruption de service du portail pédagogique et des outils internes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive mt-1">•</span>
              <span>Accès non autorisé aux systèmes administratifs</span>
            </li>
          </ul>
        </div>

        <div className="bg-accent/10 p-6 rounded-lg border border-accent/30">
          <h4 className="font-semibold mb-4 flex items-center gap-2 text-accent">
            <CheckCircle2 className="w-5 h-5" />
            Recommandations
          </h4>
          <ul className="space-y-3 text-foreground/90">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">1.</span>
              <span>Ouvrir un ticket Red Hat via Micrologic pour obtenir le correctif ou mitigation temporaire</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">2.</span>
              <span>Documenter l'incident dans le registre des incidents de confidentialité</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">3.</span>
              <span>Notifier l'équipe de sécurité et les parties prenantes concernées</span>
            </li>
          </ul>
        </div>

        <div className="flex gap-3">
          <Button className="gradient-alert border-0 text-white hover:opacity-90">
            <FileWarning className="w-4 h-4 mr-2" />
            Créer un ticket d'incident
          </Button>
          <Button variant="outline">
            <ExternalLink className="w-4 h-4 mr-2" />
            Voir CVE-2025-1873
          </Button>
          <Button variant="outline">
            Consulter le registre
          </Button>
        </div>
      </div>
    </Card>
  );
};

const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);
