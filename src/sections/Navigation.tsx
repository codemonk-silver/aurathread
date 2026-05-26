import { useEffect, useState } from 'react';
import { ShoppingBag, MessageCircle } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md border-b border-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 lg:px-12 py-4">
        {/* Brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xs font-medium uppercase tracking-[3px] text-charcoal hover:text-copper transition-colors"
        >
          AURA THREADS
        </button>

        {/* Center Links - Desktop */}
        <div className="hidden md:flex items-center gap-10">
          <button
            onClick={() => scrollTo('collections')}
            className="text-xs uppercase tracking-[1px] text-charcoal/70 hover:text-charcoal transition-colors"
          >
            Shop
          </button>
          <button
            onClick={() => scrollTo('experience')}
            className="text-xs uppercase tracking-[1px] text-charcoal/70 hover:text-charcoal transition-colors"
          >
            Collections
          </button>
          <button
            onClick={() => scrollTo('community')}
            className="text-xs uppercase tracking-[1px] text-charcoal/70 hover:text-charcoal transition-colors"
          >
            About
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/1234567890?text=Hi!%20I'm%20interested%20in%20your%20fashion%20collection"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-charcoal text-white px-5 py-2.5 rounded-pill text-xs uppercase tracking-[1px] hover:bg-copper transition-colors duration-300"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Chat on WhatsApp
          </a>
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <ShoppingBag className="w-4 h-4 text-charcoal" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-4 h-3 flex flex-col justify-between">
              <span className={`block h-[1.5px] bg-charcoal transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
              <span className={`block h-[1.5px] bg-charcoal transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-[1.5px] bg-charcoal transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream/98 backdrop-blur-md border-t border-black/5 px-6 py-8">
          <div className="flex flex-col gap-6">
            <button
              onClick={() => scrollTo('collections')}
              className="text-sm uppercase tracking-[2px] text-charcoal/80 hover:text-charcoal transition-colors text-left"
            >
              Shop
            </button>
            <button
              onClick={() => scrollTo('experience')}
              className="text-sm uppercase tracking-[2px] text-charcoal/80 hover:text-charcoal transition-colors text-left"
            >
              Collections
            </button>
            <button
              onClick={() => scrollTo('community')}
              className="text-sm uppercase tracking-[2px] text-charcoal/80 hover:text-charcoal transition-colors text-left"
            >
              About
            </button>
            <a
              href="https://wa.me/1234567890?text=Hi!%20I'm%20interested%20in%20your%20fashion%20collection"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-charcoal text-white px-5 py-3 rounded-pill text-xs uppercase tracking-[1px] w-fit"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
