// Scroll-driven motion. No libraries: one observer, one scroll loop.
import { useEffect, useRef, useState } from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Adds .in to every [data-reveal] element as it enters the view.
export function useReveal() {
  useEffect(() => {
    const items = [...document.querySelectorAll('[data-reveal]')]
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      })
    }, { rootMargin: '0px 0px -8% 0px' })
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// Progress bar, header state, timeline drawing and portrait parallax.
export function useScrollMotion() {
  useEffect(() => {
    const root = document.documentElement
    const header = document.querySelector('.top')
    const timeline = document.querySelector('.timeline')
    const stops = timeline ? [...timeline.querySelectorAll('li')] : []
    const portrait = document.querySelector('.portrait')
    const wide = window.matchMedia('(min-width: 961px)')
    const still = prefersReducedMotion()
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      const vh = window.innerHeight
      const max = root.scrollHeight - vh
      root.style.setProperty('--progress', max > 0 ? Math.min(y / max, 1).toFixed(4) : '0')
      header?.classList.toggle('scrolled', y > 24)

      if (timeline) {
        const box = timeline.getBoundingClientRect()
        const reach = vh * 0.72 - box.top
        timeline.style.setProperty('--draw', Math.max(0, Math.min(reach / box.height, 1)).toFixed(4))
        stops.forEach((li) => {
          li.classList.toggle('lit', li.getBoundingClientRect().top < vh * 0.72)
        })
      }

      if (portrait) {
        const shift = !still && wide.matches && y < vh * 1.2 ? y * 0.05 : 0
        portrait.style.setProperty('--shift', `${shift.toFixed(1)}px`)
      }
    }

    const queue = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', queue)
      window.removeEventListener('resize', queue)
    }
  }, [])
}

// Which section is in the middle of the screen, for the nav highlight.
export function useActiveSection(ids) {
  const [active, setActive] = useState('')
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    let centre = ''
    let atEnd = false
    const apply = () => setActive(atEnd ? ids[ids.length - 1] : centre)
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) centre = e.target.id })
      apply()
    }, { rootMargin: '-45% 0px -54% 0px' })
    const hero = document.getElementById('top')
    const strip = document.querySelector('.stats')
    if (hero) io.observe(hero)
    if (strip) io.observe(strip) // no id, so nothing is highlighted over it
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    // The last section is too short to reach mid-screen, so the footer marks it.
    const foot = document.querySelector('.foot')
    const end = new IntersectionObserver(([e]) => {
      atEnd = e.isIntersecting
      apply()
    })
    if (foot) end.observe(foot)
    return () => { io.disconnect(); end.disconnect() }
  }, [ids])
  return active
}

// Counts a value such as "15+" up from zero the first time it is seen.
export function useCountUp(value, duration = 1600) {
  const match = String(value).match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : null
  const suffix = match ? match[2] : ''
  const animate = target !== null && !prefersReducedMotion() && 'IntersectionObserver' in window
  const [n, setN] = useState(animate ? 0 : target)
  const ref = useRef(null)

  useEffect(() => {
    if (!animate) return
    const el = ref.current
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1)
        setN(Math.round(target * (1 - (1 - t) ** 3)))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [animate, target, duration])

  return { ref, text: target === null ? value : `${n}${suffix}` }
}
