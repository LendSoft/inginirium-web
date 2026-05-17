import { useRef } from 'react'
import useScrollReveal from '../../../hooks/useScrollReveal'
import styles from './WhyUs.module.css'

export default function WhyUs({ items }) {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef)

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className="container">
        <h2 className={`section-title reveal ${styles.title}`}>
          Почему выбирают Инжинириум
        </h2>

        <div className={styles.grid}>
          {items.map((item, i) => (
            <div
              key={i}
              className={`${styles.card} reveal`}
              data-delay={i * 80}
            >
              <div className={styles.icon}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
