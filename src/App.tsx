
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Index from "./pages/Index";
import ChildDashboard from "./pages/ChildDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import NotFound from "./pages/NotFound";
import { User } from "./utils/dummyData";

const App = () => {
  // Move QueryClient initialization inside the component
  const [queryClient] = useState(() => new QueryClient());
  // State to track the authenticated user
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);

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
                  authenticatedUser ? 
                    (authenticatedUser.role === 'parent' ? 
                      <Navigate to="/parent" replace /> : 
                      <Navigate to={`/child/${authenticatedUser.id}`} replace />
                    ) : 
                    <Index onLogin={setAuthenticatedUser} />
                } 
              />
              <Route 
                path="/child/:childId" 
                element={
                  authenticatedUser ? 
                    <ChildDashboard /> : 
                    <Navigate to="/" replace />
                } 
              />
              <Route 
                path="/parent" 
                element={
                  authenticatedUser?.role === 'parent' ? 
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
