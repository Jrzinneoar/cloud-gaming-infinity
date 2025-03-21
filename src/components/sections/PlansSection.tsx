
import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { DB, Plan } from '../../services/database';

const PlansSection = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  
  useEffect(() => {
    // Load plans from database
    setPlans(DB.getPlans());
  }, []);

  return (
    <section className="section-container" id="plans">
      <div className="text-center mb-16 animate-fade-up">
        <h2 className="text-gradient mb-4">Planos & Preços</h2>
        <p className="text-white/70 max-w-2xl mx-auto text-lg">
          Escolha o plano ideal para suas necessidades e comece a explorar o poder do cloud gaming.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div 
            key={plan.id}
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
              
              <div className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-rive-purple shrink-0 mr-2" />
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
              
              <a
                href={plan.buttonUrl}
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
  );
};

export default PlansSection;
