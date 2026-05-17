import { useEffect, useRef, useState } from 'react'
import CourseCard from '../../ui/CourseCard/CourseCard'
import styles from './CourseGrid.module.css'

export default function CourseGrid({ courses }) {
  const [visible, setVisible] = useState(false)
  const prevCoursesRef = useRef(courses)

  /* Animate grid when filter changes */
  useEffect(() => {
    if (prevCoursesRef.current !== courses) {
      setVisible(false)
      const t = setTimeout(() => setVisible(true), 20)
      prevCoursesRef.current = courses
      return () => clearTimeout(t)
    } else {
      setVisible(true)
    }
  }, [courses])

  if (courses.length === 0) {
    return (
      <div className={styles.empty}>
        <span>🔍</span>
        <p>Курсы не найдены. Попробуйте другой фильтр.</p>
      </div>
    )
  }

  return (
    <div className={`${styles.grid} ${visible ? styles.visible : styles.hidden}`}>
      {courses.map((course, i) => (
        <div
          key={course.id}
          className={styles.item}
          style={{ transitionDelay: `${i * 40}ms` }}
        >
          <CourseCard course={course} />
        </div>
      ))}
    </div>
  )
}
