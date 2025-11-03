import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, FileText, Calendar, CheckCircle2, AlertTriangle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ScanReport {
  id: string;
  date: string;
  time: string;
  status: "success" | "warning" | "error";
  partnersScanned: number;
  vulnerabilitiesFound: number;
  duration: string;
}

const dailyScans: ScanReport[] = [
  {
    id: "daily-001",
    date: "3 novembre 2025",
    time: "06:00",
    status: "error",
    partnersScanned: 20,
    vulnerabilitiesFound: 4,
    duration: "12 min",
  },
  {
    id: "daily-002",
    date: "2 novembre 2025",
    time: "06:00",
    status: "warning",
    partnersScanned: 20,
    vulnerabilitiesFound: 2,
    duration: "11 min",
  },
  {
    id: "daily-003",
    date: "1 novembre 2025",
    time: "06:00",
    status: "success",
    partnersScanned: 20,
    vulnerabilitiesFound: 0,
    duration: "10 min",
  },
  {
    id: "daily-004",
    date: "31 octobre 2025",
    time: "06:00",
    status: "success",
    partnersScanned: 20,
    vulnerabilitiesFound: 0,
    duration: "11 min",
  },
  {
    id: "daily-005",
    date: "30 octobre 2025",
    time: "06:00",
    status: "success",
    partnersScanned: 19,
    vulnerabilitiesFound: 0,
    duration: "10 min",
  },
];

const weeklyScans: ScanReport[] = [
  {
    id: "weekly-001",
    date: "Semaine du 28 oct - 3 nov 2025",
    time: "Dimanche 06:00",
    status: "error",
    partnersScanned: 20,
    vulnerabilitiesFound: 4,
    duration: "45 min",
  },
  {
    id: "weekly-002",
    date: "Semaine du 21-27 octobre 2025",
    time: "Dimanche 06:00",
    status: "success",
    partnersScanned: 20,
    vulnerabilitiesFound: 0,
    duration: "42 min",
  },
  {
    id: "weekly-003",
    date: "Semaine du 14-20 octobre 2025",
    time: "Dimanche 06:00",
    status: "warning",
    partnersScanned: 20,
    vulnerabilitiesFound: 1,
    duration: "43 min",
  },
];

const monthlyScans: ScanReport[] = [
  {
    id: "monthly-001",
    date: "Octobre 2025",
    time: "1er du mois 06:00",
    status: "warning",
    partnersScanned: 20,
    vulnerabilitiesFound: 2,
    duration: "2h 15min",
  },
  {
    id: "monthly-002",
    date: "Septembre 2025",
    time: "1er du mois 06:00",
    status: "success",
    partnersScanned: 19,
    vulnerabilitiesFound: 0,
    duration: "2h 05min",
  },
  {
    id: "monthly-003",
    date: "Août 2025",
    time: "1er du mois 06:00",
    status: "success",
    partnersScanned: 18,
    vulnerabilitiesFound: 0,
    duration: "1h 58min",
  },
];

const ScanReportCard = ({ report }: { report: ScanReport }) => {
  const getStatusColor = () => {
    switch (report.status) {
      case "success":
        return "success";
      case "warning":
        return "default";
      case "error":
        return "destructive";
    }
  };

  const getStatusIcon = () => {
    switch (report.status) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-accent" />;
      case "error":
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
    }
  };

  const getStatusText = () => {
    switch (report.status) {
      case "success":
        return "Succès";
      case "warning":
        return "Avertissement";
      case "error":
        return "Critique";
    }
  };

  return (
    <Card className="p-4 hover:border-primary/50 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div>
            <h4 className="font-semibold text-sm">{report.date}</h4>
            <p className="text-xs text-muted-foreground">{report.time}</p>
          </div>
        </div>
        <Badge variant={getStatusColor() as any}>{getStatusText()}</Badge>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
        <div>
          <p className="text-muted-foreground text-xs">Partenaires</p>
          <p className="font-medium">{report.partnersScanned}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Vulnérabilités</p>
          <p className={`font-medium ${report.vulnerabilitiesFound > 0 ? "text-destructive" : "text-success"}`}>
            {report.vulnerabilitiesFound}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Durée</p>
          <p className="font-medium">{report.duration}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          <FileText className="w-3 h-3 mr-1" />
          Voir rapport
        </Button>
        <Button variant="outline" size="sm">
          <Download className="w-3 h-3" />
        </Button>
      </div>
    </Card>
  );
};

const ScanHistory = () => {
  const navigate = useNavigate();
  const [openDaily, setOpenDaily] = useState(true);
  const [openWeekly, setOpenWeekly] = useState(false);
  const [openMonthly, setOpenMonthly] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Vue de dossier</h1>
                <p className="text-xs text-muted-foreground">Historique des scans de sécurité</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Daily Scans */}
          <Collapsible open={openDaily} onOpenChange={setOpenDaily}>
            <Card className="border-2 border-primary/30">
              <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-card/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-xl font-bold">Scan quotidien</h2>
                    <p className="text-sm text-muted-foreground">{dailyScans.length} rapports disponibles</p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openDaily ? "transform rotate-180" : ""}`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-6 pt-0 space-y-4">
                  {dailyScans.map((scan) => (
                    <ScanReportCard key={scan.id} report={scan} />
                  ))}
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Weekly Scans */}
          <Collapsible open={openWeekly} onOpenChange={setOpenWeekly}>
            <Card className="border-2 border-accent/30">
              <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-card/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-xl font-bold">Scan hebdomadaire</h2>
                    <p className="text-sm text-muted-foreground">{weeklyScans.length} rapports disponibles</p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openWeekly ? "transform rotate-180" : ""}`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-6 pt-0 space-y-4">
                  {weeklyScans.map((scan) => (
                    <ScanReportCard key={scan.id} report={scan} />
                  ))}
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Monthly Scans */}
          <Collapsible open={openMonthly} onOpenChange={setOpenMonthly}>
            <Card className="border-2 border-success/30">
              <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-card/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-success" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-xl font-bold">Scan mensuel</h2>
                    <p className="text-sm text-muted-foreground">{monthlyScans.length} rapports disponibles</p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openMonthly ? "transform rotate-180" : ""}`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-6 pt-0 space-y-4">
                  {monthlyScans.map((scan) => (
                    <ScanReportCard key={scan.id} report={scan} />
                  ))}
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>
      </main>
    </div>
  );
};

export default ScanHistory;
