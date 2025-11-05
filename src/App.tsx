import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import ClientDetail from "./pages/ClientDetail";
import ScansFolder from "./pages/ScansFolder";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Index />} />
        <Route path="/client/:clientId" element={<ClientDetail />} />
        <Route path="/client/:clientId/scans" element={<ScansFolder />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;