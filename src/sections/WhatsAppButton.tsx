import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="https://wa.me/1234567890?text=Hi!%20I'm%20interested%20in%20your%20fashion%20collection"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[200] flex items-center gap-2 bg-[#25d366] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#20bd5a] transition-all duration-300 hover:scale-105 whatsapp-pulse group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm font-medium hidden sm:inline">Chat on WhatsApp</span>
      <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
    </a>
  );
}
