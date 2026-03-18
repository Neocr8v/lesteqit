import styles from './ContactForm.module.css';

export default function ContactForm() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Contact Info Column */}
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <h3>Visit Us</h3>
              <p>39 Boundary Road, East Legon</p>
            </div>
            <div className={styles.infoItem}>
              <h3>Call Us</h3>
              <p>+233 59 895 4346</p>
            </div>
            <div className={styles.infoItem}>
              <h3>Email Us</h3>
              <p>info@lesteqitsolutions.com</p>
            </div>
          </div>

          {/* Form Column */}
          <form className={`${styles.form} glass`}>
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" />
            </div>
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" />
            </div>
            <div className={styles.formGroup}>
              <label>Subject</label>
              <input type="text" placeholder="Project Inquiry" />
            </div>
            <div className={styles.formGroup}>
              <label>Message</label>
              <textarea rows={5} placeholder="Tell us about your project..."></textarea>
            </div>
            <button type="submit" className={styles.submitBtn}>Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}
