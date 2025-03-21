// Simple database implementation using localStorage
const DB_KEYS = {
  MAINTENANCE: 'db_maintenance_settings',
  PLANS: 'db_plans'
} as const;

// Maintenance Settings
export interface MaintenanceSettings {
  isActive: boolean;
  estimatedTimeMinutes: number;
  lastUpdated: string;
  logs: {
    message: string;
    timestamp: string;
    type: 'info' | 'warning' | 'error';
  }[];
}

export const defaultMaintenanceSettings: MaintenanceSettings = {
  isActive: false,
  estimatedTimeMinutes: 90,
  lastUpdated: new Date().toISOString(),
  logs: [
    {
      message: 'Sistema iniciado',
      timestamp: new Date().toISOString(),
      type: 'info'
    }
  ]
};

// Plans
export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular: boolean;
  buttonText: string;
  buttonUrl: string;
}

export const defaultPlans: Plan[] = [
  {
    id: '1',
    name: 'Básico',
    price: 'R$ 29,90',
    period: '/mês',
    description: 'Ideal para jogadores casuais.',
    features: [
      'Latência reduzida',
      '10 horas de jogo/mês',
      'RTX 2060 Super',
      'Armazenamento de 100GB',
      'Suporte por Discord',
    ],
    isPopular: false,
    buttonText: 'Comprar Agora',
    buttonUrl: 'https://discord.gg/fDPvmrhGcd',
  },
  {
    id: '2',
    name: 'Premium',
    price: 'R$ 59,90',
    period: '/mês',
    description: 'Nosso plano mais popular.',
    features: [
      'Latência ultrabaixa',
      '50 horas de jogo/mês',
      'RTX 3080',
      'Armazenamento de 250GB',
      'Suporte prioritário',
      'Jogos pré-instalados',
    ],
    isPopular: true,
    buttonText: 'Comprar Agora',
    buttonUrl: 'https://discord.gg/fDPvmrhGcd',
  },
  {
    id: '3',
    name: 'Ultimate',
    price: 'R$ 99,90',
    period: '/mês',
    description: 'Para os gamers mais exigentes.',
    features: [
      'Latência mínima garantida',
      'Horas ilimitadas',
      'RTX 4090',
      'Armazenamento de 500GB',
      'Suporte dedicado 24/7',
      'Todos os jogos pré-instalados',
      'Acesso antecipado a novidades',
    ],
    isPopular: false,
    buttonText: 'Comprar Agora',
    buttonUrl: 'https://discord.gg/fDPvmrhGcd',
  },
];

// Database CRUD operations
export const DB = {
  // Maintenance settings
  getMaintenanceSettings: (): MaintenanceSettings => {
    try {
      const data = localStorage.getItem(DB_KEYS.MAINTENANCE);
      return data ? JSON.parse(data) : defaultMaintenanceSettings;
    } catch (error) {
      console.error('Error getting maintenance settings:', error);
      return defaultMaintenanceSettings;
    }
  },
  
  saveMaintenanceSettings: (settings: MaintenanceSettings): void => {
    try {
      settings.lastUpdated = new Date().toISOString();
      localStorage.setItem(DB_KEYS.MAINTENANCE, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving maintenance settings:', error);
    }
  },
  
  addMaintenanceLog: (message: string, type: 'info' | 'warning' | 'error' = 'info'): void => {
    try {
      const settings = DB.getMaintenanceSettings();
      settings.logs.unshift({
        message,
        timestamp: new Date().toISOString(),
        type
      });
      // Keep only the last 50 logs
      if (settings.logs.length > 50) {
        settings.logs = settings.logs.slice(0, 50);
      }
      DB.saveMaintenanceSettings(settings);
    } catch (error) {
      console.error('Error adding maintenance log:', error);
    }
  },
  
  // Plans
  getPlans: (): Plan[] => {
    try {
      const data = localStorage.getItem(DB_KEYS.PLANS);
      return data ? JSON.parse(data) : defaultPlans;
    } catch (error) {
      console.error('Error getting plans:', error);
      return defaultPlans;
    }
  },
  
  savePlans: (plans: Plan[]): void => {
    try {
      localStorage.setItem(DB_KEYS.PLANS, JSON.stringify(plans));
    } catch (error) {
      console.error('Error saving plans:', error);
    }
  },
  
  addPlan: (plan: Omit<Plan, 'id'>): Plan => {
    try {
      const plans = DB.getPlans();
      const newPlan: Plan = {
        ...plan,
        id: Date.now().toString(),
      };
      plans.push(newPlan);
      DB.savePlans(plans);
      return newPlan;
    } catch (error) {
      console.error('Error adding plan:', error);
      throw error;
    }
  },
  
  updatePlan: (id: string, plan: Partial<Omit<Plan, 'id'>>): Plan | null => {
    try {
      const plans = DB.getPlans();
      const index = plans.findIndex(p => p.id === id);
      if (index === -1) return null;
      
      plans[index] = { ...plans[index], ...plan };
      DB.savePlans(plans);
      return plans[index];
    } catch (error) {
      console.error('Error updating plan:', error);
      return null;
    }
  },
  
  deletePlan: (id: string): boolean => {
    try {
      const plans = DB.getPlans();
      const filteredPlans = plans.filter(p => p.id !== id);
      if (filteredPlans.length === plans.length) return false;
      
      DB.savePlans(filteredPlans);
      return true;
    } catch (error) {
      console.error('Error deleting plan:', error);
      return false;
    }
  },
  
  // Init - make sure defaults are saved if data doesn't exist
  init: (): void => {
    // Init maintenance settings
    if (!localStorage.getItem(DB_KEYS.MAINTENANCE)) {
      DB.saveMaintenanceSettings(defaultMaintenanceSettings);
    }
    
    // Init plans
    if (!localStorage.getItem(DB_KEYS.PLANS)) {
      DB.savePlans(defaultPlans);
    }
  }
};

// Initialize the database on import
DB.init();
