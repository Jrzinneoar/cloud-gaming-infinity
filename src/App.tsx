
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
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

const queryClient = new QueryClient();

const App = () => {
  const { isMaintenanceMode } = useMaintenanceStore();

  useEffect(() => {
    // Initialize the maintenance service
    const disconnect = initMaintenanceBotConnection();
    console.log("Maintenance service initialized");
    
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
              {/* Admin routes - always accessible */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin-panel" element={<AdminPanel />} />
              
              {/* Maintenance route */}
              <Route path="/maintenance" element={<Maintenance />} />
              
              {/* Protected routes - redirect to maintenance page when maintenance mode is on */}
              <Route 
                path="/" 
                element={isMaintenanceMode ? <Navigate to="/maintenance" replace /> : <Index />} 
              />
              <Route 
                path="/about" 
                element={isMaintenanceMode ? <Navigate to="/maintenance" replace /> : <About />} 
              />
              <Route 
                path="/download" 
                element={isMaintenanceMode ? <Navigate to="/maintenance" replace /> : <DownloadPage />} 
              />
              <Route 
                path="/plans" 
                element={isMaintenanceMode ? <Navigate to="/maintenance" replace /> : <PlansPage />} 
              />
              
              {/* Catch-all route */}
              <Route 
                path="*" 
                element={isMaintenanceMode ? <Navigate to="/maintenance" replace /> : <NotFound />} 
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
