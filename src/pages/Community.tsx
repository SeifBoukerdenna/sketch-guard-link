import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, ArrowLeft, Users, MessageSquare, Bell, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold">Secure Chain Sec</span>
          </div>
          <Button onClick={() => navigate("/")} variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Button>
        </div>
      </header>

      {/* Content */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Communauté Secure Chain Sec</h1>

          <div className="mb-12 text-center">
            <p className="text-xl text-muted-foreground">
              Rejoignez une communauté active de professionnels de la sécurité au Québec
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Réseau Collaboratif</h3>
              <p className="text-muted-foreground">
                Connectez-vous avec d'autres institutions pour partager les menaces et les solutions en temps réel.
              </p>
            </Card>

            <Card className="p-6">
              <Bell className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Alertes Partagées</h3>
              <p className="text-muted-foreground">
                Recevez des notifications instantanées lorsqu'une vulnérabilité affecte vos fournisseurs communs.
              </p>
            </Card>

            <Card className="p-6">
              <MessageSquare className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Forums de Discussion</h3>
              <p className="text-muted-foreground">
                Échangez sur les meilleures pratiques et les défis de sécurité spécifiques au secteur public québécois.
              </p>
            </Card>

            <Card className="p-6">
              <Award className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Expertise Collective</h3>
              <p className="text-muted-foreground">
                Bénéficiez de l'expérience collective de centaines de professionnels de la sécurité.
              </p>
            </Card>
          </div>

          <Card className="p-8 bg-primary/5 border-primary/20">
            <h2 className="text-2xl font-semibold mb-4 text-center">Rejoignez la Communauté</h2>
            <p className="text-muted-foreground text-center mb-6">
              Ensemble, nous rendons l'écosystème numérique québécois plus sûr
            </p>
            <div className="flex justify-center">
              <Button size="lg" onClick={() => navigate("/app")}>
                Commencer Maintenant
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Community;
