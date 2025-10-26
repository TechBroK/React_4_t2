import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'

export default function Auth() {
  return (
    <div className="auth-wrapper">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="login" replace />} />
      </Routes>
    </div>
  )
}
