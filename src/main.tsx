import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

import App from './App'
import Admin from './pages/Admin'
import Poster from './pages/Poster'
import SignIn from './pages/SignIn'
import AdminSignins from './pages/AdminSignins'

const rootEl = document.getElementById('root')!
createRoot(rootEl).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Home / landing */}
        <Route path="/" element={<App />} />

        {/* Admin flows */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/signins/:id" element={<AdminSignins />} />

        {/* Public pages */}
        <Route path="/poster/:id" element={<Poster />} />
        <Route path="/sign-in" element={<SignIn />} />

        {/* Fallback: anything unknown goes home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
