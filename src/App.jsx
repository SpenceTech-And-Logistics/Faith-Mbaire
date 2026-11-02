import { Fragment, useEffect, useState } from 'react'
import {
  person, contact, services, overview, stats, career, education,
  certification, training, skills, gallery,
} from './content.js'
import { useActiveSection, useCountUp, useReveal, useScrollMotion } from './motion.js'

const NAV = [
  ['about', 'About'],
  ['services', 'Services'],
  ['career', 'Career'],
  ['education', 'Education'],
  ['training', 'Training'],
  ['gallery', 'Gallery'],
  ['contact', 'Contact'],
]

const NAV_IDS = NAV.map(([id]) => id)

// Stagger delay for a [data-reveal] item.
const delay = (i, step = 0.08, max = 0.6) => ({ '--d': `${Math.min(i * step, max).toFixed(2)}s` })

function Section({ id, label, title, children }) {
  return (
    <section id={id} className="section">
      <div className="wrap">
        <p className="label" data-reveal="fade">{label}</p>
        <h2 data-reveal="lift">{title}</h2>
        {children}
      </div>
    </section>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(NAV_IDS)
  return (
    <header className="top">
      <div className="wrap top-in">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>{person.name}</a>
        <button className="burger" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
        <nav className={open ? 'open' : ''}>
          {NAV.map(([id, t]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'on' : undefined} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{t}</a>
          ))}
        </nav>
      </div>
      <span className="progress" aria-hidden="true" />
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="wrap hero-in">
        <div className="hero-text">
          <p className="label gold">{person.eyebrow}</p>
          <h1>
            {person.name.split(' ').map((word, i) => (
              <Fragment key={word}>
                <span className="word"><span style={{ '--d': `${0.2 + i * 0.14}s` }}>{word}</span></span>{' '}
              </Fragment>
            ))}
          </h1>
          <ul className="focus">
            {person.focus.map((f, i) => <li key={f} style={{ '--d': `${0.7 + i * 0.1}s` }}>{f}</li>)}
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
      <a className="cue" href="#about" aria-label="Scroll to overview"><span /></a>
    </section>
  )
}

function Stat({ value, label, index }) {
  const { ref, text } = useCountUp(value)
  return (
    <div data-reveal="rise" style={delay(index, 0.14)}>
      <b ref={ref}><span aria-hidden="true">{text}</span><span className="sr">{value}</span></b>
      <span>{label}</span>
    </div>
  )
}

function Stats() {
  return (
    <div className="stats">
      <div className="wrap stats-in">
        {stats.map((s, i) => <Stat key={s.label} value={s.value} label={s.label} index={i} />)}
      </div>
    </div>
  )
}

function Ticker() {
  const line = [...person.focus, ...person.focus, ...person.focus]
  const group = (key) => (
    <div className="ticker-group" key={key}>
      {line.map((f, i) => <span key={i}>{f}</span>)}
    </div>
  )
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">{[group('a'), group('b')]}</div>
    </div>
  )
}

function About() {
  return (
    <Section id="about" label="Professional profile" title="Law, governance and public accountability">
      <div className="about">
        <div>
          {overview.map((p, i) => <p key={p} data-reveal="rise" style={delay(i)}>{p}</p>)}
        </div>
        <div className="skills">
          <h3 data-reveal="fade">Skills</h3>
          <ul>{skills.map((s, i) => <li key={s} data-reveal="pop" style={delay(i, 0.035)}>{s}</li>)}</ul>
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
          <article key={s.title} className="card" data-reveal="rise" style={delay(i, 0.11)}>
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
      <p className="sub" data-reveal="rise"><strong>{career.span}</strong>. {career.duty}</p>
      <ol className="timeline">
        {career.roles.map((r) => (
          <li key={r.title + r.dates} data-reveal="slide">
            <span className="dot" />
            <h3>{r.title}</h3>
            <p className="meta">{r.dates} · {r.place}</p>
            {r.note && <p>{r.note}</p>}
          </li>
        ))}
      </ol>
      <p className="earlier" data-reveal="fade"><strong>Earlier:</strong> {career.earlier.title}, {career.earlier.dates}. {career.earlier.note}</p>
    </Section>
  )
}

function Education() {
  return (
    <Section id="education" label="Education and certification" title="Law, finance and management">
      <div className="edu">
        {education.map((e, i) => (
          <article key={e.school} className="edu-card" data-reveal="rise" style={delay(i % 2, 0.12)}>
            <div className="logo"><img src={e.logo} alt={`${e.school} logo`} loading="lazy" /></div>
            <div>
              <h3>{e.award}</h3>
              <p className="school">{e.school}</p>
              <p className="meta">{e.years}</p>
              {e.note && <p>{e.note}</p>}
            </div>
          </article>
        ))}
        <article className="edu-card cert" data-reveal="rise">
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
        {training.map((t, i) => (
          <article key={t.title} className="card" data-reveal="rise" style={delay(i, 0.14)}>
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
  const [closing, setClosing] = useState(false)
  useEffect(() => {
    if (active === null) return
    const k = (e) => { if (e.key === 'Escape') setClosing(true) }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [active])
  useEffect(() => {
    if (!closing) return
    const t = setTimeout(() => { setActive(null); setClosing(false) }, 240)
    return () => clearTimeout(t)
  }, [closing])
  return (
    <Section id="gallery" label="Gallery" title={gallery.heading}>
      <div className="gal">
        {gallery.items.map((g, i) => (
          <button key={g.src} className="tile" data-reveal="wipe" style={delay(i % 3, 0.13)} onClick={() => setActive(i)}>
            <img src={g.src} alt={g.alt} loading="lazy" style={{ objectPosition: g.pos }} />
            <span>{g.caption}</span>
          </button>
        ))}
      </div>
      {active !== null && (
        <div className={closing ? 'lightbox closing' : 'lightbox'} role="dialog" aria-modal="true" onClick={() => setClosing(true)}>
          <img src={gallery.items[active].src} alt={gallery.items[active].alt} />
          <p>{gallery.items[active].caption}</p>
          <button aria-label="Close" onClick={() => setClosing(true)}>×</button>
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
          {rows.map(([k, v, href], i) => (
            <li key={k} data-reveal="rise" style={delay(i)}><span>{k}</span>{href ? <a href={href}>{v}</a> : <b>{v}</b>}</li>
          ))}
        </ul>
        {contact.formspree && (
          sent ? <p className="thanks">Thank you. Your message has been sent.</p> : (
            <form onSubmit={submit} data-reveal="rise">
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
  useReveal()
  useScrollMotion()
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Ticker />
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
