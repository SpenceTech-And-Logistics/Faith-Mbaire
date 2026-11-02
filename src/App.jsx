import { useEffect, useRef, useState } from 'react'
import {
  person, contact, services, overview, stats, career, education,
  certification, training, skills, gallery,
} from './content.js'

const NAV = [
  ['about', 'About'],
  ['services', 'Services'],
  ['career', 'Career'],
  ['education', 'Education'],
  ['training', 'Training'],
  ['gallery', 'Gallery'],
  ['contact', 'Contact'],
]

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { el.classList.add('in'); return }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('in'); io.disconnect() }
    }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

function Section({ id, label, title, children }) {
  const ref = useReveal()
  return (
    <section id={id} className="section reveal" ref={ref}>
      <div className="wrap">
        <p className="label">{label}</p>
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="top">
      <div className="wrap top-in">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>Faith Mbaire Ng'ethe</a>
        <button className="burger" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
        <nav className={open ? 'open' : ''}>
          {NAV.map(([id, t]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{t}</a>
          ))}
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="wrap hero-in">
        <div className="hero-text">
          <p className="label gold">{person.eyebrow}</p>
          <h1>{person.name}</h1>
          <ul className="focus">
            {person.focus.map((f) => <li key={f}>{f}</li>)}
          </ul>
          <p className="hero-role">{person.role}, {person.org}</p>
          <div className="hero-cta">
            <a className="btn" href="#contact">Get in touch</a>
            <a className="btn ghost" href="#career">See experience</a>
          </div>
        </div>
        <figure className="portrait">
          <img src={person.photo} alt={`${person.name} seated at a conference table with a microphone`} />
        </figure>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <div className="stats">
      <div className="wrap stats-in">
        {stats.map((s) => (
          <div key={s.label}>
            <b>{s.value}</b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function About() {
  return (
    <Section id="about" label="Overview" title="Recovering what was taken from the public">
      <div className="about">
        <div>
          {overview.map((p) => <p key={p}>{p}</p>)}
        </div>
        <div className="skills">
          <h3>Skills</h3>
          <ul>{skills.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      </div>
    </Section>
  )
}

function Services() {
  return (
    <Section id="services" label="Services" title="How I can help">
      <div className="cards">
        {services.map((s, i) => (
          <article key={s.title} className="card">
            <span className="num">0{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

function Career() {
  return (
    <Section id="career" label="Experience" title={career.org}>
      <p className="sub"><strong>{career.span}</strong>. {career.duty}</p>
      <ol className="timeline">
        {career.roles.map((r) => (
          <li key={r.title + r.dates}>
            <span className="dot" />
            <h3>{r.title}</h3>
            <p className="meta">{r.dates} · {r.place}</p>
            {r.note && <p>{r.note}</p>}
          </li>
        ))}
      </ol>
      <p className="earlier"><strong>Earlier:</strong> {career.earlier.title}, {career.earlier.dates}. {career.earlier.note}</p>
    </Section>
  )
}

function Education() {
  return (
    <Section id="education" label="Education and certification" title="Law, finance and management">
      <div className="edu">
        {education.map((e) => (
          <article key={e.school} className="edu-card">
            <div className="logo"><img src={e.logo} alt={`${e.school} logo`} loading="lazy" /></div>
            <div>
              <h3>{e.award}</h3>
              <p className="school">{e.school}</p>
              <p className="meta">{e.years}</p>
              {e.note && <p>{e.note}</p>}
            </div>
          </article>
        ))}
        <article className="edu-card cert">
          <div className="logo"><img src={certification.logo} alt={`${certification.issuer} logo`} loading="lazy" /></div>
          <div>
            <h3>{certification.title}</h3>
            <p className="school">{certification.issuer}</p>
            <p className="meta">Licence and certification</p>
          </div>
        </article>
      </div>
    </Section>
  )
}

function Training() {
  return (
    <Section id="training" label="Volunteering and training" title="Training the people who fight financial crime">
      <div className="cards two">
        {training.map((t) => (
          <article key={t.title} className="card">
            <img className="mini" src={t.logo} alt={`${t.org} logo`} loading="lazy" />
            <h3>{t.title}</h3>
            <p className="school">{t.org}</p>
            <p className="meta">{t.dates}</p>
            <p>{t.text}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

function Gallery() {
  const [active, setActive] = useState(null)
  useEffect(() => {
    if (active === null) return
    const k = (e) => { if (e.key === 'Escape') setActive(null) }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [active])
  return (
    <Section id="gallery" label="Gallery" title={gallery.heading}>
      <div className="gal">
        {gallery.items.map((g, i) => (
          <button key={g.src} className="tile" onClick={() => setActive(i)}>
            <img src={g.src} alt={g.alt} loading="lazy" style={{ objectPosition: g.pos }} />
            <span>{g.caption}</span>
          </button>
        ))}
      </div>
      {active !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setActive(null)}>
          <img src={gallery.items[active].src} alt={gallery.items[active].alt} />
          <p>{gallery.items[active].caption}</p>
          <button aria-label="Close" onClick={() => setActive(null)}>×</button>
        </div>
      )}
    </Section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const rows = [
    contact.email && ['Email', contact.email, `mailto:${contact.email}`],
    contact.phone && ['Phone', contact.phone, `tel:${contact.phone.replace(/\s/g, '')}`],
    contact.linkedin && ['LinkedIn', 'View profile', contact.linkedin],
    contact.location && ['Based in', contact.location, null],
  ].filter(Boolean)

  async function submit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    try {
      const r = await fetch(`https://formspree.io/f/${contact.formspree}`, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      if (r.ok) setSent(true)
    } catch { /* leave form visible */ }
  }

  return (
    <Section id="contact" label="Contact" title="Let's work together">
      <div className="contact">
        <ul className="clist">
          {rows.map(([k, v, href]) => (
            <li key={k}><span>{k}</span>{href ? <a href={href}>{v}</a> : <b>{v}</b>}</li>
          ))}
        </ul>
        {contact.formspree && (
          sent ? <p className="thanks">Thank you. Your message has been sent.</p> : (
            <form onSubmit={submit}>
              <input name="name" placeholder="Your name" required />
              <input name="email" type="email" placeholder="Your email" required />
              <textarea name="message" placeholder="How can I help?" rows="4" required />
              <button className="btn" type="submit">Send message</button>
            </form>
          )
        )}
      </div>
    </Section>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Career />
        <Education />
        <Training />
        <Gallery />
        <Contact />
      </main>
      <footer className="foot">
        <div className="wrap">
          <p>© {new Date().getFullYear()} {person.name}</p>
          <p>Built by SpenceTec and Logistics Limited</p>
        </div>
      </footer>
    </>
  )
}
