import React, { useState } from "react";
import { Check, Copy, GitBranch, Package, Shield, Github } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface VendorIntegrationFlowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type IntegrationType = "github-actions" | "gitlab-ci" | "oci-registry" | "github-releases" | null;

const integrationOptions = [
  {
    id: "github-actions" as const,
    name: "GitHub Actions",
    icon: Github,
    description: "Automated SBOM generation and upload via GitHub workflows with OIDC authentication.",
    snippet: `- name: Upload SBOM
  uses: supplychainsec/upload-sbom@v1
  with:
    sbom-path: ./sbom.json
    audience: https://api.supplychainsec.io`,
  },
  {
    id: "gitlab-ci" as const,
    name: "GitLab CI",
    icon: GitBranch,
    description: "Native GitLab pipeline integration with ID token support for secure SBOM submission.",
    snippet: `upload-sbom:
  script:
    - curl -X POST https://api.supplychainsec.io/sbom \\
      -H "Authorization: Bearer $CI_JOB_JWT" \\
      -F "sbom=@sbom.json"`,
  },
  {
    id: "oci-registry" as const,
    name: "OCI Registry",
    icon: Package,
    description: "Attach SBOMs as OCI artifacts alongside container images with cosign signatures.",
    snippet: `cosign attach sbom --sbom sbom.json \\
  ghcr.io/yourorg/app:v1.0.0
cosign sign --key cosign.key \\
  ghcr.io/yourorg/app:v1.0.0`,
  },
  {
    id: "github-releases" as const,
    name: "GitHub Releases",
    icon: Shield,
    description: "Manual or automated SBOM upload during release creation with SHA verification.",
    snippet: `gh release upload v1.0.0 sbom.json \\
  --repo yourorg/yourrepo
curl -X POST https://api.supplychainsec.io/sbom \\
  -H "X-GitHub-Token: \${{ secrets.GITHUB_TOKEN }}"`,
  },
];

