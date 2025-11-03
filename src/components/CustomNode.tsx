import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Shield, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Partner {
  id: string;
  name: string;
  status: "healthy" | "alert" | "warning";
  vulnerabilities?: number;
  description: string;
  lastScan: string;
}

export const CustomNode = memo(({ data, selected }: NodeProps<Partner>) => {
  const isCentral = data.id === "cssdm";
  const isAlert = data.status === "alert";

  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-primary !border-2 !border-primary-foreground"
      />

      <div
        className={`px-4 py-3 rounded-xl border-2 shadow-lg transition-all duration-300 min-w-[140px] ${
          isCentral
            ? "gradient-cyber border-primary/50 shadow-primary/20"
            : isAlert
            ? "bg-destructive/10 border-destructive border-glow-alert"
            : "bg-card border-primary/30"
        } ${selected ? "border-4 scale-105" : "hover:scale-102"} ${
          isAlert ? "animate-pulse" : ""
        }`}
      >
        <div className="flex items-center justify-center mb-2">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isCentral
                ? "bg-primary-foreground/20"
                : isAlert
                ? "bg-destructive/20"
                : "bg-success/20"
            }`}
          >
            {isCentral ? (
              <Shield className="w-6 h-6 text-primary-foreground" />
            ) : isAlert ? (
              <AlertTriangle className="w-6 h-6 text-destructive" />
            ) : (
              <CheckCircle2 className="w-6 h-6 text-success" />
            )}
          </div>
        </div>

        <div className="text-center">
          <p className={`font-bold text-sm mb-1 ${isCentral ? "text-primary-foreground" : ""}`}>
            {data.name}
          </p>
          <p className={`text-xs ${isCentral ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
            {data.description}
          </p>
          
          {data.vulnerabilities && (
            <Badge variant="destructive" className="mt-2 text-xs px-2 py-0">
              {data.vulnerabilities} alerte{data.vulnerabilities > 1 ? "s" : ""}
            </Badge>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-primary !border-2 !border-primary-foreground"
      />
    </div>
  );
});

CustomNode.displayName = "CustomNode";
