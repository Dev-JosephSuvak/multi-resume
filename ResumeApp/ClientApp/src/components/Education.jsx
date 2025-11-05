import React from "react";

function Education({ education }) {
  return (
    <section id="education" className="section education-section">
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="education-list">
          {education.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="education-header">
                <div>
                  <h3 className="education-degree">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="education-institution">{edu.institution}</p>
                </div>
                <div className="education-meta">
                  <p className="education-duration">{edu.duration}</p>
                  {edu.gpa && <p className="education-gpa">GPA: {edu.gpa}</p>}
                </div>
              </div>

              {edu.highlights && edu.highlights.length > 0 && (
                <ul className="education-highlights">
                  {edu.highlights.map((highlight, highlightIndex) => (
                    <li key={highlightIndex}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
