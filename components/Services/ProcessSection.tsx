import styles from './ProcessSection.module.css';

const steps = [
  { title: "Discovery", desc: "Understanding your unique challenges and objectives." },
  { title: "Design", desc: "Crafting intuitive architectures and stunning interfaces." },
  { title: "Build", desc: "Developing robust, scalable solutions using modern tech." },
  { title: "Secure", desc: "Rigorous testing and implementation of security protocols." },
  { title: "Deploy", desc: "Launching your solution with full support and monitoring." }
];

export default function ProcessSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Our <span className={styles.gradient}>Process</span></h2>
        <div className={styles.timeline}>
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`${styles.step} animate-fade-in`} 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.number}>{index + 1}</div>
              <div className={styles.content}>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
