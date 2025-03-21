
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Info, Download, CreditCard, MessageSquare, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="h-4 w-4 mr-2" /> },
    { name: 'Sobre Nós', path: '/about', icon: <Info className="h-4 w-4 mr-2" /> },
    { name: 'Download', path: '/download', icon: <Download className="h-4 w-4 mr-2" /> },
    { name: 'Planos', path: '/plans', icon: <CreditCard className="h-4 w-4 mr-2" /> },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none px-4 pt-6">
      <nav 
        className={`rounded-xl w-full max-w-7xl px-5 py-3 transition-all duration-500 pointer-events-auto 
          ${scrolled ? 'bg-black/80 backdrop-blur-lg shadow-[0_8px_32px_rgba(139,92,246,0.3)]' : 'bg-black/40 backdrop-blur-md'}
          border border-white/10 animate-fade-in animation-delay-500 hover:shadow-[0_8px_32px_rgba(139,92,246,0.4)] hover:border-rive-purple/30 transition-all`}
      >
        <div className="container mx-auto px-2 flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-bold ml-2 hover:scale-105 transition-transform duration-300"
            onClick={() => setIsOpen(false)}
          >
            <img 
              src="https://cdn.discordapp.com/attachments/1351959002510266384/1352033942051622973/Rive_Cloud.png?ex=67dddcbb&is=67dc8b3b&hm=cccea5effb7d20d3023a7047094eef526e18770a124fafc2a6b540b542f593bc&" 
              alt="Rive Cloud Logo" 
              className="h-10 w-auto animate-pulse-subtle"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3 px-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                  location.pathname === item.path
                    ? 'text-white border border-rive-purple shadow-lg shadow-rive-purple/30 hover:shadow-rive-purple/50 animate-pulse-subtle'
                    : 'text-white/80 hover:text-white hover:bg-white/10 border border-transparent hover:border-rive-purple/30 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                } hover:scale-105`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            
            <a
              href="https://discord.gg/fDPvmrhGcd"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-rive-purple text-white px-4 py-2 rounded-lg shadow-lg shadow-rive-purple/20 hover:shadow-rive-purple/40 transition-all duration-300 hover:bg-rive-purple-dark flex items-center gap-1 hover:scale-105 animate-pulse-subtle"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>Discord</span>
            </a>
            
            <a
              href="https://discord.gg/fDPvmrhGcd"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-rive-purple to-rive-purple-dark text-white px-5 py-2 rounded-lg shadow-lg shadow-rive-purple/20 hover:shadow-rive-purple/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <LayoutDashboard className="h-4 w-4 mr-1" />
              Dashboard
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none mr-2 bg-rive-purple/20 p-2 rounded-full hover:bg-rive-purple/30 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } pointer-events-auto`}
      >
        <div className="flex flex-col h-full justify-center items-center space-y-8 p-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-xl font-medium px-6 py-3 rounded-lg flex items-center justify-center ${
                location.pathname === item.path
                  ? 'text-white border border-rive-purple shadow-lg shadow-rive-purple/30'
                  : 'text-white hover:text-rive-purple-light hover:bg-white/5 border border-transparent hover:border-rive-purple/30'
              } transition-all duration-300 hover:scale-105 w-full text-center`}
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          
          <a
            href="https://discord.gg/fDPvmrhGcd"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-rive-purple text-white px-6 py-3 rounded-lg shadow-lg shadow-rive-purple/20 hover:shadow-rive-purple/40 transition-all duration-300 hover:bg-rive-purple-dark flex items-center justify-center gap-2 hover:scale-105 w-full text-xl"
            onClick={() => setIsOpen(false)}
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            <span>Discord</span>
          </a>
          
          <a
            href="https://discord.gg/fDPvmrhGcd"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-rive-purple to-rive-purple-dark text-white px-6 py-3 rounded-lg shadow-lg shadow-rive-purple/20 hover:shadow-rive-purple/50 transition-all duration-300 hover:scale-105 w-full text-center text-xl flex items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            <LayoutDashboard className="h-5 w-5 mr-2" />
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
