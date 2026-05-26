import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Experience from './sections/Experience';
import SignatureCollection from './sections/SignatureCollection';
import SeamlessTransactions from './sections/SeamlessTransactions';
import Testimonials from './sections/Testimonials';
import Pricing from './sections/Pricing';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';
import Community from './sections/Community';
import Footer from './sections/Footer';
import WhatsAppButton from './sections/WhatsAppButton';

export default function App() {
  return (
    <div className="relative">
      <Navigation />
      <main>
        <Hero />
        <Experience />
        <SignatureCollection />
        <SeamlessTransactions />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
        <Community />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
