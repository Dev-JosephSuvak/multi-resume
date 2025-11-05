import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import Header from "./components/Header";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import "./App.css";

function App() {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const docRef = doc(db, "resume", "data");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setResumeData(docSnap.data());
        } else {
          throw new Error("Resume data not found in Firebase");
        }
      } catch (err) {
        console.error("Error fetching resume data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading resume...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Header personalInfo={resumeData.personalInfo} />
      <main className="main-content">
        <section id="about" className="section">
          <div className="container">
            <h2 className="section-title">About Me</h2>
            <p className="summary">{resumeData.personalInfo.summary}</p>
          </div>
        </section>

        <Skills skills={resumeData.skills} />
        <Projects projects={resumeData.projects} />
        <Experience experiences={resumeData.experiences} />
        <Education education={resumeData.education} />
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            &copy; 2025 {resumeData.personalInfo.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
