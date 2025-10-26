
import './App.css'

import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { TicketProvider } from './context/TicketContext'
import { NotificationProvider } from './context/NotificationContext'
import * as auth from './services/auth'
import { Landing, Dashboard, TicketPage, NotFound } from './pages'
import Auth from './pages/Auth'
import Footer from './components/Footer'
import Header from './components/Header'
import './styles/tickets.css'

export default function App() {
  // small protected wrapper for routes that require authentication
  function Protected({ children }) {
    const location = useLocation()
    // show a helpful message when redirecting due to missing auth
    if (!auth.isAuthenticated()) {
      // cannot use hooks conditionally here; use NotificationProvider consumer via a small wrapper component
      return <Navigate to="/auth/login" state={{ from: location }} replace />
    }
    return children
  }

  return (
    <TicketProvider>
      <NotificationProvider>
        <BrowserRouter>
          <div className="app">
            <Header />

            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth/*" element={<Auth />} />
              <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
              <Route path="/tickets/:id" element={<Protected><TicketPage /></Protected>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </NotificationProvider>
    </TicketProvider>
  )
}



