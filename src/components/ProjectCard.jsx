import React from 'react'
import './ProjectCard.css'

/**
 * Composant React réutilisable <ProjectCard />
 * Props : title, description, tech (array), link, index
 */
const ProjectCard = ({ title, description, tech = [], link, index = 0 }) => {
  return (
    <div className="project-card reveal" style={{ transitionDelay: `${index * 120}ms` }}>
      <div className="project-card__number">0{index + 1}</div>
      <div className="project-card__content">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">{description}</p>
        <div className="project-card__tech">
          {tech.map(t => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
      </div>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="project-card__link"
      >
        <span>Voir le projet</span>
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  )
}

export default ProjectCard