import React, { useState } from "react";
import Draggable from "react-draggable";
import { InteractiveNetworkGraph } from "@/components/InteractiveNetworkGraph";
import { AlertModal } from "@/components/AlertModal";
import { AITranslationPanel } from "@/components/AITranslationPanel";
import { AttackSimulation } from "@/components/AttackSimulation";
import { CollectiveDefensePanel } from "@/components/CollectiveDefensePanel";
import { IncidentTimeline } from "@/components/IncidentTimeline";
import { RecommendationsPanel } from "@/components/RecommendationsPanel";
import { BlockchainProofPanel } from "@/components/BlockchainProofPanel";
import { DashboardPanel } from "@/components/DashboardPanel";
import { Shield, FolderOpen, CheckCircle2, Settings, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
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

  // Simplified widget visibility - showing only essential widgets
  const [widgetVisibility, setWidgetVisibility] = useState({
    status: false,          // Hidden by default for cleaner view
    ai: true,               // Key feature - AI translation
    collective: true,       // Unique selling point
    recommendations: true,  // Actionable insights
    timeline: false,        // Hidden by default - can show on demand
    attack: false,          // Hidden - demo feature
    blockchain: false,      // Hidden - advanced feature
    dashboard: false,       // Hidden - redundant with status
    alert: false           // Only shows when triggered
  });

  // Minimized state for each widget
  const [widgetMinimized, setWidgetMinimized] = useState<Record<string, boolean>>({
    status: false,
    ai: false,
    collective: false,
    recommendations: false,
    timeline: false,
    attack: false,
    blockchain: false,
    dashboard: false
  });

  // Optimized default positions - better spacing, less overlap
  const [positions, setPositions] = useState(() => {
    const saved = localStorage.getItem('widget-positions');
    return saved ? JSON.parse(saved) : {
      status: { x: 20, y: 80 },
      ai: { x: 20, y: 80 },
      collective: { x: 1000, y: 80 },
      recommendations: { x: 540, y: 80 },
      timeline: { x: 20, y: 500 },
      attack: { x: 1100, y: 500 },
      blockchain: { x: 780, y: 500 },
      dashboard: { x: 20, y: 80 },
      alert: { x: 20, y: 280 }
    };
  });

  const handleDragStop = (widgetId: string, data: any) => {
    const newPositions = {
      ...positions,
      [widgetId]: { x: data.x, y: data.y }
    };
    setPositions(newPositions);
    localStorage.setItem('widget-positions', JSON.stringify(newPositions));
  };

  const toggleWidget = (widget: keyof typeof widgetVisibility) => {
    setWidgetVisibility(prev => ({ ...prev, [widget]: !prev[widget] }));
  };

  const toggleMinimize = (widget: string) => {
    setWidgetMinimized(prev => ({ ...prev, [widget]: !prev[widget] }));
  };

  const resetPositions = () => {
    const defaultPositions = {
      status: { x: 20, y: 80 },
      ai: { x: 20, y: 80 },
      collective: { x: 1000, y: 80 },
      recommendations: { x: 540, y: 80 },
      timeline: { x: 20, y: 500 },
      attack: { x: 1100, y: 500 },
      blockchain: { x: 780, y: 500 },
      dashboard: { x: 20, y: 80 },
      alert: { x: 20, y: 280 }
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

  // Count visible widgets
  const visibleCount = Object.values(widgetVisibility).filter(Boolean).length;

  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      {/* Compact Header - Fixed at top */}
      <header className="flex-none z-40 bg-background/70 backdrop-blur-sm border-b border-border/50">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <h1 className="text-sm font-bold">SupplyChainSec</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Surveillance Continue - CSSDM</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Widget counter */}
              <div className="text-xs text-muted-foreground bg-muted/80 px-2 py-1 rounded-full">
                {visibleCount} widget{visibleCount !== 1 ? 's' : ''} actif{visibleCount !== 1 ? 's' : ''}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                    <Settings className="w-3 h-3 mr-1" />
                    <span className="hidden sm:inline">Personnaliser</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>Widgets visibles</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
                    Essentiels
                  </DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={widgetVisibility.status}
                    onCheckedChange={() => toggleWidget('status')}
                  >
                    Système sécurisé
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={widgetVisibility.ai}
                    onCheckedChange={() => toggleWidget('ai')}
                  >
                    Traduction IA
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={widgetVisibility.collective}
                    onCheckedChange={() => toggleWidget('collective')}
                  >
                    Collective Defense
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={widgetVisibility.recommendations}
                    onCheckedChange={() => toggleWidget('recommendations')}
                  >
                    Recommandations
                  </DropdownMenuCheckboxItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
                    Avancés
                  </DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={widgetVisibility.timeline}
                    onCheckedChange={() => toggleWidget('timeline')}
                  >
                    Timeline
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={widgetVisibility.dashboard}
                    onCheckedChange={() => toggleWidget('dashboard')}
                  >
                    Dashboard Multi-Rôle
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={widgetVisibility.attack}
                    onCheckedChange={() => toggleWidget('attack')}
                  >
                    Simulation d'attaque
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={widgetVisibility.blockchain}
                    onCheckedChange={() => toggleWidget('blockchain')}
                  >
                    Preuve Blockchain
                  </DropdownMenuCheckboxItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={resetPositions}>
                    Réinitialiser positions
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="sm" className="h-8" onClick={() => navigate("/scan-history")}>
                <FolderOpen className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">Historique</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* FULLSCREEN Network Graph - Takes remaining height */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0">
          <InteractiveNetworkGraph />
        </div>

        {/* Floating Widgets - All draggable over fullscreen graph */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full p-3">

            {/* System Status Widget */}
            {widgetVisibility.status && (
              <Draggable
                position={positions.status}
                onStop={(e, data) => handleDragStop('status', data)}
                handle=".drag-handle"
                bounds="parent"
              >
                <div className="absolute pointer-events-auto w-80">
                  <div className={`transition-all ${widgetMinimized.status ? 'h-12 overflow-hidden' : ''}`}>
                    <div className="bg-background/95 backdrop-blur-md shadow-2xl border-2 rounded-lg">
                      <div className="flex items-center justify-between px-3 py-2 bg-muted/50 drag-handle cursor-grab active:cursor-grabbing rounded-t-lg border-b">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-success" />
                          <span className="text-xs font-semibold">Système sécurisé</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => toggleMinimize('status')}
                        >
                          {widgetMinimized.status ? (
                            <Maximize2 className="w-3 h-3" />
                          ) : (
                            <Minimize2 className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                      {!widgetMinimized.status && (
                        <div className="p-3 space-y-3">
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="p-2 rounded-lg bg-success/10">
                              <div className="text-2xl font-bold text-success">98</div>
                              <div className="text-xs text-muted-foreground">Score</div>
                            </div>
                            <div className="p-2 rounded-lg bg-primary/10">
                              <div className="text-2xl font-bold text-primary">5</div>
                              <div className="text-xs text-muted-foreground">Partenaires</div>
                            </div>
                            <div className="p-2 rounded-lg bg-muted">
                              <div className="text-2xl font-bold">0</div>
                              <div className="text-xs text-muted-foreground">Vulnérabilités</div>
                            </div>
                          </div>

                          <div>
                            <div className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wide">
                              Partenaires actifs
                            </div>
                            <div className="space-y-1">
                              {partners.map((partner) => (
                                <div key={partner.name} className="flex items-center justify-between text-xs">
                                  <span>{partner.name}</span>
                                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-2 border-t text-xs space-y-1">
                            {statusMessages.map((msg, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-success flex-shrink-0" />
                                <span>{msg}</span>
                              </div>
                            ))}
                          </div>

                          <Button
                            className="w-full"
                            size="sm"
                            onClick={() => setShowAlert(true)}
                          >
                            Simuler une alerte
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Draggable>
            )}

            {/* AI Translation Panel */}
            {widgetVisibility.ai && (
              <Draggable
                position={positions.ai}
                onStop={(e, data) => handleDragStop('ai', data)}
                handle=".drag-handle"
                bounds="parent"
              >
                <div className="absolute pointer-events-auto w-96">
                  <AITranslationPanel
                    isMinimized={widgetMinimized.ai}
                    onToggleMinimize={() => toggleMinimize('ai')}
                  />
                </div>
              </Draggable>
            )}

            {/* Collective Defense Panel */}
            {widgetVisibility.collective && (
              <Draggable
                position={positions.collective}
                onStop={(e, data) => handleDragStop('collective', data)}
                handle=".drag-handle"
                bounds="parent"
              >
                <div className="absolute pointer-events-auto w-80">
                  <CollectiveDefensePanel
                    isMinimized={widgetMinimized.collective}
                    onToggleMinimize={() => toggleMinimize('collective')}
                  />
                </div>
              </Draggable>
            )}

            {/* Recommendations Panel */}
            {widgetVisibility.recommendations && (
              <Draggable
                position={positions.recommendations}
                onStop={(e, data) => handleDragStop('recommendations', data)}
                handle=".drag-handle"
                bounds="parent"
              >
                <div className="absolute pointer-events-auto w-96">
                  <RecommendationsPanel
                    isMinimized={widgetMinimized.recommendations}
                    onToggleMinimize={() => toggleMinimize('recommendations')}
                  />
                </div>
              </Draggable>
            )}

            {/* Dashboard Multi-Role - Optional */}
            {widgetVisibility.dashboard && (
              <Draggable
                position={positions.dashboard}
                onStop={(e, data) => handleDragStop('dashboard', data)}
                handle=".drag-handle"
                bounds="parent"
              >
                <div className="absolute pointer-events-auto w-96">
                  <DashboardPanel
                    isMinimized={widgetMinimized.dashboard}
                    onToggleMinimize={() => toggleMinimize('dashboard')}
                  />
                </div>
              </Draggable>
            )}

            {/* Timeline - Optional */}
            {widgetVisibility.timeline && (
              <Draggable
                position={positions.timeline}
                onStop={(e, data) => handleDragStop('timeline', data)}
                handle=".drag-handle"
                bounds="parent"
              >
                <div className="absolute pointer-events-auto w-96">
                  <IncidentTimeline />
                </div>
              </Draggable>
            )}

            {/* Attack Simulation - Optional */}
            {widgetVisibility.attack && (
              <Draggable
                position={positions.attack}
                onStop={(e, data) => handleDragStop('attack', data)}
                handle=".drag-handle"
                bounds="parent"
              >
                <div className="absolute pointer-events-auto w-96">
                  <AttackSimulation />
                </div>
              </Draggable>
            )}

            {/* Blockchain Proof - Optional */}
            {widgetVisibility.blockchain && (
              <Draggable
                position={positions.blockchain}
                onStop={(e, data) => handleDragStop('blockchain', data)}
                handle=".drag-handle"
                bounds="parent"
              >
                <div className="absolute pointer-events-auto w-96">
                  <BlockchainProofPanel />
                </div>
              </Draggable>
            )}

          </div>
        </div>
      </div>

      {/* Alert Modal */}
      {showAlert && <AlertModal onClose={() => setShowAlert(false)} />}
    </div>
  );
};

export default Index;