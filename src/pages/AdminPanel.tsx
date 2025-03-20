
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ParticleBackground from '../components/ui/ParticleBackground';
import GlassCard from '../components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useMaintenanceStore } from '../services/maintenanceService';
import { ArrowLeft, Power, Clock, RefreshCw, Server, Shield, Save } from 'lucide-react';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    isMaintenanceMode, 
    toggleMaintenanceMode,
    setMaintenanceMode,
    maintenanceLogs, 
    addMaintenanceLog,
    estimatedTimeInMinutes,
    setEstimatedTime
  } = useMaintenanceStore();
  
  const [minutes, setMinutes] = useState(estimatedTimeInMinutes.toString());
  
  // Check if user is authenticated (in a real app this would be more robust)
  useEffect(() => {
    // This is a simple check. In a real app, you'd use a proper auth system
    const isAuthenticated = sessionStorage.getItem('admin-auth') === 'true';
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    sessionStorage.removeItem('admin-auth');
    navigate('/admin');
  };
  
  const handleToggleMaintenance = () => {
    toggleMaintenanceMode();
    
    toast({
      title: isMaintenanceMode ? "Modo de manutenção desativado" : "Modo de manutenção ativado",
      description: isMaintenanceMode ? 
        "O site agora está acessível para todos os usuários." : 
        "O site agora está em modo de manutenção.",
      variant: "default",
    });
    
    addMaintenanceLog(`Modo de manutenção ${isMaintenanceMode ? 'desativado' : 'ativado'} pelo painel admin`);
  };
  
  const handleUpdateTime = () => {
    const newTime = parseInt(minutes);
    if (isNaN(newTime) || newTime <= 0) {
      toast({
        title: "Erro ao atualizar tempo",
        description: "Por favor, insira um valor válido maior que zero.",
        variant: "destructive",
      });
      return;
    }
    
    setEstimatedTime(newTime);
    
    toast({
      title: "Tempo atualizado",
      description: `Tempo estimado atualizado para ${newTime} minutos.`,
      variant: "default",
    });
  };
  
  const formatTimestamp = (date: Date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };
  
  const getLogIcon = (type: 'info' | 'warning' | 'error') => {
    switch (type) {
      case 'info':
        return <div className="h-2 w-2 bg-blue-400 rounded-full"></div>;
      case 'warning':
        return <div className="h-2 w-2 bg-yellow-400 rounded-full"></div>;
      case 'error':
        return <div className="h-2 w-2 bg-red-400 rounded-full"></div>;
      default:
        return <div className="h-2 w-2 bg-blue-400 rounded-full"></div>;
    }
  };
  
  const systemStats = [
    { 
      icon: <Server className="h-6 w-6 text-rive-purple" />, 
      title: 'Servidores', 
      value: '12/14 Online',
      status: isMaintenanceMode ? 'Em manutenção' : 'Operacional',
      color: isMaintenanceMode ? 'text-yellow-400' : 'text-green-400'
    },
    { 
      icon: <Shield className="h-6 w-6 text-rive-purple" />, 
      title: 'Segurança', 
      value: '97%',
      status: 'Protegido',
      color: 'text-green-400'
    },
    { 
      icon: <Clock className="h-6 w-6 text-rive-purple" />, 
      title: 'Uptime', 
      value: '99.8%',
      status: isMaintenanceMode ? 'Parcial' : 'Completo',
      color: isMaintenanceMode ? 'text-yellow-400' : 'text-green-400'
    },
    { 
      icon: <RefreshCw className="h-6 w-6 text-rive-purple" />, 
      title: 'Sistema', 
      value: 'v2.4.6',
      status: isMaintenanceMode ? 'Atualizando' : 'Atualizado',
      color: isMaintenanceMode ? 'text-blue-400' : 'text-green-400'
    },
  ];

  return (
    <div className="min-h-screen p-4 relative bg-black overflow-hidden">
      <Helmet>
        <title>Painel Admin | RIVE CLOUD</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      
      <div className="max-w-6xl mx-auto pt-6 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar para o site
          </button>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="bg-black/30 text-white border-rive-purple/30 hover:bg-black/50"
            >
              Sair
            </Button>
            
            <Button 
              variant={isMaintenanceMode ? "destructive" : "default"}
              onClick={handleToggleMaintenance}
              className={`animate-pulse-subtle ${
                isMaintenanceMode 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              <Power className="h-4 w-4 mr-2" />
              {isMaintenanceMode ? 'Desativar Manutenção' : 'Ativar Manutenção'}
            </Button>
          </div>
        </div>
        
        <div className="text-center mb-8 animate-fade-up">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-gradient">Painel</span> Administrativo
          </h1>
          <p className="text-white/70">
            Gerencie o modo de manutenção e monitore o status do sistema
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-fade-up animation-delay-200">
          {systemStats.map((stat, index) => (
            <GlassCard 
              key={index} 
              className="flex items-center gap-4 p-4 hover:scale-105 transition-all duration-300"
              intensity="light"
              hoverEffect={true}
            >
              <div className="glass-panel p-3 rounded-full animate-pulse-subtle">
                {stat.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{stat.title}</h3>
                <p className="text-white/80">{stat.value}</p>
                <p className={`text-sm ${stat.color}`}>{stat.status}</p>
              </div>
            </GlassCard>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="animate-fade-up animation-delay-300">
            <GlassCard className="h-full">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Power className="h-5 w-5 text-rive-purple" />
                <span>Controle de Manutenção</span>
              </h2>
              
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-white/70 mb-2">Status atual:</p>
                  <div className={`flex items-center gap-2 text-lg font-semibold ${
                    isMaintenanceMode ? 'text-red-400' : 'text-green-400'
                  }`}>
                    <div className={`h-3 w-3 rounded-full animate-pulse ${
                      isMaintenanceMode ? 'bg-red-400' : 'bg-green-400'
                    }`}></div>
                    {isMaintenanceMode ? 'Em Manutenção' : 'Operacional'}
                  </div>
                </div>
                
                <div>
                  <p className="text-white/70 mb-2">Tempo estimado (minutos):</p>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={minutes}
                      onChange={(e) => setMinutes(e.target.value)}
                      className="glass-input w-24 text-center"
                      min="1"
                    />
                    <Button onClick={handleUpdateTime} className="bg-rive-purple hover:bg-rive-purple-dark">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Button 
                    onClick={handleToggleMaintenance} 
                    className={`w-full py-3 ${
                      isMaintenanceMode 
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    <Power className="h-5 w-5 mr-2" />
                    {isMaintenanceMode ? 'Desativar Modo de Manutenção' : 'Ativar Modo de Manutenção'}
                  </Button>
                  
                  <p className="text-white/60 text-sm mt-2">
                    {isMaintenanceMode 
                      ? 'Ao desativar, os usuários poderão acessar todas as páginas do site normalmente.' 
                      : 'Ao ativar, os usuários serão redirecionados para a página de manutenção.'}
                  </p>
                </div>
                
                <div className="mt-4">
                  <p className="text-white/70 mb-2">Definir status manualmente:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      onClick={() => {
                        setMaintenanceMode(true);
                        toast({
                          title: "Modo de manutenção ativado",
                          description: "O site agora está em modo de manutenção.",
                          variant: "default",
                        });
                      }} 
                      className="bg-yellow-500 hover:bg-yellow-600"
                    >
                      Ativar Manutenção
                    </Button>
                    
                    <Button 
                      onClick={() => {
                        setMaintenanceMode(false);
                        toast({
                          title: "Modo de manutenção desativado",
                          description: "O site agora está acessível para todos os usuários.",
                          variant: "default",
                        });
                      }} 
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Desativar Manutenção
                    </Button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
          
          <div className="animate-fade-up animation-delay-400">
            <GlassCard className="h-full">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Server className="h-5 w-5 text-rive-purple" />
                <span>Logs do Sistema</span>
              </h2>
              
              <div className="max-h-80 overflow-y-auto custom-scrollbar">
                {maintenanceLogs.slice(0, 15).map((log, index) => (
                  <div 
                    key={index} 
                    className="mb-2 p-2 bg-black/20 rounded-lg flex items-start gap-2"
                  >
                    {getLogIcon(log.type)}
                    <div>
                      <p className="text-white/90 text-sm">{log.message}</p>
                      <p className="text-white/50 text-xs">{formatTimestamp(log.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
