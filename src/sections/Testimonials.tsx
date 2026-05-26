import { useEffect, useRef } from 'react';
import { Star, MessageCircle } from 'lucide-react';

const testimonials = [
  {
    name: 'Sofia Martinez',
    location: 'Milan, Italy',
    image: '/community-1.jpg',
    text: 'The personal styling via WhatsApp was incredible. I described my style and they curated the perfect wardrobe for my trip to Paris. Every piece fit perfectly!',
    rating: 5,
  },
  {
    name: 'James Whitfield',
    location: 'London, UK',
    image: '/community-2.jpg',
    text: 'As someone who hates traditional shopping, this was a revelation. Quick responses, honest opinions on what works for my frame, and the quality is outstanding.',
    rating: 5,
  },
  {
    name: 'Elena Kowalski',
    location: 'Berlin, Germany',
    image: '/community-4.jpg',
    text: 'I ordered the Terra collection for my gallery opening. The pieces arrived beautifully packaged and I received compliments all evening. Will definitely shop again!',
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.testimonial-card');
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
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 lg:py-48 bg-pure-white">
      <div className="px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[2px] text-copper font-medium mb-3">
            Testimonials
          </p>
          <h2 className="font-display text-4xl lg:text-6xl font-light text-charcoal leading-tight">
            Loved by <em className="italic">thousands</em>.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card bg-cream rounded-xl p-8 transition-all duration-700 hover:shadow-card"
              style={{ opacity: 0, transform: 'translateY(20px)', transitionDelay: `${i * 150}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-charcoal/70 leading-relaxed mb-8">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-charcoal">{t.name}</p>
                  <p className="text-xs text-charcoal/50">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="https://wa.me/1234567890?text=Hi!%20I'd%20like%20to%20know%20more%20about%20your%20collections"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-charcoal text-white px-8 py-3 rounded-pill text-xs uppercase tracking-[1px] hover:bg-copper transition-colors duration-300"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Join Our Community
          </a>
        </div>
      </div>
    </section>
  );
}
