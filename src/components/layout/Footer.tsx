
import { Link } from 'react-router-dom';
import { Cloud, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-rive-black-dark py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Cloud className="h-7 w-7 text-rive-purple" />
              <span className="text-xl font-bold text-gradient">RIVE CLOUD</span>
            </div>
            <p className="text-white/70">
              Experimente o poder da nuvem. Jogue, trabalhe e renderize como nunca antes.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-white/70 hover:text-rive-purple transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-rive-purple transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-rive-purple transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.393-.403.85-.548 1.235a16.813 16.813 0 0 0-5.145 0 12.84 12.84 0 0 0-.552-1.235.077.077 0 0 0-.079-.036 18.355 18.355 0 0 0-4.885 1.491.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 18.388 18.388 0 0 0 5.593 2.85.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.04.001-.088-.041-.104a12.212 12.212 0 0 1-1.746-.83.077.077 0 0 1-.008-.128 13.257 13.257 0 0 0 .288-.2.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.098.072.187.138.288.2a.077.077 0 0 1-.006.127 12.467 12.467 0 0 1-1.747.83.077.077 0 0 0-.041.105c.36.698.772 1.363 1.225 1.993a.076.076 0 0 0 .084.028 18.32 18.32 0 0 0 5.594-2.85.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors">Sobre Nós</Link>
              </li>
              <li>
                <Link to="/download" className="text-white/70 hover:text-white transition-colors">Download</Link>
              </li>
              <li>
                <Link to="/plans" className="text-white/70 hover:text-white transition-colors">Planos</Link>
              </li>
            </ul>
          </div>
          
          {/* Downloads */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Downloads</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://parsec.app/downloads" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors flex items-center gap-1">
                  Parsec
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="https://moonlight-stream.org/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors flex items-center gap-1">
                  Moonlight
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors flex items-center gap-1">
                  Discord
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-white/70">
                <Mail className="h-4 w-4 text-rive-purple" />
                <span>contato@rivecloud.com</span>
              </li>
              <li className="flex items-center gap-2 text-white/70">
                <Phone className="h-4 w-4 text-rive-purple" />
                <span>(99) 9999-9999</span>
              </li>
              <li className="flex items-start gap-2 text-white/70">
                <MapPin className="h-4 w-4 text-rive-purple mt-1" />
                <span>Av. Cloud Gaming, 123<br />Tecnópolis, SP, Brasil</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/50">
          <p>&copy; {currentYear} RIVE CLOUD. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
