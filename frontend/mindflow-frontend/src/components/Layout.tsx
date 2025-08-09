// src/components/Layout.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, List, Calendar as CalendarIcon, Cpu, BookOpen, User as UserIcon } from 'lucide-react';
import { Button } from './ui/button';

const Sidebar: React.FC = () => (
  <aside className="w-64 bg-white shadow-lg flex flex-col">
    <div className="p-6 flex items-center space-x-2">
      <img src="/logo.svg" alt="MindFlow" className="h-8 w-8" />
      <span className="text-xl font-bold">MindFlow</span>
    </div>
    <nav className="flex-1 px-4 space-y-2">
      <NavLink
        to="/"
        className={({ isActive }) => 
          `flex items-center p-3 rounded-lg hover:bg-gray-100 ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700'}`
        }
      >
        <Home className="w-5 h-5 mr-3" /> Dashboard
      </NavLink>
      <NavLink
        to="/tasks"
        className={({ isActive }) => 
          `flex items-center p-3 rounded-lg hover:bg-gray-100 ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700'}`
        }
      >
        <List className="w-5 h-5 mr-3" /> Tasks
      </NavLink>
      <NavLink
        to="/calendar"
        className={({ isActive }) => 
          `flex items-center p-3 rounded-lg hover:bg-gray-100 ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700'}`
        }
      >
        <CalendarIcon className="w-5 h-5 mr-3" /> Calendar
      </NavLink>
      <NavLink
        to="/ai"
        className={({ isActive }) => 
          `flex items-center p-3 rounded-lg hover:bg-gray-100 ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700'}`
        }
      >
        <Cpu className="w-5 h-5 mr-3" /> AI
      </NavLink>
      <NavLink
        to="/reflection"
        className={({ isActive }) => 
          `flex items-center p-3 rounded-lg hover:bg-gray-100 ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700'}`
        }
      >
        <BookOpen className="w-5 h-5 mr-3" /> Reflection
      </NavLink>
    </nav>
  </aside>
);

const Navbar: React.FC = () => (
  <header className="flex items-center justify-between bg-white shadow px-6 py-4">
    <div className="flex items-center space-x-4">
      <Button variant="ghost" size="sm">
        <img src="/menu.svg" alt="Menu" className="w-5 h-5" />
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
