import { useEffect, useState, useRef } from 'react'
import $ from 'jquery'
import ProjectCard from './components/ProjectCard'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState('')
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)

  useEffect(() => {
    // ── jQuery : Animation des barres de compétences au scroll ──
    const animateSkills = () => {
      $('.skill-bar__fill').each(function () {
        const target = $(this).data('level')
        const top = $(this).offset().top
        const windowBottom = $(window).scrollTop() + $(window).height()
        if (windowBottom > top + 40 && !$(this).hasClass('animated')) {
          $(this).addClass('animated').animate({ width: target + '%' }, 1200)
        }
      })
    }
    $(window).on('scroll.skills', animateSkills)
    setTimeout(animateSkills, 400)

    // ── jQuery : Effet de survol sur les skill-bars ──
    $(document).on('mouseenter', '.skill-bar', function () {
      $(this).find('.skill-bar__fill').css('filter', 'brightness(1.35)')
    })
    $(document).on('mouseleave', '.skill-bar', function () {
      $(this).find('.skill-bar__fill').css('filter', 'brightness(1)')
    })

    // ── jQuery : Accordéon Formation (slideToggle) ──
    $(document).on('click', '.timeline__item', function () {
      const details = $(this).find('.timeline__details')
      const toggle = $(this).find('.timeline__toggle')
      const isOpen = $(this).hasClass('open')
      // Fermer tous les autres
      $('.timeline__item').not(this).removeClass('open')
        .find('.timeline__details').slideUp(300)
      $('.timeline__item').not(this).find('.timeline__toggle').text('+')
      // Ouvrir / fermer celui-ci
      if (isOpen) {
        $(this).removeClass('open')
        details.slideUp(300)
        toggle.text('+')
      } else {
        $(this).addClass('open')
        details.slideDown(300)
        toggle.text('−')
      }
    })

    // ── jQuery : Validation du formulaire de contact ──
    $(document).on('submit', '#contactForm', function (e) {
      e.preventDefault()
      const name = $('#field-name').val().trim()
      const email = $('#field-email').val().trim()
      const message = $('#field-message').val().trim()
      let valid = true
      $('.form__group').removeClass('form__group--error')
      if (!name) { $('#field-name').closest('.form__group').addClass('form__group--error'); valid = false }
      if (!email || !email.includes('@') || !email.includes('.')) {
        $('#field-email').closest('.form__group').addClass('form__group--error'); valid = false
      }
      if (!message) { $('#field-message').closest('.form__group').addClass('form__group--error'); valid = false }
      if (valid) {
        setFormStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setFormStatus(''), 3500)
      } else {
        setFormStatus('error')
      }
    })

    // ── Custom cursor ──
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

    // ── Scroll-spy ──
    const sections = document.querySelectorAll('section[id], header[id]')
    const spyObs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }),
      { threshold: 0.35 }
    )
    sections.forEach(s => spyObs.observe(s))

    // ── Reveal on scroll ──
    const reveals = document.querySelectorAll('.reveal')
    const revealObs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    reveals.forEach(r => revealObs.observe(r))

    return () => {
      $(window).off('scroll.skills')
      $(document).off('mouseenter mouseleave', '.skill-bar')
      $(document).off('click', '.timeline__item')
      $(document).off('submit', '#contactForm')
      window.removeEventListener('mousemove', moveCursor)
      spyObs.disconnect()
      revealObs.disconnect()
    }
  }, [])

  const navLinks = ['about', 'skills', 'education', 'projects', 'contact']

  const skills = [
    { name: 'C++ / SFML', level: 90, tag: 'Système' },
    { name: 'HTML / CSS', level: 85, tag: 'Frontend' },
    { name: 'React & Web', level: 75, tag: 'Frontend' },
    { name: 'JavaScript', level: 70, tag: 'Frontend' },
    { name: 'MySQL', level: 60, tag: 'Base de données' },
    { name: 'Assembleur x86', level: 60, tag: 'Bas niveau' },
  ]

  return (
    <div className="portfolio">
      <div className="cursor-ring" ref={cursorRef}></div>
      <div className="cursor-dot" ref={cursorDotRef}></div>

      {/* ── Navigation ── */}
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

      {/* ── 3.1 En-tête ── */}
      <header id="home" className="hero">
        <div className="hero__noise"></div>
        <div className="hero__content">
          {/* Photo de profil — placeholder SVG */}
          <div className="hero__avatar reveal">
            <div className="avatar__placeholder">
              <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="30" r="18" fill="currentColor" opacity=".5"/>
                <ellipse cx="40" cy="74" rx="28" ry="18" fill="currentColor" opacity=".35"/>
              </svg>
            </div>
          </div>
          <p className="hero__tag reveal">
            <span className="hero__tag-dot"></span>
            Disponible pour stages &amp; projets
          </p>
          <h1 className="hero__name reveal">
            SalahEddine<br /><em>Ait Lhaj</em>
          </h1>
          <p className="hero__role reveal">Étudiant L2 Informatique · Développeur Web &amp; C++</p>
          <div className="hero__links reveal">
            <a href="mailto:s.aitlhaj3265@uca.ac.ma" className="btn btn--outline">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
              Email
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn btn--ghost">LinkedIn</a>
            <a href="https://github.com/saitlhaj3265-hue" target="_blank" rel="noreferrer" className="btn btn--ghost">GitHub</a>
          </div>
        </div>
        <div className="hero__scroll">
          <span>Scroll</span>
          <div className="hero__scroll-line"></div>
        </div>
      </header>

      {/* ── 3.2 À propos ── */}
      <section id="about" className="section">
        <div className="section__inner">
          <div className="section__label reveal">01 — À propos</div>
          <div className="about__grid">
            <h2 className="about__heading reveal">
              Construire des choses<br /><em>qui ont du sens.</em>
            </h2>
            <div className="about__body reveal">
              <p>
                Je suis <strong>SalahEddine Ait Lhaj</strong>, étudiant en Licence L2 Informatique,
                passionné par le développement logiciel et les technologies Web.
                Mon parcours universitaire m'a permis d'acquérir des bases solides en algorithmique,
                architecture des ordinateurs et programmation orientée objet.
              </p>
              <p>
                J'aime concevoir des interfaces soignées, résoudre des problèmes complexes
                avec du code propre, et apprendre continuellement. Mon objectif est de devenir
                ingénieur logiciel — créer des systèmes robustes, élégants et utiles.
              </p>
              <p>
                En dehors du code, je m'intéresse à l'architecture des systèmes, aux mathématiques
                appliquées et aux jeux vidéo — une passion qui m'a conduit à développer Bike Project.
              </p>
              <div className="about__stats">
                <div className="stat"><span>2+</span><p>ans de code</p></div>
                <div className="stat"><span>3+</span><p>projets</p></div>
                <div className="stat"><span>L2</span><p>informatique</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3.3 Compétences — jQuery anime les barres ── */}
      <section id="skills" className="section section--dark">
        <div className="section__inner">
          <div className="section__label reveal">02 — Compétences</div>
          <h2 className="section__title reveal">Stack technique</h2>
          <div className="skills__grid">
            {skills.map((skill) => (
              <div className="skill-bar reveal" key={skill.name}>
                <div className="skill-bar__top">
                  <span className="skill-bar__name">{skill.name}</span>
                  <span className="skill-bar__tag">{skill.tag}</span>
                  <span className="skill-bar__pct">{skill.level}%</span>
                </div>
                <div className="skill-bar__track">
                  <div
                    className="skill-bar__fill"
                    data-level={skill.level}
                    style={{ width: '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="skills__tags reveal">
            <h3>Outils &amp; soft skills</h3>
            <div className="tags">
              {['Git / GitHub', 'VS Code', 'GDB', 'Linux', 'UML',
                'Travail d\'équipe', 'Résolution de problèmes', 'Autonomie'].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3.4 Formation — jQuery accordéon ── */}
      <section id="education" className="section">
        <div className="section__inner">
          <div className="section__label reveal">03 — Formation</div>
          <h2 className="section__title reveal">Parcours académique</h2>
          <div className="timeline reveal">
            {[
              {
                title: 'Licence Informatique — L2 (En cours)',
                date: '2024 — Présent',
                lieu: 'Université Cadi Ayyad · Faculté des Sciences',
                detail: 'Programmation Web (HTML, CSS, JS, React, jQuery), UML, Assembleur x86, Algorithmique avancée, Architecture des ordinateurs, Bases de données MySQL.',
              },
              {
                title: 'Licence Informatique — L1',
                date: '2023 — 2024',
                lieu: 'Université Cadi Ayyad · Faculté des Sciences',
                detail: 'Algorithmique & structures de données, Langage C, Mathématiques discrètes, Systèmes d\'exploitation, Introduction à la POO.',
              },
              {
                title: 'Baccalauréat Sciences Mathématiques',
                date: '2023',
                lieu: 'Lycée — Maroc',
                detail: 'Mention bien — Option Sciences Mathématiques A.',
              },
            ].map((item) => (
              <div className="timeline__item" key={item.title}>
                <div className="timeline__header">
                  <div>
                    <h3>{item.title}</h3>
                    <span className="timeline__date">{item.date}</span>
                  </div>
                  <div className="timeline__toggle">+</div>
                </div>
                {/* display:none — jQuery slideDown/Up */}
                <div className="timeline__details" style={{ display: 'none' }}>
                  <p><strong>{item.lieu}</strong></p>
                  <p>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3.5 Projets — composants React <ProjectCard /> ── */}
      <section id="projects" className="section section--dark">
        <div className="section__inner">
          <div className="section__label reveal">04 — Projets</div>
          <h2 className="section__title reveal">Réalisations significatives</h2>
          <div className="project-grid">
            <ProjectCard
              title="Bike Project"
              description="Jeu de simulation développé en C++ avec SFML 3. Architecture orientée objet, physique 2D et rendu graphique temps réel. Debugging avec GDB."
              tech={['C++', 'SFML 3', 'GDB', 'OOP']}
              link="https://github.com/saitlhaj3265-hue"
              index={0}
            />
            <ProjectCard
              title="MonCampusDocs"
              description="Plateforme collaborative pour le partage de documents entre étudiants. Interface réactive avec React, composants modulaires et design responsive."
              tech={['HTML', 'CSS', 'JavaScript', 'React']}
              link="https://github.com/saitlhaj3265-hue"
              index={1}
            />
            <ProjectCard
              title="CV Personnel Interactif"
              description="Ce portfolio en ligne — React + jQuery + Vite. Animations au scroll, accordéon interactif, validation formulaire, déployé sur GitHub Pages."
              tech={['React', 'jQuery', 'CSS3', 'Vite']}
              link="https://saitlhaj3265-hue.github.io"
              index={2}
            />
          </div>
        </div>
      </section>

      {/* ── 3.6 Contact — jQuery validation ── */}
      <section id="contact" className="section">
        <div className="section__inner">
          <div className="section__label reveal">05 — Contact</div>
          <div className="contact__grid">
            <div className="contact__left reveal">
              <h2>Travaillons<br /><em>ensemble.</em></h2>
              <p>Un projet, un stage, une collaboration ?<br />Je suis disponible.</p>
              <a href="mailto:s.aitlhaj3265@uca.ac.ma" className="contact__email">
                s.aitlhaj3265@uca.ac.ma
              </a>
            </div>
            {/* id="contactForm" — validé par jQuery */}
            <form id="contactForm" className="contact__form reveal">
              <div className="form__group">
                <label htmlFor="field-name">Nom complet</label>
                <input
                  id="field-name"
                  type="text"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
                <span className="form__error">Ce champ est requis.</span>
              </div>
              <div className="form__group">
                <label htmlFor="field-email">Email</label>
                <input
                  id="field-email"
                  type="text"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
                <span className="form__error">Format email invalide.</span>
              </div>
              <div className="form__group">
                <label htmlFor="field-message">Message</label>
                <textarea
                  id="field-message"
                  placeholder="Votre message..."
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
                <span className="form__error">Veuillez écrire un message.</span>
              </div>
              <button type="submit" className="btn btn--filled">
                Envoyer le message →
              </button>
              {formStatus === 'success' && (
                <p className="form__status form__status--ok">✓ Message envoyé avec succès !</p>
              )}
              {formStatus === 'error' && (
                <p className="form__status form__status--err">✗ Veuillez corriger les champs en rouge.</p>
              )}
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 SalahEddine Ait Lhaj · Étudiant L2 Informatique</p>
        <p className="footer__stack">React · jQuery · Vite · GitHub Pages</p>
      </footer>
    </div>
  )
}

export default App