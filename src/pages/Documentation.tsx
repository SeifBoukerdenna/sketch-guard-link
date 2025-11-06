import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, ArrowLeft, BookOpen, Code, Wrench, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Documentation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold">SupplyChainSec</span>
          </div>
          <Button onClick={() => navigate("/")} variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Button>
        </div>
      </header>

      {/* Content */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Documentation</h1>

          <div className="mb-12">
            <p className="text-xl text-muted-foreground">
              Guides complets pour tirer le meilleur parti de SupplyChainSec
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 hover:border-primary/50 transition-colors cursor-pointer">
              <GraduationCap className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Guide de Démarrage</h3>
              <p className="text-muted-foreground mb-4">
                Apprenez les bases pour configurer et utiliser la plateforme efficacement.
              </p>
              <Button variant="outline" size="sm">Commencer →</Button>
            </Card>

            <Card className="p-6 hover:border-primary/50 transition-colors cursor-pointer">
              <Code className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Référence API</h3>
              <p className="text-muted-foreground mb-4">
                Documentation technique complète pour les intégrations et l'automatisation.
              </p>
              <Button variant="outline" size="sm">Explorer →</Button>
            </Card>

            <Card className="p-6 hover:border-primary/50 transition-colors cursor-pointer">
              <Wrench className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Configuration</h3>
              <p className="text-muted-foreground mb-4">
                Configurez les intégrations avec vos outils existants (Red Hat, Veeam, ServiceNow).
              </p>
              <Button variant="outline" size="sm">Configurer →</Button>
            </Card>

            <Card className="p-6 hover:border-primary/50 transition-colors cursor-pointer">
              <BookOpen className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Meilleures Pratiques</h3>
              <p className="text-muted-foreground mb-4">
                Stratégies éprouvées pour optimiser votre posture de sécurité.
              </p>
              <Button variant="outline" size="sm">Lire →</Button>
            </Card>
          </div>

          <Card className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Ressources Additionnelles</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Guide de conformité Loi 25
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Tutoriels vidéo et webinaires
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                FAQ et résolution de problèmes
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Changelog et notes de version
              </li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Documentation;
