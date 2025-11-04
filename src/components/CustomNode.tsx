import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Shield, AlertTriangle, CheckCircle2 } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  status: "healthy" | "alert" | "warning";
  description: string;
  vulnerabilities?: number;
}

export const CustomNode = memo(({ data, selected }: NodeProps<Partner>) => {
  const isAlert = data.status === "alert";
  const isWarning = data.status === "warning";
  const isHealthy = data.status === "healthy";

  return (
    <div className="relative">
      {/* Top connection point */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-primary !border-2 !border-background"
      />

      {/* Node Card */}
      <div
        className={`
          px-4 py-3 rounded-lg border-2 shadow-lg transition-all
          min-w-[140px] cursor-pointer
          ${isAlert ? "bg-destructive/10 border-destructive" : ""}
          ${isWarning ? "bg-warning/10 border-warning" : ""}
          ${isHealthy ? "bg-card border-success" : ""}
          ${selected ? "scale-110 ring-2 ring-primary" : "hover:scale-105"}
        `}
      >
        {/* Icon */}
        <div className="flex items-center justify-center mb-2">
          <div
            className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${isAlert ? "bg-destructive/20" : ""}
              ${isWarning ? "bg-warning/20" : ""}
              ${isHealthy ? "bg-success/20" : ""}
            `}
          >
            {isAlert && <AlertTriangle className="w-6 h-6 text-destructive" />}
            {isWarning && <Shield className="w-6 h-6 text-warning" />}
            {isHealthy && <CheckCircle2 className="w-6 h-6 text-success" />}
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="font-semibold text-sm mb-1">{data.name}</p>
          <p className="text-xs text-muted-foreground">{data.description}</p>

          {/* Vulnerability badge */}
          {data.vulnerabilities && data.vulnerabilities > 0 && (
            <div className="mt-2 inline-block px-2 py-0.5 bg-destructive text-destructive-foreground rounded text-xs font-medium">
              {data.vulnerabilities} alerte{data.vulnerabilities > 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>

      {/* Bottom connection point */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-primary !border-2 !border-background"
      />
    </div>
  );
});

CustomNode.displayName = "CustomNode";