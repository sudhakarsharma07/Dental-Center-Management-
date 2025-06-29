import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { LogOut, User } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const displayName = user?.name || user?.email || 'User';

  return (
    <header className="bg-gradient-to-r from-white to-blue-50 border-b border-gray-200 px-6 py-4 shadow-md sticky top-0 z-30">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left: Page Title and Welcome */}
        <div>
          <h1 className="text-2xl font-bold text-blue-700">
            {user?.role === 'Admin' ? 'Admin Panel' : 'Patient Dashboard'}
          </h1>
          <p className="text-sm text-gray-600">
            Welcome back, <span className="font-medium text-gray-800">{displayName}</span> 👋
          </p>
        </div>

        {/* Right: User Role & Logout */}
        <div className="flex items-center gap-4">
          <div 
            className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
            title={`Logged in as ${user?.role}`}
          >
            <User className="w-4 h-4" />
            {user?.role}
          </div>

          <Button
            // theme="solid"
            size="sm"
            icon={LogOut}
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white shadow-md"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
