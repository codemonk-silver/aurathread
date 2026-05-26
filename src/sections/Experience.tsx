import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: '/scroll-img-1.jpg', alt: 'Cashmere texture' },
  { src: '/scroll-img-2.jpg', alt: 'Fashion editorial' },
  { src: '/scroll-img-3.jpg', alt: 'Luxury accessories' },
  { src: '/scroll-img-4.jpg', alt: 'Editorial portrait' },
  { src: '/scroll-img-5.jpg', alt: 'Golden water' },
  { src: '/scroll-img-6.jpg', alt: 'Street style boots' },
];

const texts = ['Curated for you.', 'Personal styling.', 'Instant checkout.'];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeText, setActiveText] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const gallery = galleryRef.current;
    if (!section || !gallery) return;

    const ctx = gsap.context(() => {
      // Animate images with parallax scroll effect
      imageRefs.current.forEach((img, i) => {
        if (!img) return;

        const rotation = i % 2 === 0 ? -5 : 5;
        const yStart = 100 + i * 30;

        gsap.fromTo(
          img,
          {
            yPercent: yStart,
            rotation: -rotation,
            scale: 0.85,
            opacity: 0,
          },
          {
            yPercent: -50,
            rotation: rotation,
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
              onUpdate: (self) => {
                const progress = self.progress;
                if (progress > 0.3 && progress < 0.7) {
                  setActiveText(i % 3);
                }
              },
            },
          }
        );
      });

      // Fade in the section header
      gsap.fromTo(
        '.exp-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.exp-header',
            start: 'top 85%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 lg:py-48 overflow-hidden"
    >
      {/* Section Header */}
      <div className="exp-header px-6 lg:px-12 mb-20">
        <p className="text-[10px] uppercase tracking-[2px] text-copper font-medium mb-3">
          The Experience
        </p>
        <h2 className="font-display text-4xl lg:text-6xl font-light text-charcoal leading-tight">
          Fashion, <em className="italic">reimagined</em>.
        </h2>
      </div>

      {/* Floating Text */}
      <div className="sticky top-1/2 -translate-y-1/2 z-10 text-center pointer-events-none mb-[-80px]">
        <p
          key={activeText}
          className="font-display text-2xl lg:text-4xl text-charcoal/10 font-light transition-all duration-500"
        >
          {texts[activeText]}
        </p>
      </div>

      {/* Image Grid */}
      <div
        ref={galleryRef}
        className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 px-6 lg:px-12"
      >
        {images.map((img, i) => (
          <div
            key={i}
            ref={(el) => { imageRefs.current[i] = el; }}
            className={`relative overflow-hidden rounded-lg ${
              i === 0 || i === 3 ? 'aspect-[3/4]' : i === 2 ? 'aspect-square' : 'aspect-[4/3]'
            }`}
            style={{ marginTop: i % 2 === 0 ? '0' : '40px' }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
