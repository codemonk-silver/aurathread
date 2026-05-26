import { MapPin, Phone, Mail, MessageCircle, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal min-h-[500px] relative">
      <div className="px-6 lg:px-12 py-20 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 max-w-7xl mx-auto">
          {/* Left: Big A mark */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-display text-[20vw] lg:text-[12rem] text-white/5 leading-none select-none">
                A
              </span>
              <p className="text-xs text-white/30 mt-4 max-w-xs leading-relaxed">
                Aura Threads reimagines fashion commerce through the intimacy of conversation. 
                Every piece curated. Every interaction personal.
              </p>
            </div>
          </div>

          {/* Right: Links */}
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-10">
            {/* Shop */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[2px] text-white/40 font-medium mb-6">
                Shop
              </h4>
              <ul className="space-y-3">
                <li><a href="#collections" className="text-sm text-white/60 hover:text-white transition-colors">New Arrivals</a></li>
                <li><a href="#collections" className="text-sm text-white/60 hover:text-white transition-colors">Terra Collection</a></li>
                <li><a href="#collections" className="text-sm text-white/60 hover:text-white transition-colors">Aura Collection</a></li>
                <li><a href="#collections" className="text-sm text-white/60 hover:text-white transition-colors">Shadow Collection</a></li>
                <li><a href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">Membership Plans</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[2px] text-white/40 font-medium mb-6">
                Support
              </h4>
              <ul className="space-y-3">
                <li><a href="#faq" className="text-sm text-white/60 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#contact" className="text-sm text-white/60 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Size Guide</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[2px] text-white/40 font-medium mb-6">
                Connect
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-copper" />
                  <span className="text-sm text-white/60">Milan, Italy</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-copper" />
                  <span className="text-sm text-white/60">+39 02 1234 5678</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-copper" />
                  <span className="text-sm text-white/60">hello@aurathreads.com</span>
                </li>
              </ul>

              {/* Social */}
              <div className="mt-8">
                <h4 className="text-[10px] uppercase tracking-[2px] text-white/40 font-medium mb-4">
                  Social
                </h4>
                <div className="flex gap-4">
                  <a href="#" className="text-xs text-white/40 hover:text-white transition-colors">Instagram</a>
                  <a href="#" className="text-xs text-white/40 hover:text-white transition-colors">Pinterest</a>
                  <a href="#" className="text-xs text-white/40 hover:text-white transition-colors">TikTok</a>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/1234567890?text=Hi!%20I'm%20interested%20in%20your%20fashion%20collection"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 bg-[#25d366] text-white px-5 py-2.5 rounded-pill text-xs uppercase tracking-[1px] hover:bg-[#20bd5a] transition-colors duration-300"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Chat Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 px-6 lg:px-12 py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <p className="text-[10px] text-white/30 uppercase tracking-[1px]">
            &copy; 2024 Aura Threads. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[10px] text-white/30 uppercase tracking-[1px] hover:text-white/60 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-[10px] text-white/30 uppercase tracking-[1px] hover:text-white/60 transition-colors">
              Terms
            </a>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3 h-3 text-white/40" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
