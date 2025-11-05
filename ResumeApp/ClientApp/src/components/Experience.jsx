import React from "react";

function Experience({ experiences }) {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div className="experience-list">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <div>
                  <h3 className="experience-position">{exp.position}</h3>
                  <p className="experience-company">{exp.company}</p>
                </div>
                <div className="experience-meta">
                  <p className="experience-duration">{exp.duration}</p>
                  <p className="experience-location">{exp.location}</p>
                </div>
              </div>

              <ul className="experience-responsibilities">
                {exp.responsibilities.map((resp, respIndex) => (
                  <li key={respIndex}>{resp}</li>
                ))}
              </ul>

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="experience-technologies">
                  <strong>Technologies:</strong>
                  {exp.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {exp.gitHubLink && (
                <div className="experience-github">
                  <a
                    href={exp.gitHubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                  >
                    View on GitHub →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
