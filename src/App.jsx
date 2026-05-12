import { useEffect, useState, useRef } from 'react'
import ProjectCard from './components/ProjectCard'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState('')
  const [educationOpen, setEducationOpen] = useState(false)
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)

  useEffect(() => {
    // Custom cursor
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = e.clientX + 'px'
        cursorDotRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', moveCursor)

    // Scroll spy
    const sections = document.querySelectorAll('section[id], header[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach(s => observer.observe(s))

    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal')
    const revealObs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    reveals.forEach(r => revealObs.observe(r))

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      observer.disconnect()
      revealObs.disconnect()
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.email.includes('@')) {
      setFormStatus('error')
      return
    }
    setFormStatus('success')
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setFormStatus(''), 3000)
  }

  const navLinks = ['about', 'skills', 'education', 'projects', 'contact']

  return (
    <div className="portfolio">
      {/* Custom cursor */}
      <div className="cursor-ring" ref={cursorRef}></div>
      <div className="cursor-dot" ref={cursorDotRef}></div>

      {/* Navigation */}
      <nav className={`nav ${menuOpen ? 'nav--open' : ''}`}>
        <div className="nav__logo">SAL<span>.</span></div>
        <button className="nav__toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
        <ul className="nav__links">
          {navLinks.map(link => (
            <li key={link}>
              <a
                href={`#${link}`}
                className={activeSection === link ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero */}
      <header id="home" className="hero">
        <div className="hero__noise"></div>
        <div className="hero__content">
          <p className="hero__tag reveal">Disponible pour stages & projets</p>
          <h1 className="hero__name reveal">
            SalahEddine<br /><em>Ait Lhaj</em>
          </h1>
          <p className="hero__role reveal">Étudiant L2 Informatique · Développeur Web & C++</p>
          <div className="hero__links reveal">
            <a href="mailto:s.aitlhaj3265@uca.ac.ma" className="btn btn--outline">Email</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn btn--ghost">LinkedIn</a>
            <a href="https://github.com/saitlhaj3265-hue" target="_blank" rel="noreferrer" className="btn btn--ghost">GitHub</a>
          </div>
        </div>
        <div className="hero__scroll">
          <span>Scroll</span>
          <div className="hero__scroll-line"></div>
        </div>
      </header>

      {/* About */}
      <section id="about" className="section">
        <div className="section__inner">
          <div className="section__label reveal">01 — À propos</div>
          <div className="about__grid">
            <h2 className="about__heading reveal">
              Construire des choses<br /><em>qui ont du sens.</em>
            </h2>
            <div className="about__body reveal">
              <p>
                Je suis un étudiant passionné par le développement logiciel et les technologies Web.
                Mon parcours universitaire m'a permis d'acquérir des bases solides en algorithmique
                et en architecture des ordinateurs.
              </p>
              <p>
                Mon objectif est de devenir ingénieur logiciel — créer des systèmes robustes,
                élégants, et utiles.
              </p>
              <div className="about__stats">
                <div className="stat"><span>2+</span><p>ans de code</p></div>
                <div className="stat"><span>4+</span><p>projets</p></div>
                <div className="stat"><span>L2</span><p>informatique</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section section--dark">
        <div className="section__inner">
          <div className="section__label reveal">02 — Compétences</div>
          <h2 className="section__title reveal">Stack technique</h2>
          <div className="skills__grid">
            {[
              { name: 'C++ / SFML', level: 90, tag: 'Système' },
              { name: 'React & Web', level: 75, tag: 'Frontend' },
              { name: 'HTML / CSS', level: 85, tag: 'Frontend' },
              { name: 'JavaScript', level: 70, tag: 'Frontend' },
              { name: 'MySQl', level: 60, tag: 'CS' },
              { name: 'Assembleur x86', level: 60, tag: 'Bas niveau' },
            ].map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="section">
        <div className="section__inner">
          <div className="section__label reveal">03 — Formation</div>
          <h2 className="section__title reveal">Parcours académique</h2>
          <div className="timeline reveal">
            <div
              className={`timeline__item ${educationOpen ? 'open' : ''}`}
              onClick={() => setEducationOpen(!educationOpen)}
            >
              <div className="timeline__header">
                <div>
                  <h3>Licence en Informatique</h3>
                  <span className="timeline__date">2025 — En cours</span>
                </div>
                <div className="timeline__toggle">{educationOpen ? '−' : '+'}</div>
              </div>
              <div className="timeline__details">
                <p><strong>Université · Faculté des Sciences</strong></p>
                <p>Programmation Web, UML, Assembleur x86, Algorithmique avancée, Architecture des ordinateurs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section section--dark">
        <div className="section__inner">
          <div className="section__label reveal">04 — Projets</div>
          <h2 className="section__title reveal">Réalisations significatives</h2>
          <div className="project-grid">
            <ProjectCard
              title="Bike Project"
              description="Jeu de simulation développé en C++ avec la bibliothèque SFML 3. Architecture orientée objet, gestion de physique et rendu graphique temps réel."
              tech={['C++', 'SFML 3', 'GDB', 'OOP']}
              link="#"
              index={0}
            />
            <ProjectCard
              title="MonCampusDocs"
              description="Plateforme collaborative pour le partage de documents entre étudiants. Interface réactive avec gestion d'état React et composants modulaires."
              tech={['HTML', 'CSS', 'JavaScript', 'React']}
              link="#"
              index={1}
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section">
        <div className="section__inner">
          <div className="section__label reveal">05 — Contact</div>
          <div className="contact__grid">
            <div className="contact__left reveal">
              <h2>Travaillons<br /><em>ensemble.</em></h2>
              <p>Un projet, un stage, une collaboration ? Je suis disponible.</p>
              <a href="mailto:s.aitlhaj3265@uca.ac.ma" className="contact__email">s.aitlhaj3265@uca.ac.ma</a>
            </div>
            <form className="contact__form reveal" onSubmit={handleSubmit}>
              <div className="form__group">
                <input
                  type="text"
                  placeholder="Nom complet"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form__group">
                <input
                  type="email"
                  placeholder="Votre email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form__group">
                <textarea
                  placeholder="Votre message"
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn--filled">
                Envoyer le message →
              </button>
              {formStatus === 'success' && <p className="form__status form__status--ok">✓ Message envoyé !</p>}
              {formStatus === 'error' && <p className="form__status form__status--err">✗ Email invalide.</p>}
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 SalahEddine Ait Lhaj · Développeur</p>
      </footer>
    </div>
  )
}

function SkillBar({ skill, delay }) {
  const [animated, setAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="skill-bar reveal" ref={ref}>
      <div className="skill-bar__top">
        <span className="skill-bar__name">{skill.name}</span>
        <span className="skill-bar__tag">{skill.tag}</span>
        <span className="skill-bar__pct">{skill.level}%</span>
      </div>
      <div className="skill-bar__track">
        <div
          className="skill-bar__fill"
          style={{
            width: animated ? `${skill.level}%` : '0%',
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  )
}

export default App