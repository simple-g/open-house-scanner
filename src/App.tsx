import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Backend-powered pages we added
import Admin from "./pages/Admin";
import Poster from "./pages/Poster";
import AdminSignins from "./pages/AdminSignins";

// Your existing public sign-in page
import SignIn from "./pages/SignIn";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home goes straight to Admin to keep things simple */}
        <Route path="/" element={<Admin />} />
        <Route path="/admin" element={<Admin />} />

        {/* Backend routes */}
        <Route path="/poster/:id" element={<Poster />} />
        <Route path="/admin/signins/:id" element={<AdminSignins />} />

        {/* Existing public sign-in route */}
        <Route path="/e/:eventId" element={<SignIn />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
