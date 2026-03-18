import Navbar from '@/components/Navbar/Navbar';
import AboutHero from '@/components/About/AboutHero';
import TeamSection from '@/components/About/TeamSection';
import Testimonials from '@/components/About/Testimonials';

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutHero />
      <TeamSection />
      <Testimonials />
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
