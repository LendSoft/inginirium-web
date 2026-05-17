import { useRef } from 'react'
import { Link } from 'react-router-dom'
import HeroSlider from '../components/home/HeroSlider/HeroSlider'
import StatsSection from '../components/home/StatsSection/StatsSection'
import LearningPath from '../components/home/LearningPath/LearningPath'
import WhyUs from '../components/home/WhyUs/WhyUs'
import CourseGrid from '../components/courses/CourseGrid/CourseGrid'
import useScrollReveal from '../hooks/useScrollReveal'
import { STATS, WHY_US, LEARNING_STEPS } from '../data/stats'
import { COURSES } from '../data/courses'
import styles from './HomePage.module.css'

const FEATURED_IDS = [2, 4, 7, 10]
const featuredCourses = COURSES.filter((c) => FEATURED_IDS.includes(c.id))

export default function HomePage() {
  const ctaRef = useRef(null)
  useScrollReveal(ctaRef)

  return (
    <>
      <HeroSlider />
      <StatsSection stats={STATS} />
      <LearningPath steps={LEARNING_STEPS} />

      {/* Course preview */}
      <section className={styles.coursesSection}>
        <div className="container">
          <div className={styles.coursesHeader}>
            <div>
              <h2 className="section-title">Популярные курсы</h2>
              <p className="section-sub">Выбор 100&nbsp;000 учеников — очно и онлайн</p>
            </div>
            <Link to="/courses" className={`btn btn-primary ${styles.allLink}`}>
              Все курсы →
            </Link>
          </div>
          <CourseGrid courses={featuredCourses} />
        </div>
      </section>

      <WhyUs items={WHY_US} />

      <section className={styles.ctaSection} id="signup" ref={ctaRef}>
        <div className={`container ${styles.ctaInner}`}>
          <div className="reveal">
            <h2 className={styles.ctaTitle}>Первое занятие — бесплатно</h2>
            <p className={styles.ctaSub}>
              Оставьте телефон — мы подберём курс и позвоним в течение часа.
            </p>
          </div>
          <form
            className={`${styles.ctaForm} reveal`}
            data-delay="120"
            onSubmit={(e) => {
              e.preventDefault()
              alert('Заявка принята! Мы скоро свяжемся с вами.')
              e.target.reset()
            }}
          >
            <input
              className={styles.ctaInput}
              type="tel"
              placeholder="+7 (___) ___-__-__"
              required
            />
            <button type="submit" className={`btn btn-primary ${styles.ctaBtn}`}>
              Записаться
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
