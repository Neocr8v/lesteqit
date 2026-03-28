import styles from './ContactForm.module.css';

export default function ContactForm() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Contact Info Column */}
          <div className={`${styles.info} animate-fade-in`}>
            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className={styles.infoText}>
                <h3>Our Location</h3>
                <p>39 Boundary Road, East Legon</p>
                <span>Accra, Ghana</span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className={styles.infoText}>
                <h3>Call Us</h3>
                <p>+233 59 895 4346</p>
                <span>Mon - Fri, 8am - 5pm</span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className={styles.infoText}>
                <h3>Email Us</h3>
                <p>info@lesteqitsolutions.com</p>
                <span>We reply within 24 hours</span>
              </div>
            </div>
            
            <div className={styles.socialSection}>
              <h3>Follow Our Journey</h3>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink}>LinkedIn</a>
                <a href="#" className={styles.socialLink}>Twitter</a>
                <a href="#" className={styles.socialLink}>Instagram</a>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className={`${styles.formWrapper} animate-fade-in`} style={{ animationDelay: '0.2s' }}>
            <form className={`${styles.form} glass`}>
              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <input type="text" placeholder="John Doe" required />
                </div>
                <div className={styles.formGroup}>
                  <label>Email Address</label>
                  <input type="email" placeholder="john@example.com" required />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Subject</label>
                <input type="text" placeholder="How can we help?" required />
              </div>
              <div className={styles.formGroup}>
                <label>Message</label>
                <textarea rows={6} placeholder="Describe your project or requirements in detail..." required></textarea>
              </div>
              <button type="submit" className={styles.submitBtn}>
                Send Message
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
