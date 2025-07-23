import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';
import MobileTabBar from './MobileTabBar';
import SettingsDialog from '../dialogs/SettingsDialog';

interface LayoutProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPath, onNavigate }) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      {/* Desktop Sidebar */}
      <Sidebar currentPath={currentPath} onNavigate={onNavigate} onSettingsClick={() => setShowSettings(true)} />
      
      {/* Mobile Header */}
      <MobileHeader onProfileClick={() => setShowSettings(true)} />
      
      {/* Main Content */}
      <main className="md:ml-16 pt-16 md:pt-0 pb-20 md:pb-0 min-h-screen bg-black">
        <div className="p-0 md:p-0">
          {children}
        </div>
      </main>
      
      {/* Mobile Tab Bar */}
      <MobileTabBar currentPath={currentPath} onNavigate={onNavigate} />

      <SettingsDialog open={showSettings} onOpenChange={setShowSettings} />
    </div>
  );
};

export default Layout;