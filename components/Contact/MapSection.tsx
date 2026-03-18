import styles from './MapSection.module.css';

export default function MapSection() {
  const address = "39 Boundary Road, East Legon, Accra, Ghana";
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=REPLACE_WITH_YOUR_API_KEY&q=${encodeURIComponent(address)}`;
  
  // Using a standard embed URL without API key for demonstration if API key is not available
  const fallbackEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.mapWrapper}>
          <iframe
            className={styles.map}
            src={fallbackEmbedUrl}
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
