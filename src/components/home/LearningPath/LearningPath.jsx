import { useRef } from 'react'
import useScrollReveal from '../../../hooks/useScrollReveal'
import styles from './LearningPath.module.css'

export default function LearningPath({ steps }) {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef)

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className="container">
        <h2 className={`section-title reveal ${styles.title}`}>
          Ступени обучения
        </h2>
        <p className={`section-sub reveal ${styles.sub}`} data-delay="80">
          От детского сада до поступления в МГТУ им. Баумана
        </p>

        <div className={styles.grid}>
          {steps.map((step, i) => (
            <div
              key={i}
              className={`${styles.card} reveal`}
              data-delay={i * 100}
            >
              <div className={styles.iconWrap}>
                <span className={styles.icon}>{step.icon}</span>
                <span className={styles.stepNum}>{i + 1}</span>
              </div>
              <div className={styles.ages}>{step.ages}</div>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
