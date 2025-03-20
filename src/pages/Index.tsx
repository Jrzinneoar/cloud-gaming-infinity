
import { Helmet } from 'react-helmet';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ParticleBackground from '../components/ui/ParticleBackground';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import DownloadSection from '../components/sections/DownloadSection';
import PlansSection from '../components/sections/PlansSection';
import PageTransition from '../components/ui/PageTransition';

const Index = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>RIVE CLOUD | Cloud Gaming | Poder Ilimitado</title>
        <meta name="description" content="Experimente o poder ilimitado do cloud gaming com a RIVE CLOUD. Trabalhe, jogue e renderize com a melhor tecnologia do mercado." />
      </Helmet>

      <ParticleBackground />
      <Navbar />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <DownloadSection />
        <PlansSection />
      </main>
      
      <Footer />
    </PageTransition>
  );
};

export default Index;
