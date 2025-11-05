import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold">Secure Sec Chain</span>
          </div>
          <Button onClick={() => navigate("/")} variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Button>
        </div>
      </header>

      {/* Content */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">À Propos de Secure Sec Chain</h1>
          
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Notre Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Secure Sec Chain est une plateforme avancée de protection de la chaîne d'approvisionnement numérique 
              conçue spécifiquement pour les institutions québécoises. Notre mission est de fournir une visibilité 
              complète sur les risques de sécurité tout en facilitant la collaboration entre organisations.
            </p>
          </Card>

          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Notre Approche</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Nous combinons l'analyse automatisée des vulnérabilités avec l'intelligence collective pour 
              créer un écosystème de sécurité robuste. Notre plateforme ne se contente pas de détecter les 
              menaces - elle aide les organisations à comprendre leur impact réel et à agir rapidement.
            </p>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Pour Qui?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Secure Sec Chain est conçu pour les institutions québécoises - écoles, hôpitaux, municipalités 
              et organisations gouvernementales - qui cherchent à protéger leurs données sensibles et à se 
              conformer aux réglementations comme la Loi 25.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;
