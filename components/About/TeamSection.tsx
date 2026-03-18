import styles from './TeamSection.module.css';

const team = [
  { name: "John Doe", role: "CEO & Founder", image: "https://via.placeholder.com/300x400/0a0a0a/ffffff?text=CEO" },
  { name: "Jane Smith", role: "Head of Design", image: "https://via.placeholder.com/300x400/0a0a0a/ffffff?text=Design" },
  { name: "Alex Kwesi", role: "Lead Developer", image: "https://via.placeholder.com/300x400/0a0a0a/ffffff?text=Dev" },
];

export default function TeamSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Meet Our <span className={styles.gradient}>Team</span></h2>
        <div className={styles.grid}>
          {team.map((member, index) => (
            <div key={index} className={`${styles.card} glass`}>
              <div className={styles.imageWrapper}>
                 <img src={member.image} alt={member.name} className={styles.image} />
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
