import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Sun, Moon, Monitor, Palette, Settings, Bell, LogOut } from 'lucide-react';
import { useSettings, Currency, Language } from '../../contexts/SettingsContext';
import { useAuth } from '../../hooks/useAuth';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onOpenChange }) => {
  const { settings, setSettings } = useSettings();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg bg-gray-800/80 text-white rounded-2xl shadow-2xl border border-gray-700 z-50 data-[state=open]:animate-contentShow backdrop-blur-xl flex flex-col max-h-[85vh]">
          
          {/* En-tête fixe */}
          <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-gray-700/50">
            <Dialog.Title className="text-2xl font-bold">Paramètres</Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors" aria-label="Fermer">
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          {/* Contenu scrollable */}
          <div className="flex-grow overflow-y-auto p-6 space-y-4 no-scrollbar">
            {/* Section Compte Utilisateur */}
            <div className="flex items-center p-4 bg-gray-900/50 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-xl flex-shrink-0">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <div className="ml-4 flex-grow min-w-0">
                <p className="font-semibold text-white truncate">{user?.email}</p>
                <p className="text-sm text-gray-400">Gérer votre compte</p>
              </div>
              <button onClick={handleSignOut} title="Se déconnecter" className="ml-4 p-2 rounded-full text-red-400 hover:text-white hover:bg-red-500/20 transition-colors flex-shrink-0">
                <LogOut size={22} />
              </button>
            </div>
            
            <SettingsSection icon={<Palette size={20} />} title="Apparence">
              <p className="text-sm font-medium mb-3 text-gray-300">Thème</p>
              <div className="grid grid-cols-3 gap-3">
                <ThemeButton icon={<Sun size={20} />} label="Clair" active={settings.theme === 'light'} onClick={() => setSettings(p => ({ ...p, theme: 'light' }))} />
                <ThemeButton icon={<Moon size={20} />} label="Sombre" active={settings.theme === 'dark'} onClick={() => setSettings(p => ({ ...p, theme: 'dark' }))} />
                <ThemeButton icon={<Monitor size={20} />} label="Système" active={settings.theme === 'system'} onClick={() => setSettings(p => ({ ...p, theme: 'system' }))} />
              </div>
            </SettingsSection>

            <SettingsSection icon={<Settings size={20} />} title="Général">
              <SelectRow label="Devise">
                <Select value={settings.currency} onChange={e => setSettings(p => ({ ...p, currency: e.target.value as Currency }))}>
                  <option value="FCFA">FCFA</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </Select>
              </SelectRow>
              <SelectRow label="Langue">
                <Select value={settings.language} onChange={e => setSettings(p => ({ ...p, language: e.target.value as Language }))}>
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </Select>
              </SelectRow>
            </SettingsSection>

            <SettingsSection icon={<Bell size={20} />} title="Notifications">
              <ToggleRow 
                label="Notifications de stock bas" 
                enabled={settings.notifications} 
                onToggle={() => setSettings(p => ({ ...p, notifications: !p.notifications }))} 
              />
            </SettingsSection>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

// Sous-composants (inchangés)
const SettingsSection: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="border-t border-gray-700/50 pt-4 first:border-t-0 first:pt-0">
    <div className="flex items-center text-gray-300 mb-3">
      {icon}
      <h3 className="text-lg font-semibold ml-3">{title}</h3>
    </div>
    <div className="space-y-3 pl-9">{children}</div>
  </div>
);

const ThemeButton: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick} 
    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${active ? 'border-blue-500 bg-blue-500/20 text-white' : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/50 text-gray-300'}`}>
    {icon}
    <span className="text-sm font-medium mt-2">{label}</span>
  </button>
);

const SelectRow: React.FC<{ label: string, children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex items-center justify-between">
    <p className="text-sm text-gray-200">{label}</p>
    {children}
  </div>
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ children, ...props }) => (
  <select {...props} className="bg-gray-700 border border-gray-600 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
    {children}
  </select>
);

const ToggleRow: React.FC<{ label: string, enabled: boolean, onToggle: () => void }> = ({ label, enabled, onToggle }) => (
  <div className="flex items-center justify-between">
    <p className="text-sm text-gray-200">{label}</p>
    <button onClick={onToggle} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-all duration-200 ${enabled ? 'bg-blue-600' : 'bg-gray-600'}`}>
      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  </div>
);

export default SettingsDialog;
