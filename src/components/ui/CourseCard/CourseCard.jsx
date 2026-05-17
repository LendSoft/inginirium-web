import styles from './CourseCard.module.css'

export default function CourseCard({ course }) {
  const { title, desc, ages, price, tag, icon, gradient, popular, isNew } = course

  return (
    <article className={styles.card}>
      {/* Thumbnail */}
      <div className={styles.thumb} style={{ background: gradient }}>
        <span className={styles.thumbIcon}>{icon}</span>
        {popular && <span className={`${styles.badge} ${styles.badgeBlue}`}>Популярное</span>}
        {isNew    && <span className={`${styles.badge} ${styles.badgeGreen}`}>Новинка</span>}
      </div>

      {/* Body */}
      <div className={styles.body}>
        <span className={styles.tag}>{tag}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{desc}</p>

        <div className={styles.footer}>
          <span className={styles.ages}>👤 {ages}</span>
          <div className={styles.priceWrap}>
            <span className={styles.price}>{price.toLocaleString('ru-RU')} ₽</span>
            <span className={styles.priceUnit}>/занятие</span>
          </div>
        </div>

        <button className={`btn btn-primary ${styles.cta}`}>Записаться</button>
      </div>
    </article>
  )
}
