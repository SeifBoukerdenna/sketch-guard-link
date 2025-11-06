import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Users, BookOpen, ArrowRight, Eye, Zap, Lock, Heart, FileCheck, Puzzle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold">Secure Chain Sec</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate("/about")} className="text-sm hover:text-primary transition-colors">
              À Propos
            </button>
            <button onClick={() => navigate("/community")} className="text-sm hover:text-primary transition-colors">
              Communauté
            </button>
            <button onClick={() => navigate("/documentation")} className="text-sm hover:text-primary transition-colors">
              Documentation
            </button>
            <Button onClick={() => navigate("/app")} variant="default" size="sm">
              Se connecter
            </Button>
          </nav>
          <Button onClick={() => navigate("/app")} variant="default" size="sm" className="md:hidden">
            Se connecter
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Protection Complète de la Chaîne d'Approvisionnement Numérique
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Détection proactive des vulnérabilités et défense collective pour les institutions québécoises
        </p>
        <Button onClick={() => navigate("/app")} size="lg" className="gap-2">
          Commencer <ArrowRight className="w-4 h-4" />
        </Button>
      </section>

      {/* About Us - Valeur Unique */}
      <section id="about" className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Valeur Unique de SecureChainSec</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 1. Visibilité complète */}
            <Card className="p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <Eye className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-3">🧠 Visibilité complète sur les fournisseurs et leurs risques</h3>
                  <p className="text-muted-foreground mb-3">
                    SecureChainSec donne aux organisations une vision claire, automatisée et à plusieurs niveaux de leurs fournisseurs technologiques et des risques associés à chacun.
                  </p>
                  <p className="text-muted-foreground mb-3">
                    Là où la majorité des outils s'arrêtent au fournisseur direct, SecureChainSec analyse toute la chaîne numérique : jusqu'aux logiciels, API et sous-traitants utilisés en arrière-plan.
                  </p>
                  <p className="text-sm text-primary font-medium">
                    💡 On ne vous dit pas juste "qui est vulnérable", on vous montre où le risque se propage et jusqu'où.
                  </p>
                </div>
              </div>
            </Card>

            {/* 2. Détection proactive */}
            <Card className="p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <Zap className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-3">⚡ Détection proactive — pas réactive</h3>
                  <p className="text-muted-foreground mb-3">
                    Le système scanne automatiquement les composants logiciels (via SBOM), corrèle les vulnérabilités (CVE) dès leur publication, et alerte avant qu'elles soient exploitées.
                  </p>
                  <p className="text-muted-foreground mb-3">
                    Cela permet aux institutions (CSSDM, hôpitaux, villes) de gagner plusieurs jours à semaines sur les délais habituels de détection.
                  </p>
                  <p className="text-sm text-primary font-medium">
                    💡 Moins d'incidents, moins de chaos, moins d'amendes Loi 25.
                  </p>
                </div>
              </div>
            </Card>

            {/* 3. Traduction du risque */}
            <Card className="p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <Lock className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-3">🔒 Traduction du risque technique en impact métier</h3>
                  <p className="text-muted-foreground mb-3">
                    SecureChainSec convertit des vulnérabilités complexes (CVE, ports, composants) en conséquences claires et compréhensibles pour les gestionnaires :
                  </p>
                  <ul className="text-muted-foreground mb-3 list-disc list-inside space-y-1">
                    <li>"Les données élèves pourraient être exposées via Red Hat OpenShift."</li>
                    <li>"Les images médicales transitent via un service vulnérable."</li>
                  </ul>
                  <p className="text-sm text-primary font-medium">
                    👉 Les dirigeants comprennent enfin quoi faire et pourquoi agir vite.
                  </p>
                </div>
              </div>
            </Card>

            {/* 4. Défense collective */}
            <Card className="p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <Heart className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-3">🤝 Défense collective et alerte partagée</h3>
                  <p className="text-muted-foreground mb-3">
                    Lorsqu'une faille est découverte chez un fournisseur (ex. Micrologic, Red Hat, MOVEit), toutes les autres organisations connectées à ce fournisseur sont immédiatement alertées.
                  </p>
                  <p className="text-muted-foreground mb-3">
                    Cela crée un réseau de défense mutualisé entre hôpitaux, écoles et institutions québécoises.
                  </p>
                  <p className="text-sm text-primary font-medium">
                    💡 Ce n'est pas juste un outil — c'est une communauté de protection inter-organisations.
                  </p>
                </div>
              </div>
            </Card>

            {/* 5. Conformité automatisée */}
            <Card className="p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <FileCheck className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-3">📋 Conformité automatisée</h3>
                  <p className="text-muted-foreground mb-3">
                    Les rapports générés automatiquement simplifient la démonstration de conformité (Loi 25, ISO 27001, SOC 2).
                  </p>
                  <p className="text-muted-foreground mb-3">
                    Vous obtenez des preuves claires pour les audits, sans avoir à tout compiler manuellement.
                  </p>
                </div>
              </div>
            </Card>

            {/* 6. Intégration simple */}
            <Card className="p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <Puzzle className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-3">🧩 Intégration simple, sans données sensibles</h3>
                  <p className="text-muted-foreground mb-3">
                    La plateforme ne stocke aucune donnée personnelle, seulement des métadonnées techniques sur les fournisseurs et leurs logiciels.
                  </p>
                  <p className="text-muted-foreground mb-3">
                    Elle s'intègre facilement à des environnements existants (Red Hat, Veeam, ServiceNow, Splunk) sans changer les infrastructures.
                  </p>
                  <p className="text-sm text-primary font-medium">
                    💡 Zéro friction, zéro risque de conformité.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 hover:border-primary/50 transition-colors">
            <Shield className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Détection Avancée</h3>
            <p className="text-muted-foreground">
              Identification proactive des vulnérabilités et des comportements suspects avec l'IA
            </p>
          </Card>

          <Card className="p-6 hover:border-primary/50 transition-colors">
            <Users className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
            <p className="text-muted-foreground">
              Partagez les menaces et les solutions avec la communauté de sécurité
            </p>
          </Card>

          <Card className="p-6 hover:border-primary/50 transition-colors">
            <BookOpen className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Documentation</h3>
            <p className="text-muted-foreground">
              Accédez à des guides complets et des meilleures pratiques en sécurité
            </p>
          </Card>
        </div>
      </section>

      {/* Community */}
      <section id="community" className="container mx-auto px-6 py-16 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <Users className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Communauté</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Rejoignez une communauté active de professionnels de la sécurité. Partagez vos découvertes,
            apprenez des autres et contribuez à un écosystème de sécurité plus robuste.
            Ensemble, nous rendons le cyberespace plus sûr.
          </p>
          <Button variant="outline" size="lg">
            Rejoindre la Communauté
          </Button>
        </div>
      </section>

      {/* Documentation */}
      <section id="documentation" className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Documentation</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Explorez notre documentation complète pour tirer le meilleur parti de la plateforme.
            Guides d'installation, tutoriels, API reference et bonnes pratiques de sécurité.
          </p>
          <Button variant="outline" size="lg">
            Voir la Documentation
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-6 py-8 text-center text-muted-foreground">
          <p>© 2025 Secure Chain Sec. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;