
import { create } from 'zustand';
import { DB } from './database';

interface MaintenanceState {
  isMaintenanceMode: boolean;
  maintenanceLogs: {
    message: string;
    timestamp: Date;
    type: 'info' | 'warning' | 'error';
  }[];
  toggleMaintenanceMode: () => void;
  setMaintenanceMode: (enabled: boolean) => void;
  addMaintenanceLog: (message: string, type?: 'info' | 'warning' | 'error') => void;
  estimatedTimeInMinutes: number;
  setEstimatedTime: (minutes: number) => void;
}

// Load initial state from database
const initialState = DB.getMaintenanceSettings();

export const useMaintenanceStore = create<MaintenanceState>()((set) => ({
  isMaintenanceMode: initialState.isActive,
  estimatedTimeInMinutes: initialState.estimatedTimeMinutes,
  maintenanceLogs: initialState.logs.map(log => ({
    message: log.message,
    timestamp: new Date(log.timestamp),
    type: log.type
  })),
  
  toggleMaintenanceMode: () => 
    set((state) => {
      const newMode = !state.isMaintenanceMode;
      const message = newMode 
        ? 'Iniciando modo de manutenção do sistema' 
        : 'Finalizando modo de manutenção do sistema';
      
      // Save to database
      const settings = DB.getMaintenanceSettings();
      settings.isActive = newMode;
      DB.saveMaintenanceSettings(settings);
      DB.addMaintenanceLog(message);
      
      return {
        isMaintenanceMode: newMode,
        maintenanceLogs: [
          {
            message,
            timestamp: new Date(),
            type: 'info'
          },
          ...state.maintenanceLogs
        ]
      };
    }),
  
  setMaintenanceMode: (enabled) => 
    set((state) => {
      if (state.isMaintenanceMode === enabled) return state;
      
      const message = enabled 
        ? 'Iniciando modo de manutenção do sistema' 
        : 'Finalizando modo de manutenção do sistema';
      
      // Save to database
      const settings = DB.getMaintenanceSettings();
      settings.isActive = enabled;
      DB.saveMaintenanceSettings(settings);
      DB.addMaintenanceLog(message);
      
      return {
        isMaintenanceMode: enabled,
        maintenanceLogs: [
          {
            message,
            timestamp: new Date(),
            type: 'info'
          },
          ...state.maintenanceLogs
        ]
      };
    }),
  
  addMaintenanceLog: (message, type = 'info') => 
    set((state) => {
      // Save to database
      DB.addMaintenanceLog(message, type);
      
      return {
        maintenanceLogs: [
          {
            message,
            timestamp: new Date(),
            type
          },
          ...state.maintenanceLogs
        ]
      };
    }),
  
  setEstimatedTime: (minutes) => 
    set((state) => {
      // Save to database
      const settings = DB.getMaintenanceSettings();
      settings.estimatedTimeMinutes = minutes;
      DB.saveMaintenanceSettings(settings);
      DB.addMaintenanceLog(`Tempo estimado atualizado para ${minutes} minutos`);
      
      return {
        estimatedTimeInMinutes: minutes,
        maintenanceLogs: [
          {
            message: `Tempo estimado atualizado para ${minutes} minutos`,
            timestamp: new Date(),
            type: 'info'
          },
          ...state.maintenanceLogs
        ]
      };
    }),
}));

// Hook to sync database changes with the store
export const useSyncMaintenanceWithDatabase = () => {
  const syncFromDatabase = () => {
    const dbSettings = DB.getMaintenanceSettings();
    const { setMaintenanceMode, setEstimatedTime } = useMaintenanceStore.getState();
    
    // Only update if there's a change
    const storeState = useMaintenanceStore.getState();
    if (storeState.isMaintenanceMode !== dbSettings.isActive) {
      setMaintenanceMode(dbSettings.isActive);
    }
    
    if (storeState.estimatedTimeInMinutes !== dbSettings.estimatedTimeMinutes) {
      setEstimatedTime(dbSettings.estimatedTimeMinutes);
    }
  };
  
  // Return the sync function for components to use
  return { syncFromDatabase };
};

// In a real implementation, this would connect to a WebSocket or use polling
// to receive real-time updates
export const initMaintenanceBotConnection = () => {
  console.log('Initializing connection to maintenance bot (simulated)');
  
  // Make sure we're in sync with the database
  const dbSettings = DB.getMaintenanceSettings();
  const { setMaintenanceMode, setEstimatedTime } = useMaintenanceStore.getState();
  setMaintenanceMode(dbSettings.isActive);
  setEstimatedTime(dbSettings.estimatedTimeMinutes);
  
  return () => {
    console.log('Disconnecting from maintenance bot (simulated)');
  };
};

// Export a function to manually trigger the bot for testing
export const triggerMaintenanceBot = (action: 'enable' | 'disable') => {
  const { setMaintenanceMode } = useMaintenanceStore.getState();
  setMaintenanceMode(action === 'enable');
};
