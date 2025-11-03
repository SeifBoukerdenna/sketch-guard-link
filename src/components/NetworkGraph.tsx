import { Shield, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Partner {
  id: string;
  name: string;
  status: "healthy" | "alert" | "warning";
  vulnerabilities?: number;
}

const partners: Partner[] = [
  { id: "cssdm", name: "CSSDM", status: "healthy" },
  { id: "micrologic", name: "Micrologic", status: "alert", vulnerabilities: 1 },
  { id: "zono", name: "Zono Canada Corp.", status: "healthy" },
  { id: "inso", name: "INSO NC", status: "healthy" },
  { id: "cognicon", name: "COGNICON Inc.", status: "healthy" },
];

export const NetworkGraph = () => {
  return (
    <Card className="p-8 border-glow">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Vue d'accueil</h2>
          <p className="text-muted-foreground">Client: Centre de services scolaires de Montréal</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/30 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-success" />
          <span className="text-sm font-medium text-success">Scan quotidien effectué</span>
        </div>
      </div>

      {/* Network Visualization */}
      <div className="relative h-80 mb-8 rounded-xl bg-secondary/30 border border-border overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Central Node */}
          <div className="relative z-10">
            <div className="w-24 h-24 rounded-full gradient-cyber flex items-center justify-center border-4 border-primary/50 shadow-lg shadow-primary/20">
              <Shield className="w-12 h-12 text-primary-foreground" />
            </div>
            <p className="text-center mt-2 font-semibold text-sm">CSSDM</p>
          </div>

          {/* Partner Nodes */}
          {partners.slice(1).map((partner, index) => {
            const angle = (index * (360 / 4)) * (Math.PI / 180);
            const radius = 140;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            const isAlert = partner.status === "alert";
            const nodeClass = isAlert ? "bg-destructive/20 border-destructive" : "bg-card border-primary/30";
            const glowClass = isAlert ? "border-glow-alert" : "";

            return (
              <div
                key={partner.id}
                className="absolute z-10 transition-transform hover:scale-110 cursor-pointer"
                style={{
                  left: `calc(50% + ${x}px - 40px)`,
                  top: `calc(50% + ${y}px - 40px)`,
                }}
              >
                {/* Connection Line */}
                <svg
                  className="absolute pointer-events-none"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: Math.abs(x) + 80,
                    height: Math.abs(y) + 80,
                    transform: `translate(-50%, -50%) rotate(${angle * (180 / Math.PI)}deg)`,
                  }}
                >
                  <line
                    x1="0"
                    y1="50%"
                    x2="100%"
                    y2="50%"
                    stroke={isAlert ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.3"
                  />
                </svg>

                <div className={`w-20 h-20 rounded-full ${nodeClass} ${glowClass} flex flex-col items-center justify-center border-2 p-2 shadow-lg transition-all`}>
                  {isAlert ? (
                    <AlertTriangle className="w-8 h-8 text-destructive mb-1" />
                  ) : (
                    <CheckCircle2 className="w-8 h-8 text-success mb-1" />
                  )}
                  {isAlert && partner.vulnerabilities && (
                    <span className="text-xs font-bold text-destructive">{partner.vulnerabilities}</span>
                  )}
                </div>
                <p className="text-center mt-2 text-xs font-medium max-w-24">{partner.name}</p>
              </div>
            );
          })}
        </div>

        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
      </div>
    </Card>
  );
};
