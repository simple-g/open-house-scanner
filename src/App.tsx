import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Your existing pages */
import CreateEvent from "./pages/CreateEvent";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import EventSuccess from "./pages/EventSuccess";
import NotFound from "./pages/NotFound";

/* NEW: backend-powered pages */
import Admin from "./pages/Admin";
import Poster from "./pages/Poster";
import AdminSignins from "./pages/AdminSignins";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Home goes straight to Admin */}
          <Route path="/" element={<Admin />} />

          {/* Also keep /admin explicitly */}
          <Route path="/admin" element={<Admin />} />

          {/* Backend routes */}
          <Route path="/poster/:id" element={<Poster />} />
          <Route path="/admin/signins/:id" element={<AdminSignins />} />

          {/* Your existing routes */}
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/e/:eventId" element={<SignIn />} />
          <Route path="/event/:eventId/success" element={<EventSuccess />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* 404 last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
