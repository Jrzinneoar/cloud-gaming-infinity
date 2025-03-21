
import GlassCard from '../ui/GlassCard';
import { Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DownloadSection = () => {
  const downloadOptions = [
    {
      name: 'Parsec',
      description: 'Software de acesso remoto de alta performance, ideal para jogos e trabalho.',
      logo: 'https://cdn.discordapp.com/attachments/1351959002510266384/1352033235240095875/parsec-1330289848677437520.png',
      url: 'https://parsec.app/downloads',
    },
    {
      name: 'Moonlight',
      description: 'Cliente de streaming de código aberto para NVIDIA GameStream.',
      logo: 'https://cdn.discordapp.com/attachments/1351959002510266384/1352033398113439764/ef8051ce270059a142fcb0b3e47b1cd4.png',
      url: 'https://moonlight-stream.org/',
    },
  ];

  return (
    <section className="section-container">
      <div className="text-center mb-12 animate-fade-up">
        <h2 className="text-gradient mb-4">Software Recomendado</h2>
        <p className="text-white/70 max-w-2xl mx-auto text-lg">
          Para uma experiência otimizada com nossa plataforma, recomendamos estes softwares compatíveis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {downloadOptions.map((option, index) => (
          <GlassCard 
            key={index} 
            hoverEffect={true}
            className="transform transition-all duration-300 hover:translate-y-[-4px] animate-fade-up animation-delay-300"
          >
            <div className="flex flex-col h-full p-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-black/30 p-2 rounded-lg">
                  <img 
                    src={option.logo} 
                    alt={`${option.name} Logo`} 
                    className="w-10 h-10 object-contain" 
                  />
                </div>
                <h3 className="text-xl font-bold text-white">{option.name}</h3>
              </div>
              
              <p className="text-white/70 mb-6 flex-grow text-sm">{option.description}</p>
              
              <a 
                href={option.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-rive-purple hover:bg-rive-purple-dark text-white rounded-lg transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Download {option.name}
              </a>
            </div>
          </GlassCard>
        ))}
      </div>
      
      <div className="text-center mt-8 animate-fade-up animation-delay-500">
        <Link 
          to="/download" 
          className="subtle-button inline-flex items-center text-sm"
        >
          Ver mais opções
          <ArrowRight className="ml-2 h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
};

export default DownloadSection;
