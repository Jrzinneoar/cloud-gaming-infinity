
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../ui/GlassCard';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-rive-black-dark via-rive-black to-rive-black-light z-[-1]" />
      
      <div className="absolute w-full h-full overflow-hidden z-[-1]">
        <div className="absolute -top-[15%] -right-[10%] w-[50%] h-[50%] bg-rive-purple-dark/20 rounded-full blur-[120px] animate-pulse-subtle" />
        <div className="absolute -bottom-[15%] -left-[10%] w-[50%] h-[50%] bg-rive-purple/20 rounded-full blur-[120px] animate-pulse-subtle" />
      </div>
      
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6 md:pr-12 animate-fade-up">
            <div className="bg-rive-purple/20 text-rive-purple-light px-4 py-1.5 rounded-full inline-flex items-center space-x-2 backdrop-blur-sm border border-rive-purple/20">
              <span className="text-sm font-medium">Cloud Gaming | Poder Ilimitado</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight">
              <span className="text-gradient">RIVE CLOUD</span>
              <br />
              <span className="text-white">
                Trabalhe, jogue, renderize com poder ilimitado
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-xl">
              Eleve sua experiência digital com a tecnologia mais avançada e poderosa do mercado. 
              Computação em nuvem que transforma possibilidades em realidade.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/plans" className="primary-button flex items-center gap-2">
                Descobrir máquinas
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link to="/about" className="subtle-button">
                Saiba mais
              </Link>
            </div>
            
            <div className="pt-6">
              <div className="flex flex-wrap gap-4">
                <div className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/5 flex items-center gap-2">
                  <img 
                    src="https://cdn.discordapp.com/attachments/1351959002510266384/1352033235240095875/parsec-1330289848677437520.png" 
                    alt="Parsec" 
                    className="h-6 w-6" 
                  />
                  <span className="text-white/70 text-sm">Compatível com Parsec</span>
                </div>
                
                <div className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/5 flex items-center gap-2">
                  <img 
                    src="https://cdn.discordapp.com/attachments/1351959002510266384/1352033398113439764/ef8051ce270059a142fcb0b3e47b1cd4.png" 
                    alt="Moonlight" 
                    className="h-6 w-6" 
                  />
                  <span className="text-white/70 text-sm">Suporte a Moonlight</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-12 md:mt-0 animate-fade-up animation-delay-500">
            <GlassCard className="p-8 md:p-12 relative" intensity="light" hoverEffect={true}>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-rive-purple/30 to-transparent opacity-20 rounded-2xl" />
              
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1057&q=80" 
                  alt="Cloud Computing" 
                  className="rounded-lg shadow-2xl w-full h-auto object-cover"
                />
                
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <GlassCard className="p-4 text-center" intensity="heavy">
                    <h3 className="text-xl font-bold text-rive-purple-light">Ultra-Rápido</h3>
                    <p className="text-white/70 text-sm mt-1">Latência mínima</p>
                  </GlassCard>
                  
                  <GlassCard className="p-4 text-center" intensity="heavy">
                    <h3 className="text-xl font-bold text-rive-purple-light">Poderoso</h3>
                    <p className="text-white/70 text-sm mt-1">GPUs de ponta</p>
                  </GlassCard>
                  
                  <GlassCard className="p-4 text-center" intensity="heavy">
                    <h3 className="text-xl font-bold text-rive-purple-light">Seguro</h3>
                    <p className="text-white/70 text-sm mt-1">Proteção total</p>
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
