
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ExternalLink } from 'lucide-react';

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

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Sobre Nós', path: '/about' },
    { name: 'Download', path: '/download' },
    { name: 'Planos', path: '/plans' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-3 bg-black/70 backdrop-blur-lg shadow-md' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-xl font-bold"
          onClick={() => setIsOpen(false)}
        >
          <img 
            src="https://cdn.discordapp.com/attachments/1351959002510266384/1352033942051622973/Rive_Cloud.png" 
            alt="Rive Cloud Logo" 
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                location.pathname === item.path
                  ? 'text-white bg-rive-purple/20'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-4 py-2 text-white/80 hover:text-white rounded-lg transition-all duration-300 hover:bg-white/5"
          >
            <img 
              src="https://cdn.discordapp.com/attachments/1351959002510266384/1352033483446419556/discord-white-icon.png" 
              alt="Discord Logo" 
              className="h-5 w-5"
            />
            <span>Discord</span>
          </a>
          
          <Link
            to="/maintenance"
            className="ml-2 primary-button flex items-center gap-2"
          >
            Dashboard
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full justify-center items-center space-y-8 p-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-xl font-medium ${
                location.pathname === item.path
                  ? 'text-rive-purple'
                  : 'text-white hover:text-rive-purple-light'
              } transition-colors duration-300`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xl font-medium text-white hover:text-rive-purple-light transition-colors duration-300"
          >
            <img 
              src="https://cdn.discordapp.com/attachments/1351959002510266384/1352033483446419556/discord-white-icon.png" 
              alt="Discord Logo" 
              className="h-6 w-6"
            />
            <span>Discord</span>
          </a>
          
          <Link
            to="/maintenance"
            className="mt-4 primary-button"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
