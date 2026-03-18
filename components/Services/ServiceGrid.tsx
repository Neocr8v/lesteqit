import styles from './ServiceGrid.module.css';

const services = [
  {
    title: "Software Development",
    description: "Custom-built applications designed for performance and scalability.",
    items: ["Web Development", "Mobile Apps", "Custom ERP/CRM Systems", "API Integration"]
  },
  {
    title: "Cloud Solutions",
    description: "Cloud-native infrastructure and seamless migration services.",
    items: ["AWS/Azure Management", "Cloud Migration", "Serverless Architecture", "DevOps Automation"]
  },
  {
    title: "Cyber Security",
    description: "Protecting your digital footprint with advanced security protocols.",
    items: ["Security Audits", "Penetration Testing", "Managed Detection", "Data Encryption"]
  },
  {
    title: "IT Support",
    description: "Reliable maintenance and 24/7 infrastructure management.",
    items: ["Network Setup", "Remote Support", "Disaster Recovery", "Hardware Management"]
  },
  {
    title: "Specialized Training",
    description: "Empowering your team with the latest technical knowledge.",
    items: ["Coding Bootcamps", "Cyber Awareness", "Cloud Certifications", "Tech Workshops"]
  },
  {
    title: "UI/UX Design",
    description: "User-centric design that creates beautiful digital experiences.",
    items: ["Prototyping", "User Research", "Visual Design", "Interaction Design"]
  }
];

export default function ServiceGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {services.map((service, index) => (
            <div key={index} className={`${styles.card} glass`}>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
              <ul className={styles.list}>
                {service.items.map((item, idx) => (
                  <li key={idx} className={styles.listItem}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
