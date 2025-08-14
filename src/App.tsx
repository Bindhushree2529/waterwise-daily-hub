import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [currentPage, setCurrentPage] = useState<"splash" | "login" | "dashboard">("splash");
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Auto transition from splash to login after 3 seconds
    if (currentPage === "splash") {
      const timer = setTimeout(() => {
        setCurrentPage("login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const handleLogin = (username: string) => {
    setUser(username);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("login");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {currentPage === "splash" && <Splash />}
        {currentPage === "login" && <Login onLogin={handleLogin} />}
        {currentPage === "dashboard" && user && (
          <Dashboard user={user} onLogout={handleLogout} />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
