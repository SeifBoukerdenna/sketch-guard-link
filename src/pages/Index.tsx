import { useState } from "react";
import { Shield, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InteractiveNetworkGraph } from "@/components/InteractiveNetworkGraph";
import { AlertModal } from "@/components/AlertModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [scanType, setScanType] = useState("daily");

  // Simple visibility toggles - no drag & drop complexity
  const [showWidgets, setShowWidgets] = useState({
    ai: false,
    collective: false,
    recommendations: false,
  });

  const toggleWidget = (widget: keyof typeof showWidgets) => {
    setShowWidgets((prev) => ({ ...prev, [widget]: !prev[widget] }));
  };

  const handleScan = () => {
    console.log(`Scanning: ${scanType}`);
    setTimeout(() => setShowAlert(true), 1000);
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      {/* Simple Header */}
      <header className="flex-none z-40 bg-background/95 backdrop-blur border-b">
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-lg font-bold">SupplyChainSec</h1>
              <p className="text-xs text-muted-foreground">Surveillance Continue</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Scan Type Selector */}
            <select
              value={scanType}
              onChange={(e) => setScanType(e.target.value)}
              className="px-3 py-1.5 text-sm border rounded-md bg-background"
            >
              <option value="daily">Scan quotidien</option>
              <option value="weekly">Scan hebdomadaire</option>
              <option value="monthly">Scan mensuel</option>
            </select>

            {/* Scan Button */}
            <Button size="sm" onClick={handleScan}>
              Lancer le scan
            </Button>

            {/* Options Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem
                  checked={showWidgets.ai}
                  onCheckedChange={() => toggleWidget("ai")}
                >
                  Traduction IA
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showWidgets.collective}
                  onCheckedChange={() => toggleWidget("collective")}
                >
                  Collective Defense
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showWidgets.recommendations}
                  onCheckedChange={() => toggleWidget("recommendations")}
                >
                  Recommandations
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Graph Area */}
      <div className="flex-1 relative bg-background">
        <InteractiveNetworkGraph />

        {/* Simple Status Badge */}
        <div className="absolute bottom-6 left-6 bg-card border rounded-lg shadow-lg px-4 py-2 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-medium">Système sécurisé</span>
        </div>

        {/* Optional Widget Panels - Simple overlay, no dragging */}
        {showWidgets.ai && (
          <div className="absolute top-6 left-6 w-80 bg-card border rounded-lg shadow-lg p-4">
            <h3 className="font-semibold mb-2">Traduction IA</h3>
            <p className="text-sm text-muted-foreground">
              CVE → Risque métier compréhensible
            </p>
          </div>
        )}

        {showWidgets.collective && (
          <div className="absolute top-6 right-6 w-80 bg-card border rounded-lg shadow-lg p-4">
            <h3 className="font-semibold mb-2">Collective Defense Mesh</h3>
            <div className="text-3xl font-bold text-primary">847</div>
            <p className="text-sm text-muted-foreground">Organisations protégées</p>
          </div>
        )}

        {showWidgets.recommendations && (
          <div className="absolute top-32 right-6 w-80 bg-card border rounded-lg shadow-lg p-4">
            <h3 className="font-semibold mb-3">Recommandations</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5" />
                <span>Correctif Red Hat disponible</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5" />
                <span>Mise à jour Veeam recommandée</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Alert Modal */}
      {showAlert && <AlertModal onClose={() => setShowAlert(false)} />}
    </div>
  );
};

export default Index;