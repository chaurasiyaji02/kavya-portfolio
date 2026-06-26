import ResumeSection from './ResumeSection.jsx';
import { getContactItems, hasItems, hasText } from './resumeUtils.js';

export function ResumeHeader({ data, showPhoto = false, variant = 'default' }) {
  const { personal } = data;
  const contactItems = getContactItems(personal);
  const shouldShowPhoto = showPhoto && hasText(personal.photoUrl);

  return (
    <header className={`resume-header resume-header-${variant}`}>
      {shouldShowPhoto ? <img alt={personal.name} className="resume-photo" src={personal.photoUrl} /> : null}
      {!shouldShowPhoto && showPhoto ? <div className="resume-photo resume-photo-fallback">{personal.name.split(' ').map((part) => part[0]).join('')}</div> : null}
      <div>
        <h1 className="resume-name">{personal.name}</h1>
        <p className="resume-title">{personal.title}</p>
        {hasText(personal.summary) ? <p className="resume-summary">{personal.summary}</p> : null}
        {contactItems.length ? (
          <div className="resume-contact">
            {contactItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}

export function ResumeSkills({ skills }) {
  if (!hasItems(skills)) {
    return null;
  }

  return (
    <ResumeSection title="Skills">
      <div className="resume-skill-grid">
        {skills.map((group) => {
          if (!hasItems(group.items)) {
            return null;
          }

          return (
            <div className="resume-skill-group" key={group.category}>
              <strong>{group.category}</strong>
              <span>{group.items.join(', ')}</span>
            </div>
          );
        })}
      </div>
    </ResumeSection>
  );
}

export function ResumeExperience({ experience }) {
  if (!hasItems(experience)) {
    return null;
  }

  return (
    <ResumeSection title="Experience">
      <div className="resume-stack">
        {experience.map((item) => (
          <article className="resume-item" key={`${item.role}-${item.company}`}>
            <div className="resume-item-heading">
              <div>
                <h4>{item.role}</h4>
                <p>{item.company}{hasText(item.location) ? ` · ${item.location}` : ''}</p>
              </div>
              <span>{item.period}</span>
            </div>
            {hasItems(item.bullets) ? (
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </ResumeSection>
  );
}

export function ResumeProjects({ projects }) {
  if (!hasItems(projects)) {
    return null;
  }

  return (
    <ResumeSection title="Projects">
      <div className="resume-stack">
        {projects.map((project) => (
          <article className="resume-item" key={project.name}>
            <div className="resume-item-heading">
              <h4>{project.name}</h4>
            </div>
            {hasText(project.description) ? <p>{project.description}</p> : null}
            {hasItems(project.tech) ? <p className="resume-muted">{project.tech.join(' · ')}</p> : null}
            {hasItems(project.links) ? <p className="resume-muted">{project.links.join(' · ')}</p> : null}
          </article>
        ))}
      </div>
    </ResumeSection>
  );
}

export function ResumeEducation({ education }) {
  if (!hasItems(education)) {
    return null;
  }

  return (
    <ResumeSection title="Education">
      <div className="resume-stack">
        {education.map((item) => (
          <article className="resume-item" key={`${item.degree}-${item.institution}`}>
            <div className="resume-item-heading">
              <div>
                <h4>{item.degree}</h4>
                <p>{item.institution}{hasText(item.location) ? ` · ${item.location}` : ''}</p>
              </div>
              <span>{item.period}</span>
            </div>
            {hasItems(item.details) ? (
              <ul>
                {item.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </ResumeSection>
  );
}

export function ResumeCertifications({ certifications }) {
  if (!hasItems(certifications)) {
    return null;
  }

  return (
    <ResumeSection title="Certifications">
      <div className="resume-stack">
        {certifications.map((certification) => (
          <article className="resume-item resume-compact-item" key={`${certification.name}-${certification.issuer}`}>
            <div>
              <h4>{certification.name}</h4>
              <p>{certification.issuer}</p>
            </div>
            <span>{certification.year}</span>
          </article>
        ))}
      </div>
    </ResumeSection>
  );
}

export function ResumeAchievements({ achievements }) {
  if (!hasItems(achievements)) {
    return null;
  }

  return (
    <ResumeSection title="Achievements">
      <ul className="resume-simple-list">
        {achievements.map((achievement) => (
          <li key={achievement}>{achievement}</li>
        ))}
      </ul>
    </ResumeSection>
  );
}
