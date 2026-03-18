import styles from './Testimonials.module.css';

const testimonials = [
  { 
    quote: "Lesteq transformed our business with their cloud solutions. Technical excellence at its finest.",
    author: "Samuel Appiah",
    company: "FinTech Solutions"
  },
  { 
    quote: "The best UI/UX design team we've ever worked with. They truly understand user needs.",
    author: "Emelda Owusu",
    company: "Retail Global"
  },
  { 
    quote: "Cybersecurity is no longer a worry for us since Lesteq took over. Highly recommended.",
    author: "Kwame Boateng",
    company: "Secure Logistics"
  }
];

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>What Our <span className={styles.gradient}>Clients Say</span></h2>
        <div className={styles.grid}>
          {testimonials.map((t, index) => (
            <div key={index} className={`${styles.card} glass`}>
              <p className={styles.quote}>"{t.quote}"</p>
              <div className={styles.author}>
                <strong>{t.author}</strong>
                <span>{t.company}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
