import { useState, useEffect, useRef } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How does shopping via WhatsApp work?',
    answer: 'Simply click the "Chat on WhatsApp" button to start a conversation with our style team. Share what you\'re looking for, and we\'ll send curated product recommendations directly in the chat. You can browse images, ask questions about sizing and materials, and place your order—all without leaving WhatsApp.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit and debit cards, bank transfers, and popular digital wallets. Payment links are sent securely through WhatsApp, and all transactions are encrypted and protected. For Premium and Concierge members, we also offer buy-now-pay-later options.',
  },
  {
    question: 'How long does delivery take?',
    answer: 'Delivery times depend on your membership tier and location. Essential members enjoy standard delivery (5-7 business days), Premium members get express delivery (2-3 business days), and Concierge members receive same-day delivery in select major cities. All orders come with tracking.',
  },
  {
    question: 'Can I return or exchange items?',
    answer: 'Absolutely! We offer hassle-free returns within 14 days of delivery. Items must be unworn with original tags attached. Simply message us on WhatsApp to initiate a return, and we\'ll arrange a pickup from your location. Exchanges are subject to availability.',
  },
  {
    question: 'Do you offer personal styling services?',
    answer: 'Yes! All members receive personalized styling recommendations. Premium members get a dedicated stylist, and Concierge members enjoy 24/7 access to their personal stylist. Share your preferences, body type, and occasion, and we\'ll curate looks tailored just for you.',
  },
  {
    question: 'Where do you ship?',
    answer: 'We currently ship to over 50 countries worldwide. Shipping costs and delivery times vary by location. Message us on WhatsApp with your location for specific shipping details and any customs information for your country.',
  },
  {
    question: 'How do I know my size?',
    answer: 'Our team provides detailed size guides for every item. Share your measurements with us on WhatsApp, and we\'ll recommend the perfect fit. Premium and Concierge members also enjoy complimentary alterations if needed.',
  },
  {
    question: 'Are the items authentic?',
    answer: 'Every item in our collection is 100% authentic and sourced directly from designers and authorized distributors. We stand behind the quality and authenticity of every piece we sell.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.faq-item-wrapper');
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

  return (
    <section id="faq" ref={sectionRef} className="py-32 lg:py-48 bg-pure-white">
      <div className="px-6 lg:px-12 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[2px] text-copper font-medium mb-3">
            FAQ
          </p>
          <h2 className="font-display text-4xl lg:text-6xl font-light text-charcoal leading-tight">
            Questions? <em className="italic">Answered</em>.
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="faq-item-wrapper faq-item py-6 transition-all duration-500"
              style={{ opacity: 0, transform: 'translateY(10px)', transitionDelay: `${i * 80}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-start justify-between gap-4 text-left group"
              >
                <span className="text-sm font-medium text-charcoal group-hover:text-copper transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-charcoal/40 flex-shrink-0 mt-0.5 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === i ? 'max-h-48 mt-4' : 'max-h-0'
                }`}
              >
                <p className="text-xs text-charcoal/60 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="text-center mt-16">
          <p className="text-sm text-charcoal/50 mb-4">Still have questions?</p>
          <a
            href="https://wa.me/1234567890?text=Hi!%20I%20have%20a%20question%20about%20your%20service"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-charcoal text-white px-8 py-3 rounded-pill text-xs uppercase tracking-[1px] hover:bg-copper transition-colors duration-300"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
