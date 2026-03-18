import Navbar from '@/components/Navbar/Navbar';
import ContactHero from '@/components/Contact/ContactHero';
import ContactForm from '@/components/Contact/ContactForm';
import MapSection from '@/components/Contact/MapSection';

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <ContactHero />
      <ContactForm />
      <MapSection />
      <footer style={{ 
        padding: '6rem 2rem', 
        textAlign: 'center', 
        opacity: 0.8, 
        fontSize: '0.9rem',
        borderTop: '1px solid var(--glass-border)',
        lineHeight: '1.8'
      }}>
        <p>39 Boundary Road, East Legon</p>
        <p>+233 59 895 4346 | info@lesteqitsolutions.com</p>
        <p style={{ opacity: 0.5, marginTop: '1rem' }}>© {new Date().getFullYear()} Lesteq IT Solutions. All rights reserved.</p>
      </footer>
    </main>
  );
}
