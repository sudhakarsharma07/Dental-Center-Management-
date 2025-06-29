import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Home,
  Users,
  Calendar,
  FileText,
  Activity,
  Stethoscope
} from 'lucide-react';

const adminNavItems = [
  { to: '/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/patients', icon: Users, label: 'Patients' },
  { to: '/appointments', icon: Calendar, label: 'Appointments' },
  { to: '/calendar', icon: Activity, label: 'Calendar View' },
];

const patientNavItems = [
  { to: '/patient-dashboard', icon: Home, label: 'Dashboard' },
  { to: '/patient-appointments', icon: Calendar, label: 'My Appointments' },
  { to: '/patient-records', icon: FileText, label: 'Medical Records' },
];

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const navItems = user?.role === 'Admin' ? adminNavItems : patientNavItems;

  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 shadow-lg flex flex-col">
      {/* Logo Header */}
      <div className="flex items-center justify-center py-6">
  <Link to="/" className="flex items-center gap-2">
    <div className="bg-blue-100 p-3 rounded-full shadow">
      <Stethoscope className="w-6 h-6 text-blue-700" />
    </div>
    <h1 className="text-xl font-extrabold text-blue-800 tracking-tight">
      Dental<span className="text-green-500">Care</span>
    </h1>
  </Link>
</div>


      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto mt-6 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200
                   ${
                     isActive
                       ? 'bg-blue-100 text-blue-700 shadow-inner border-l-4 border-blue-600'
                       : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                   }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer (optional) */}
      <div className="px-4 py-4 border-t text-xs text-gray-400">
        © {new Date().getFullYear()} DentalCare
      </div>
    </aside>
  );
};
