import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Partner {
  id: string;
  name: string;
  status: "healthy" | "alert" | "warning";
  vulnerabilities?: number;
  description: string;
  lastScan: string;
  customFields?: { key: string; value: string }[];
}

interface AddNodePanelProps {
  onClose: () => void;
  onAdd: (partner: Partner) => void;
}

export const AddNodePanel = ({ onClose, onAdd }: AddNodePanelProps) => {
  const [newNode, setNewNode] = useState<Partial<Partner>>({
    name: "",
    description: "",
    status: "healthy",
    vulnerabilities: 0,
    lastScan: new Date().toISOString().split('T')[0],
    customFields: []
  });
  const [newFieldKey, setNewFieldKey] = useState("");
  const [newFieldValue, setNewFieldValue] = useState("");

  const handleAdd = () => {
    if (!newNode.name || !newNode.description) return;
    
    const partner: Partner = {
      id: `node-${Date.now()}`,
      name: newNode.name,
      description: newNode.description || "",
      status: newNode.status || "healthy",
      vulnerabilities: newNode.vulnerabilities || 0,
      lastScan: newNode.lastScan || new Date().toISOString().split('T')[0],
      customFields: newNode.customFields || []
    };
    
    onAdd(partner);
  };

  const addCustomField = () => {
    if (!newFieldKey || !newFieldValue) return;
    
    const customFields = newNode.customFields || [];
    setNewNode({
      ...newNode,
      customFields: [...customFields, { key: newFieldKey, value: newFieldValue }]
    });
    setNewFieldKey("");
    setNewFieldValue("");
  };

  const removeCustomField = (index: number) => {
    const customFields = newNode.customFields || [];
    setNewNode({
      ...newNode,
      customFields: customFields.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg">Ajouter un nouveau nœud</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <Label htmlFor="name">Nom *</Label>
              <Input
                id="name"
                value={newNode.name || ""}
                onChange={(e) => setNewNode({ ...newNode, name: e.target.value })}
                placeholder="Nom du partenaire"
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Input
                id="description"
                value={newNode.description || ""}
                onChange={(e) => setNewNode({ ...newNode, description: e.target.value })}
                placeholder="Description du partenaire"
              />
            </div>

            <div>
              <Label htmlFor="status">Statut</Label>
              <Select
                value={newNode.status || "healthy"}
                onValueChange={(value: "healthy" | "alert" | "warning") => 
                  setNewNode({ ...newNode, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="healthy">Sain</SelectItem>
                  <SelectItem value="warning">Avertissement</SelectItem>
                  <SelectItem value="alert">Alerte</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="vulnerabilities">Vulnérabilités</Label>
              <Input
                id="vulnerabilities"
                type="number"
                value={newNode.vulnerabilities || 0}
                onChange={(e) => setNewNode({ ...newNode, vulnerabilities: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div>
              <Label htmlFor="lastScan">Dernier scan</Label>
              <Input
                id="lastScan"
                type="date"
                value={newNode.lastScan || ""}
                onChange={(e) => setNewNode({ ...newNode, lastScan: e.target.value })}
              />
            </div>
          </div>

          {/* Custom Fields */}
          <div className="pt-4 border-t space-y-3">
            <Label className="text-base">Champs personnalisés</Label>

            {newNode.customFields && newNode.customFields.length > 0 && (
              <div className="space-y-2">
                {newNode.customFields.map((field, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded bg-muted">
                    <span className="text-sm font-medium flex-shrink-0">{field.key}:</span>
                    <span className="text-sm flex-1">{field.value}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCustomField(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Input
                placeholder="Clé"
                value={newFieldKey}
                onChange={(e) => setNewFieldKey(e.target.value)}
                className="flex-1"
              />
              <Input
                placeholder="Valeur"
                value={newFieldValue}
                onChange={(e) => setNewFieldValue(e.target.value)}
                className="flex-1"
              />
              <Button onClick={addCustomField} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={handleAdd} 
              className="flex-1"
              disabled={!newNode.name || !newNode.description}
            >
              Ajouter
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1">
              Annuler
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
