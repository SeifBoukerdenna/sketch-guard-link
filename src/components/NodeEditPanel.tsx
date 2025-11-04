import { useState } from "react";
import { Node } from "reactflow";
import { X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Partner {
  id: string;
  name: string;
  status: "healthy" | "alert" | "warning";
  vulnerabilities?: number;
  description: string;
  lastScan: string;
  customFields?: { key: string; value: string }[];
}

interface NodeEditPanelProps {
  node: Node<Partner>;
  onClose: () => void;
  onSave: (node: Node<Partner>) => void;
}

export const NodeEditPanel = ({ node, onClose, onSave }: NodeEditPanelProps) => {
  const [editedNode, setEditedNode] = useState<Node<Partner>>(node);
  const [newFieldKey, setNewFieldKey] = useState("");
  const [newFieldValue, setNewFieldValue] = useState("");

  const handleSave = () => {
    onSave(editedNode);
  };

  const addCustomField = () => {
    if (!newFieldKey || !newFieldValue) return;
    
    const customFields = editedNode.data.customFields || [];
    setEditedNode({
      ...editedNode,
      data: {
        ...editedNode.data,
        customFields: [...customFields, { key: newFieldKey, value: newFieldValue }]
      }
    });
    setNewFieldKey("");
    setNewFieldValue("");
  };

  const removeCustomField = (index: number) => {
    const customFields = editedNode.data.customFields || [];
    setEditedNode({
      ...editedNode,
      data: {
        ...editedNode.data,
        customFields: customFields.filter((_, i) => i !== index)
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm pointer-events-auto">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg">Modifier le nœud</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic Info */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                value={editedNode.data.name}
                onChange={(e) => setEditedNode({
                  ...editedNode,
                  data: { ...editedNode.data, name: e.target.value }
                })}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={editedNode.data.description}
                onChange={(e) => setEditedNode({
                  ...editedNode,
                  data: { ...editedNode.data, description: e.target.value }
                })}
              />
            </div>

            <div>
              <Label htmlFor="status">Statut</Label>
              <Select
                value={editedNode.data.status}
                onValueChange={(value: "healthy" | "alert" | "warning") => setEditedNode({
                  ...editedNode,
                  data: { ...editedNode.data, status: value }
                })}
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
                value={editedNode.data.vulnerabilities || 0}
                onChange={(e) => setEditedNode({
                  ...editedNode,
                  data: { ...editedNode.data, vulnerabilities: parseInt(e.target.value) || 0 }
                })}
              />
            </div>

            <div>
              <Label htmlFor="lastScan">Dernier scan</Label>
              <Input
                id="lastScan"
                type="date"
                value={editedNode.data.lastScan}
                onChange={(e) => setEditedNode({
                  ...editedNode,
                  data: { ...editedNode.data, lastScan: e.target.value }
                })}
              />
            </div>
          </div>

          {/* Custom Fields */}
          <div className="pt-4 border-t space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base">Champs personnalisés</Label>
            </div>

            {editedNode.data.customFields && editedNode.data.customFields.length > 0 && (
              <div className="space-y-2">
                {editedNode.data.customFields.map((field, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded bg-muted">
                    <Badge variant="outline" className="flex-shrink-0">{field.key}</Badge>
                    <span className="text-sm flex-1">{field.value}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCustomField(index)}
                    >
                      <Trash2 className="w-3 h-3" />
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
            <Button onClick={handleSave} className="flex-1">
              Sauvegarder
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
