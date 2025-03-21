
import { Helmet } from 'react-helmet';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ParticleBackground from '../components/ui/ParticleBackground';
import PageTransition from '../components/ui/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import { Users, Award, Clock, Target, Server, Cloud, Shield, Globe } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Usuários', value: '2,500+' },
    { label: 'Servidores', value: '25+' },
    { label: 'Jogos', value: '750+' },
    { label: 'Uptime', value: '99.9%' },
  ];
  
  const values = [
    {
      icon: <Cloud className="h-8 w-8 text-blue-400" />,
      title: 'Inovação na Nuvem',
      description: 'Desenvolvemos tecnologias de ponta que abrem novas possibilidades no cloud gaming.',
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-400" />,
      title: 'Segurança',
      description: 'Protegemos seus dados e sua experiência de jogo com os mais altos padrões de segurança.',
    },
    {
      icon: <Users className="h-8 w-8 text-blue-400" />,
      title: 'Comunidade',
      description: 'Valorizamos nossa comunidade de jogadores e desenvolvemos nossos serviços ouvindo seus feedbacks.',
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-400" />,
      title: 'Acessibilidade',
      description: 'Tornamos jogos de alta qualidade acessíveis em qualquer dispositivo, em qualquer lugar.',
    },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Sobre Nós | RIVE CLOUD</title>
        <meta name="description" content="Conheça a RIVE CLOUD, sua melhor opção em cloud gaming utilizando a infraestrutura Azure. Nossa história, valores e missão." />
      </Helmet>

      <ParticleBackground />
      <Navbar />
      
      <main className="pt-28 pb-20 container mx-auto px-4">
        {/* Hero Section */}
        <section className="mb-16 max-w-4xl mx-auto animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            <span className="azure-text-gradient">Sobre a</span> RIVE CLOUD
          </h1>
          
          <GlassCard className="p-6 md:p-8 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
              <Server className="h-16 w-16 text-blue-400" />
              <div>
                <h2 className="text-2xl font-bold mb-3 azure-text-gradient">Potência da Infraestrutura Azure</h2>
                <p className="text-white/80">
                  Fundada em 2023, a RIVE CLOUD utiliza a infraestrutura Azure da Microsoft para oferecer experiências de gaming de alta performance através da nuvem. Nossa tecnologia permite que qualquer dispositivo execute os mais recentes jogos AAA sem a necessidade de hardware potente.
                </p>
              </div>
            </div>
            
            <p className="text-white/80 mb-4">
              Nossa missão é democratizar o acesso aos jogos modernos, permitindo que jogadores com qualquer tipo de dispositivo possam desfrutar de uma experiência gaming premium sem investimentos em hardware.
            </p>
            
            <p className="text-white/80">
              Com data centers estrategicamente localizados, garantimos baixa latência e uma experiência fluida para nossos usuários em todo o Brasil.
            </p>
          </GlassCard>
        </section>
        
        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <GlassCard 
                key={index} 
                className="text-center py-6 px-4 animate-fade-up animation-delay-200"
              >
                <h3 className="text-3xl font-bold azure-text-gradient mb-2">{stat.value}</h3>
                <p className="text-white/70">{stat.label}</p>
              </GlassCard>
            ))}
          </div>
        </section>
        
        {/* Values Section */}
        <section className="mb-16">
          <div className="text-center mb-8 animate-fade-up">
            <h2 className="text-3xl font-bold mb-4 azure-text-gradient">Nossos Valores</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Princípios que orientam todas as nossas decisões e desenvolvimento de serviços.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <GlassCard 
                key={index} 
                hoverEffect={true}
                className="text-center p-6 animate-fade-up animation-delay-300"
              >
                <div className="bg-blue-500/10 p-4 rounded-full inline-block mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{value.title}</h3>
                <p className="text-white/70">{value.description}</p>
              </GlassCard>
            ))}
          </div>
        </section>
        
        {/* Technology Section */}
        <section className="mb-16 animate-fade-up animation-delay-400">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 azure-text-gradient">Nossa Tecnologia</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Utilizamos o que há de mais avançado para entregar a melhor experiência de cloud gaming.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <GlassCard className="p-6 animate-fade-up animation-delay-500">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <Server className="h-5 w-5 text-blue-400 mr-2" />
                Infraestrutura Azure
              </h3>
              <p className="text-white/80">
                Nossa plataforma é construída sobre a infraestrutura Microsoft Azure, garantindo estabilidade, 
                escalabilidade e desempenho consistente. Utilizamos GPUs de última geração e servidores otimizados 
                para gaming.
              </p>
            </GlassCard>
            
            <GlassCard className="p-6 animate-fade-up animation-delay-600">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <Cloud className="h-5 w-5 text-blue-400 mr-2" />
                Tecnologia de Streaming
              </h3>
              <p className="text-white/80">
                Desenvolvemos uma tecnologia proprietária de streaming que minimiza a latência e adapta-se 
                automaticamente à qualidade de conexão do usuário, garantindo uma experiência fluida mesmo 
                em conexões menos estáveis.
              </p>
            </GlassCard>
          </div>
        </section>
        
        {/* Mission Section */}
        <section>
          <div className="glass-panel p-8 max-w-3xl mx-auto text-center animate-fade-up animation-delay-700">
            <h2 className="azure-text-gradient mb-6 text-3xl font-bold">Nossa Missão</h2>
            <p className="text-2xl text-white/90 italic mb-4">
              "Democratizar o acesso aos jogos de última geração através da tecnologia cloud, eliminando barreiras de hardware."
            </p>
            <p className="text-white/70">
              Acreditamos que todos os jogadores merecem acesso à melhor experiência de jogo possível, independentemente do dispositivo que possuem.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </PageTransition>
  );
};

export default About;
