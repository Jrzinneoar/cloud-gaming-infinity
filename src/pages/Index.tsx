
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
        <title>RIVE CLOUD | Cloud Gaming | Poder Ilimitado</title>
        <meta name="description" content="Experimente o poder ilimitado do cloud gaming com a RIVE CLOUD. Trabalhe, jogue e renderize com a melhor tecnologia do mercado." />
      </Helmet>

      <ParticleBackground />
      <Navbar />
      
      <main className="pt-36 pb-20 overflow-hidden text-center">
        <HeroSection />
        <FeaturesSection />
      </main>
      
      <Footer />
    </PageTransition>
  );
};

export default Index;
