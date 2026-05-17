import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoBadge}>МГТУ</span>
            <span>Инжинириум</span>
          </div>
          <p className={styles.desc}>
            Официальная образовательная программа МГТУ им. Н.Э. Баумана.
            <br />Лицензия № 040350.
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialBtn} aria-label="ВКонтакте">ВК</a>
            <a href="#" className={styles.socialBtn} aria-label="YouTube">▶</a>
            <a href="#" className={styles.socialBtn} aria-label="Telegram">✈</a>
          </div>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Обучение</h4>
          <ul className={styles.colList}>
            <li><Link to="/courses">Все курсы</Link></li>
            <li><a href="#">Онлайн-курсы</a></li>
            <li><a href="#">Летние программы</a></li>
            <li><a href="#">Мастер-классы</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>О нас</h4>
          <ul className={styles.colList}>
            <li><a href="#">История</a></li>
            <li><a href="#">Команда</a></li>
            <li><a href="#">Партнёры</a></li>
            <li><a href="#">Вакансии</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Контакты</h4>
          <ul className={styles.colList}>
            <li><a href="tel:88005005617">8 800 500-56-17</a></li>
            <li><a href="tel:+74951209975">+7 (495) 120-99-75</a></li>
            <li><a href="mailto:press@emtc.ru">press@emtc.ru</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <span>© 2025 Инжинириум МГТУ. Все права защищены.</span>
        </div>
      </div>
    </footer>
  )
}
