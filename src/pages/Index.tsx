import { useState } from "react";
import { InteractiveNetworkGraph } from "@/components/InteractiveNetworkGraph";
import { AlertModal } from "@/components/AlertModal";
import { Shield, FolderOpen, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const partners = [
    { name: "CSSDM", status: "healthy" },
    { name: "Micrologic", status: "healthy" },
    { name: "Zono Canada Corp", status: "healthy" },
    { name: "INSO INC", status: "healthy" },
    { name: "COGNIOM Inc", status: "healthy" },
  ];

  const statusMessages = [
    "Tous les certificats sont à jour",
    "Aucun port ouvert",
    "Scan quotidien effectué"
  ];

  return (
    <div className="relative h-screen overflow-hidden bg-background">
      {/* Network Graph as Background */}
      <div className="absolute inset-0 z-0">
        <InteractiveNetworkGraph />
      </div>

      {/* Header Overlay */}
      <header className="absolute top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <div>
                <h1 className="text-sm font-semibold">SupplyChainSec</h1>
                <p className="text-xs text-muted-foreground">CSSDM</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate("/scan-history")}>
              <FolderOpen className="w-4 h-4 mr-2" />
              Historique
            </Button>
          </div>
        </div>
      </header>

      {/* Floating Widgets */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="container mx-auto h-full p-4 flex flex-col gap-4">
          {/* Status Widget - Top Left */}
          <Card className="pointer-events-auto w-80 bg-background/95 backdrop-blur-md shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                {showAlert ? (
                  <>
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    Vulnérabilités détectées
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Système sécurisé
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Partners List */}
              <div className="space-y-1">
                {partners.map((partner) => (
                  <div
                    key={partner.name}
                    className="text-xs px-2 py-1 rounded hover:bg-muted transition-colors"
                  >
                    {partner.name}
                  </div>
                ))}
              </div>

              {/* Status Messages */}
              {!showAlert && (
                <div className="pt-2 border-t border-border space-y-1">
                  {statusMessages.map((msg, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3 text-success" />
                      {msg}
                    </div>
                  ))}
                </div>
              )}

              {/* Test Alert Button */}
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => setShowAlert(!showAlert)}
              >
                {showAlert ? "Masquer l'alerte" : "Simuler une alerte"}
              </Button>
            </CardContent>
          </Card>

          {/* Alert Widget - Bottom */}
          {showAlert && (
            <div className="mt-auto pointer-events-auto">
              <Card className="bg-destructive/95 backdrop-blur-md text-destructive-foreground shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    Alerte critique
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs mb-3">
                    CVE-2025-1873 détecté dans Red Hat OpenShift 4.15
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="text-xs"
                      onClick={() => {/* Show details */}}
                    >
                      Détails
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs bg-background/20 border-background/40"
                      onClick={() => setShowAlert(false)}
                    >
                      Fermer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Alert Modal */}
      {showAlert && (
        <div className="absolute inset-0 z-50 pointer-events-auto">
          <AlertModal onClose={() => setShowAlert(false)} />
        </div>
      )}
    </div>
  );
};

export default Index;
