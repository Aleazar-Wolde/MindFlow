// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Only two layouts now:
import AuthLayout from './layouts/AuthLayout';
import Layout     from './components/Layout';

// Pages
import Login      from './pages/Login';
import Register   from './pages/Register';
import Dashboard  from './pages/Dashboard';
import TaskList   from './pages/TaskList';
import Calendar   from './pages/Calendar';
import AIPage     from './pages/AIPage';
import Reflection from './pages/Reflection';

const App: React.FC = () => (
  <Router>
    <Routes>

      {/* Authentication routes use only AuthLayout */}
      <Route 
        path="/login" 
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        } 
      />
      <Route 
        path="/register" 
        element={
          <AuthLayout>
            <Register />
          </AuthLayout>
        } 
      />

      {/* Everything else uses only your single Layout (sidebar + content) */}
      <Route 
        path="/"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route 
        path="/tasks"
        element={
          <Layout>
            <TaskList />
          </Layout>
        }
      />
      <Route 
        path="/calendar"
        element={
          <Layout>
            <Calendar />
          </Layout>
        }
      />
      <Route 
        path="/ai"
        element={
          <Layout>
            <AIPage />
          </Layout>
        }
      />
      <Route 
        path="/reflection"
        element={
          <Layout>
            <Reflection />
          </Layout>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  </Router>
);

export default App;

