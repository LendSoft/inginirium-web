import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const NAV_LINKS = [
  { to: '/',        label: 'Главная',      end: true },
  { to: '/courses', label: 'Курсы' },
]

const TOP_NAV = ['О нас', 'Мастер-классы', 'Технопарки', 'Лето', 'Центры']

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [city, setCity] = useState('Москва')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topInner}`}>
          <ul className={styles.topNav}>
            {TOP_NAV.map((item) => (
              <li key={item}><a href="#" className={styles.topLink}>{item}</a></li>
            ))}
          </ul>
          <div className={styles.topRight}>
            <button
              className={styles.cityBtn}
              onClick={() => setCity(city === 'Москва' ? 'Самара' : 'Москва')}
            >
              📍 {city}
            </button>
            <a href="tel:88005005617" className={styles.phone}>8 800 500-56-17</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className={styles.mainBar}>
        <div className={`container ${styles.mainInner}`}>
          <NavLink to="/" className={styles.logo}>
            <img src="/inginirium mgtu.png" alt="Инжинириум МГТУ" className={styles.logoImg} />
          </NavLink>

          <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <a href="#signup" className={`btn btn-primary ${styles.headerCta}`}>
            Записаться
          </a>

          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Открыть меню"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
