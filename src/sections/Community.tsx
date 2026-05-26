import { useEffect, useRef } from 'react';

const members = [
  { image: '/community-1.jpg', name: 'Sofia', location: 'Milan' },
  { image: '/community-2.jpg', name: 'James', location: 'London' },
  { image: '/community-3.jpg', name: 'Amara', location: 'Paris' },
  { image: '/community-4.jpg', name: 'Clara', location: 'Berlin' },
];

export default function Community() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.community-animate');
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

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="community" ref={sectionRef} className="py-32 lg:py-48 bg-cream">
      <div className="px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 community-animate opacity-0 translate-y-5 transition-all duration-700">
          <p className="text-[10px] uppercase tracking-[2px] text-copper font-medium mb-3">
            Community
          </p>
          <h2 className="font-display text-4xl lg:text-6xl font-light text-charcoal leading-tight">
            Our <em className="italic">people</em>.
          </h2>
          <p className="mt-4 text-sm text-charcoal/50 max-w-lg mx-auto">
            Join a global community of fashion lovers who shop differently.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-6xl mx-auto">
          {members.map((member, i) => (
            <div
              key={i}
              className="community-card community-animate relative overflow-hidden rounded-lg cursor-pointer group opacity-0 translate-y-5 transition-all duration-700"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className={`${i % 2 === 0 ? 'aspect-[3/4]' : 'aspect-square'} overflow-hidden`}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              {/* Hover Overlay */}
              <div className="community-overlay absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 translate-y-full opacity-0 transition-all duration-500">
                <p className="text-white font-display text-xl">{member.name}</p>
                <p className="text-white/60 text-xs">{member.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram-style CTA */}
        <div className="text-center mt-16 community-animate opacity-0 translate-y-5 transition-all duration-700 delay-500">
          <p className="text-xs text-charcoal/40 uppercase tracking-[2px] mb-4">
            Follow our journey
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-sm text-charcoal/60 hover:text-copper transition-colors">
              Instagram
            </a>
            <a href="#" className="text-sm text-charcoal/60 hover:text-copper transition-colors">
              Pinterest
            </a>
            <a href="#" className="text-sm text-charcoal/60 hover:text-copper transition-colors">
              TikTok
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
