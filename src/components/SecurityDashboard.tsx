import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Activity,
  Network,
  Zap,
  Clock,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  variant?: "default" | "success" | "warning" | "destructive";
}

const MetricCard = ({ title, value, change, icon, variant = "default" }: MetricCardProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "success":
        return "border-success/50 bg-success/5";
      case "warning":
        return "border-accent/50 bg-accent/5";
      case "destructive":
        return "border-destructive/50 bg-destructive/5";
      default:
        return "border-primary/50 bg-primary/5";
    }
  };

  const getIconBg = () => {
    switch (variant) {
      case "success":
        return "bg-success/20";
      case "warning":
        return "bg-accent/20";
      case "destructive":
        return "bg-destructive/20";
      default:
        return "bg-primary/20";
    }
  };

  return (
    <Card className={`p-4 border-2 ${getVariantClasses()} transition-all hover:scale-105 animate-fade-in`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold mb-2">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 text-xs">
              {change > 0 ? (
                <>
                  <TrendingUp className="w-3 h-3 text-success" />
                  <span className="text-success">+{change}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-3 h-3 text-destructive" />
                  <span className="text-destructive">{change}%</span>
                </>
              )}
              <span className="text-muted-foreground ml-1">vs dernier mois</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg ${getIconBg()} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

export const SecurityDashboard = () => {
  const overallScore = 87;
  const criticalAlerts = 4;
  const totalPartners = 20;
  const healthyPartners = 16;
  const warningPartners = 2;
  const totalConnections = 35;
  const avgResponseTime = "1.2h";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Score Card */}
      <Card className="p-6 md:p-8 gradient-cyber border-primary/50 border-2 border-glow">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="white"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${(overallScore / 100) * 351.86} 351.86`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary-foreground">{overallScore}</p>
                  <p className="text-xs text-primary-foreground/70">Score</p>
                </div>
              </div>
            </div>
            <div className="text-primary-foreground">
              <h2 className="text-3xl font-bold mb-2">Score de Sécurité Global</h2>
              <p className="text-primary-foreground/80 mb-3">
                État de sécurité de la chaîne d'approvisionnement
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +3% ce mois
                </Badge>
                <Badge className="bg-success/20 text-success-foreground border-success/30">
                  Bonne posture
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 text-primary-foreground">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm">{healthyPartners} partenaires sécurisés</span>
            </div>
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm">{criticalAlerts} alertes actives</span>
            </div>
            <div className="flex items-center gap-3">
              <Network className="w-5 h-5" />
              <span className="text-sm">{totalConnections} connexions surveillées</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Partenaires Actifs"
          value={totalPartners}
          change={5}
          icon={<Network className="w-6 h-6 text-primary" />}
          variant="default"
        />
        <MetricCard
          title="Alertes Critiques"
          value={criticalAlerts}
          change={-25}
          icon={<AlertTriangle className="w-6 h-6 text-destructive" />}
          variant="destructive"
        />
        <MetricCard
          title="Conformité"
          value="94%"
          change={2}
          icon={<Shield className="w-6 h-6 text-success" />}
          variant="success"
        />
        <MetricCard
          title="Temps de Réponse Moyen"
          value={avgResponseTime}
          change={-15}
          icon={<Zap className="w-6 h-6 text-accent" />}
          variant="warning"
        />
      </div>

      {/* Detailed Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            État des Partenaires
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  Sécurisés
                </span>
                <span className="text-sm font-bold">{healthyPartners}/{totalPartners}</span>
              </div>
              <Progress value={(healthyPartners / totalPartners) * 100} className="h-2" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-accent" />
                  Avertissements
                </span>
                <span className="text-sm font-bold">{warningPartners}/{totalPartners}</span>
              </div>
              <Progress value={(warningPartners / totalPartners) * 100} className="h-2 [&>div]:bg-accent" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  Critiques
                </span>
                <span className="text-sm font-bold">{criticalAlerts}/{totalPartners}</span>
              </div>
              <Progress value={(criticalAlerts / totalPartners) * 100} className="h-2 [&>div]:bg-destructive" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Dernières Activités
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
              <div className="w-2 h-2 rounded-full bg-destructive mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">CVE-2025-1873 détecté sur Red Hat OpenShift</p>
                <p className="text-xs text-muted-foreground">Il y a 45 minutes</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
              <div className="w-2 h-2 rounded-full bg-destructive mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Vulnérabilité critique sur Sophos Firewall</p>
                <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
              <div className="w-2 h-2 rounded-full bg-success mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Scan quotidien complété avec succès</p>
                <p className="text-xs text-muted-foreground">Il y a 3 heures</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-accent/20">
              <div className="w-2 h-2 rounded-full bg-accent mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Certificat expirant pour Fortinet dans 28 jours</p>
                <p className="text-xs text-muted-foreground">Il y a 12 heures</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Risk Categories */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Catégories de Risques
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-border bg-card/50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-sm">Vulnérabilités Logicielles</h4>
              <Badge variant="destructive">Élevé</Badge>
            </div>
            <Progress value={75} className="h-2 [&>div]:bg-destructive mb-2" />
            <p className="text-xs text-muted-foreground">3 vulnérabilités critiques détectées</p>
          </div>
          
          <div className="p-4 rounded-lg border border-border bg-card/50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-sm">Conformité & Certifications</h4>
              <Badge variant="default" className="bg-accent/20 text-accent">Moyen</Badge>
            </div>
            <Progress value={45} className="h-2 [&>div]:bg-accent mb-2" />
            <p className="text-xs text-muted-foreground">2 certificats expirant sous 30 jours</p>
          </div>
          
          <div className="p-4 rounded-lg border border-border bg-card/50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-sm">Configuration Réseau</h4>
              <Badge className="bg-success/20 text-success">Faible</Badge>
            </div>
            <Progress value={20} className="h-2 [&>div]:bg-success mb-2" />
            <p className="text-xs text-muted-foreground">Aucun port ouvert non autorisé</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
