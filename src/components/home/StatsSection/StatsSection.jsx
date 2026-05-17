import useCounter from '../../../hooks/useCounter'
import styles from './StatsSection.module.css'

function StatItem({ value, suffix, label }) {
  const { count, ref } = useCounter(value)
  return (
    <div className={styles.item} ref={ref}>
      <span className={styles.num}>
        {count.toLocaleString('ru-RU')}{suffix}
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  )
}

export default function StatsSection({ stats }) {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        {stats.map((s) => (
          <StatItem key={s.id} {...s} />
        ))}
      </div>
    </section>
  )
}
