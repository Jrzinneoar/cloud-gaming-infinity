
import { create } from 'zustand';
import { DB, MaintenanceSettings } from './database';

// Define types for our maintenance store
interface MaintenanceLog {
  message: string;
  timestamp: Date;
  type: 'info' | 'warning' | 'error';
}

interface MaintenanceStore {
  isMaintenanceMode: boolean;
  estimatedTimeInMinutes: number;
  maintenanceLogs: MaintenanceLog[];
  setMaintenanceMode: (mode: boolean) => void;
  toggleMaintenanceMode: () => void;
  setEstimatedTime: (minutes: number) => void;
  addMaintenanceLog: (message: string, type?: 'info' | 'warning' | 'error') => void;
}

// Create the Zustand store
export const useMaintenanceStore = create<MaintenanceStore>((set, get) => ({
  isMaintenanceMode: false,
  estimatedTimeInMinutes: 60,
  maintenanceLogs: [],
  
  // Set maintenance mode
  setMaintenanceMode: (mode: boolean) => {
    set({ isMaintenanceMode: mode });
    
    // Update the database
    const settings = DB.getMaintenanceSettings();
    settings.isActive = mode;
    DB.saveMaintenanceSettings(settings);
    
    // Add log
    get().addMaintenanceLog(`Modo de manutenção ${mode ? 'ativado' : 'desativado'}`, 'info');
  },
  
  // Toggle maintenance mode
  toggleMaintenanceMode: () => {
    const currentMode = get().isMaintenanceMode;
    get().setMaintenanceMode(!currentMode);
  },
  
  // Set estimated time
  setEstimatedTime: (minutes: number) => {
    set({ estimatedTimeInMinutes: minutes });
    
    // Update the database
    const settings = DB.getMaintenanceSettings();
    settings.estimatedTimeMinutes = minutes;
    DB.saveMaintenanceSettings(settings);
    
    // Add log
    get().addMaintenanceLog(`Tempo estimado atualizado para ${minutes} minutos`, 'info');
  },
  
  // Add maintenance log
  addMaintenanceLog: (message: string, type = 'info') => {
    const newLog = {
      message,
      timestamp: new Date(),
      type
    };
    
    set(state => ({
      maintenanceLogs: [newLog, ...state.maintenanceLogs].slice(0, 50) // Keep only the last 50 logs
    }));
    
    // Add to database logs
    DB.addMaintenanceLog(message, type);
  }
}));

// Function to initialize the connection to the maintenance bot
// This is a simplified version since we're using localStorage
export const initMaintenanceBotConnection = () => {
  // Log the initialization
  console.log('Initializing connection to maintenance bot (simulated)');
  
  // Load initial maintenance settings from the database
  const settings = DB.getMaintenanceSettings();
  
  // Update the store with database values
  const store = useMaintenanceStore.getState();
  
  // Update store with database values if they exist
  if (settings) {
    store.setMaintenanceMode(settings.isActive);
    store.setEstimatedTime(settings.estimatedTimeMinutes);
    
    // Load logs
    const logs: MaintenanceLog[] = settings.logs.map(log => ({
      message: log.message,
      timestamp: new Date(log.timestamp),
      type: log.type
    }));
    
    useMaintenanceStore.setState({ maintenanceLogs: logs });
  }
  
  // Return a function to disconnect
  return () => {
    console.log('Disconnecting from maintenance bot');
  };
};
