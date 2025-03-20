
import { Helmet } from 'react-helmet';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ParticleBackground from '../components/ui/ParticleBackground';
import PageTransition from '../components/ui/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import { Download, Monitor, Smartphone, Laptop, Globe, HelpCircle } from 'lucide-react';

const DownloadPage = () => {
  const downloads = [
    {
      name: 'Parsec',
      description: 'Software de acesso remoto de alta performance para jogos e trabalho. Baixa latência e alta qualidade.',
      logo: 'https://parsec.app/static/favicon-32x32.png',
      url: 'https://parsec.app/downloads',
      platforms: ['Windows', 'macOS', 'Linux', 'Android', 'iOS', 'Raspberry Pi'],
      category: 'primary',
    },
    {
      name: 'Moonlight',
      description: 'Cliente de streaming de código aberto para NVIDIA GameStream. Perfeito para quem usa placas NVIDIA.',
      logo: 'https://moonlight-stream.org/images/logo.png',
      url: 'https://moonlight-stream.org/',
      platforms: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'],
      category: 'primary',
    },
    {
      name: 'Rainway',
      description: 'Solução de streaming baseada em navegador, permitindo jogar em praticamente qualquer dispositivo.',
      logo: 'https://cdn.rainway.com/favicon.ico',
      url: 'https://rainway.com/gaming',
      platforms: ['Navegador Web', 'Windows', 'Xbox'],
      category: 'alternative',
    },
    {
      name: 'Steam Link',
      description: 'Aplicativo oficial da Valve para streaming de jogos da sua biblioteca Steam.',
      logo: 'https://store.steampowered.com/favicon.ico',
      url: 'https://store.steampowered.com/streaming/',
      platforms: ['Windows', 'Android', 'iOS', 'Smart TV'],
      category: 'alternative',
    },
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Windows':
      case 'macOS':
      case 'Linux':
        return <Laptop className="h-4 w-4 text-white/70" />;
      case 'Android':
      case 'iOS':
        return <Smartphone className="h-4 w-4 text-white/70" />;
      case 'Navegador Web':
        return <Globe className="h-4 w-4 text-white/70" />;
      case 'Smart TV':
      case 'Xbox':
        return <Monitor className="h-4 w-4 text-white/70" />;
      case 'Raspberry Pi':
        return <HelpCircle className="h-4 w-4 text-white/70" />;
      default:
        return <HelpCircle className="h-4 w-4 text-white/70" />;
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Download | RIVE CLOUD</title>
        <meta name="description" content="Baixe os softwares recomendados para acessar a RIVE CLOUD e começar sua experiência de cloud gaming." />
      </Helmet>

      <ParticleBackground />
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="section-container">
          <div className="text-center max-w-3xl mx-auto animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Downloads</span> Recomendados
            </h1>
            
            <p className="text-white/80 text-lg mb-8">
              Para acessar nossas máquinas na nuvem, você precisará de um cliente de streaming. 
              Recomendamos os seguintes softwares para a melhor experiência de cloud gaming.
            </p>
          </div>
          
          <div className="flex justify-center animate-fade-up animation-delay-200">
            <GlassCard className="max-w-4xl text-center p-8">
              <h3 className="text-xl font-semibold mb-4 text-white">Como funciona?</h3>
              <p className="text-white/80 mb-4">
                Após adquirir um plano, você receberá acesso a uma máquina virtual na nuvem. 
                Para se conectar a ela, você precisará de um software de streaming, como os listados abaixo.
              </p>
              <p className="text-white/80">
                Estes softwares transmitem áudio e vídeo da máquina na nuvem para o seu dispositivo, 
                enquanto enviam seus comandos de teclado, mouse ou controle de volta para a máquina.
              </p>
            </GlassCard>
          </div>
        </section>
        
        {/* Primary Downloads */}
        <section className="section-container">
          <h2 className="text-gradient mb-8 animate-fade-up">Clientes Recomendados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {downloads
              .filter(download => download.category === 'primary')
              .map((download, index) => (
                <GlassCard 
                  key={index} 
                  className="animate-fade-up animation-delay-500"
                  hoverEffect={true}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-white p-2 rounded-lg">
                        <img 
                          src={download.logo} 
                          alt={`${download.name} Logo`} 
                          className="w-12 h-12 object-contain" 
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{download.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {download.platforms.map((platform, i) => (
                            <div 
                              key={i} 
                              className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded text-xs"
                            >
                              {getPlatformIcon(platform)}
                              <span>{platform}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-white/70 mb-6">{download.description}</p>
                    
                    <a 
                      href={download.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mt-auto inline-flex items-center justify-center py-3 px-6 bg-rive-purple hover:bg-rive-purple-dark text-white rounded-lg transition-colors"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Download {download.name}
                    </a>
                  </div>
                </GlassCard>
              ))}
          </div>
        </section>
        
        {/* Alternative Downloads */}
        <section className="section-container">
          <h2 className="text-gradient mb-8 animate-fade-up">Alternativas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {downloads
              .filter(download => download.category === 'alternative')
              .map((download, index) => (
                <GlassCard 
                  key={index} 
                  className="animate-fade-up animation-delay-500"
                  hoverEffect={true}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-white p-2 rounded-lg">
                        <img 
                          src={download.logo} 
                          alt={`${download.name} Logo`} 
                          className="w-12 h-12 object-contain" 
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{download.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {download.platforms.map((platform, i) => (
                            <div 
                              key={i} 
                              className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded text-xs"
                            >
                              {getPlatformIcon(platform)}
                              <span>{platform}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-white/70 mb-6">{download.description}</p>
                    
                    <a 
                      href={download.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mt-auto inline-flex items-center justify-center py-3 px-6 bg-rive-gray hover:bg-rive-gray/80 text-white rounded-lg transition-colors"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Download {download.name}
                    </a>
                  </div>
                </GlassCard>
              ))}
          </div>
        </section>
        
        {/* Help Section */}
        <section className="section-container">
          <GlassCard className="max-w-4xl mx-auto text-center p-8 animate-fade-up">
            <h3 className="text-xl font-semibold mb-4 text-white">Precisa de ajuda?</h3>
            <p className="text-white/80 mb-6">
              Se você está com dificuldades para configurar ou escolher o melhor cliente para o seu dispositivo, 
              entre em contato conosco através do nosso servidor no Discord. Nossa comunidade e equipe de suporte 
              estão sempre prontos para ajudar.
            </p>
            
            <a 
              href="https://discord.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="primary-button inline-flex items-center justify-center"
            >
              Entrar no Discord
              <svg className="h-5 w-5 ml-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.393-.403.85-.548 1.235a16.813 16.813 0 0 0-5.145 0 12.84 12.84 0 0 0-.552-1.235.077.077 0 0 0-.079-.036 18.355 18.355 0 0 0-4.885 1.491.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 18.388 18.388 0 0 0 5.593 2.85.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.04.001-.088-.041-.104a12.212 12.212 0 0 1-1.746-.83.077.077 0 0 1-.008-.128 13.257 13.257 0 0 0 .288-.2.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.098.072.187.138.288.2a.077.077 0 0 1-.006.127 12.467 12.467 0 0 1-1.747.83.077.077 0 0 0-.041.105c.36.698.772 1.363 1.225 1.993a.076.076 0 0 0 .084.028 18.32 18.32 0 0 0 5.594-2.85.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
          </GlassCard>
        </section>
      </main>
      
      <Footer />
    </PageTransition>
  );
};

export default DownloadPage;
