
import GlassCard from '../ui/GlassCard';
import { Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DownloadSection = () => {
  const downloadOptions = [
    {
      name: 'Parsec',
      description: 'Software de acesso remoto de alta performance, ideal para jogos e trabalho.',
      logo: 'https://parsec.app/static/favicon-32x32.png',
      url: 'https://parsec.app/downloads',
    },
    {
      name: 'Moonlight',
      description: 'Cliente de streaming de código aberto para NVIDIA GameStream.',
      logo: 'https://moonlight-stream.org/images/logo.png',
      url: 'https://moonlight-stream.org/',
    },
  ];

  return (
    <section className="section-container">
      <div className="text-center mb-16 animate-fade-up">
        <h2 className="text-gradient mb-4">Software Recomendado</h2>
        <p className="text-white/70 max-w-2xl mx-auto text-lg">
          Para uma experiência perfeita com nossa plataforma, recomendamos o uso destes softwares compatíveis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {downloadOptions.map((option, index) => (
          <GlassCard 
            key={index} 
            hoverEffect={true}
            className="animate-fade-up animation-delay-500"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-4">
                <img 
                  src={option.logo} 
                  alt={`${option.name} Logo`} 
                  className="w-12 h-12 mr-4 rounded object-contain bg-white p-1" 
                />
                <h3 className="text-xl font-bold text-white">{option.name}</h3>
              </div>
              
              <p className="text-white/70 mb-6 flex-grow">{option.description}</p>
              
              <a 
                href={option.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center w-full py-3 px-4 bg-rive-purple hover:bg-rive-purple-dark text-white rounded-lg transition-colors"
              >
                <Download className="h-5 w-5 mr-2" />
                Download {option.name}
              </a>
            </div>
          </GlassCard>
        ))}
      </div>
      
      <div className="text-center mt-12 animate-fade-up animation-delay-700">
        <Link 
          to="/download" 
          className="subtle-button inline-flex items-center"
        >
          Ver mais opções de download
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default DownloadSection;
