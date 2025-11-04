import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { InteractiveNetworkGraph } from "@/components/InteractiveNetworkGraph";
import { AlertModal } from "@/components/AlertModal";
import { Shield, FolderOpen, CheckCircle2, AlertTriangle, GripVertical, Settings, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem 
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [widgetVisibility, setWidgetVisibility] = useState({
    status: true,
    alert: true,
  });
  
  // Load saved positions from localStorage
  const [positions, setPositions] = useState(() => {
    const saved = localStorage.getItem('widget-positions');
    return saved ? JSON.parse(saved) : {
      status: { x: 20, y: 80 },
      alert: { x: 20, y: 400 }
    };
  });

  // Save positions to localStorage
  const handleDragStop = (widgetId: string, data: any) => {
    const newPositions = {
      ...positions,
      [widgetId]: { x: data.x, y: data.y }
    };
    setPositions(newPositions);
    localStorage.setItem('widget-positions', JSON.stringify(newPositions));
  };

  const toggleWidget = (widget: 'status' | 'alert') => {
    setWidgetVisibility(prev => ({ ...prev, [widget]: !prev[widget] }));
  };

  const resetPositions = () => {
    const defaultPositions = {
      status: { x: 20, y: 80 },
      alert: { x: 20, y: 400 }
    };
    setPositions(defaultPositions);
    localStorage.setItem('widget-positions', JSON.stringify(defaultPositions));
  };

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
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Personnaliser
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Widgets visibles</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={widgetVisibility.status}
                    onCheckedChange={() => toggleWidget('status')}
                  >
                    Statut système
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={widgetVisibility.alert}
                    onCheckedChange={() => toggleWidget('alert')}
                  >
                    Alertes
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={resetPositions}>
                    Réinitialiser positions
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="sm" onClick={() => navigate("/scan-history")}>
                <FolderOpen className="w-4 h-4 mr-2" />
                Historique
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Widgets */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="container mx-auto h-full p-4">
          {/* Status Widget - Draggable */}
          {widgetVisibility.status && (
            <Draggable
              position={positions.status}
              onStop={(e, data) => handleDragStop('status', data)}
              handle=".drag-handle"
              bounds="parent"
            >
              <div className="absolute pointer-events-auto w-80">
                <Card className="bg-background/95 backdrop-blur-md shadow-lg border-2">
                  <CardHeader className="pb-3 bg-muted/50 drag-handle cursor-grab active:cursor-grabbing">
                    <CardTitle className="flex items-center gap-2 text-sm font-medium">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
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
                  <CardContent className="space-y-3 pt-4">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-2 pb-3 border-b border-border">
                      <div className="text-center">
                        <div className="text-lg font-bold text-success">98</div>
                        <div className="text-[10px] text-muted-foreground">Score sécu</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{partners.length}</div>
                        <div className="text-[10px] text-muted-foreground">Partenaires</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-success">0</div>
                        <div className="text-[10px] text-muted-foreground">Vulnérabilités</div>
                      </div>
                    </div>

                    {/* Partners List */}
                    <div>
                      <div className="text-[10px] font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Partenaires actifs</div>
                      <div className="space-y-0.5">
                        {partners.map((partner) => (
                          <div
                            key={partner.name}
                            className="text-xs px-2 py-1.5 rounded hover:bg-muted transition-colors cursor-pointer flex items-center justify-between"
                          >
                            <span>{partner.name}</span>
                            <div className="w-2 h-2 rounded-full bg-success"></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status Messages */}
                    {!showAlert && (
                      <div className="pt-2 border-t border-border">
                        <div className="text-[10px] font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Dernier scan: Aujourd'hui 14:32</div>
                        <div className="space-y-1">
                          {statusMessages.map((msg, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <CheckCircle2 className="w-3 h-3 text-success flex-shrink-0" />
                              <span>{msg}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Test Alert Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs mt-2"
                      onClick={() => setShowAlert(!showAlert)}
                    >
                      {showAlert ? "Masquer l'alerte" : "Simuler une alerte"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </Draggable>
          )}

          {/* Alert Widget - Draggable */}
          {showAlert && widgetVisibility.alert && (
            <Draggable
              position={positions.alert}
              onStop={(e, data) => handleDragStop('alert', data)}
              handle=".alert-drag-handle"
              bounds="parent"
            >
              <div className="absolute bottom-4 pointer-events-auto">
                <Card className="bg-destructive/95 backdrop-blur-md text-destructive-foreground shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <GripVertical className="w-4 h-4 alert-drag-handle cursor-grab active:cursor-grabbing" />
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
            </Draggable>
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
