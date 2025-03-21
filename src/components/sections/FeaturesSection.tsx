
import { Zap, Shield, Clock, Globe, Cloud, Cpu, Database, GitBranch, Wrench, ArrowRight } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Cpu className="h-10 w-10 text-blue-400" />,
      title: 'Máquinas Azure',
      description: 'Infraestrutura Microsoft Azure com GPUs e CPUs de última geração para desempenho excepcional.',
    },
    {
      icon: <Zap className="h-10 w-10 text-blue-400" />,
      title: 'Baixa Latência',
      description: 'Conexão otimizada com a rede Azure garantindo mínima latência para suas aplicações e jogos.',
    },
    {
      icon: <Shield className="h-10 w-10 text-blue-400" />,
      title: 'Segurança Azure',
      description: 'Proteção de nível empresarial da Microsoft com criptografia avançada e backups automatizados.',
    },
    {
      icon: <Clock className="h-10 w-10 text-blue-400" />,
      title: 'Disponibilidade 24/7',
      description: 'Infraestrutura Azure sempre disponível com uptime garantido e suporte contínuo.',
    },
    {
      icon: <Globe className="h-10 w-10 text-blue-400" />,
      title: 'Rede Global Azure',
      description: 'Acesso de qualquer lugar com baixa latência graças à rede global de datacenters Azure.',
    },
    {
      icon: <Database className="h-10 w-10 text-blue-400" />,
      title: 'Armazenamento Azure',
      description: 'Armazenamento em nuvem de alta performance com tecnologia Microsoft para seus dados e aplicações.',
    },
    {
      icon: <GitBranch className="h-10 w-10 text-blue-400" />,
      title: 'Integração DevOps',
      description: 'Compatível com GitHub, Azure DevOps e outras ferramentas para desenvolvimento contínuo.',
    },
    {
      icon: <Cloud className="h-10 w-10 text-blue-400" />,
      title: 'Serviços Azure',
      description: 'Integração com todo o ecossistema de serviços Microsoft Azure para expandir suas capacidades.',
    },
    {
      icon: <Wrench className="h-10 w-10 text-blue-400" />,
      title: 'Personalização Total',
      description: 'Configure sua máquina virtual Azure de acordo com suas necessidades específicas.',
    }
  ];

  return (
    <section className="section-container text-center" id="features">
      <div className="text-center mb-16 animate-fade-up">
        <h2 className="mb-4 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-rive-purple">Tecnologia Azure</h2>
        <p className="text-white/70 max-w-2xl mx-auto text-lg">
          A RIVE CLOUD oferece máquinas virtuais Azure com recursos exclusivos para gaming, trabalho e desenvolvimento.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <GlassCard 
            key={index} 
            hoverEffect={true}
            className={`animate-fade-up animation-delay-${index * 100} transform transition-all duration-500 hover:scale-105 hover:shadow-blue-500/20`}
          >
            <div className="flex flex-col items-center text-center p-6">
              <div className="mb-4 p-4 bg-gradient-to-br from-blue-600/20 to-transparent rounded-full border border-blue-500/10 shadow-inner shadow-blue-500/5 animate-pulse-subtle">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          </GlassCard>
        ))}
      </div>
      
      <div className="mt-16 animate-fade-up animation-delay-500">
        <a 
          href="https://discord.gg/fDPvmrhGcd"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-rive-purple hover:from-rive-purple hover:to-blue-600 text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/20 hover:shadow-rive-purple/40"
        >
          <Cloud className="h-5 w-5 mr-2" />
          Solicitar sua máquina Azure
          <ArrowRight className="h-5 w-5 ml-2 animate-pulse-subtle" />
        </a>
      </div>
    </section>
  );
};

export default FeaturesSection;
