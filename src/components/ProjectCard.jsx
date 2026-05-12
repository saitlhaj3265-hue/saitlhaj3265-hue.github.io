import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ title, description, tech, link, index }) => {
  return (
    <div className="project-card reveal" style={{ animationDelay: `${index * 150}ms` }}>
      <div className="project-card__number">0{index + 1}</div>
      <div className="project-card__content">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">{description}</p>
        <div className="project-card__tech">
          {Array.isArray(tech)
            ? tech.map(t => <span key={t} className="tech-tag">{t}</span>)
            : tech.split(',').map(t => <span key={t} className="tech-tag">{t.trim()}</span>)
          }
        </div>
      </div>
      <a href={link} target="_blank" rel="noreferrer" className="project-card__link">
        <span>Voir le projet</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  );
};

export default ProjectCard;