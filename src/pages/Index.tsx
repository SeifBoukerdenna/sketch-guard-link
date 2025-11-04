import React, { useState } from "react";
import { Shield, CheckCircle2, FileText } from "lucide-react";
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
      <header className="border-b border-border/50 bg-background">
        <div className="container mx-auto px-8 py-5 flex items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">CSSDM</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-8 py-12">
        <div className="flex items-start gap-8 max-w-5xl">
          {/* Left sidebar - Company dropdown */}
          <div className="w-64 flex-shrink-0">
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className="w-full bg-primary text-primary-foreground border-none hover:bg-primary/80 transition-all h-auto py-4 px-5 shadow-lg shadow-primary/20 rounded-xl font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border/50 rounded-xl shadow-2xl">
                {companies.map((company) => (
                  <SelectItem 
                    key={company.id} 
                    value={company.id}
                    className="hover:bg-muted/50 cursor-pointer rounded-lg"
                  >
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Card */}
          <div className="flex-1">
            <Card className="bg-card/50 backdrop-blur-sm border border-success/20 shadow-xl shadow-success/5 rounded-2xl overflow-hidden">
              <CardContent className="p-10 space-y-7">
                {/* Status Items */}
                <div className="space-y-5">
                  <div className="flex items-start gap-4 group">
                    <div className="p-1.5 rounded-full bg-success/10 mt-0.5">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                    <p className="text-success text-base font-medium leading-relaxed">
                      Aucunes vulnérabilités détectées
                    </p>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-1.5 rounded-full bg-success/10 mt-0.5">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                    <p className="text-success text-base font-medium leading-relaxed">
                      Tous les certificats sont à jour
                    </p>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-1.5 rounded-full bg-success/10 mt-0.5">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                    <p className="text-success text-base font-medium leading-relaxed">
                      Aucun port ouvert
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-6 border-t border-border/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground/70" />
                      <p className="text-muted-foreground text-sm">
                        Scan quotidien effectué
                      </p>
                    </div>
                    <a
                      href="#"
                      className="text-sm text-primary hover:text-primary/80 font-medium transition-colors underline-offset-4 hover:underline"
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