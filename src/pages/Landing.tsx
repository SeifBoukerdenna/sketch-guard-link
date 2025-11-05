import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Users, BookOpen, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold">CSSDM Security</span>
          </div>
          <Button onClick={() => navigate("/app")} variant="default">
            Se connecter
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Plateforme de Sécurité Réseau
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Protégez votre infrastructure avec notre solution de détection et de prévention des menaces en temps réel
        </p>
        <Button onClick={() => navigate("/app")} size="lg" className="gap-2">
          Commencer <ArrowRight className="w-4 h-4" />
        </Button>
      </section>

      {/* About Us */}
      <section id="about" className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">À Propos</h2>
          <Card className="p-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              CSSDM Security est une plateforme avancée de surveillance et de protection des infrastructures réseau. 
              Notre solution combine l'intelligence artificielle et l'analyse comportementale pour détecter et neutraliser 
              les menaces avant qu'elles n'impactent vos systèmes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nous offrons une visibilité complète sur votre infrastructure avec des outils de visualisation interactifs, 
              des rapports détaillés et des recommandations personnalisées pour renforcer votre posture de sécurité.
            </p>
          </Card>
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
          <p>© 2025 CSSDM Security. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;