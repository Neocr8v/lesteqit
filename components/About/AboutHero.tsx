import styles from './AboutHero.module.css';

export default function AboutHero() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>Why We Are The <span className={styles.gradient}>Best IT Company</span></h1>
        <div className={styles.content}>
          <p className={styles.lead}>
            Lesteq IT Solutions has become the best in information technology by consistently delivering innovative solutions that solve real-world problems. 
          </p>
          <div className={styles.grid}>
            <div className={`${styles.card} glass`}>
              <h3>Innovation & Research</h3>
              <p>Lesteq invests in cutting-edge research, builds secure and scalable systems, and adapts quickly to emerging trends like AI, cloud computing, and cybersecurity.</p>
            </div>
            <div className={`${styles.card} glass`}>
              <h3>Technical Excellence</h3>
              <p>What sets us apart is not just technical excellence, but a deep understanding of user needs and a commitment to creating seamless digital experiences.</p>
            </div>
          </div>
          <p className={styles.text}>
            Equally important is our company’s culture, one that fosters collaboration, continuous learning, and ethical responsibility. By empowering our team, prioritizing customer satisfaction, and maintaining transparency, the company earns trust and loyalty. The best IT companies don’t just build technology, they shape the future by making it smarter, safer, and more accessible to everyone.
          </p>
        </div>
      </div>
    </section>
  );
}
