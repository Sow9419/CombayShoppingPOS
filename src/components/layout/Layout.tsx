import React from 'react';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';
import MobileTabBar from './MobileTabBar';

interface LayoutProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPath, onNavigate }) => {
  return (
    <div className="min-h-screen bg-black">
      {/* Desktop Sidebar */}
      <Sidebar currentPath={currentPath} onNavigate={onNavigate} />
      
      {/* Mobile Header */}
      <MobileHeader />
      
      {/* Main Content */}
      <main className="md:ml-16 pt-16 md:pt-0 pb-20 md:pb-0 min-h-screen">
        <div className="p-0 md:p-0">
          {children}
        </div>
      </main>
      
      {/* Mobile Tab Bar */}
      <MobileTabBar currentPath={currentPath} onNavigate={onNavigate} />
    </div>
  );
};

export default Layout;