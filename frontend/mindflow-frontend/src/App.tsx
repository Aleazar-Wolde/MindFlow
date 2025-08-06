// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
      <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
      <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
      {/* placeholder routes for nav links */}
      <Route path="/tasks" element={<MainLayout><Dashboard /></MainLayout>} />
      <Route path="/calendar" element={<MainLayout><Dashboard /></MainLayout>} />
      <Route path="/ai" element={<MainLayout><Dashboard /></MainLayout>} />
      <Route path="/reflection" element={<MainLayout><Dashboard /></MainLayout>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
);

export default App;