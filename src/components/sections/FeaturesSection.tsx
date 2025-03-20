
import { Zap, Shield, Clock, Globe, Cloud, Cpu } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap className="h-10 w-10 text-rive-purple" />,
      title: 'Baixa Latência',
      description: 'Tecnologia de ponta para garantir a menor latência possível em suas sessões de jogos.',
    },
    {
      icon: <Shield className="h-10 w-10 text-rive-purple" />,
      title: 'Segurança Máxima',
      description: 'Seus dados e jogos protegidos com criptografia de nível militar e backups automáticos.',
    },
    {
      icon: <Clock className="h-10 w-10 text-rive-purple" />,
      title: 'Disponibilidade 24/7',
      description: 'Acesse sua máquina virtual quando quiser, estamos sempre disponíveis para você.',
    },
    {
      icon: <Globe className="h-10 w-10 text-rive-purple" />,
      title: 'Acesso Global',
      description: 'Conecte-se de qualquer lugar do mundo com a mesma qualidade e desempenho.',
    },
    {
      icon: <Cloud className="h-10 w-10 text-rive-purple" />,
      title: 'Armazenamento na Nuvem',
      description: 'Seus jogos e arquivos sempre disponíveis na nuvem, sem ocupar espaço no seu dispositivo.',
    },
    {
      icon: <Cpu className="h-10 w-10 text-rive-purple" />,
      title: 'Hardware de Ponta',
      description: 'GPUs e CPUs de última geração para rodar os jogos mais exigentes com qualidade máxima.',
    }
  ];

  return (
    <section className="section-container text-center" id="features">
      <div className="text-center mb-16 animate-fade-up">
        <h2 className="text-gradient mb-4 text-4xl font-bold">Recursos Exclusivos</h2>
        <p className="text-white/70 max-w-2xl mx-auto text-lg">
          A RIVE CLOUD oferece uma experiência completa de cloud gaming com os melhores recursos do mercado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <GlassCard 
            key={index} 
            hoverEffect={true}
            className={`animate-fade-up animation-delay-${index * 100} transform transition-all duration-500 hover:scale-105 hover:shadow-rive-purple/20`}
          >
            <div className="flex flex-col items-center text-center p-6">
              <div className="mb-4 p-4 bg-gradient-to-br from-rive-purple/20 to-transparent rounded-full border border-rive-purple/10 shadow-inner shadow-rive-purple/5 animate-pulse-subtle">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
