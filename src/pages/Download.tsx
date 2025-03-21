
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
      description: 'Software de acesso remoto de alta performance para jogos e trabalho. Oferece baixa latência e alta qualidade de imagem para uma experiência fluida.',
      longDescription: 'O Parsec é uma ferramenta poderosa para acessar sua máquina virtual na RIVE CLOUD. Com tecnologia avançada de compressão e baixa latência, proporciona uma experiência suave tanto em jogos quanto em aplicações profissionais.',
      logo: 'https://cdn.discordapp.com/attachments/1351959002510266384/1352033235240095875/parsec-1330289848677437520.png',
      url: 'https://parsec.app/downloads',
      platforms: ['Windows', 'macOS', 'Android', 'iOS', 'Raspberry Pi'],
      features: [
        'Baixa latência para jogos',
        'Suporte para controladores',
        'Transferência de arquivos',
        'Chat de voz integrado'
      ]
    },
    {
      name: 'Moonlight',
      description: 'Cliente de streaming de código aberto para NVIDIA GameStream. Ideal para usuários com placas NVIDIA que buscam performance máxima.',
      longDescription: 'O Moonlight é uma solução de código aberto que utiliza o protocolo NVIDIA GameStream para proporcionar uma experiência de streaming de alta qualidade. Perfeito para jogadores que buscam a menor latência possível.',
      logo: 'https://cdn.discordapp.com/attachments/1351959002510266384/1352033398113439764/ef8051ce270059a142fcb0b3e47b1cd4.png',
      url: 'https://moonlight-stream.org/',
      platforms: ['Windows', 'macOS', 'Android', 'iOS', 'Linux'],
      features: [
        'Suporte a 4K e HDR',
        'Compatível com GameStream',
        'Configurações avançadas',
        'Baixo consumo de recursos'
      ]
    }
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Windows':
      case 'macOS':
      case 'Linux':
        return <Laptop className="h-4 w-4 text-rive-purple/90" />;
      case 'Android':
      case 'iOS':
        return <Smartphone className="h-4 w-4 text-rive-purple/90" />;
      case 'Navegador Web':
        return <Globe className="h-4 w-4 text-rive-purple/90" />;
      case 'Raspberry Pi':
      default:
        return <HelpCircle className="h-4 w-4 text-rive-purple/90" />;
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
        <section className="py-12 md:py-16 px-4">
          <div className="text-center max-w-3xl mx-auto animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Softwares</span> Recomendados
            </h1>
            
            <p className="text-white/80 text-lg mb-8">
              Para acessar sua máquina na nuvem, você precisará de um cliente de streaming.
              Recomendamos as seguintes opções para a melhor experiência.
            </p>
          </div>
        </section>
        
        {/* Software Cards */}
        <section className="py-8 md:py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {downloads.map((app, index) => (
              <GlassCard 
                key={index}
                className="mb-10 overflow-hidden animate-fade-up hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all duration-300"
                hoverEffect={false}
              >
                <div className="grid md:grid-cols-[1fr_2fr] gap-6 p-6">
                  {/* Left Side - Logo & Download */}
                  <div className="flex flex-col items-center justify-between text-center">
                    <div className="bg-black/40 p-5 rounded-xl mb-6 w-full max-w-[200px]">
                      <img 
                        src={app.logo} 
                        alt={`${app.name} Logo`} 
                        className="w-24 h-24 mx-auto object-contain" 
                      />
                    </div>
                    
                    <div className="w-full space-y-4">
                      <h2 className="text-2xl font-bold text-white">{app.name}</h2>
                      
                      <div className="flex flex-wrap gap-2 justify-center">
                        {app.platforms.map((platform, i) => (
                          <div 
                            key={i} 
                            className="flex items-center gap-1 bg-black/20 px-3 py-1.5 rounded-full text-xs"
                          >
                            {getPlatformIcon(platform)}
                            <span>{platform}</span>
                          </div>
                        ))}
                      </div>
                      
                      <a 
                        href={app.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="primary-button block w-full py-3 px-6 mt-4"
                      >
                        <Download className="h-5 w-5 mr-2 inline-block" />
                        Download
                      </a>
                    </div>
                  </div>
                  
                  {/* Right Side - Info */}
                  <div className="text-left">
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-2 text-white">Sobre</h3>
                      <p className="text-white/80">{app.longDescription}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-white">Características</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {app.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-rive-purple mr-2">•</span>
                            <span className="text-white/80">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>
        
        {/* Help Section */}
        <section className="py-8 pb-16 px-4">
          <GlassCard className="max-w-4xl mx-auto p-6 animate-fade-up">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-rive-purple/10 p-4 rounded-full">
                <HelpCircle className="h-10 w-10 text-rive-purple" />
              </div>
              
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2 text-white">Precisa de ajuda?</h3>
                <p className="text-white/80 mb-4">
                  Se você está com dificuldades para configurar o software, nossa equipe de suporte está pronta para ajudar.
                </p>
                
                <a 
                  href="https://discord.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="primary-button inline-flex items-center"
                >
                  Entrar no Discord
                  <svg className="h-5 w-5 ml-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.393-.403.85-.548 1.235a16.813 16.813 0 0 0-5.145 0 12.84 12.84 0 0 0-.552-1.235.077.077 0 0 0-.079-.036 18.355 18.355 0 0 0-4.885 1.491.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 18.388 18.388 0 0 0 5.593 2.85.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.04.001-.088-.041-.104a12.212 12.212 0 0 1-1.746-.83.077.077 0 0 1-.008-.128 13.257 13.257 0 0 0 .288-.2.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.098.072.187.138.288.2a.077.077 0 0 1-.006.127 12.467 12.467 0 0 1-1.747.83.077.077 0 0 0-.041.105c.36.698.772 1.363 1.225 1.993a.076.076 0 0 0 .084.028 18.32 18.32 0 0 0 5.594-2.85.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.946 2.418-2.157 2.418z" />
                  </svg>
                </a>
              </div>
            </div>
          </GlassCard>
        </section>
      </main>
      
      <Footer />
    </PageTransition>
  );
};

export default DownloadPage;
