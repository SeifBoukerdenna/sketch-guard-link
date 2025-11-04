import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Hash, FileCheck, Download, ExternalLink } from "lucide-react";

interface ComplianceProof {
  id: string;
  date: string;
  type: string;
  status: "verified" | "pending";
  hash: string;
  standard: string;
}

const mockProofs: ComplianceProof[] = [
  {
    id: "1",
    date: "2025-11-04 14:32",
    type: "Scan de sécurité complet",
    status: "verified",
    hash: "a3f7b9c2e1d4f8a6b2c9e3f1d7a8b4c2",
    standard: "DORA / NIS2"
  },
  {
    id: "2",
    date: "2025-11-04 09:15",
    type: "Audit de conformité Loi 25",
    status: "verified",
    hash: "d8e2f9a3b7c1e4f6a9d2b8c3e7f1a4b9",
    standard: "Loi 25 (Québec)"
  },
  {
    id: "3",
    date: "2025-11-03 16:45",
    type: "Rapport d'incident résolu",
    status: "verified",
    hash: "f1a8c3e7b2d9f4a6c8e1b3d7f9a2c4e8",
    standard: "ISO 27001"
  },
  {
    id: "4",
    date: "2025-11-03 11:20",
    type: "Certification partenaires",
    status: "verified",
    hash: "b9d3f7a1c8e2f4b6a3d9c7e1f8a4b2d6",
    standard: "SOC 2 Type II"
  }
];

export const BlockchainProofPanel = () => {
  return (
    <Card className="bg-background/95 backdrop-blur-md border-glow">
      <CardHeader className="pb-3 bg-muted/30">
        <CardTitle className="flex items-center gap-2 text-base">
          <Hash className="w-5 h-5 text-primary" />
          Preuves de Conformité Blockchain
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
        {/* Info banner */}
        <div className="p-3 rounded-lg bg-info/10 border border-info/30">
          <div className="flex items-start gap-2">
            <FileCheck className="w-4 h-4 text-info mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Toutes les preuves sont enregistrées via SHA-256 sur blockchain immuable pour garantir traçabilité et intégrité
            </p>
          </div>
        </div>

        {/* Proofs list */}
        {mockProofs.map((proof, idx) => (
          <div 
            key={proof.id}
            className="p-3 rounded-lg border border-border hover:border-primary/50 transition-all animate-slide-in"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold">{proof.type}</h4>
                  <Badge className="text-xs bg-success text-success-foreground">
                    {proof.status === "verified" ? "✓ Vérifié" : "En attente"}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">{proof.date}</div>
              </div>
            </div>

            {/* Hash */}
            <div className="mb-2 p-2 rounded bg-muted/50">
              <div className="text-xs text-muted-foreground mb-1">Hash SHA-256:</div>
              <code className="text-xs font-mono text-foreground break-all">
                {proof.hash}
              </code>
            </div>

            {/* Standard */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {proof.standard}
              </Badge>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" className="h-7 text-xs">
                  <Download className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="ghost" className="h-7 text-xs">
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Export all */}
        <Button variant="outline" className="w-full text-xs mt-2">
          <Download className="w-3 h-3 mr-2" />
          Exporter toutes les preuves
        </Button>
      </CardContent>
    </Card>
  );
};
