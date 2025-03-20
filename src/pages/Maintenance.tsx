
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import ParticleBackground from '../components/ui/ParticleBackground';
import GlassCard from '../components/ui/GlassCard';
import { Clock } from 'lucide-react';
import { useMaintenanceStore } from '../services/maintenanceService';

const Maintenance = () => {
  const { estimatedTimeInMinutes } = useMaintenanceStore();
  
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Helmet>
        <title>Manutenção | RIVE CLOUD</title>
        <meta name="description" content="O sistema está em manutenção. Estamos trabalhando para voltar em breve." />
      </Helmet>

      <ParticleBackground />
      
      <div className="max-w-xl w-full animate-fade-up">
        <div className="text-center mb-10">
          <img 
            src="https://cdn.discordapp.com/attachments/1351959002510266384/1352033942051622973/Rive_Cloud.png" 
            alt="Rive Cloud Logo" 
            className="h-20 mb-6 mx-auto animate-pulse-subtle"
          />
          
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-gradient">Em</span> Manutenção
          </h1>
          
          <p className="text-xl text-white/80 max-w-md mx-auto">
            Estamos atualizando nossos sistemas para melhorar sua experiência. 
            Em breve estaremos de volta!
          </p>
        </div>
        
        <GlassCard className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="h-6 w-6 text-rive-purple" />
            <h2 className="text-2xl font-bold text-white">Tempo Estimado</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center mb-8">
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
          
          <p className="text-white/80 text-center mb-8">
            Nossa equipe está trabalhando para minimizar o tempo de inatividade.
            Agradecemos sua paciência.
          </p>
          
          <div className="text-center">
            <a
              href="https://discord.gg/fDPvmrhGcd"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-rive-purple to-rive-purple-dark text-white px-6 py-3 rounded-full shadow-lg shadow-rive-purple/20 hover:shadow-rive-purple/40 transition-all duration-300 hover:scale-105 flex items-center justify-center max-w-xs mx-auto animate-button-glow"
            >
              <img 
                src="https://cdn.discordapp.com/attachments/1351959002510266384/1352033483446419556/discord-white-icon.png" 
                alt="Discord Logo" 
                className="h-5 w-5 mr-2"
              />
              <span>Acompanhe no Discord</span>
            </a>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Maintenance;
