import { useEffect, useRef } from 'react';
import { MessageCircle, CreditCard, Truck, Shield } from 'lucide-react';

const features = [
  { icon: MessageCircle, label: 'Chat to Order' },
  { icon: CreditCard, label: 'Secure Payment' },
  { icon: Truck, label: 'Free Shipping' },
  { icon: Shield, label: 'Easy Returns' },
];

export default function SeamlessTransactions() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add('animate-fade-up');
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-cream">
      {/* Features Grid */}
      <div ref={sectionRef} className="px-6 lg:px-12 mb-20 opacity-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {features.map((feat, i) => (
            <div key={i} className="text-center group">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-charcoal/5 flex items-center justify-center group-hover:bg-copper/10 transition-colors duration-300">
                <feat.icon className="w-5 h-5 text-copper" />
              </div>
              <p className="text-xs uppercase tracking-[1px] text-charcoal/70 font-medium">
                {feat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee-container py-12 overflow-hidden">
        <div ref={trackRef} className="marquee-track flex animate-marquee" style={{ width: 'max-content' }}>
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="marquee-text flex-shrink-0 font-display text-[15vw] leading-none whitespace-nowrap px-8"
              style={{
                color: '#f3f3f3',
                textShadow: '-1px -1px 0 #232222, 1px -1px 0 #232222, -1px 1px 0 #232222, 1px 1px 0 #232222',
              }}
            >
              SEAMLESS
            </span>
          ))}
        </div>
      </div>

      {/* Sub-text */}
      <div className="text-center mt-12 px-6">
        <p className="text-sm text-charcoal/50 max-w-md mx-auto leading-relaxed">
          From first message to final delivery, every step is designed to be effortless. 
          Shop via WhatsApp and experience fashion commerce redefined.
        </p>
        <a
          href="https://wa.me/1234567890?text=Hi!%20I'm%20interested%20in%20your%20fashion%20collection"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-6 bg-charcoal text-white px-8 py-3 rounded-pill text-xs uppercase tracking-[1px] hover:bg-copper transition-colors duration-300"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Start Shopping
        </a>
      </div>
    </section>
  );
}
