import { useEffect, useRef } from 'react';
import { Check, MessageCircle, Sparkles, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Essential',
    icon: Sparkles,
    price: 'Free',
    period: '',
    description: 'Perfect for trying out our curated fashion experience.',
    features: [
      'Browse full catalog via WhatsApp',
      'Personal styling recommendations',
      'Standard delivery (5-7 days)',
      'Email support',
      'Monthly style newsletter',
    ],
    featured: false,
    cta: 'Get Started',
  },
  {
    name: 'Premium',
    icon: Crown,
    price: '$29',
    period: '/month',
    description: 'Our most popular plan for fashion enthusiasts.',
    features: [
      'Everything in Essential',
      'Priority WhatsApp responses',
      'Express delivery (2-3 days)',
      'Exclusive early access to collections',
      'Free alterations service',
      'Personal stylist assigned',
      'VIP event invitations',
    ],
    featured: true,
    cta: 'Start Premium',
  },
  {
    name: 'Concierge',
    icon: Crown,
    price: '$99',
    period: '/month',
    description: 'The ultimate luxury fashion experience.',
    features: [
      'Everything in Premium',
      '24/7 dedicated stylist via WhatsApp',
      'Same-day delivery in select cities',
      'Bespoke customization options',
      'Quarterly wardrobe audits',
      'Private shopping sessions',
      'Complimentary gift wrapping',
      'First access to limited editions',
    ],
    featured: false,
    cta: 'Go Concierge',
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.pricing-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="py-32 lg:py-48 bg-cream">
      <div className="px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[2px] text-copper font-medium mb-3">
            Pricing
          </p>
          <h2 className="font-display text-4xl lg:text-6xl font-light text-charcoal leading-tight">
            Simple, <em className="italic">transparent</em> pricing.
          </h2>
          <p className="mt-4 text-sm text-charcoal/50 max-w-lg mx-auto">
            Choose the plan that fits your style. All plans include access to our full catalog and WhatsApp shopping experience.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`pricing-card bg-pure-white rounded-xl p-8 transition-all duration-700 hover:shadow-card ${
                plan.featured ? 'pricing-card-featured' : ''
              }`}
              style={{ opacity: 0, transform: 'translateY(20px)', transitionDelay: `${i * 150}ms` }}
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-6 ${
                plan.featured ? 'bg-copper/10' : 'bg-charcoal/5'
              }`}>
                <plan.icon className={`w-4 h-4 ${plan.featured ? 'text-copper' : 'text-charcoal/40'}`} />
              </div>

              {/* Name */}
              <h3 className="text-lg font-medium text-charcoal mb-2">{plan.name}</h3>
              <p className="text-xs text-charcoal/50 mb-6 leading-relaxed">{plan.description}</p>

              {/* Price */}
              <div className="mb-8">
                <span className="font-display text-4xl text-charcoal">{plan.price}</span>
                <span className="text-sm text-charcoal/50">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      plan.featured ? 'text-copper' : 'text-charcoal/30'
                    }`} />
                    <span className="text-xs text-charcoal/70 leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={`https://wa.me/1234567890?text=Hi!%20I'm%20interested%20in%20the%20${plan.name}%20plan`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-pill text-xs uppercase tracking-[1px] transition-colors duration-300 ${
                  plan.featured
                    ? 'bg-charcoal text-white hover:bg-copper'
                    : 'bg-charcoal/5 text-charcoal hover:bg-charcoal/10'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
