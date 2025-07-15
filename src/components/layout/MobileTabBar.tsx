import React from 'react';
import { Home, ShoppingCart, Package, BarChart3, Users } from 'lucide-react';
import { NavigationItem } from '../../types';

interface MobileTabBarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const MobileTabBar: React.FC<MobileTabBarProps> = ({ currentPath, onNavigate }) => {
  const navigationItems: NavigationItem[] = [
    { label: 'Caisse', path: '/caisse', icon: <Home size={20} /> },
    { label: 'Ventes', path: '/ventes', icon: <ShoppingCart size={20} /> },
    { label: 'Produits', path: '/produits', icon: <Package size={20} /> },
    { label: 'Dashboard', path: '/dashboard', icon: <BarChart3 size={20} /> },
    { label: 'Contacts', path: '/contacts', icon: <Users size={20} /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 flex items-center justify-around py-2 z-50">
      {navigationItems.map((item) => {
        const isActive = currentPath === item.path;
        return (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            className={`
              relative flex flex-col items-center justify-center py-2 px-3 rounded-lg
              transition-all duration-200
              ${isActive ? 'text-white' : 'text-gray-400'}
            `}
          >
            <div className={`p-2 rounded-lg ${isActive ? 'bg-gray-800' : ''}`}>
              {item.icon}
            </div>
            {isActive && (
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-b-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default MobileTabBar;