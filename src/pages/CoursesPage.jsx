import { useRef, useState, useMemo } from 'react'
import CourseFilter from '../components/courses/CourseFilter/CourseFilter'
import CourseGrid from '../components/courses/CourseGrid/CourseGrid'
import useScrollReveal from '../hooks/useScrollReveal'
import { COURSES, AGE_GROUPS } from '../data/courses'
import styles from './CoursesPage.module.css'

export default function CoursesPage() {
  const [activeGroup, setActiveGroup] = useState('all')
  const [query, setQuery] = useState('')
  const headerRef = useRef(null)
  useScrollReveal(headerRef)

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return COURSES.filter((c) => {
      const matchAge = activeGroup === 'all' || c.ageGroup === activeGroup
      const matchSearch = !q || c.title.toLowerCase().includes(q) || c.tag.toLowerCase().includes(q)
      return matchAge && matchSearch
    })
  }, [activeGroup, query])

  return (
    <>
      {/* Page hero */}
      <section className={styles.pageHero} ref={headerRef}>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={`${styles.heroTitle} reveal`}>Каталог курсов</h1>
          <p className={`${styles.heroDesc} reveal`} data-delay="80">
            Очно и онлайн · для детей от 5 до 17 лет · ведут преподаватели МГТУ
          </p>

          {/* Search */}
          <div className={`${styles.searchWrap} reveal`} data-delay="160">
            <span className={styles.searchIcon}>🔍</span>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Найти курс: Python, робот, ИИ..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button className={styles.clearBtn} onClick={() => setQuery('')}>✕</button>
            )}
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className={styles.catalog}>
        <div className="container">
          <div className={styles.filterRow}>
            <CourseFilter
              groups={AGE_GROUPS}
              active={activeGroup}
              onChange={(id) => { setActiveGroup(id); setQuery('') }}
            />
            <span className={styles.count}>
              {filtered.length} курс{filtered.length === 1 ? '' : filtered.length < 5 ? 'а' : 'ов'}
            </span>
          </div>

          <CourseGrid courses={filtered} />
        </div>
      </section>
    </>
  )
}
