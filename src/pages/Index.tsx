import { InteractiveNetworkGraph } from "@/components/InteractiveNetworkGraph";
import { SecurityDashboard } from "@/components/SecurityDashboard";
import { PartnerStatusCard } from "@/components/PartnerStatusCard";
import { AlertModal } from "@/components/AlertModal";
import { Shield, FileText, Settings, BarChart3, FolderOpen, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-cyber flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Supply Chain Security Monitor</h1>
                <p className="text-xs text-muted-foreground">Surveillance des partenaires en temps réel</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => navigate("/scan-history")}>
                <FolderOpen className="w-4 h-4 mr-2" />
                Historique
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Rapports
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Tableau de bord
            </TabsTrigger>
            <TabsTrigger value="network" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Réseau
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            {/* Security Dashboard */}
            <SecurityDashboard />

            {/* Alert Section */}
            <AlertModal />

            {/* Partner Status Cards */}
            <PartnerStatusCard />
          </TabsContent>

          <TabsContent value="network" className="space-y-8">
            {/* Interactive Network Graph */}
            <InteractiveNetworkGraph />

            {/* Alert Section */}
            <AlertModal />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2025 CSSDM - Centre de services scolaires de Montréal</p>
          <p className="mt-1">Système de surveillance de la sécurité de la chaîne d'approvisionnement</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
