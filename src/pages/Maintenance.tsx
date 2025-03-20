
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ui/ParticleBackground';
import GlassCard from '../components/ui/GlassCard';
import { Info, Clock, ArrowLeft, AlertTriangle, Terminal, Server, Shield, RefreshCw } from 'lucide-react';
import { useMaintenanceStore, triggerMaintenanceBot } from '../services/maintenanceService';
import { Button } from '@/components/ui/button';

const Maintenance = () => {
  const { maintenanceLogs, estimatedTimeInMinutes, addMaintenanceLog, isMaintenanceMode, toggleMaintenanceMode } = useMaintenanceStore();
  
  const [timeRemaining, setTimeRemaining] = useState({
    hours: Math.floor(estimatedTimeInMinutes / 60),
    minutes: estimatedTimeInMinutes % 60,
    seconds: 0,
  });
  
  useEffect(() => {
    // Update time remaining when estimated time changes
    setTimeRemaining({
      hours: Math.floor(estimatedTimeInMinutes / 60),
      minutes: estimatedTimeInMinutes % 60,
      seconds: 0,
    });
  }, [estimatedTimeInMinutes]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(interval);
          return prev;
        }
        
        let hours = prev.hours;
        let minutes = prev.minutes;
        let seconds = prev.seconds - 1;
        
        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
        }
        
        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };
  
  const getLogIcon = (type: 'info' | 'warning' | 'error') => {
    switch (type) {
      case 'info':
        return <Info className="h-5 w-5 text-white/70" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-white/70" />;
    }
  };
  
  const formatTimestamp = (date: Date) => {
    return `${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}:${formatNumber(date.getSeconds())}`;
  };
  
  const maintenanceStats = [
    { 
      icon: <Server className="h-8 w-8 text-rive-purple" />, 
      title: 'Servidores', 
      value: '12/14',
      status: 'Em atualização',
      color: 'text-yellow-400'
    },
    { 
      icon: <Shield className="h-8 w-8 text-rive-purple" />, 
      title: 'Segurança', 
      value: '97%',
      status: 'Protegido',
      color: 'text-green-400'
    },
    { 
      icon: <Terminal className="h-8 w-8 text-rive-purple" />, 
      title: 'Sistema', 
      value: 'v2.4.6',
      status: 'Atualizando',
      color: 'text-blue-400'
    },
    { 
      icon: <RefreshCw className="h-8 w-8 text-rive-purple" />, 
      title: 'Desempenho', 
      value: '85%',
      status: 'Otimizando',
      color: 'text-purple-400'
    },
  ];

  // For testing purposes - this lets us toggle maintenance mode directly
  const handleToggleMaintenance = () => {
    toggleMaintenanceMode();
    addMaintenanceLog(`Modo de manutenção ${isMaintenanceMode ? 'desativado' : 'ativado'} manualmente`);
  };

  const handleSimulateDiscordBot = (action: 'enable' | 'disable') => {
    triggerMaintenanceBot(action);
    addMaintenanceLog(`Bot do Discord ${action === 'enable' ? 'ativou' : 'desativou'} o modo de manutenção`, 'info');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Helmet>
        <title>Manutenção | RIVE CLOUD</title>
        <meta name="description" content="O sistema está em manutenção. Estamos trabalhando para voltar em breve." />
      </Helmet>

      <ParticleBackground />
      
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors z-50 hover:scale-105 duration-300"
      >
        <ArrowLeft className="h-5 w-5" />
        Voltar para Home
      </Link>
      
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Dashboard em</span> Manutenção
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Estamos atualizando nossos sistemas para melhorar sua experiência. 
            Em breve estaremos de volta!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 animate-fade-up animation-delay-200">
          {maintenanceStats.map((stat, index) => (
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
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 animate-fade-up animation-delay-300">
            <GlassCard className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="h-6 w-6 text-rive-purple" />
                <h2 className="text-2xl font-bold text-white">Tempo Estimado</h2>
              </div>
              
              <div className="flex-grow flex flex-col items-center justify-center">
                <div className="grid grid-cols-3 gap-4 text-center mb-6">
                  <div className="glass-panel p-4 hover:scale-105 transition-transform duration-300">
                    <div className="text-4xl font-bold text-white mb-1 animate-pulse-subtle">
                      {formatNumber(timeRemaining.hours)}
                    </div>
                    <div className="text-white/60 text-sm">Horas</div>
                  </div>
                  
                  <div className="glass-panel p-4 hover:scale-105 transition-transform duration-300">
                    <div className="text-4xl font-bold text-white mb-1 animate-pulse-subtle">
                      {formatNumber(timeRemaining.minutes)}
                    </div>
                    <div className="text-white/60 text-sm">Minutos</div>
                  </div>
                  
                  <div className="glass-panel p-4 hover:scale-105 transition-transform duration-300">
                    <div className="text-4xl font-bold text-white mb-1 animate-pulse-subtle">
                      {formatNumber(timeRemaining.seconds)}
                    </div>
                    <div className="text-white/60 text-sm">Segundos</div>
                  </div>
                </div>
                
                <p className="text-white/80 text-center">
                  Nossa equipe está trabalhando para minimizar o tempo de inatividade.
                  Agradecemos sua paciência.
                </p>
                
                <div className="mt-8 space-y-4">
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-rive-purple to-rive-purple-dark text-white px-6 py-3 rounded-full shadow-lg shadow-rive-purple/20 hover:shadow-rive-purple/40 transition-all duration-300 hover:scale-105 flex items-center justify-center"
                  >
                    <img 
                      src="https://cdn.discordapp.com/attachments/1351959002510266384/1352033483446419556/discord-white-icon.png" 
                      alt="Discord Logo" 
                      className="h-5 w-5 mr-2"
                    />
                    <span>Acompanhe no Discord</span>
                  </a>
                  
                  <div className="flex justify-center space-x-4">
                    {/* Only for demonstration - these buttons simulate the Discord bot */}
                    <Button
                      variant="outline"
                      onClick={() => handleSimulateDiscordBot('enable')}
                      className="bg-black/30 text-white border-rive-purple/30 hover:bg-black/50 hover:text-white"
                    >
                      Simular Bot (Ativar)
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleSimulateDiscordBot('disable')}
                      className="bg-black/30 text-white border-rive-purple/30 hover:bg-black/50 hover:text-white"
                    >
                      Simular Bot (Desativar)
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleToggleMaintenance}
                      className="bg-black/30 text-white border-rive-purple/30 hover:bg-black/50 hover:text-white"
                    >
                      {isMaintenanceMode ? 'Desativar Manutenção' : 'Ativar Manutenção'}
                    </Button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
          
          <div className="md:w-1/2 animate-fade-up animation-delay-500">
            <GlassCard className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="h-6 w-6 text-rive-purple" />
                <h2 className="text-2xl font-bold text-white">Logs do Sistema</h2>
              </div>
              
              <div className="overflow-y-auto max-h-80 space-y-3 flex-grow custom-scrollbar">
                {maintenanceLogs.map((log, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 bg-black/20 p-3 rounded-lg hover:bg-black/30 transition-colors duration-300"
                  >
                    {getLogIcon(log.type)}
                    <div className="flex-grow">
                      <p className="text-white/90">{log.message}</p>
                      <p className="text-white/50 text-sm">{formatTimestamp(log.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Button 
                  variant="outline"
                  className="bg-black/30 text-white border-rive-purple/30 hover:bg-black/50 hover:text-white hover:border-rive-purple/50 transition-all duration-300 hover:scale-105"
                  onClick={() => {
                    addMaintenanceLog('Atualização de progresso: Otimizando servidores');
                  }}
                >
                  Simular atualização do bot
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
