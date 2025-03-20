
import { Helmet } from 'react-helmet';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ParticleBackground from '../components/ui/ParticleBackground';
import PageTransition from '../components/ui/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import { Check, X, HelpCircle } from 'lucide-react';

const PlansPage = () => {
  const plans = [
    {
      name: 'Básico',
      price: 'R$ 29,90',
      period: '/mês',
      description: 'Ideal para jogadores casuais.',
      features: [
        { name: 'GPU', value: 'RTX 2060 Super', included: true },
        { name: 'CPU', value: '4 vCPUs', included: true },
        { name: 'RAM', value: '16GB', included: true },
        { name: 'Armazenamento', value: '100GB SSD', included: true },
        { name: 'Horas por mês', value: '10 horas', included: true },
        { name: 'Resolução máxima', value: '1080p', included: true },
        { name: 'Jogos pré-instalados', value: 'Básicos', included: true },
        { name: 'Suporte prioritário', value: '', included: false },
        { name: 'Acesso 24/7', value: '', included: false },
        { name: 'Personalização avançada', value: '', included: false },
      ],
      isPopular: false,
      buttonText: 'Comprar Agora',
    },
    {
      name: 'Premium',
      price: 'R$ 59,90',
      period: '/mês',
      description: 'Nosso plano mais popular.',
      features: [
        { name: 'GPU', value: 'RTX 3080', included: true },
        { name: 'CPU', value: '8 vCPUs', included: true },
        { name: 'RAM', value: '32GB', included: true },
        { name: 'Armazenamento', value: '250GB SSD', included: true },
        { name: 'Horas por mês', value: '50 horas', included: true },
        { name: 'Resolução máxima', value: '1440p', included: true },
        { name: 'Jogos pré-instalados', value: 'Premium', included: true },
        { name: 'Suporte prioritário', value: '', included: true },
        { name: 'Acesso 24/7', value: '', included: false },
        { name: 'Personalização avançada', value: '', included: false },
      ],
      isPopular: true,
      buttonText: 'Comprar Agora',
    },
    {
      name: 'Ultimate',
      price: 'R$ 99,90',
      period: '/mês',
      description: 'Para os gamers mais exigentes.',
      features: [
        { name: 'GPU', value: 'RTX 4090', included: true },
        { name: 'CPU', value: '16 vCPUs', included: true },
        { name: 'RAM', value: '64GB', included: true },
        { name: 'Armazenamento', value: '500GB SSD', included: true },
        { name: 'Horas por mês', value: 'Ilimitado', included: true },
        { name: 'Resolução máxima', value: '4K', included: true },
        { name: 'Jogos pré-instalados', value: 'Todos', included: true },
        { name: 'Suporte prioritário', value: '24/7', included: true },
        { name: 'Acesso 24/7', value: '', included: true },
        { name: 'Personalização avançada', value: '', included: true },
      ],
      isPopular: false,
      buttonText: 'Comprar Agora',
    },
  ];

  const faqs = [
    {
      question: 'Como funciona o sistema de horas?',
      answer: 'As horas são contabilizadas apenas quando você está conectado ativamente à sua máquina virtual. O tempo é contado em minutos e você pode acompanhar seu saldo no painel de controle.'
    },
    {
      question: 'Posso instalar meus próprios jogos?',
      answer: 'Sim! Você tem total liberdade para instalar jogos da sua biblioteca do Steam, Epic Games, ou qualquer outra plataforma na sua máquina virtual.'
    },
    {
      question: 'Qual a velocidade de internet recomendada?',
      answer: 'Recomendamos uma conexão de pelo menos 15 Mbps para streaming em 1080p, 25 Mbps para 1440p e 50 Mbps para 4K. A latência da conexão também é importante para uma experiência fluida.'
    },
    {
      question: 'Como faço para mudar de plano?',
      answer: 'Você pode fazer upgrade ou downgrade do seu plano a qualquer momento através do seu painel de controle. As mudanças entram em vigor no próximo ciclo de cobrança.'
    },
    {
      question: 'Os jogos são incluídos nos planos?',
      answer: 'Oferecemos uma seleção de jogos pré-instalados em todos os planos. No entanto, para jogar títulos que não estão na nossa biblioteca, você precisará ter as licenças desses jogos.'
    },
    {
      question: 'Posso cancelar a qualquer momento?',
      answer: 'Sim, você pode cancelar sua assinatura a qualquer momento. Não há contratos de fidelidade ou taxas de cancelamento.'
    },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Planos | RIVE CLOUD</title>
        <meta name="description" content="Conheça os planos da RIVE CLOUD e escolha o ideal para suas necessidades de cloud gaming." />
      </Helmet>

      <ParticleBackground />
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="section-container">
          <div className="text-center max-w-3xl mx-auto animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Planos</span> & Preços
            </h1>
            
            <p className="text-white/80 text-lg mb-8">
              Escolha o plano ideal para suas necessidades e comece a explorar o poder do cloud gaming. 
              Todos os planos incluem acesso a máquinas de alta performance configuradas para gaming.
            </p>
          </div>
        </section>
        
        {/* Plans Comparison */}
        <section className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`animate-fade-up animation-delay-${index * 200}`}
              >
                <GlassCard 
                  className={`h-full flex flex-col ${
                    plan.isPopular 
                      ? 'border-rive-purple ring-2 ring-rive-purple/50' 
                      : ''
                  }`}
                  hoverEffect={true}
                >
                  {plan.isPopular && (
                    <div className="bg-rive-purple text-white text-xs font-bold px-3 py-1 rounded-full absolute -top-3 left-1/2 transform -translate-x-1/2">
                      Mais Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-white/70 text-sm">{plan.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-white">{plan.price}</span>
                      <span className="text-white/70 ml-1">{plan.period}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start justify-between">
                        <div className="flex items-center">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-rive-purple shrink-0 mr-2" />
                          ) : (
                            <X className="h-5 w-5 text-white/30 shrink-0 mr-2" />
                          )}
                          <span className={feature.included ? "text-white/80" : "text-white/40"}>
                            {feature.name}
                          </span>
                        </div>
                        {feature.value && (
                          <span className={`text-right ${feature.included ? "text-white/80" : "text-white/40"}`}>
                            {feature.value}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 text-center rounded-lg font-medium transition-all ${
                      plan.isPopular
                        ? 'bg-rive-purple hover:bg-rive-purple-dark text-white'
                        : 'glass-button hover:bg-white/10 text-white'
                    }`}
                  >
                    {plan.buttonText}
                  </a>
                </GlassCard>
              </div>
            ))}
          </div>
        </section>
        
        {/* Features Table */}
        <section className="section-container">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-gradient mb-4">Comparação Detalhada</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Veja todos os detalhes e compare os planos para escolher o que melhor atende suas necessidades.
            </p>
          </div>
          
          <div className="overflow-x-auto animate-fade-up animation-delay-200">
            <div className="glass-panel p-6 min-w-[768px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-white/80 font-semibold">Recursos</th>
                    {plans.map((plan, index) => (
                      <th key={index} className="text-center py-4 px-4">
                        <span className={`font-bold text-lg ${plan.isPopular ? 'text-rive-purple' : 'text-white'}`}>
                          {plan.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 text-white/80 flex items-center gap-2">
                      Hardware
                      <HelpCircle className="h-4 w-4 text-white/50" />
                    </td>
                    <td className="text-center py-4 px-4 text-white/80">Boa performance</td>
                    <td className="text-center py-4 px-4 text-white/80">Excelente performance</td>
                    <td className="text-center py-4 px-4 text-white/80">Performance máxima</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 text-white/80">GPU</td>
                    <td className="text-center py-4 px-4 text-white/80">RTX 2060 Super</td>
                    <td className="text-center py-4 px-4 text-white/80">RTX 3080</td>
                    <td className="text-center py-4 px-4 text-white/80">RTX 4090</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 text-white/80">Memória RAM</td>
                    <td className="text-center py-4 px-4 text-white/80">16GB</td>
                    <td className="text-center py-4 px-4 text-white/80">32GB</td>
                    <td className="text-center py-4 px-4 text-white/80">64GB</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 text-white/80">Armazenamento</td>
                    <td className="text-center py-4 px-4 text-white/80">100GB SSD</td>
                    <td className="text-center py-4 px-4 text-white/80">250GB SSD</td>
                    <td className="text-center py-4 px-4 text-white/80">500GB SSD</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 text-white/80">Resolução máxima</td>
                    <td className="text-center py-4 px-4 text-white/80">1080p</td>
                    <td className="text-center py-4 px-4 text-white/80">1440p</td>
                    <td className="text-center py-4 px-4 text-white/80">4K</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 text-white/80">Horas por mês</td>
                    <td className="text-center py-4 px-4 text-white/80">10 horas</td>
                    <td className="text-center py-4 px-4 text-white/80">50 horas</td>
                    <td className="text-center py-4 px-4 text-white/80">Ilimitado</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 text-white/80">Jogos incluídos</td>
                    <td className="text-center py-4 px-4 text-white/80">Básicos</td>
                    <td className="text-center py-4 px-4 text-white/80">Premium</td>
                    <td className="text-center py-4 px-4 text-white/80">Todos</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 text-white/80">Suporte</td>
                    <td className="text-center py-4 px-4 text-white/80">Discord</td>
                    <td className="text-center py-4 px-4 text-white/80">Prioritário</td>
                    <td className="text-center py-4 px-4 text-white/80">Dedicado 24/7</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-white/80">Preço</td>
                    <td className="text-center py-4 px-4 text-white font-semibold">R$ 29,90/mês</td>
                    <td className="text-center py-4 px-4 text-rive-purple font-semibold">R$ 59,90/mês</td>
                    <td className="text-center py-4 px-4 text-white font-semibold">R$ 99,90/mês</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        
        {/* FAQs */}
        <section className="section-container">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-gradient mb-4">Perguntas Frequentes</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Tudo o que você precisa saber sobre nossos planos e serviços.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <GlassCard 
                key={index} 
                className={`animate-fade-up animation-delay-${index * 100}`}
              >
                <h3 className="text-xl font-semibold mb-3 text-white">{faq.question}</h3>
                <p className="text-white/70">{faq.answer}</p>
              </GlassCard>
            ))}
          </div>
        </section>
        
        {/* CTA */}
        <section className="section-container">
          <div className="glass-panel p-8 md:p-12 max-w-5xl mx-auto relative animate-fade-up">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-rive-purple/30 to-transparent opacity-20 rounded-2xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold mb-4 text-white">Pronto para começar?</h2>
                <p className="text-white/80 text-lg max-w-xl">
                  Entre para a comunidade RIVE CLOUD e transforme qualquer dispositivo em uma 
                  máquina de gaming de alta performance.
                </p>
              </div>
              
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="primary-button whitespace-nowrap"
              >
                Entrar no Discord
                <svg className="h-5 w-5 ml-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.393-.403.85-.548 1.235a16.813 16.813 0 0 0-5.145 0 12.84 12.84 0 0 0-.552-1.235.077.077 0 0 0-.079-.036 18.355 18.355 0 0 0-4.885 1.491.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 18.388 18.388 0 0 0 5.593 2.85.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.04.001-.088-.041-.104a12.212 12.212 0 0 1-1.746-.83.077.077 0 0 1-.008-.128 13.257 13.257 0 0 0 .288-.2.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.098.072.187.138.288.2a.077.077 0 0 1-.006.127 12.467 12.467 0 0 1-1.747.83.077.077 0 0 0-.041.105c.36.698.772 1.363 1.225 1.993a.076.076 0 0 0 .084.028 18.32 18.32 0 0 0 5.594-2.85.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.946 2.418-2.157 2.418z" />
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
