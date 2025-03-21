
import GlassCard from '../ui/GlassCard';
import { Download, ExternalLink } from 'lucide-react';
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
    <section className="section-container relative z-10">
      <div className="text-center mb-8 animate-fade-up">
        <h2 className="text-gradient text-4xl font-bold mb-4">Software Recomendado</h2>
        <p className="text-white/70 max-w-xl mx-auto text-lg">
          Para uma experiência otimizada com nossa plataforma, recomendamos estes softwares compatíveis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {downloadOptions.map((option, index) => (
          <div 
            key={index}
            className="bg-black/40 backdrop-blur-md border border-rive-purple/30 rounded-xl overflow-hidden shadow-lg hover:shadow-rive-purple/10 transition-all duration-500"
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-black/40 p-3 rounded-lg">
                  <img 
                    src={option.logo} 
                    alt={`${option.name} Logo`} 
                    className="w-10 h-10 object-contain" 
                  />
                </div>
                <h3 className="text-xl font-bold text-white">{option.name}</h3>
              </div>
              
              <p className="text-white/70 mb-6 flex-grow">{option.description}</p>
              
              <a 
                href={option.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-rive-purple hover:bg-rive-purple-dark text-white py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 w-full"
              >
                <Download className="h-4 w-4" />
                Download {option.name}
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Link 
          to="/download" 
          className="inline-flex items-center text-white/80 hover:text-white transition-colors gap-2 text-sm border border-rive-purple/30 hover:border-rive-purple/50 px-4 py-2 rounded-lg bg-black/30 hover:bg-black/50"
        >
          Ver detalhes
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
};

export default DownloadSection;
