import React, { useState } from "react";
import { Shield, ChevronDown, CheckCircle2, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [selectedCompany, setSelectedCompany] = useState("micrologic");

  const companies = [
    { id: "micrologic", name: "Micrologic" },
    { id: "zens", name: "Zens Canada Corp." },
    { id: "inso", name: "INSO INC" },
    { id: "coginov", name: "COGINOV inc." },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold">CSSDM</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="flex items-start gap-6">
          {/* Left sidebar - Company dropdown */}
          <div className="w-64 flex-shrink-0">
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className="w-full bg-primary text-primary-foreground border-none hover:bg-primary/90 h-auto py-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Card */}
          <div className="flex-1">
            <Card className="bg-card border-success/30">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <p className="text-success text-lg">
                    Aucunes vulnérabilités détectées
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <p className="text-success text-lg">
                    Tous les certificats sont à jour
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <p className="text-success text-lg">Aucun port ouvert</p>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">
                        Scan quotidien effectué
                      </p>
                    </div>
                    <a
                      href="#"
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      Voir le rapport
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;