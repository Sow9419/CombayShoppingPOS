import React from 'react';
import { Store, ShoppingCart, Package, BarChart3, Users, User, LogOut } from 'lucide-react';
import { NavigationItem } from '../../types';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onSettingsClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPath, onNavigate, onSettingsClick }) => {
  const { signOut } = useAuth();

  const navigationItems: NavigationItem[] = [
    { label: 'Caisse', path: '/caisse', icon: <Store size={20} strokeWidth={2.5} stroke='currentColor' /> },
    { label: 'Ventes', path: '/ventes', icon: <ShoppingCart size={20} strokeWidth={2} stroke='currentColor'/> },
    { label: 'Produits', path: '/produits', icon: <Package size={20} strokeWidth={2} stroke='currentColor' /> },
    { label: 'Dashboard', path: '/dashboard', icon: <BarChart3 size={20} strokeWidth={2} stroke='currentColor' /> },
    { label: 'Contacts', path: '/contacts', icon: <Users size={20} strokeWidth={2} stroke='currentColor'/> },
  ];

  const handleSignOut = async () => {
    await signOut();
    // La redirection sera gérée automatiquement par useAuth
  };

  return (
    <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-16 bg-white dark:bg-black border-r border-gray-100 dark:border-gray-900/60">
      {/* Logo Section */}
      <div className="flex items-center justify-center h-16">
        <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">C-S</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col items-center py-6 space-y-4">
        {navigationItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={`
                relative w-12 h-9 rounded-r-sm flex items-center justify-center
                transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-800
                ${isActive ? 'text-blue-700 dark:text-900 dark:text-white bg-black/5 dark:bg-gray-800/40' : 'text-gray-600 dark:text-gray-400/70 dark:hover:text-white'}
              `}
              title={item.label}
            >
              {item.icon}
              {isActive && (
                <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-9 bg-blue-500 rounded-r-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="flex flex-col items-center py-4 space-y-4 ">
        <button onClick={onSettingsClick} className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-700 dark:text-gray-400/70 hover:text-white hover:bg-gray-800 transition-all duration-200 bg-gray-200 dark:bg-gray-900/60">
          <User size={20} />
        </button>
        <button 
          onClick={handleSignOut}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-700 dark:text-gray-400/70 hover:text-white hover:bg-gray-800 transition-all duration-200 bg-gray-200 dark:bg-gray-900/60"
          title="Se déconnecter"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;