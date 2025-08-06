// src/layouts/MainLayout.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex h-screen">
    <aside className="w-64 bg-white shadow p-6">
      <h2 className="text-xl font-semibold mb-6">MindFlow</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <NavLink to="/" className={({ isActive }) => 
              `block text-gray-700 hover:text-blue-500 ${isActive ? 'font-bold text-blue-600' : ''}`
            }>
              Dashboard
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink to="/tasks" className={({ isActive }) => 
              `block text-gray-700 hover:text-blue-500 ${isActive ? 'font-bold text-blue-600' : ''}`
            }>
              Tasks
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink to="/calendar" className={({ isActive }) => 
              `block text-gray-700 hover:text-blue-500 ${isActive ? 'font-bold text-blue-600' : ''}`
            }>
              Calendar
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink to="/ai" className={({ isActive }) => 
              `block text-gray-700 hover:text-blue-500 ${isActive ? 'font-bold text-blue-600' : ''}`
            }>
              AI
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink to="/reflection" className={({ isActive }) => 
              `block text-gray-700 hover:text-blue-500 ${isActive ? 'font-bold text-blue-600' : ''}`
            }>
              Reflection
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
    <main className="flex-1 p-6 bg-gray-50 overflow-auto">
      {children}
    </main>
  </div>
);

export default MainLayout;