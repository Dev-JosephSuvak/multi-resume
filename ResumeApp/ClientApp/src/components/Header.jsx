import React, { useEffect } from "react";

function Header({ personalInfo, onRequestServices }) {
  useEffect(() => {
    const fontAwesomeLink = document.createElement("link");
    fontAwesomeLink.rel = "stylesheet";
    fontAwesomeLink.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    document.head.appendChild(fontAwesomeLink);

    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      if (window.Calendly && personalInfo.calendly) {
        window.Calendly.initBadgeWidget({
          url: personalInfo.calendly,
          text: "Schedule Call or Interview",
          color: "#0069ff",
          textColor: "#ffffff",
          branding: true,
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(fontAwesomeLink);
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, [personalInfo.calendly]);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="profile-picture-wrapper">
            <img
              src="/profile.jpeg"
              alt={personalInfo.name}
              className="profile-picture"
            />
          </div>
          <div className="header-info">
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
              <a
                href="/resume.pdf"
                download="Joseph_Suvak_Resume.pdf"
                className="social-link"
                title="Download Resume"
              >
                <i className="fas fa-file-pdf"></i>
                <span className="link-text">Download Resume</span>
              </a>
              {personalInfo.linkedIn && (
                <a
                  href={`https://${personalInfo.linkedIn}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link social-link-linkedin"
                  title="LinkedIn"
                >
                  <i className="fab fa-linkedin"></i>
                  <span className="link-text">LinkedIn</span>
                </a>
              )}
              {personalInfo.gitHub && (
                <a
                  href={`https://${personalInfo.gitHub}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link social-link-github"
                  title="GitHub"
                >
                  <i className="fab fa-github"></i>
                  <span className="link-text">GitHub</span>
                </a>
              )}
              <button
                onClick={onRequestServices}
                className="social-link"
                title="Request Services"
              >
                <i className="fas fa-briefcase"></i>
                <span className="link-text">Request Services</span>
              </button>
              {personalInfo.calendly && (
                <button
                  onClick={() =>
                    window.Calendly &&
                    window.Calendly.initPopupWidget({
                      url: personalInfo.calendly,
                    })
                  }
                  className="social-link calendly-button"
                  title="Schedule Interview"
                >
                  <i className="fas fa-calendar-alt"></i>
                  <span className="link-text">Schedule Interview</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
