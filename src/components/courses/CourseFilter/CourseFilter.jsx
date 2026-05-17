import styles from './CourseFilter.module.css'

export default function CourseFilter({ groups, active, onChange }) {
  return (
    <div className={styles.wrap} role="group" aria-label="Фильтр по возрасту">
      {groups.map(({ id, label }) => (
        <button
          key={id}
          className={`${styles.btn} ${active === id ? styles.btnActive : ''}`}
          onClick={() => onChange(id)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
