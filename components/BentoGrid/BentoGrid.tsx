import styles from './BentoGrid.module.css';

const features = [
  {
    title: "Software Development",
    description: "Tailored digital solutions built with technical innovation and deep focus on UX.",
    size: "large"
  },
  {
    title: "Cloud Solutions",
    description: "Scale your infrastructure with our secure and flexible cloud services.",
    size: "small"
  },
  {
    title: "Cyber Security",
    description: "Protecting your digital assets with advanced, smarter, and safer protocols.",
    size: "small"
  },
  {
    title: "IT Support & Training",
    description: "Comprehensive infrastructure management and specialized training programs.",
    size: "medium"
  }
];

export default function BentoGrid() {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Innovation meeting Expertise</h2>
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`${styles.card} ${styles[feature.size]} glass`}
            >
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
