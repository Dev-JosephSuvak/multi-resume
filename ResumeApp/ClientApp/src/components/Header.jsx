import React from "react";

function Header({ personalInfo }) {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="name">{personalInfo.name}</h1>
          <p className="title">{personalInfo.title}</p>
          <div className="contact-info">
            <a href={`mailto:${personalInfo.email}`} className="contact-link">
              <span className="icon">✉</span> {personalInfo.email}
            </a>
            <span className="contact-item">
              <span className="icon">📱</span> {personalInfo.phone}
            </span>
            <span className="contact-item">
              <span className="icon">📍</span> {personalInfo.location}
            </span>
          </div>
          <div className="social-links">
            {personalInfo.linkedIn && (
              <a
                href={`https://${personalInfo.linkedIn}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                LinkedIn
              </a>
            )}
            {personalInfo.gitHub && (
              <a
                href={`https://${personalInfo.gitHub}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
