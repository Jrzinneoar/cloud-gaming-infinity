
import { Helmet } from 'react-helmet';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ParticleBackground from '../components/ui/ParticleBackground';
import PageTransition from '../components/ui/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import { Check, X, HelpCircle, Shield, Cpu, Database } from 'lucide-react';

const PlansPage = () => {
  const plans = [
    {
      name: 'Básico',
      price: 'R$ 29,90',
      period: '/mês',
      description: 'Para jogadores casuais',
      features: [
        { name: 'GPU', value: 'RTX 2060', included: true },
        { name: 'CPU', value: '4 vCPUs', included: true },
        { name: 'RAM', value: '16GB', included: true },
        { name: 'Armazenamento', value: '100GB SSD', included: true },
        { name: 'Horas por mês', value: '20 horas', included: true },
        { name: 'Resolução máxima', value: '1080p', included: true },
        { name: 'Suporte', value: 'Email', included: true },
        { name: 'Acesso 24/7', value: '', included: false },
      ],
      isPopular: false,
      buttonText: 'Começar Agora',
    },
    {
      name: 'Premium',
      price: 'R$ 59,90',
      period: '/mês',
      description: 'Nosso plano mais popular',
      features: [
        { name: 'GPU', value: 'RTX 3070', included: true },
        { name: 'CPU', value: '8 vCPUs', included: true },
        { name: 'RAM', value: '32GB', included: true },
        { name: 'Armazenamento', value: '250GB SSD', included: true },
        { name: 'Horas por mês', value: '80 horas', included: true },
        { name: 'Resolução máxima', value: '1440p', included: true },
        { name: 'Suporte', value: 'Prioritário', included: true },
        { name: 'Acesso 24/7', value: '', included: false },
      ],
      isPopular: true,
      buttonText: 'Escolher Premium',
    },
    {
      name: 'Ultimate',
      price: 'R$ 99,90',
      period: '/mês',
      description: 'Para gamers exigentes',
      features: [
        { name: 'GPU', value: 'RTX 4080', included: true },
        { name: 'CPU', value: '16 vCPUs', included: true },
        { name: 'RAM', value: '64GB', included: true },
        { name: 'Armazenamento', value: '500GB SSD', included: true },
        { name: 'Horas por mês', value: 'Ilimitado', included: true },
        { name: 'Resolução máxima', value: '4K', included: true },
        { name: 'Suporte', value: '24/7', included: true },
        { name: 'Acesso 24/7', value: '', included: true },
      ],
      isPopular: false,
      buttonText: 'Escolher Ultimate',
    },
  ];

  const faqs = [
    {
      question: 'Como funciona o sistema de horas?',
      answer: 'As horas são contabilizadas apenas durante o uso ativo da sua máquina virtual. O tempo é medido em minutos e você pode acompanhar seu saldo no painel de controle.'
    },
    {
      question: 'Posso instalar meus próprios jogos?',
      answer: 'Sim! Você tem liberdade para instalar jogos da sua biblioteca Steam, Epic Games ou qualquer outra plataforma na sua máquina virtual.'
    },
    {
      question: 'Qual a internet recomendada?',
      answer: 'Recomendamos no mínimo 15 Mbps para streaming em 1080p, 25 Mbps para 1440p e 35 Mbps para 4K. A latência também é importante para uma experiência fluida.'
    },
    {
      question: 'Posso alterar meu plano?',
      answer: 'Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento pelo painel de controle. As mudanças entram em vigor no próximo ciclo de cobrança.'
    },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Planos | RIVE CLOUD</title>
        <meta name="description" content="Conheça os planos da RIVE CLOUD e escolha o ideal para suas necessidades de cloud gaming com a infraestrutura Azure." />
      </Helmet>

      <ParticleBackground />
      <Navbar />
      
      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-12">
          <div className="text-center max-w-3xl mx-auto animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="azure-text-gradient">Planos</span> Azure
            </h1>
            
            <p className="text-white/80 text-lg mb-2">
              Escolha o plano ideal para suas necessidades de cloud gaming
            </p>
            <p className="text-white/60">
              Todos os planos incluem infraestrutura Azure de alta performance
            </p>
          </div>
        </section>
        
        {/* Plans Comparison */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className="animate-fade-up animation-delay-200"
              >
                <GlassCard 
                  className={`h-full flex flex-col relative ${
                    plan.isPopular 
                      ? 'border-blue-400 ring-1 ring-blue-400/30' 
                      : ''
                  }`}
                  hoverEffect={true}
                >
                  {plan.isPopular && (
                    <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full absolute -top-3 left-1/2 transform -translate-x-1/2">
                      Mais Popular
                    </div>
                  )}
                  <div className="mb-4 p-6 pb-0">
                    <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-white/60 text-sm">{plan.description}</p>
                  </div>
                  
                  <div className="mb-6 px-6">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-white">{plan.price}</span>
                      <span className="text-white/60 ml-1">{plan.period}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6 flex-grow px-6">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <div className="flex items-center mr-2">
                          {feature.included ? (
                            <Check className="h-4 w-4 text-blue-400 shrink-0" />
                          ) : (
                            <X className="h-4 w-4 text-white/30 shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center justify-between w-full">
                          <span className={feature.included ? "text-white/80 text-sm" : "text-white/40 text-sm"}>
                            {feature.name}
                          </span>
                          {feature.value && (
                            <span className={`text-right text-sm ${feature.included ? "text-white/80" : "text-white/40"}`}>
                              {feature.value}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="px-6 pb-6">
                    <a
                      href="https://discord.gg/fDPvmrhGcd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-3 text-center rounded-lg font-medium transition-all block ${
                        plan.isPopular
                          ? 'bg-blue-500 hover:bg-blue-600 text-white'
                          : 'glass-button hover:bg-white/10 text-white'
                      }`}
                    >
                      {plan.buttonText}
                    </a>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </section>
        
        {/* Features Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center mb-8 animate-fade-up">
            <h2 className="text-3xl font-bold mb-4 azure-text-gradient">Tecnologia Azure</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Todos os planos utilizam a infraestrutura Azure da Microsoft, oferecendo desempenho excepcional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <GlassCard className="p-6 text-center animate-fade-up animation-delay-300">
              <div className="bg-blue-500/10 p-4 rounded-full inline-block mb-4">
                <Cpu className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hardware Premium</h3>
              <p className="text-white/70">
                GPUs NVIDIA RTX Series e CPUs de alta performance para rodar qualquer jogo com excelente qualidade gráfica
              </p>
            </GlassCard>
            
            <GlassCard className="p-6 text-center animate-fade-up animation-delay-400">
              <div className="bg-blue-500/10 p-4 rounded-full inline-block mb-4">
                <Database className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Armazenamento SSD</h3>
              <p className="text-white/70">
                Armazenamento rápido em SSD para carregamentos instantâneos e melhor desempenho nos seus jogos favoritos
              </p>
            </GlassCard>
            
            <GlassCard className="p-6 text-center animate-fade-up animation-delay-500">
              <div className="bg-blue-500/10 p-4 rounded-full inline-block mb-4">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Segurança Azure</h3>
              <p className="text-white/70">
                Proteção de dados e criptografia de ponta a ponta, garantindo uma experiência segura em todos os momentos
              </p>
            </GlassCard>
          </div>
        </section>
        
        {/* FAQs */}
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center mb-8 animate-fade-up">
            <h2 className="text-3xl font-bold mb-4 azure-text-gradient">Perguntas Frequentes</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Tire suas dúvidas sobre nossos planos e serviços
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <GlassCard 
                key={index} 
                className="p-6 animate-fade-up animation-delay-600"
              >
                <h3 className="text-lg font-semibold mb-2 text-white">{faq.question}</h3>
                <p className="text-white/70 text-sm">{faq.answer}</p>
              </GlassCard>
            ))}
          </div>
        </section>
        
        {/* CTA */}
        <section className="container mx-auto px-4">
          <div className="glass-panel p-8 max-w-3xl mx-auto relative animate-fade-up animation-delay-700">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-transparent opacity-20 rounded-2xl" />
            
            <div className="relative z-10 text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">Pronto para começar?</h2>
              <p className="text-white/80 mb-6 max-w-xl mx-auto">
                Transforme qualquer dispositivo em uma máquina de gaming potente com a infraestrutura Azure
              </p>
              
              <a
                href="https://discord.gg/fDPvmrhGcd"
                target="_blank"
                rel="noopener noreferrer"
                className="azure-button inline-flex items-center"
              >
                Começar Agora
                <svg className="h-5 w-5 ml-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.393-.403.85-.548 1.235a16.813 16.813 0 0 0-5.145 0 12.84 12.84 0 0 0-.552-1.235.077.077 0 0 0-.079-.036 18.355 18.355 0 0 0-4.885 1.491.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 18.388 18.388 0 0 0 5.593 2.85.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.04.001-.088-.041-.104a12.212 12.212 0 0 1-1.746-.83.077.077 0 0 1-.008-.128 13.257 13.257 0 0 0 .288-.2.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.098.072.187.138.288.2a.077.077 0 0 1-.006.127 12.467 12.467 0 0 1-1.747.83.077.077 0 0 0-.041.105c.36.698.772 1.363 1.225 1.993a.076.076 0 0 0 .084.028 18.32 18.32 0 0 0 5.594-2.85.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </PageTransition>
  );
};

export default PlansPage;
