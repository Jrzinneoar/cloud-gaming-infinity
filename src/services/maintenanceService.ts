
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  simulateBotAction: (action: 'enable' | 'disable' | 'log' | 'update-time', value?: any) => void;
}

// Use persist middleware to store the state in localStorage
export const useMaintenanceStore = create<MaintenanceState>()(
  persist(
    (set) => ({
      isMaintenanceMode: false,
      maintenanceLogs: [
        { 
          message: 'Sistema pronto para manutenção', 
          timestamp: new Date(), 
          type: 'info' 
        }
      ],
      estimatedTimeInMinutes: 90, // 1.5 hours default
      
      toggleMaintenanceMode: () => 
        set((state) => {
          const newMode = !state.isMaintenanceMode;
          const message = newMode 
            ? 'Iniciando modo de manutenção do sistema' 
            : 'Finalizando modo de manutenção do sistema';
          
          console.log('Maintenance mode toggled:', newMode);
          
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
          
          console.log('Maintenance mode set to:', enabled);
          
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
        set((state) => ({
          maintenanceLogs: [
            {
              message,
              timestamp: new Date(),
              type
            },
            ...state.maintenanceLogs
          ]
        })),
      
      setEstimatedTime: (minutes) => 
        set((state) => ({
          estimatedTimeInMinutes: minutes,
          maintenanceLogs: [
            {
              message: `Tempo estimado atualizado para ${minutes} minutos`,
              timestamp: new Date(),
              type: 'info'
            },
            ...state.maintenanceLogs
          ]
        })),
      
      // This simulates what a Discord bot would do
      simulateBotAction: (action, value) => 
        set((state) => {
          console.log('Bot action triggered:', action, value);
          
          switch (action) {
            case 'enable':
              return {
                isMaintenanceMode: true,
                maintenanceLogs: [
                  {
                    message: 'Modo de manutenção ativado via Discord',
                    timestamp: new Date(),
                    type: 'info'
                  },
                  ...state.maintenanceLogs
                ]
              };
            
            case 'disable':
              return {
                isMaintenanceMode: false,
                maintenanceLogs: [
                  {
                    message: 'Modo de manutenção desativado via Discord',
                    timestamp: new Date(),
                    type: 'info'
                  },
                  ...state.maintenanceLogs
                ]
              };
            
            case 'log':
              return {
                maintenanceLogs: [
                  {
                    message: value || 'Atualização de status do sistema via Discord',
                    timestamp: new Date(),
                    type: 'info'
                  },
                  ...state.maintenanceLogs
                ]
              };
            
            case 'update-time':
              return {
                estimatedTimeInMinutes: value || state.estimatedTimeInMinutes,
                maintenanceLogs: [
                  {
                    message: `Tempo estimado atualizado para ${value || state.estimatedTimeInMinutes} minutos via Discord`,
                    timestamp: new Date(),
                    type: 'info'
                  },
                  ...state.maintenanceLogs
                ]
              };
            
            default:
              return state;
          }
        })
    }),
    {
      name: 'maintenance-storage', // unique name for localStorage
      getStorage: () => localStorage,
      partialize: (state) => ({
        isMaintenanceMode: state.isMaintenanceMode,
        maintenanceLogs: state.maintenanceLogs,
        estimatedTimeInMinutes: state.estimatedTimeInMinutes
      }),
    }
  )
);

// In a real implementation, this would connect to a WebSocket or use polling
// to receive real-time updates from the Discord bot
export const initMaintenanceBotConnection = () => {
  console.log('Initializing connection to maintenance bot (simulated)');
  
  // Simulate bot messages coming in at random intervals
  const botMessages = [
    'Verificando estado dos servidores',
    'Atualizando drivers de GPU',
    'Instalando patches de segurança',
    'Otimizando performance do sistema',
    'Testando latência da rede',
    'Reinstalando pacotes do sistema',
    'Verificando integridade dos arquivos',
    'Configurando novas instâncias'
  ];
  
  let timeoutId: ReturnType<typeof setTimeout>;
  
  // Random bot activity simulation
  const simulateRandomBotActivity = () => {
    const { simulateBotAction, addMaintenanceLog } = useMaintenanceStore.getState();
    
    const randomAction = Math.random();
    
    if (randomAction < 0.7) {
      // 70% chance to just log a message
      const randomMessage = botMessages[Math.floor(Math.random() * botMessages.length)];
      addMaintenanceLog(randomMessage);
    } else if (randomAction < 0.85) {
      // 15% chance to update time estimate
      const newTime = Math.floor(Math.random() * 120) + 30; // 30 to 150 minutes
      simulateBotAction('update-time', newTime);
    } else if (randomAction < 0.92) {
      // 7% chance to enable maintenance mode
      simulateBotAction('enable');
    } else {
      // 8% chance to disable maintenance mode
      simulateBotAction('disable');
    }
    
    // Schedule next activity
    const nextDelay = Math.floor(Math.random() * 30000) + 15000; // 15-45 seconds
    timeoutId = setTimeout(simulateRandomBotActivity, nextDelay);
  };
  
  // Start the simulation after a short delay
  timeoutId = setTimeout(simulateRandomBotActivity, 5000);
  
  // Simulate an initial bot message
  useMaintenanceStore.getState().addMaintenanceLog('Bot de manutenção conectado com sucesso');
  
  return () => {
    console.log('Disconnecting from maintenance bot (simulated)');
    clearTimeout(timeoutId);
  };
};

// Export a function to manually trigger the bot for testing
export const triggerMaintenanceBot = (action: 'enable' | 'disable') => {
  const { simulateBotAction } = useMaintenanceStore.getState();
  simulateBotAction(action);
};
