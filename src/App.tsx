
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { useMaintenanceStore, initMaintenanceBotConnection } from "./services/maintenanceService";

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import DownloadPage from "./pages/Download";
import PlansPage from "./pages/Plans";
import Maintenance from "./pages/Maintenance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const { isMaintenanceMode } = useMaintenanceStore();
  
  useEffect(() => {
    // Initialize the maintenance bot connection
    const disconnect = initMaintenanceBotConnection();
    
    return () => {
      disconnect();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={isMaintenanceMode ? <Navigate to="/maintenance" replace /> : <About />} />
              <Route path="/download" element={isMaintenanceMode ? <Navigate to="/maintenance" replace /> : <DownloadPage />} />
              <Route path="/plans" element={isMaintenanceMode ? <Navigate to="/maintenance" replace /> : <PlansPage />} />
              <Route path="/maintenance" element={<Maintenance />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
