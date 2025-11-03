import { Shield, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Partner {
  id: string;
  name: string;
  status: "healthy" | "alert" | "warning";
  vulnerabilities?: number;
  description: string;
  lastScan: string;
}

const partners: Partner[] = [
  { 
    id: "cssdm", 
    name: "CSSDM", 
    status: "healthy",
    description: "Centre principal",
    lastScan: "Il y a 2 heures"
  },
  { 
    id: "micrologic", 
    name: "Micrologic", 
    status: "alert", 
    vulnerabilities: 1,
    description: "Fournisseur infrastructure",
    lastScan: "Il y a 1 heure"
  },
  { 
    id: "zono", 
    name: "Zono Canada", 
    status: "healthy",
    description: "Services cloud",
    lastScan: "Il y a 3 jours"
  },
  { 
    id: "inso", 
    name: "INSO NC", 
    status: "healthy",
    description: "Sécurité réseau",
    lastScan: "Il y a 4 heures"
  },
  { 
    id: "cognicon", 
    name: "COGNICON", 
    status: "healthy",
    description: "Solutions logicielles",
    lastScan: "Il y a 2 jours"
  },
];

export const NetworkGraph = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getSelectedPartner = () => partners.find(p => p.id === selectedNode);

  return (
    <Card className="p-4 md:p-8 border-glow animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-2">Vue d'accueil</h2>
          <p className="text-sm md:text-base text-muted-foreground">Client: Centre de services scolaires de Montréal</p>
        </div>
        <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-success/10 border border-success/30 rounded-lg animate-pulse">
          <CheckCircle2 className="w-4 md:w-5 h-4 md:h-5 text-success" />
          <span className="text-xs md:text-sm font-medium text-success">Scan quotidien effectué</span>
        </div>
      </div>

      {/* Network Visualization */}
      <div className="relative h-64 md:h-80 lg:h-96 mb-6 md:mb-8 rounded-xl bg-secondary/30 border border-border overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Central Node */}
          <div 
            className="relative z-10 cursor-pointer group"
            onClick={() => setSelectedNode(selectedNode === "cssdm" ? null : "cssdm")}
            onMouseEnter={() => setHoveredNode("cssdm")}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className={`w-20 md:w-24 h-20 md:h-24 rounded-full gradient-cyber flex items-center justify-center border-4 transition-all duration-300 ${
              selectedNode === "cssdm" ? "border-primary scale-110" : "border-primary/50 group-hover:scale-105"
            } shadow-lg shadow-primary/20 animate-scale-in`}>
              <Shield className="w-8 md:w-12 h-8 md:h-12 text-primary-foreground" />
            </div>
            <p className="text-center mt-2 font-semibold text-xs md:text-sm">CSSDM</p>
            
            {/* Tooltip */}
            {hoveredNode === "cssdm" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg whitespace-nowrap z-50 animate-fade-in">
                <p className="text-xs font-medium">Centre principal</p>
                <p className="text-xs text-muted-foreground">Cliquez pour détails</p>
              </div>
            )}
          </div>

          {/* Partner Nodes */}
          {partners.slice(1).map((partner, index) => {
            const totalPartners = partners.length - 1;
            const angle = (index * (360 / totalPartners)) * (Math.PI / 180);
            const radius = window.innerWidth < 768 ? 100 : 140;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            const isAlert = partner.status === "alert";
            const isSelected = selectedNode === partner.id;
            const isHovered = hoveredNode === partner.id;
            const nodeClass = isAlert ? "bg-destructive/20 border-destructive" : "bg-card border-primary/30";
            const glowClass = isAlert ? "border-glow-alert" : "";

            return (
              <div
                key={partner.id}
                className="absolute z-10 transition-all duration-300 cursor-pointer group"
                style={{
                  left: `calc(50% + ${x}px - 32px)`,
                  top: `calc(50% + ${y}px - 32px)`,
                  animationDelay: `${index * 100}ms`,
                }}
                onClick={() => setSelectedNode(isSelected ? null : partner.id)}
                onMouseEnter={() => setHoveredNode(partner.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Connection Line with Animation */}
                <svg
                  className="absolute pointer-events-none"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: Math.abs(x) + 64,
                    height: Math.abs(y) + 64,
                    transform: `translate(-50%, -50%) rotate(${angle * (180 / Math.PI)}deg)`,
                  }}
                >
                  <line
                    x1="0"
                    y1="50%"
                    x2="100%"
                    y2="50%"
                    stroke={isAlert ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
                    strokeWidth={isSelected || isHovered ? "3" : "2"}
                    strokeDasharray="5,5"
                    opacity={isSelected || isHovered ? "0.6" : "0.3"}
                    className="transition-all duration-300"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="0;10"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </line>
                </svg>

                <div className={`w-16 md:w-20 h-16 md:h-20 rounded-full ${nodeClass} ${glowClass} flex flex-col items-center justify-center border-2 p-2 shadow-lg transition-all duration-300 animate-scale-in ${
                  isSelected ? "scale-110 border-4" : isHovered ? "scale-105" : ""
                } ${isAlert ? "animate-pulse" : ""}`}>
                  {isAlert ? (
                    <AlertTriangle className="w-6 md:w-8 h-6 md:h-8 text-destructive mb-1" />
                  ) : (
                    <CheckCircle2 className="w-6 md:w-8 h-6 md:h-8 text-success mb-1" />
                  )}
                  {isAlert && partner.vulnerabilities && (
                    <Badge variant="destructive" className="text-xs px-1 py-0 h-4">
                      {partner.vulnerabilities}
                    </Badge>
                  )}
                </div>
                <p className="text-center mt-2 text-xs font-medium max-w-20 md:max-w-24 leading-tight">{partner.name}</p>
                
                {/* Hover Tooltip */}
                {isHovered && !isSelected && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg whitespace-nowrap z-50 animate-fade-in">
                    <p className="text-xs font-medium">{partner.description}</p>
                    <p className="text-xs text-muted-foreground">{partner.lastScan}</p>
                    <p className="text-xs text-accent mt-1">Cliquez pour détails</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Grid Background with Animation */}
        <div className="absolute inset-0 opacity-10 animate-fade-in" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          animation: "pulse 4s ease-in-out infinite",
        }} />
      </div>

      {/* Selected Node Details */}
      {selectedNode && getSelectedPartner() && (
        <Card className="p-4 md:p-6 bg-card/50 backdrop-blur-sm border-primary/50 animate-scale-in">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                getSelectedPartner()?.status === "alert" ? "bg-destructive/20" : "bg-success/20"
              }`}>
                {getSelectedPartner()?.status === "alert" ? (
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg">{getSelectedPartner()?.name}</h3>
                <p className="text-sm text-muted-foreground">{getSelectedPartner()?.description}</p>
              </div>
            </div>
            <Badge variant={getSelectedPartner()?.status === "alert" ? "destructive" : "default"}>
              {getSelectedPartner()?.status === "alert" ? "Alerte" : "Sécurisé"}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" />
              <div>
                <p className="text-muted-foreground text-xs">Dernier scan</p>
                <p className="font-medium">{getSelectedPartner()?.lastScan}</p>
              </div>
            </div>
            {getSelectedPartner()?.vulnerabilities && (
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <div>
                  <p className="text-muted-foreground text-xs">Vulnérabilités</p>
                  <p className="font-medium text-destructive">{getSelectedPartner()?.vulnerabilities} critique(s)</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </Card>
  );
};
