
import { ArrowRight, Server, Cloud, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../ui/GlassCard';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-rive-black-dark via-rive-black to-rive-black-light z-[-1]" />
      
      <div className="absolute w-full h-full overflow-hidden z-[-1]">
        <div className="absolute -top-[15%] -right-[10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse-subtle" />
        <div className="absolute -bottom-[15%] -left-[10%] w-[50%] h-[50%] bg-rive-purple/20 rounded-full blur-[120px] animate-pulse-subtle" />
      </div>
      
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col items-center text-center">
          <div className="space-y-6 max-w-3xl mx-auto animate-fade-up">
            <div className="bg-blue-600/20 text-blue-300 px-4 py-1.5 rounded-full inline-flex items-center space-x-2 backdrop-blur-sm border border-blue-500/20 hover:bg-blue-600/30 transition-colors duration-300 animate-pulse-subtle">
              <span className="text-sm font-medium">Máquinas Virtuais Azure | Poder Ilimitado</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight">
              <span className="text-gradient animate-fade-up animation-delay-200">RIVE CLOUD</span>
              <br />
              <span className="text-white animate-fade-up animation-delay-300">
                Potência Azure para seus projetos e games
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto animate-fade-up animation-delay-400">
              Máquinas virtuais Azure com a tecnologia RIVE CLOUD. Desempenho excepcional 
              para trabalho, jogos e renderização com a infraestrutura mais avançada da Microsoft.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center animate-fade-up animation-delay-500">
              <Link to="/plans" className="bg-gradient-to-r from-blue-600 to-rive-purple hover:from-rive-purple hover:to-blue-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-500 ease-in-out shadow-lg shadow-blue-500/20 hover:shadow-rive-purple/40 hover:scale-105 flex items-center justify-center">
                Ver máquinas Azure
                <ArrowRight className="h-5 w-5 ml-2 animate-pulse-subtle" />
              </Link>
              
              <a href="https://discord.gg/fDPvmrhGcd" target="_blank" rel="noopener noreferrer" className="bg-transparent hover:bg-white/5 border border-blue-500/30 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(37,99,235,0.1)] hover:shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                Discord Community
              </a>
            </div>
            
            <div className="pt-6 flex justify-center animate-fade-up animation-delay-700">
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/5 flex items-center gap-2 hover:border-blue-500/20 hover:bg-black/40 transition-all duration-300 hover:scale-105">
                  <img 
                    src="https://cdn.discordapp.com/attachments/1351959002510266384/1352033235240095875/parsec-1330289848677437520.png" 
                    alt="Parsec" 
                    className="h-6 w-6" 
                  />
                  <span className="text-white/70 text-sm">Compatível com Parsec</span>
                </div>
                
                <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/5 flex items-center gap-2 hover:border-blue-500/20 hover:bg-black/40 transition-all duration-300 hover:scale-105">
                  <img 
                    src="https://cdn.discordapp.com/attachments/1351959002510266384/1352033398113439764/ef8051ce270059a142fcb0b3e47b1cd4.png" 
                    alt="Moonlight" 
                    className="h-6 w-6" 
                  />
                  <span className="text-white/70 text-sm">Suporte a Moonlight</span>
                </div>
                
                <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/5 flex items-center gap-2 hover:border-blue-500/20 hover:bg-black/40 transition-all duration-300 hover:scale-105">
                  <img 
                    src="https://cdn.discordapp.com/attachments/1351959002510266384/1358082000665673878/microsoft-azure.png" 
                    alt="Azure" 
                    className="h-6 w-6" 
                  />
                  <span className="text-white/70 text-sm">Powered by Azure</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 animate-fade-up animation-delay-1000 max-w-4xl mx-auto">
            <GlassCard className="p-8 md:p-12 relative hover:scale-[1.02] transition-transform duration-700" intensity="light" hoverEffect={true}>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/30 to-transparent opacity-20 rounded-2xl" />
              
              <div className="relative z-10">
                <img 
                  src="https://cdn.discordapp.com/attachments/1351959002510266384/1358081730011988078/azure-datacenter.jpg" 
                  alt="Azure Data Center" 
                  className="rounded-lg shadow-2xl w-full h-auto object-cover hover:shadow-blue-500/20 transition-shadow duration-300"
                />
                
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <GlassCard className="p-4 text-center hover:scale-105 transition-transform duration-300" intensity="heavy">
                    <div className="flex justify-center mb-2">
                      <Server className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-300">Alta Performance</h3>
                    <p className="text-white/70 text-sm mt-1">GPUs e CPUs Azure</p>
                  </GlassCard>
                  
                  <GlassCard className="p-4 text-center hover:scale-105 transition-transform duration-300" intensity="heavy">
                    <div className="flex justify-center mb-2">
                      <Cloud className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-300">Cloud Integrado</h3>
                    <p className="text-white/70 text-sm mt-1">Serviços Microsoft</p>
                  </GlassCard>
                  
                  <GlassCard className="p-4 text-center hover:scale-105 transition-transform duration-300" intensity="heavy">
                    <div className="flex justify-center mb-2">
                      <Shield className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-300">Segurança Azure</h3>
                    <p className="text-white/70 text-sm mt-1">Proteção avançada</p>
                  </GlassCard>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
