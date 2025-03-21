
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ParticleBackground from '../components/ui/ParticleBackground';
import GlassCard from '../components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useMaintenanceStore } from '../services/maintenanceService';
import { DB, Plan } from '../services/database';
import { ArrowLeft, Power, Clock, RefreshCw, Server, Shield, Save, Plus, Trash, Edit, Check, X } from 'lucide-react';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    isMaintenanceMode, 
    toggleMaintenanceMode,
    setMaintenanceMode,
    maintenanceLogs, 
    addMaintenanceLog,
    estimatedTimeInMinutes,
    setEstimatedTime
  } = useMaintenanceStore();
  
  const [minutes, setMinutes] = useState(estimatedTimeInMinutes.toString());
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isAddingPlan, setIsAddingPlan] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [newPlan, setNewPlan] = useState<Omit<Plan, 'id'>>({
    name: '',
    price: '',
    period: '/mês',
    description: '',
    features: [''],
    isPopular: false,
    buttonText: 'Comprar Agora',
    buttonUrl: 'https://discord.gg/fDPvmrhGcd',
  });
  
  // Load plans from database
  useEffect(() => {
    setPlans(DB.getPlans());
  }, []);
  
  // Check if user is authenticated (in a real app this would be more robust)
  useEffect(() => {
    // This is a simple check. In a real app, you'd use a proper auth system
    const isAuthenticated = sessionStorage.getItem('admin-auth') === 'true';
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    sessionStorage.removeItem('admin-auth');
    navigate('/admin');
  };
  
  const handleToggleMaintenance = () => {
    toggleMaintenanceMode();
    
    toast({
      title: isMaintenanceMode ? "Modo de manutenção desativado" : "Modo de manutenção ativado",
      description: isMaintenanceMode ? 
        "O site agora está acessível para todos os usuários." : 
        "O site agora está em modo de manutenção.",
      variant: "default",
    });
    
    addMaintenanceLog(`Modo de manutenção ${isMaintenanceMode ? 'desativado' : 'ativado'} pelo painel admin`);
  };
  
  const handleUpdateTime = () => {
    const newTime = parseInt(minutes);
    if (isNaN(newTime) || newTime <= 0) {
      toast({
        title: "Erro ao atualizar tempo",
        description: "Por favor, insira um valor válido maior que zero.",
        variant: "destructive",
      });
      return;
    }
    
    setEstimatedTime(newTime);
    
    toast({
      title: "Tempo atualizado",
      description: `Tempo estimado atualizado para ${newTime} minutos.`,
      variant: "default",
    });
  };
  
  const handleAddPlan = () => {
    try {
      // Validate
      if (!newPlan.name || !newPlan.price) {
        toast({
          title: "Erro ao adicionar plano",
          description: "Nome e preço são obrigatórios.",
          variant: "destructive",
        });
        return;
      }
      
      // Filter out empty features
      const filteredFeatures = newPlan.features.filter(f => f.trim() !== '');
      if (filteredFeatures.length === 0) {
        filteredFeatures.push('Recurso básico');
      }
      
      const planToAdd = {
        ...newPlan,
        features: filteredFeatures
      };
      
      const addedPlan = DB.addPlan(planToAdd);
      setPlans(DB.getPlans());
      
      toast({
        title: "Plano adicionado",
        description: `O plano ${addedPlan.name} foi adicionado com sucesso.`,
        variant: "default",
      });
      
      // Reset form
      setIsAddingPlan(false);
      setNewPlan({
        name: '',
        price: '',
        period: '/mês',
        description: '',
        features: [''],
        isPopular: false,
        buttonText: 'Comprar Agora',
        buttonUrl: 'https://discord.gg/fDPvmrhGcd',
      });
    } catch (error) {
      toast({
        title: "Erro ao adicionar plano",
        description: "Ocorreu um erro ao adicionar o plano.",
        variant: "destructive",
      });
    }
  };
  
  const handleUpdatePlan = () => {
    if (!editingPlanId) return;
    
    try {
      // Validate
      if (!newPlan.name || !newPlan.price) {
        toast({
          title: "Erro ao atualizar plano",
          description: "Nome e preço são obrigatórios.",
          variant: "destructive",
        });
        return;
      }
      
      // Filter out empty features
      const filteredFeatures = newPlan.features.filter(f => f.trim() !== '');
      if (filteredFeatures.length === 0) {
        filteredFeatures.push('Recurso básico');
      }
      
      const planToUpdate = {
        ...newPlan,
        features: filteredFeatures
      };
      
      const updatedPlan = DB.updatePlan(editingPlanId, planToUpdate);
      if (updatedPlan) {
        setPlans(DB.getPlans());
        
        toast({
          title: "Plano atualizado",
          description: `O plano ${updatedPlan.name} foi atualizado com sucesso.`,
          variant: "default",
        });
        
        // Reset form
        setEditingPlanId(null);
        setNewPlan({
          name: '',
          price: '',
          period: '/mês',
          description: '',
          features: [''],
          isPopular: false,
          buttonText: 'Comprar Agora',
          buttonUrl: 'https://discord.gg/fDPvmrhGcd',
        });
      } else {
        toast({
          title: "Erro ao atualizar plano",
          description: "Plano não encontrado.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao atualizar plano",
        description: "Ocorreu um erro ao atualizar o plano.",
        variant: "destructive",
      });
    }
  };
  
  const handleDeletePlan = (id: string) => {
    const plan = plans.find(p => p.id === id);
    
    if (window.confirm(`Tem certeza que deseja excluir o plano ${plan?.name}?`)) {
      const deleted = DB.deletePlan(id);
      
      if (deleted) {
        setPlans(DB.getPlans());
        
        toast({
          title: "Plano excluído",
          description: `O plano foi excluído com sucesso.`,
          variant: "default",
        });
      } else {
        toast({
          title: "Erro ao excluir plano",
          description: "Ocorreu um erro ao excluir o plano.",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleEditPlan = (id: string) => {
    const plan = plans.find(p => p.id === id);
    if (!plan) return;
    
    setEditingPlanId(id);
    setNewPlan({
      name: plan.name,
      price: plan.price,
      period: plan.period,
      description: plan.description,
      features: [...plan.features],
      isPopular: plan.isPopular,
      buttonText: plan.buttonText,
      buttonUrl: plan.buttonUrl,
    });
  };
  
  const handleAddFeature = () => {
    setNewPlan({
      ...newPlan,
      features: [...newPlan.features, '']
    });
  };
  
  const handleFeatureChange = (index: number, value: string) => {
    const features = [...newPlan.features];
    features[index] = value;
    setNewPlan({
      ...newPlan,
      features
    });
  };
  
  const handleRemoveFeature = (index: number) => {
    const features = [...newPlan.features];
    features.splice(index, 1);
    if (features.length === 0) {
      features.push('');
    }
    setNewPlan({
      ...newPlan,
      features
    });
  };
  
  const formatTimestamp = (date: Date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };
  
  const getLogIcon = (type: 'info' | 'warning' | 'error') => {
    switch (type) {
      case 'info':
        return <div className="h-2 w-2 bg-blue-400 rounded-full"></div>;
      case 'warning':
        return <div className="h-2 w-2 bg-yellow-400 rounded-full"></div>;
      case 'error':
        return <div className="h-2 w-2 bg-red-400 rounded-full"></div>;
      default:
        return <div className="h-2 w-2 bg-blue-400 rounded-full"></div>;
    }
  };
  
  const systemStats = [
    { 
      icon: <Server className="h-6 w-6 text-rive-purple" />, 
      title: 'Servidores', 
      value: '12/14 Online',
      status: isMaintenanceMode ? 'Em manutenção' : 'Operacional',
      color: isMaintenanceMode ? 'text-yellow-400' : 'text-green-400'
    },
    { 
      icon: <Shield className="h-6 w-6 text-rive-purple" />, 
      title: 'Segurança', 
      value: '97%',
      status: 'Protegido',
      color: 'text-green-400'
    },
    { 
      icon: <Clock className="h-6 w-6 text-rive-purple" />, 
      title: 'Uptime', 
      value: '99.8%',
      status: isMaintenanceMode ? 'Parcial' : 'Completo',
      color: isMaintenanceMode ? 'text-yellow-400' : 'text-green-400'
    },
    { 
      icon: <RefreshCw className="h-6 w-6 text-rive-purple" />, 
      title: 'Sistema', 
      value: 'v2.4.6',
      status: isMaintenanceMode ? 'Atualizando' : 'Atualizado',
      color: isMaintenanceMode ? 'text-blue-400' : 'text-green-400'
    },
  ];

  return (
    <div className="min-h-screen p-4 relative bg-black overflow-hidden">
      <Helmet>
        <title>Painel Admin | RIVE CLOUD</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      
      <div className="max-w-6xl mx-auto pt-6 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar para o site
          </button>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="bg-black/30 text-white border-rive-purple/30 hover:bg-black/50"
            >
              Sair
            </Button>
            
            <Button 
              variant={isMaintenanceMode ? "destructive" : "default"}
              onClick={handleToggleMaintenance}
              className={`animate-pulse-subtle ${
                isMaintenanceMode 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              <Power className="h-4 w-4 mr-2" />
              {isMaintenanceMode ? 'Desativar Manutenção' : 'Ativar Manutenção'}
            </Button>
          </div>
        </div>
        
        <div className="text-center mb-8 animate-fade-up">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-gradient">Painel</span> Administrativo
          </h1>
          <p className="text-white/70">
            Gerencie o modo de manutenção e monitore o status do sistema
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-fade-up animation-delay-200">
          {systemStats.map((stat, index) => (
            <GlassCard 
              key={index} 
              className="flex items-center gap-4 p-4 hover:scale-105 transition-all duration-300"
              intensity="light"
              hoverEffect={true}
            >
              <div className="glass-panel p-3 rounded-full animate-pulse-subtle">
                {stat.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{stat.title}</h3>
                <p className="text-white/80">{stat.value}</p>
                <p className={`text-sm ${stat.color}`}>{stat.status}</p>
              </div>
            </GlassCard>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="animate-fade-up animation-delay-300">
            <GlassCard className="h-full">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Power className="h-5 w-5 text-rive-purple" />
                <span>Controle de Manutenção</span>
              </h2>
              
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-white/70 mb-2">Status atual:</p>
                  <div className={`flex items-center gap-2 text-lg font-semibold ${
                    isMaintenanceMode ? 'text-red-400' : 'text-green-400'
                  }`}>
                    <div className={`h-3 w-3 rounded-full animate-pulse ${
                      isMaintenanceMode ? 'bg-red-400' : 'bg-green-400'
                    }`}></div>
                    {isMaintenanceMode ? 'Em Manutenção' : 'Operacional'}
                  </div>
                </div>
                
                <div>
                  <p className="text-white/70 mb-2">Tempo estimado (minutos):</p>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={minutes}
                      onChange={(e) => setMinutes(e.target.value)}
                      className="glass-input w-24 text-center"
                      min="1"
                    />
                    <Button onClick={handleUpdateTime} className="bg-rive-purple hover:bg-rive-purple-dark">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Button 
                    onClick={handleToggleMaintenance} 
                    className={`w-full py-3 ${
                      isMaintenanceMode 
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    <Power className="h-5 w-5 mr-2" />
                    {isMaintenanceMode ? 'Desativar Modo de Manutenção' : 'Ativar Modo de Manutenção'}
                  </Button>
                  
                  <p className="text-white/60 text-sm mt-2">
                    {isMaintenanceMode 
                      ? 'Ao desativar, os usuários poderão acessar todas as páginas do site normalmente.' 
                      : 'Ao ativar, os usuários serão redirecionados para a página de manutenção.'}
                  </p>
                </div>
                
                <div className="mt-4">
                  <p className="text-white/70 mb-2">Definir status manualmente:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      onClick={() => {
                        setMaintenanceMode(true);
                        toast({
                          title: "Modo de manutenção ativado",
                          description: "O site agora está em modo de manutenção.",
                          variant: "default",
                        });
                      }} 
                      className="bg-yellow-500 hover:bg-yellow-600"
                    >
                      Ativar Manutenção
                    </Button>
                    
                    <Button 
                      onClick={() => {
                        setMaintenanceMode(false);
                        toast({
                          title: "Modo de manutenção desativado",
                          description: "O site agora está acessível para todos os usuários.",
                          variant: "default",
                        });
                      }} 
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Desativar Manutenção
                    </Button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
          
          <div className="animate-fade-up animation-delay-400">
            <GlassCard className="h-full">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Server className="h-5 w-5 text-rive-purple" />
                <span>Logs do Sistema</span>
              </h2>
              
              <div className="max-h-80 overflow-y-auto custom-scrollbar">
                {maintenanceLogs.slice(0, 15).map((log, index) => (
                  <div 
                    key={index} 
                    className="mb-2 p-2 bg-black/20 rounded-lg flex items-start gap-2"
                  >
                    {getLogIcon(log.type)}
                    <div>
                      <p className="text-white/90 text-sm">{log.message}</p>
                      <p className="text-white/50 text-xs">{formatTimestamp(log.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
        
        {/* Plans Management Section */}
        <div className="mb-8 animate-fade-up animation-delay-500">
          <GlassCard>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Server className="h-5 w-5 text-rive-purple" />
                <span>Gerenciamento de Planos</span>
              </h2>
              
              <Button 
                onClick={() => {
                  if (editingPlanId) {
                    setEditingPlanId(null);
                    setNewPlan({
                      name: '',
                      price: '',
                      period: '/mês',
                      description: '',
                      features: [''],
                      isPopular: false,
                      buttonText: 'Comprar Agora',
                      buttonUrl: 'https://discord.gg/fDPvmrhGcd',
                    });
                  } else {
                    setIsAddingPlan(!isAddingPlan);
                  }
                }}
                className="bg-rive-purple hover:bg-rive-purple-dark"
              >
                {editingPlanId ? (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Cancelar Edição
                  </>
                ) : isAddingPlan ? (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Plano
                  </>
                )}
              </Button>
            </div>
            
            {/* Add/Edit Plan Form */}
            {(isAddingPlan || editingPlanId) && (
              <div className="mb-6 p-4 border border-rive-purple/30 rounded-lg bg-black/20">
                <h3 className="text-lg font-semibold mb-4">
                  {editingPlanId ? 'Editar Plano' : 'Adicionar Novo Plano'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-white/70 mb-1 block">Nome do Plano</label>
                    <input
                      type="text"
                      value={newPlan.name}
                      onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                      className="glass-input w-full"
                      placeholder="Ex: Básico"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-white/70 mb-1 block">Preço</label>
                      <input
                        type="text"
                        value={newPlan.price}
                        onChange={(e) => setNewPlan({...newPlan, price: e.target.value})}
                        className="glass-input w-full"
                        placeholder="Ex: R$ 29,90"
                      />
                    </div>
                    
                    <div className="w-1/3">
                      <label className="text-white/70 mb-1 block">Período</label>
                      <input
                        type="text"
                        value={newPlan.period}
                        onChange={(e) => setNewPlan({...newPlan, period: e.target.value})}
                        className="glass-input w-full"
                        placeholder="Ex: /mês"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="text-white/70 mb-1 block">Descrição</label>
                  <input
                    type="text"
                    value={newPlan.description}
                    onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
                    className="glass-input w-full"
                    placeholder="Breve descrição do plano"
                  />
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-white/70">Recursos</label>
                    <Button
                      onClick={handleAddFeature}
                      variant="outline"
                      size="sm"
                      className="h-8 border-rive-purple/30 text-white"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Adicionar
                    </Button>
                  </div>
                  
                  {newPlan.features.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="glass-input flex-1"
                        placeholder="Ex: 10GB de armazenamento"
                      />
                      
                      <Button
                        onClick={() => handleRemoveFeature(index)}
                        variant="outline"
                        size="sm"
                        className="border-red-500/30 hover:bg-red-500/10 text-red-400"
                        disabled={newPlan.features.length <= 1}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="isPopular"
                    checked={newPlan.isPopular}
                    onChange={(e) => setNewPlan({...newPlan, isPopular: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="isPopular" className="text-white/70">Marcar como Mais Popular</label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-white/70 mb-1 block">Texto do Botão</label>
                    <input
                      type="text"
                      value={newPlan.buttonText}
                      onChange={(e) => setNewPlan({...newPlan, buttonText: e.target.value})}
                      className="glass-input w-full"
                      placeholder="Ex: Comprar Agora"
                    />
                  </div>
                  
                  <div>
                    <label className="text-white/70 mb-1 block">URL do Botão</label>
                    <input
                      type="text"
                      value={newPlan.buttonUrl}
                      onChange={(e) => setNewPlan({...newPlan, buttonUrl: e.target.value})}
                      className="glass-input w-full"
                      placeholder="Ex: https://discord.gg/seu-servidor"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    onClick={editingPlanId ? handleUpdatePlan : handleAddPlan}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    {editingPlanId ? 'Salvar Alterações' : 'Adicionar Plano'}
                  </Button>
                </div>
              </div>
            )}
            
            {/* Plans List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div key={plan.id} className="border border-white/10 rounded-lg p-4 bg-black/20">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditPlan(plan.id)}
                        className="text-rive-purple hover:text-rive-purple-light"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePlan(plan.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-xl font-bold">{plan.price}<span className="text-sm text-white/70">{plan.period}</span></p>
                  <p className="text-white/70 text-sm mb-2">{plan.description}</p>
                  
                  {plan.isPopular && (
                    <div className="text-xs bg-rive-purple text-white px-2 py-1 rounded-full inline-block mb-2">
                      Popular
                    </div>
                  )}
                  
                  <div className="text-sm text-white/80">
                    <p>Recursos: {plan.features.length}</p>
                    <p className="truncate">Botão: {plan.buttonText}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
