import styles from './TechStack.module.css';

const tech = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "AWS", "Azure", 
  "CyberSecurity", "Cloud Computing", "UI/UX", "Mobile Apps", "AI/ML",
  "DevOps", "Docker", "PostgreSQL", "Tailwind CSS"
];

export default function TechStack() {
  // Double the array for seamless looping
  const duplicatedTech = [...tech, ...tech];

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>Technologies We Excel In</h3>
      <div className={styles.marqueeContainer}>
        <div className="animate-marquee">
          {duplicatedTech.map((item, index) => (
            <div key={index} className={styles.item}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
