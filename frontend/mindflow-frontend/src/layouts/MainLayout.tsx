// src/layouts/MainLayout.tsx
import React from 'react';
// import { NavLink } from 'react-router-dom';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex h-screen">
    <main className="flex-1 p-6 bg-gray-50 overflow-auto">
      {children}
    </main>
  </div>
);

export default MainLayout;