// src/layouts/AuthLayout.tsx
import React from 'react';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="w-full max-w-md">
      {children}
    </div>
  </div>
);

export default AuthLayout;