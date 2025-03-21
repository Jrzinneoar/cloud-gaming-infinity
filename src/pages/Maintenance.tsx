
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import ParticleBackground from '../components/ui/ParticleBackground';
import GlassCard from '../components/ui/GlassCard';
import { Clock, Server, AlertTriangle } from 'lucide-react';
import { useMaintenanceStore } from '../services/maintenanceService';
import { DB } from '../services/database';

const Maintenance = () => {
  const { estimatedTimeInMinutes } = useMaintenanceStore();
  
  const [timeRemaining, setTimeRemaining] = useState({
    hours: Math.floor(estimatedTimeInMinutes / 60),
    minutes: estimatedTimeInMinutes % 60,
    seconds: 0,
  });
  
  useEffect(() => {
    // Get the latest maintenance settings from the database
    const dbSettings = DB.getMaintenanceSettings();
    
    // Update time remaining when estimated time changes
    setTimeRemaining({
      hours: Math.floor(dbSettings.estimatedTimeMinutes / 60),
      minutes: dbSettings.estimatedTimeMinutes % 60,
      seconds: 0,
    });
  }, []);
  
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black overflow-hidden">
      <Helmet>
        <title>Manutenção | RIVE CLOUD</title>
        <meta name="description" content="O sistema está em manutenção. Estamos trabalhando para voltar em breve." />
      </Helmet>

      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      
      <div className="max-w-lg w-full z-10 animate-fade-up">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img 
              src="https://cdn.discordapp.com/attachments/1351959002510266384/1352033942051622973/Rive_Cloud.png" 
              alt="Rive Cloud Logo" 
              className="h-16 mx-auto"
            />
          </div>
          
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <AlertTriangle className="h-6 w-6 text-yellow-300" />
            <span className="azure-text-gradient">Manutenção em Andamento</span>
          </h1>
          
          <p className="text-lg text-white/70 max-w-md mx-auto">
            Estamos aprimorando nossa plataforma para melhorar sua experiência
          </p>
        </div>
        
        <GlassCard className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Server className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Atualizando Servidores Azure</h2>
          </div>
          
          <p className="text-white/70 mb-6">
            Estamos realizando uma atualização nos nossos servidores para garantir 
            mais estabilidade e desempenho na sua experiência com a RIVE CLOUD.
          </p>
          
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-medium text-white">Tempo Estimado</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="glass-panel p-3 rounded-lg">
                <div className="text-3xl font-bold text-white mb-1">
                  {formatNumber(timeRemaining.hours)}
                </div>
                <div className="text-white/60 text-xs">Horas</div>
              </div>
              
              <div className="glass-panel p-3 rounded-lg">
                <div className="text-3xl font-bold text-white mb-1">
                  {formatNumber(timeRemaining.minutes)}
                </div>
                <div className="text-white/60 text-xs">Minutos</div>
              </div>
              
              <div className="glass-panel p-3 rounded-lg">
                <div className="text-3xl font-bold text-white mb-1">
                  {formatNumber(timeRemaining.seconds)}
                </div>
                <div className="text-white/60 text-xs">Segundos</div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <a
              href="https://discord.gg/fDPvmrhGcd"
              target="_blank"
              rel="noopener noreferrer"
              className="azure-button inline-flex items-center"
            >
              <img 
                src="https://cdn.discordapp.com/attachments/1351959002510266384/1352033483446419556/discord-white-icon.png" 
                alt="Discord Logo" 
                className="h-4 w-4 mr-2"
              />
              <span>Acompanhe no Discord</span>
            </a>
            
            <p className="mt-4 text-white/50 text-sm">
              Agradecemos sua paciência! Estamos trabalhando para voltar o mais rápido possível.
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Maintenance;
