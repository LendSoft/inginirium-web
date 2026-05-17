import { useEffect, useRef } from 'react'

/**
 * Adds 'is-visible' class to elements with .reveal / .reveal-left / .reveal-right
 * inside the given container ref when they enter the viewport.
 */
export default function useScrollReveal(containerRef, deps = []) {
  useEffect(() => {
    const root = containerRef?.current ?? document
    const targets = root.querySelectorAll('.reveal, .reveal-left, .reveal-right')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay ?? 0
            setTimeout(() => entry.target.classList.add('is-visible'), Number(delay))
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
