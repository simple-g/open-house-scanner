import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/** Lazy-load pages so their code doesn't execute until the route is visited */
const Admin = lazy(() => import("./pages/Admin"));
const Poster = lazy(() => import("./pages/Poster"));
const AdminSignins = lazy(() => import("./pages/AdminSignins"));
const PublicSignIn = lazy(() => import("./pages/SignIn")); // your existing sign-in page

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div style={{ padding: 24, fontFamily: "system-ui, Arial" }}>
            Loading…
          </div>
        }
      >
        <Routes>
          {/* Home goes straight to Admin */}
          <Route path="/" element={<Admin />} />
          <Route path="/admin" element={<Admin />} />

          {/* Backend routes */}
          <Route path="/poster/:id" element={<Poster />} />
          <Route path="/admin/signins/:id" element={<AdminSignins />} />

          {/* Public sign-in (opens from the poster QR) */}
          <Route path="/e/:eventId" element={<PublicSignIn />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
