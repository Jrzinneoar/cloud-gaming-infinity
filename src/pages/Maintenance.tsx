
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ui/ParticleBackground';
import GlassCard from '../components/ui/GlassCard';
import { Info, Clock, ArrowLeft, AlertTriangle } from 'lucide-react';

const Maintenance = () => {
  const [logs, setLogs] = useState<{ message: string; timestamp: Date; type: 'info' | 'warning' | 'error' }[]>([
    { 
      message: 'Iniciando manutenção programada do sistema', 
      timestamp: new Date(Date.now() - 3600000), 
      type: 'info' 
    },
    { 
      message: 'Atualizando componentes do servidor de jogos', 
      timestamp: new Date(Date.now() - 2700000), 
      type: 'info' 
    },
    { 
      message: 'Instalando atualizações de segurança', 
      timestamp: new Date(Date.now() - 1800000), 
      type: 'info' 
    },
    { 
      message: 'Detectado problema na atualização dos drivers NVIDIA', 
      timestamp: new Date(Date.now() - 900000), 
      type: 'warning' 
    },
    { 
      message: 'Resolvendo conflitos de drivers', 
      timestamp: new Date(Date.now() - 600000), 
      type: 'info' 
    },
    { 
      message: 'Reiniciando servidores', 
      timestamp: new Date(Date.now() - 300000), 
      type: 'info' 
    },
    { 
      message: 'Testando latência e performance', 
      timestamp: new Date(), 
      type: 'info' 
    },
  ]);
  
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 1,
    minutes: 30,
    seconds: 0,
  });
  
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Helmet>
        <title>Manutenção | RIVE CLOUD</title>
        <meta name="description" content="O sistema está em manutenção. Estamos trabalhando para voltar em breve." />
      </Helmet>

      <ParticleBackground />
      
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors z-50"
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
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 animate-fade-up">
            <GlassCard className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="h-6 w-6 text-rive-purple" />
                <h2 className="text-2xl font-bold text-white">Tempo Estimado</h2>
              </div>
              
              <div className="flex-grow flex flex-col items-center justify-center">
                <div className="grid grid-cols-3 gap-4 text-center mb-6">
                  <div className="glass-panel p-4">
                    <div className="text-4xl font-bold text-white mb-1">
                      {formatNumber(timeRemaining.hours)}
                    </div>
                    <div className="text-white/60 text-sm">Horas</div>
                  </div>
                  
                  <div className="glass-panel p-4">
                    <div className="text-4xl font-bold text-white mb-1">
                      {formatNumber(timeRemaining.minutes)}
                    </div>
                    <div className="text-white/60 text-sm">Minutos</div>
                  </div>
                  
                  <div className="glass-panel p-4">
                    <div className="text-4xl font-bold text-white mb-1">
                      {formatNumber(timeRemaining.seconds)}
                    </div>
                    <div className="text-white/60 text-sm">Segundos</div>
                  </div>
                </div>
                
                <p className="text-white/80 text-center">
                  Nossa equipe está trabalhando para minimizar o tempo de inatividade.
                  Agradecemos sua paciência.
                </p>
                
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-button mt-8"
                >
                  Acompanhe no Discord
                  <svg className="h-5 w-5 ml-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.393-.403.85-.548 1.235a16.813 16.813 0 0 0-5.145 0 12.84 12.84 0 0 0-.552-1.235.077.077 0 0 0-.079-.036 18.355 18.355 0 0 0-4.885 1.491.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 18.388 18.388 0 0 0 5.593 2.85.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.04.001-.088-.041-.104a12.212 12.212 0 0 1-1.746-.83.077.077 0 0 1-.008-.128 13.257 13.257 0 0 0 .288-.2.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.098.072.187.138.288.2a.077.077 0 0 1-.006.127 12.467 12.467 0 0 1-1.747.83.077.077 0 0 0-.041.105c.36.698.772 1.363 1.225 1.993a.076.076 0 0 0 .084.028 18.32 18.32 0 0 0 5.594-2.85.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.946 2.418-2.157 2.418z" />
                  </svg>
                </a>
              </div>
            </GlassCard>
          </div>
          
          <div className="md:w-1/2 animate-fade-up animation-delay-200">
            <GlassCard className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <svg className="h-6 w-6 text-rive-purple" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z" />
                </svg>
                <h2 className="text-2xl font-bold text-white">Logs do Sistema</h2>
              </div>
              
              <div className="overflow-y-auto max-h-80 space-y-3 flex-grow custom-scrollbar">
                {logs.map((log, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 bg-black/20 p-3 rounded-lg"
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
                <button 
                  className="glass-button px-4 py-2 text-white/80 hover:text-white text-sm"
                  onClick={() => {
                    const newLog = {
                      message: 'Atualização de progresso: Otimizando servidores',
                      timestamp: new Date(),
                      type: 'info' as const
                    };
                    setLogs(prev => [...prev, newLog]);
                  }}
                >
                  Ver mais logs
                </button>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
