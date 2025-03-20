
import { Helmet } from 'react-helmet';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ParticleBackground from '../components/ui/ParticleBackground';
import PageTransition from '../components/ui/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import { Users, Award, Clock, Target } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Usuários Ativos', value: '1,000+' },
    { label: 'Horas Jogadas', value: '50,000+' },
    { label: 'Jogos Suportados', value: '500+' },
    { label: 'Satisfação', value: '99%' },
  ];
  
  const values = [
    {
      icon: <Users className="h-8 w-8 text-rive-purple" />,
      title: 'Comunidade',
      description: 'Construímos uma comunidade forte e engajada de gamers e profissionais.',
    },
    {
      icon: <Award className="h-8 w-8 text-rive-purple" />,
      title: 'Excelência',
      description: 'Buscamos sempre a excelência em nossos serviços e suporte ao cliente.',
    },
    {
      icon: <Clock className="h-8 w-8 text-rive-purple" />,
      title: 'Inovação',
      description: 'Estamos constantemente inovando para oferecer a melhor experiência possível.',
    },
    {
      icon: <Target className="h-8 w-8 text-rive-purple" />,
      title: 'Confiabilidade',
      description: 'Nossos serviços são confiáveis e estáveis, garantindo a melhor experiência.',
    },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Sobre Nós | RIVE CLOUD</title>
        <meta name="description" content="Conheça a RIVE CLOUD, sua melhor opção em cloud gaming. Nossa história, valores e missão." />
      </Helmet>

      <ParticleBackground />
      <Navbar />
      
      <main className="pt-36 pb-20 container mx-auto px-4 text-center">
        {/* Hero Section */}
        <section className="mb-20 max-w-4xl mx-auto animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-10">
            <span className="text-gradient">Sobre a</span> RIVE CLOUD
          </h1>
          
          <GlassCard className="p-6 md:p-10 max-w-3xl mx-auto">
            <p className="text-white/80 text-lg mb-6">
              Fundada em 2023, a RIVE CLOUD nasceu da paixão por games e tecnologia. Nossa missão é democratizar o acesso ao cloud gaming, oferecendo qualidade e inovação para gamers e profissionais.
            </p>
            
            <p className="text-white/80 text-lg mb-6">
              Criamos uma plataforma que permite a qualquer pessoa, independentemente do hardware que possui, desfrutar dos jogos mais recentes e executar aplicações exigentes sem comprometer a qualidade.
            </p>
            
            <p className="text-white/80 text-lg">
              Na RIVE CLOUD, combinamos tecnologia de ponta, expertise em redes e paixão por games para oferecer uma experiência excepcional de cloud gaming.
            </p>
          </GlassCard>
        </section>
        
        {/* Stats Section */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <GlassCard 
                key={index} 
                className={`text-center animate-fade-up animation-delay-${index * 100}`}
              >
                <h3 className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.value}</h3>
                <p className="text-white/70">{stat.label}</p>
              </GlassCard>
            ))}
          </div>
        </section>
        
        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-10 animate-fade-up">
            <h2 className="text-gradient mb-4 text-3xl font-bold">Nossos Valores</h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Os princípios que guiam nossas decisões e ações no dia a dia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <GlassCard 
                key={index} 
                hoverEffect={true}
                className={`text-center animate-fade-up animation-delay-${index * 200}`}
              >
                <div className="bg-rive-purple/20 p-4 rounded-full inline-block mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{value.title}</h3>
                <p className="text-white/70">{value.description}</p>
              </GlassCard>
            ))}
          </div>
        </section>
        
        {/* Mission Section */}
        <section>
          <div className="glass-panel p-8 md:p-12 max-w-3xl mx-auto text-center animate-fade-up">
            <h2 className="text-gradient mb-6 text-3xl font-bold">Nossa Missão</h2>
            <p className="text-2xl text-white/90 italic">
              "Democratizar o acesso a jogos e aplicações de alta performance, eliminando barreiras de hardware e conectando pessoas através da tecnologia cloud."
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </PageTransition>
  );
};

export default About;
