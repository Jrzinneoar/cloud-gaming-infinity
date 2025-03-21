
import { Helmet } from 'react-helmet';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ParticleBackground from '../components/ui/ParticleBackground';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import PageTransition from '../components/ui/PageTransition';
import { useMaintenanceStore } from '../services/maintenanceService';
import { Navigate } from 'react-router-dom';

const Index = () => {
  const { isMaintenanceMode } = useMaintenanceStore();
  
  // If maintenance mode is active, redirect to maintenance page
  if (isMaintenanceMode) {
    return <Navigate to="/maintenance" replace />;
  }

  return (
    <PageTransition>
      <Helmet>
        <title>RIVE CLOUD | Máquinas Virtuais Azure | Poder Ilimitado</title>
        <meta name="description" content="Máquinas virtuais Azure com o poder da RIVE CLOUD. Trabalhe, jogue e renderize com a melhor tecnologia em computação em nuvem." />
      </Helmet>

      <div className="relative min-h-screen w-full bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ParticleBackground />
        </div>
        
        <div className="relative z-10">
          <Navbar />
          
          <main className="overflow-hidden">
            <HeroSection />
            <FeaturesSection />
          </main>
          
          <Footer />
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;
