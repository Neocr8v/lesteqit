import styles from './ContactHero.module.css';

export default function ContactHero() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Get in <span className={styles.gradient}>Touch</span>
        </h1>
        <p className={styles.subtitle}>
          Have a project in mind or need technical support? We&apos;re here to help you scale your business.
        </p>
      </div>
    </section>
  );
}
