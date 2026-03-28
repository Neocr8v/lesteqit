import styles from './MapSection.module.css';

export default function MapSection() {
  const address = "39 Boundary Road, East Legon, Accra, Ghana";
  const fallbackEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.header} animate-fade-in`}>
          <h2 className={styles.heading}>Find Our <span className={styles.gradient}>Office</span></h2>
          <p className={styles.subtitle}>Located in the heart of East Legon, we&apos;re easy to find and always open for a coffee and a tech chat.</p>
        </div>
        <div className={`${styles.mapWrapper} animate-fade-in`}>
          <iframe
            className={styles.map}
            src={fallbackEmbedUrl}
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            allowFullScreen
            loading="lazy"
            title="Office Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
