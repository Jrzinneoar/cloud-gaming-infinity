
import { Helmet } from 'react-helmet';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ParticleBackground from '../components/ui/ParticleBackground';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import PageTransition from '../components/ui/PageTransition';
import { useMaintenanceStore, initMaintenanceBotConnection } from '../services/maintenanceService';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { isMaintenanceMode } = useMaintenanceStore();
  const navigate = useNavigate();
  
  // Redirect to maintenance page if maintenance mode is active
  useEffect(() => {
    if (isMaintenanceMode) {
      navigate('/maintenance');
    }
  }, [isMaintenanceMode, navigate]);

  // Initialize maintenance bot connection
  useEffect(() => {
    const cleanupBot = initMaintenanceBotConnection();
    return () => cleanupBot();
  }, []);

  return (
    <PageTransition>
      <Helmet>
        <title>RIVE CLOUD | Cloud Gaming | Poder Ilimitado</title>
        <meta name="description" content="Experimente o poder ilimitado do cloud gaming com a RIVE CLOUD. Trabalhe, jogue e renderize com a melhor tecnologia do mercado." />
      </Helmet>

      <ParticleBackground />
      <Navbar />
      
      <main className="overflow-hidden">
        <HeroSection />
        <FeaturesSection />
      </main>
      
      <Footer />
    </PageTransition>
  );
};

export default Index;
