
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ParticleBackground from '../components/ui/ParticleBackground';
import GlassCard from '../components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Lock, User } from 'lucide-react';
import { DB } from '../services/database';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const adminAuth = localStorage.getItem('admin-auth');
    if (adminAuth === 'true') {
      navigate('/admin-panel');
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple login check
    if (username === 'rive' && password === 'rive') {
      setTimeout(() => {
        // Store authentication in localStorage for persistence
        localStorage.setItem('admin-auth', 'true');
        
        DB.addMaintenanceLog('Admin login bem-sucedido', 'info');
        
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo ao painel administrativo.",
          variant: "default",
        });
        navigate('/admin-panel');
        setIsLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        DB.addMaintenanceLog('Tentativa de login falhou', 'warning');
        
        toast({
          title: "Erro de autenticação",
          description: "Credenciais inválidas. Tente novamente.",
          variant: "destructive",
        });
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Helmet>
        <title>Admin Login | RIVE CLOUD</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <ParticleBackground />
      
      <div className="w-full max-w-md z-10 animate-fade-up">
        <GlassCard className="p-8">
          <div className="flex justify-center mb-6">
            <img 
              src="https://cdn.discordapp.com/attachments/1351959002510266384/1352033942051622973/Rive_Cloud.png" 
              alt="Rive Cloud Logo" 
              className="h-16 animate-pulse-subtle"
            />
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-6 text-gradient">Painel Administrativo</h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <div className="glass-panel p-2 flex items-center">
                <User className="h-5 w-5 text-rive-purple mr-2" />
                <Input
                  type="text"
                  placeholder="Usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-white/50"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="glass-panel p-2 flex items-center">
                <Lock className="h-5 w-5 text-rive-purple mr-2" />
                <Input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-white/50"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-rive-purple to-rive-purple-dark hover:opacity-90 transition-all duration-300 animate-pulse-subtle"
              disabled={isLoading}
            >
              {isLoading ? 'Autenticando...' : 'Entrar'}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-white/60 text-sm">
            <p>Acesso restrito aos administradores</p>
            <p className="mt-2">Usuário: rive | Senha: rive</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AdminLogin;
