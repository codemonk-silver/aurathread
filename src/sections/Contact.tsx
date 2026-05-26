import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Check } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.contact-animate');
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
      { threshold: 0.1 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 lg:py-48 bg-cream">
      <div className="px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 contact-animate opacity-0 translate-y-5 transition-all duration-700">
          <p className="text-[10px] uppercase tracking-[2px] text-copper font-medium mb-3">
            Contact
          </p>
          <h2 className="font-display text-4xl lg:text-6xl font-light text-charcoal leading-tight">
            Let's <em className="italic">connect</em>.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Info + Map */}
          <div className="contact-animate opacity-0 translate-y-5 transition-all duration-700 delay-100">
            {/* Contact Info */}
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-charcoal/5 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-copper" />
                </div>
                <div>
                  <p className="text-xs font-medium text-charcoal mb-1">Visit Us</p>
                  <p className="text-xs text-charcoal/50 leading-relaxed">
                    Via Monte Napoleone 8<br />
                    20121 Milan, Italy
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-charcoal/5 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-copper" />
                </div>
                <div>
                  <p className="text-xs font-medium text-charcoal mb-1">WhatsApp</p>
                  <p className="text-xs text-charcoal/50 leading-relaxed">
                    +39 02 1234 5678<br />
                    Reply within minutes
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-charcoal/5 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-copper" />
                </div>
                <div>
                  <p className="text-xs font-medium text-charcoal mb-1">Email</p>
                  <p className="text-xs text-charcoal/50 leading-relaxed">
                    hello@aurathreads.com<br />
                    We reply within 24h
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-charcoal/5 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-copper" />
                </div>
                <div>
                  <p className="text-xs font-medium text-charcoal mb-1">Hours</p>
                  <p className="text-xs text-charcoal/50 leading-relaxed">
                    Mon - Sat: 9AM - 8PM<br />
                    Sun: 10AM - 6PM
                  </p>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="rounded-xl overflow-hidden shadow-card aspect-[4/3]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.2!2d9.1947!3d45.4668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c6aef8d28a9b%3A0x2d0d7a59e5b7c5f6!2sVia%20Monte%20Napoleone%2C%20Milano%20MI%2C%20Italy!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Aura Threads Location"
              />
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="contact-animate opacity-0 translate-y-5 transition-all duration-700 delay-200">
            <div className="bg-pure-white rounded-xl p-8 lg:p-10 shadow-card">
              <h3 className="text-lg font-medium text-charcoal mb-2">Send us a message</h3>
              <p className="text-xs text-charcoal/50 mb-8">
                Prefer email? Fill out the form below and we'll get back to you within 24 hours. Or chat with us directly on WhatsApp for instant responses.
              </p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                    <Check className="w-6 h-6 text-green-500" />
                  </div>
                  <h4 className="text-lg font-medium text-charcoal mb-2">Message Sent!</h4>
                  <p className="text-xs text-charcoal/50">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-[1px] text-charcoal/60 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-cream rounded-lg text-sm text-charcoal placeholder:text-charcoal/30 outline-none focus:ring-2 focus:ring-copper/20 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[1px] text-charcoal/60 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-cream rounded-lg text-sm text-charcoal placeholder:text-charcoal/30 outline-none focus:ring-2 focus:ring-copper/20 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[1px] text-charcoal/60 mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-cream rounded-lg text-sm text-charcoal placeholder:text-charcoal/30 outline-none focus:ring-2 focus:ring-copper/20 transition-all resize-none"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 bg-charcoal text-white px-6 py-3 rounded-pill text-xs uppercase tracking-[1px] hover:bg-copper transition-colors duration-300 flex-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Send Message
                    </button>
                    <a
                      href="https://wa.me/1234567890?text=Hi!%20I%20have%20a%20question"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#25d366] text-white px-6 py-3 rounded-pill text-xs uppercase tracking-[1px] hover:bg-[#20bd5a] transition-colors duration-300 flex-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
