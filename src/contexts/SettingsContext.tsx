import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type Currency = 'FCFA' | 'USD' | 'EUR';
export type Language = 'fr' | 'en';

interface Settings {
  theme: Theme;
  currency: Currency;
  language: Language;
  notifications: boolean;
}

interface SettingsContextType {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const defaultSettings: Settings = {
  theme: 'system',
  currency: 'FCFA',
  language: 'fr',
  notifications: true,
};

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const storedSettings = localStorage.getItem('app-settings');
      return storedSettings ? JSON.parse(storedSettings) : defaultSettings;
    } catch (error) {
      console.error('Failed to parse settings from localStorage', error);
      return defaultSettings;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('app-settings', JSON.stringify(settings));
      
      // Gérer le thème
      if (settings.theme === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', systemPrefersDark);
      } else {
        document.documentElement.classList.toggle('dark', settings.theme === 'dark');
      }

    } catch (error) {
      console.error('Failed to save settings to localStorage', error);
    }
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
