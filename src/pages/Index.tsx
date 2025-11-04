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
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-lg font-semibold">SupplyChainSec</h1>
                <p className="text-xs text-muted-foreground">Centre de services scolaires de Montréal</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate("/scan-history")}>
              <FolderOpen className="w-4 h-4 mr-2" />
              Vue de dossier
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        {selectedPartner ? (
          <>
            {/* Partner Network View */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedPartner(null)}
              className="mb-6"
            >
              ← Retour
            </Button>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {selectedPartner}
                  <span className="text-sm font-normal text-muted-foreground ml-auto">Scan quotidien</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <InteractiveNetworkGraph selectedPartner={selectedPartner} />
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Status Overview */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {showAlert ? (
                      <>
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                        Vulnérabilités détectées
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-success" />
                        Aucunes vulnérabilités détectées
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Partners List */}
                  <div className="space-y-2">
                    {partners.map((partner) => (
                      <button
                        key={partner.name}
                        onClick={() => setSelectedPartner(partner.name)}
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
                      >
                        {partner.name}
                      </button>
                    ))}
                  </div>

                  {/* Status Messages */}
                  {!showAlert && (
                    <div className="pt-4 border-t border-border space-y-2">
                      {statusMessages.map((msg, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                          {msg}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Test Alert Button */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAlert(!showAlert)}
                >
                  {showAlert ? "Masquer l'alerte" : "Simuler une alerte"}
                </Button>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Alert Modal */}
      {showAlert && <AlertModal onClose={() => setShowAlert(false)} />}

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-6">
        <div className="container mx-auto px-6 text-center text-xs text-muted-foreground">
          <p>© 2025 CSSDM - Centre de services scolaires de Montréal</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
