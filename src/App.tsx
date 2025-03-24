
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import ChildDashboard from "./pages/ChildDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import NotFound from "./pages/NotFound";

const App = () => {
  // Move QueryClient initialization inside the component
  const [queryClient] = useState(() => new QueryClient());
  // This would be handled by real auth in a production app
  const [isParentLoggedIn, setIsParentLoggedIn] = useState(false);

  // Check for saved dark mode preference when app loads
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  isParentLoggedIn ? 
                    <Navigate to="/parent" replace /> : 
                    <Index onLogin={() => setIsParentLoggedIn(true)} />
                } 
              />
              <Route 
                path="/child/:childId" 
                element={
                  isParentLoggedIn ? 
                    <ChildDashboard /> : 
                    <Navigate to="/" replace />
                } 
              />
              <Route 
                path="/parent" 
                element={
                  isParentLoggedIn ? 
                    <ParentDashboard /> : 
                    <Navigate to="/" replace />
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
