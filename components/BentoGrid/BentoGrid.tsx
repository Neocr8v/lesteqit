import styles from './BentoGrid.module.css';

const features = [
  {
    title: "Software Development",
    description: "Tailored digital solutions built with technical innovation and deep focus on UX.",
    size: "large",
    image: "/software2.jpg"
  },
  {
    title: "Cloud Solutions",
    description: "Scale your infrastructure with our secure and flexible cloud services.",
    size: "small",
    image: "/cloud.jpeg"
  },
  {
    title: "Cyber Security",
    description: "Protecting your digital assets with advanced, smarter, and safer protocols.",
    size: "small",
    image: "/cyber2.jpg"
  },
  {
    title: "IT Support & Training",
    description: "Comprehensive infrastructure management and specialized training programs.",
    size: "medium",
    image: "/training.jpeg"
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
              <div 
                className={styles.imageBackground} 
                style={{ backgroundImage: `url(${feature.image})` }}
              />
              <div className={styles.overlay} />
              <div className={styles.content}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
