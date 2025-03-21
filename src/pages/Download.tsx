
import { Helmet } from 'react-helmet';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ParticleBackground from '../components/ui/ParticleBackground';
import PageTransition from '../components/ui/PageTransition';
import { Download, Monitor, Smartphone, Laptop, Globe, HelpCircle, ExternalLink } from 'lucide-react';

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
        return <Laptop className="h-4 w-4 text-rive-purple" />;
      case 'Android':
      case 'iOS':
        return <Smartphone className="h-4 w-4 text-rive-purple" />;
      case 'Navegador Web':
        return <Globe className="h-4 w-4 text-rive-purple" />;
      case 'Raspberry Pi':
      default:
        return <Monitor className="h-4 w-4 text-rive-purple" />;
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
      
      <main className="min-h-screen pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-12 px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Software <span className="text-gradient">Recomendado</span>
            </h1>
            
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Para acessar sua máquina na nuvem com a melhor experiência possível, 
              recomendamos os seguintes aplicativos de streaming remoto.
            </p>
          </div>
        </section>
        
        {/* Software Cards */}
        <section className="py-8 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {downloads.map((app, index) => (
              <div 
                key={index}
                className="bg-black/40 backdrop-blur-md border border-rive-purple/30 rounded-xl overflow-hidden shadow-lg hover:shadow-rive-purple/10 transition-all duration-500"
              >
                <div className="p-6">
                  {/* Header with Logo */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-black/40 p-3 rounded-lg">
                      <img 
                        src={app.logo} 
                        alt={`${app.name} Logo`} 
                        className="w-12 h-12 object-contain" 
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{app.name}</h2>
                  </div>
                  
                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-white/80 mb-4">{app.longDescription}</p>
                    
                    {/* Platforms */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {app.platforms.map((platform, i) => (
                        <div 
                          key={i} 
                          className="flex items-center gap-1.5 bg-black/30 border border-rive-purple/20 px-3 py-1.5 rounded-full text-sm"
                        >
                          {getPlatformIcon(platform)}
                          <span>{platform}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-white">Características</h3>
                    <ul className="grid grid-cols-1 gap-2">
                      {app.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <span className="text-rive-purple mr-2">•</span>
                          <span className="text-white/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Download Button */}
                  <a 
                    href={app.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-rive-purple hover:bg-rive-purple-dark text-white py-3 px-5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 w-full hover:scale-[1.02]"
                  >
                    <Download className="h-5 w-5" />
                    Download {app.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Help Section */}
        <section className="py-8 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-black/30 backdrop-blur-md border border-rive-purple/20 rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-rive-purple/10 p-4 rounded-full">
                  <HelpCircle className="h-10 w-10 text-rive-purple" />
                </div>
                
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-2 text-white">Precisa de ajuda?</h3>
                  <p className="text-white/80 mb-4 max-w-xl">
                    Se você está com dificuldades para configurar o software ou tem dúvidas sobre qual escolher, 
                    nossa equipe de suporte está pronta para ajudar.
                  </p>
                  
                  <a 
                    href="https://discord.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-rive-purple hover:bg-rive-purple-dark text-white py-2.5 px-5 rounded-lg transition-all duration-300 inline-flex items-center gap-2 hover:scale-[1.02]"
                  >
                    Suporte no Discord
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </PageTransition>
  );
};

export default DownloadPage;
