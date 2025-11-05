import React, { useEffect } from "react";

function Header({ personalInfo }) {
  useEffect(() => {
    // Load Calendly widget CSS
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Load Calendly widget script
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
      // Cleanup
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, [personalInfo.calendly]);

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
            {personalInfo.calendly && (
              <button
                onClick={() =>
                  window.Calendly &&
                  window.Calendly.initPopupWidget({
                    url: personalInfo.calendly,
                  })
                }
                className="social-link calendly-button"
              >
                📅 Schedule Interview
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
