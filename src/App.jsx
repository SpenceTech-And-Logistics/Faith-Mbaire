import { Fragment, useState } from 'react'
import {
  person, contact, services, overview, stats, career, education,
  certification, training, professionalTraining, affiliations, highlights, skills,
} from './content.js'
import { useActiveSection, useCountUp, useReveal, useScrollMotion } from './motion.js'

const NAV = [
  ['about', 'About'],
  ['services', 'Services'],
  ['career', 'Career'],
  ['highlights', 'Highlights'],
  ['education', 'Education'],
  ['training', 'Training'],
  ['affiliations', 'Affiliations'],
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
          <p className="label gold">{person.credentials.map((c) => <span key={c}>{c}</span>)}</p>
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
          <img src={person.photo} alt={`${person.plainName} seated at a conference table with a microphone`} />
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
    <Section id="services" label="Services" title="Areas of practice">
      <div className="cards three">
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
            <p className="meta">{r.place ? `${r.dates} · ${r.place}` : r.dates}</p>
            {r.note && <p>{r.note}</p>}
          </li>
        ))}
      </ol>
      <div className="earlier" data-reveal="fade">
        <h3>Earlier career</h3>
        <ul>
          {career.earlier.map((e) => (
            <li key={e.title}><b>{e.title}</b>, {e.org}<span className="meta">{e.dates}</span>{e.note && <span className="note">{e.note}</span>}</li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

function Highlights() {
  return (
    <Section id="highlights" label="Career highlights" title="Milestones in public service">
      <div className="award" data-reveal="rise">
        <span aria-hidden="true">OGW</span>
        <div>
          <h3>{highlights.award.title}</h3>
          <p>{highlights.award.text}</p>
        </div>
      </div>
      <ul className="hl">
        {highlights.items.map((h, i) => (
          <li key={h.title} data-reveal="rise" style={delay(i % 3, 0.11)}>
            <h3>{h.title}</h3>
            <p>{h.text}</p>
          </li>
        ))}
      </ul>
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
      <div className="courses">
        <h3 data-reveal="fade">Professional training</h3>
        <ul>
          {professionalTraining.map((t) => (
            <li key={t.course} data-reveal="rise">
              <span className="yr">{t.year}</span>
              <div><b>{t.course}</b><p>{t.provider}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

function Affiliations() {
  return (
    <Section id="affiliations" label="Affiliations" title="Professional memberships">
      <ul className="aff">
        {affiliations.map((f, i) => (
          <li key={f.name} data-reveal="rise" style={delay(i % 2, 0.12)}>
            <h3>{f.name}</h3>
            <p className="meta">{f.role}</p>
            {f.note && <p>{f.note}</p>}
          </li>
        ))}
      </ul>
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
        <Highlights />
        <Education />
        <Training />
        <Affiliations />
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
