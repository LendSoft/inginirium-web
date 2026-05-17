import { useEffect, useRef, useState } from 'react'
import styles from './HeroSlider.module.css'

const SLIDES = [
  {
    tag: 'Лето 2025',
    title: 'Летние инженерные\nпрограммы',
    desc: 'Две недели практики, реальные проекты и новые друзья. Технопарки по всей России.',
    cta: 'Смотреть программы',
    ctaSecond: 'Подробнее',
    gradient: 'linear-gradient(135deg, #003080 0%, #0046A8 60%, #005FCC 100%)',
  },
  {
    tag: 'Новинка 2025',
    title: 'Искусственный\nинтеллект для школьников',
    desc: 'Нейросети, машинное обучение и компьютерное зрение — курс для 7–11 класса.',
    cta: 'Записаться на курс',
    ctaSecond: 'Программа',
    gradient: 'linear-gradient(135deg, #1a003f 0%, #4B0082 60%, #6C63FF 100%)',
  },
  {
    tag: 'Топ направление',
    title: 'Робототехника\nна LEGO Spike Prime',
    desc: 'Соревновательная робототехника — готовимся к WRO и Олимпиаде НТТИ.',
    cta: 'Найти центр',
    ctaSecond: 'Узнать цену',
    gradient: 'linear-gradient(135deg, #003B2F 0%, #006B54 60%, #10B981 100%)',
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const canvasRef = useRef(null)
  const timerRef = useRef(null)

  /* ---------- Auto-slide ---------- */
  const goTo = (idx) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(idx)
      setAnimating(false)
    }, 350)
  }

  const next = () => goTo((current + 1) % SLIDES.length)

  useEffect(() => {
    timerRef.current = setInterval(next, 5000)
    return () => clearInterval(timerRef.current)
  }, [current, animating])

  /* ---------- Canvas particles ---------- */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, particles, raf

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Dot {
      constructor() { this.reset() }
      reset() {
        this.x  = Math.random() * W
        this.y  = Math.random() * H
        this.r  = Math.random() * 1.8 + .4
        this.vx = (Math.random() - .5) * .4
        this.vy = (Math.random() - .5) * .4
        this.a  = Math.random() * .35 + .08
      }
      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset()
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${this.a})`
        ctx.fill()
      }
    }

    particles = Array.from({ length: 70 }, () => new Dot())

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.hypot(dx, dy)
          if (d < 110) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255,255,255,${.07 * (1 - d / 110)})`
            ctx.lineWidth = .7
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const loop = () => {
      ctx.clearRect(0, 0, W, H)
      drawLines()
      particles.forEach((p) => { p.update(); p.draw() })
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const slide = SLIDES[current]

  return (
    <section className={styles.hero} style={{ background: slide.gradient }}>
      <canvas ref={canvasRef} className={styles.canvas} />

      <div className={`container ${styles.content} ${animating ? styles.fadeOut : styles.fadeIn}`}>
        <span className={styles.tag}>{slide.tag}</span>
        <h1 className={styles.title}>
          {slide.title.split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </h1>
        <p className={styles.desc}>{slide.desc}</p>
        <div className={styles.actions}>
          <a href="/courses" className={`btn btn-primary ${styles.btnMain}`}>{slide.cta}</a>
          <a href="#" className={`btn btn-outline ${styles.btnSec}`}>{slide.ctaSecond}</a>
        </div>
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Слайд ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => goTo((current - 1 + SLIDES.length) % SLIDES.length)}>&#8249;</button>
      <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next}>&#8250;</button>
    </section>
  )
}
