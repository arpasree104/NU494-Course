import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem, AppSettings, ClassroomLink } from '../types';
import { api } from '../services/api';

interface ConfigContextType {
  settings: AppSettings | null;
  menus: MenuItem[];
  classroomLinks: ClassroomLink[];
  loading: boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [classroomLinks, setClassroomLinks] = useState<ClassroomLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadConfig() {
      try {
        const [appSettings, appMenus, appLinks] = await Promise.all([
          api.settings.get(),
          api.menus.list(),
          api.classroom.list()
        ]);
        setSettings(appSettings);
        setMenus(appMenus);
        setClassroomLinks(appLinks);
      } catch (error) {
        console.error("Failed to load config", error);
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ settings, menus, classroomLinks, loading }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}