export const VendorIntegrationFlow = ({ open, onOpenChange }: VendorIntegrationFlowProps) => {
  const [step, setStep] = useState(1);
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationType>(null);
  const [supplierName, setSupplierName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [requireSignature, setRequireSignature] = useState(true);
  const [requireDigest, setRequireDigest] = useState(true);
  const [cycloneDxOnly, setCycloneDxOnly] = useState(true);
  const [requireVex, setRequireVex] = useState(false);

  const selectedOption = integrationOptions.find(opt => opt.id === selectedIntegration);
  const audienceUrl = `https://api.supplychainsec.io/org/${supplierName.toLowerCase().replace(/\s+/g, '-')}`;

  const handleCopySnippet = () => {
    if (selectedOption) {
      navigator.clipboard.writeText(selectedOption.snippet);
      toast.success("Snippet copié!");
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedIntegration(null);
    setSupplierName("");
    setProjectName("");
    setRequireSignature(true);
    setRequireDigest(true);
    setCycloneDxOnly(true);
    setRequireVex(false);
  };

  const handleClose = () => {
    handleReset();
    onOpenChange(false);
  };

  const handleFinish = () => {
    toast.success("Configuration sauvegardée!");
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Configuration d'intégration SBOM</DialogTitle>
          <DialogDescription>
            Configuration pour {supplierName || "votre organisation"} - Étape {step} sur 3
          </DialogDescription>
        </DialogHeader>

        {/* Step 1: Choose Integration */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Étape 1: Choisir l'intégration</h3>
              <div className="grid grid-cols-2 gap-3">
                {integrationOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <Card
                      key={option.id}
                      className={`cursor-pointer transition-all hover:border-primary ${
                        selectedIntegration === option.id ? "border-primary ring-2 ring-primary/20" : ""
                      }`}
                      onClick={() => setSelectedIntegration(option.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <h4 className="font-semibold">{option.name}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">{option.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {selectedIntegration && selectedOption && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg border space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">Code snippet</h4>
                  <Button size="sm" variant="outline" onClick={handleCopySnippet}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copier
                  </Button>
                </div>
                <pre className="text-xs bg-background p-3 rounded border overflow-x-auto">
                  <code>{selectedOption.snippet}</code>
                </pre>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <Button onClick={handleClose} variant="outline">
                Annuler
              </Button>
              <Button onClick={() => setStep(2)} disabled={!selectedIntegration}>
                Suivant
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Identity & Scope */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Étape 2: Identité & portée</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="supplierName">Nom du fournisseur</Label>
                  <Input
                    id="supplierName"
                    placeholder="Ex: Micrologic Inc."
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="projectName">Nom du projet(s)</Label>
                  <Input
                    id="projectName"
                    placeholder="Ex: Red Hat OpenShift, Veeam Backup"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {supplierName && (
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Audience URL (OIDC)</h4>
                  <code className="text-xs bg-background p-2 rounded border block overflow-x-auto">
                    {audienceUrl}
                  </code>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Exemple de payload (lecture seule)</h4>
                  <pre className="text-xs bg-background p-3 rounded border overflow-x-auto">
                    <code>{JSON.stringify(
                      {
                        supplier: supplierName,
                        project: projectName || "example-project",
                        sbom_format: "CycloneDX-1.5",
                        digest: "sha256:abc123...",
                        signature: "cosign-signature",
                        timestamp: new Date().toISOString(),
                      },
                      null,
                      2
                    )}</code>
                  </pre>
                </div>
              </div>
            )}

            <div className="flex justify-between gap-3 mt-6">
              <Button onClick={() => setStep(1)} variant="outline">
                Retour
              </Button>
              <div className="flex gap-3">
                <Button onClick={handleClose} variant="outline">
                  Annuler
                </Button>
                <Button onClick={() => setStep(3)} disabled={!supplierName || !projectName}>
                  Suivant
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Verification Policy */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Étape 3: Politique de vérification</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
                  <div className="flex-1">
                    <Label htmlFor="signature" className="font-semibold">
                      Exiger signature (cosign/DSSE)
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Exigence stricte - les SBOMs non signés seront rejetés
                    </p>
                  </div>
                  <Switch
                    id="signature"
                    checked={requireSignature}
                    onCheckedChange={setRequireSignature}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
                  <div className="flex-1">
                    <Label htmlFor="digest" className="font-semibold">
                      Exiger digest d'image ou git SHA
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Vérifie la traçabilité complète de l'artefact
                    </p>
                  </div>
                  <Switch
                    id="digest"
                    checked={requireDigest}
                    onCheckedChange={setRequireDigest}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
                  <div className="flex-1">
                    <Label htmlFor="cyclonedx" className="font-semibold">
                      Accepter uniquement CycloneDX 1.5
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Format standardisé avec métadonnées de sécurité complètes
                    </p>
                  </div>
                  <Switch
                    id="cyclonedx"
                    checked={cycloneDxOnly}
                    onCheckedChange={setCycloneDxOnly}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
                  <div className="flex-1">
                    <Label htmlFor="vex" className="font-semibold">
                      Exiger VEX si sévérité ≥ High
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Optionnel - demande un rapport VEX pour les vulnérabilités critiques
                    </p>
                  </div>
                  <Switch
                    id="vex"
                    checked={requireVex}
                    onCheckedChange={setRequireVex}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-card border rounded-lg">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Configuration prête</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Votre politique de vérification est configurée. Les SBOMs non conformes seront automatiquement rejetés.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
              <p className="text-sm font-medium mb-2">État actuel:</p>
              <p className="text-xs text-muted-foreground">
                <strong>Aucun SBOM reçu.</strong> Ajoutez le snippet dans votre CI. 
                Les SBOMs non signés ou sans digest seront rejetés.
              </p>
            </div>

            <div className="flex justify-between gap-3 mt-6">
              <Button onClick={() => setStep(2)} variant="outline">
                Retour
              </Button>
              <div className="flex gap-3">
                <Button onClick={handleClose} variant="outline">
                  Annuler
                </Button>
                <Button onClick={handleFinish}>
                  <Check className="w-4 h-4 mr-2" />
                  Enregistrer & Terminer
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
