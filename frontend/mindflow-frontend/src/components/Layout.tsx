// src/components/Layout.tsx
import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Home, List, Calendar as CalendarIcon, Cpu, BookOpen, User as UserIcon } from 'lucide-react';
import { Button } from './ui/button';

const Sidebar: React.FC = () => (
  <aside className="w-64 bg-white shadow-lg flex flex-col">
    <div className="p-6 flex items-center space-x-3">
      <Link to="/" className="flex items-center">
        {/* Wordmark (black on white, like Notion) */}
        <img src="/logo.svg" alt="MindFlow" className="h-7" />
      </Link>
    </div>

    <nav className="flex-1 px-4 space-y-2">
      {[
        { to: '/', label: 'Dashboard', Icon: Home },
        { to: '/tasks', label: 'Tasks', Icon: List },
        { to: '/calendar', label: 'Calendar', Icon: CalendarIcon },
        { to: '/ai', label: 'AI', Icon: Cpu },
        { to: '/reflection', label: 'Reflection', Icon: BookOpen },
      ].map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg hover:bg-gray-100 transition ${
              isActive ? 'bg-black text-white' : 'text-gray-700'
            }`
          }
        >
          <Icon className="w-5 h-5 mr-3" />
          {label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

const Navbar: React.FC = () => (
  <header className="flex items-center justify-between bg-white shadow px-6 py-4">
    <div className="flex items-center space-x-4">
      <Button variant="ghost" size="sm" aria-label="Open menu">
        <img src="/menu.svg" alt="" className="w-5 h-5" />
      </Button>
      <h2 className="text-2xl font-semibold">Dashboard</h2>
    </div>
    <div className="flex items-center space-x-4">
      <UserIcon className="w-6 h-6 text-gray-500" />
      <span className="font-medium text-gray-700">Aleazar</span>
      <Button variant="default" size="sm">Sign Out</Button>
    </div>
  </header>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex h-screen bg-gray-50">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  </div>
);

export default Layout;

