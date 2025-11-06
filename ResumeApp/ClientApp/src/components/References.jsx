import React, { useState, useEffect } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function References({ useApi = false, onWriteReference }) {
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState("next");

  useEffect(() => {
    fetchReferences();
  }, [useApi]);

  // Auto-advance carousel every 8 seconds
  useEffect(() => {
    if (references.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setDirection("next");
      setCurrentIndex((prev) => (prev + 1) % references.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [references.length, isPaused]);

  const fetchViaApi = async () => {
    const response = await fetch("/api/reference");
    if (!response.ok) {
      throw new Error("Failed to fetch references");
    }
    return await response.json();
  };

  const fetchViaFirebase = async () => {
    try {
      // First try with orderBy (requires composite index)
      const q = query(
        collection(db, "references"),
        where("approved", "==", true),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Firestore query error (trying simple query):", error);
      // Fallback: try without orderBy
      const q = query(
        collection(db, "references"),
        where("approved", "==", true)
      );
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Sort client-side
      return docs.sort((a, b) => {
        const aTime = a.createdAt?.toDate?.() || new Date(0);
        const bTime = b.createdAt?.toDate?.() || new Date(0);
        return bTime - aTime;
      });
    }
  };

  const fetchReferences = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching references, useApi:", useApi);
      const data = useApi ? await fetchViaApi() : await fetchViaFirebase();
      console.log("Fetched references:", data);
      
      // Sort: Managers first, then by date
      const sortedData = data.sort((a, b) => {
        // Priority order: manager > direct-report > colleague > client > mentor > other
        const relationshipPriority = {
          'manager': 1,
          'direct-report': 2,
          'colleague': 3,
          'client': 4,
          'mentor': 5,
          'other': 6
        };
        
        const aPriority = relationshipPriority[a.relationship?.toLowerCase()] || 99;
        const bPriority = relationshipPriority[b.relationship?.toLowerCase()] || 99;
        
        if (aPriority !== bPriority) {
          return aPriority - bPriority;
        }
        
        // If same relationship, sort by date (newest first)
        const aTime = a.createdAt?.toDate?.() || new Date(a.createdAt) || new Date(0);
        const bTime = b.createdAt?.toDate?.() || new Date(b.createdAt) || new Date(0);
        return bTime - aTime;
      });
      
      setReferences(sortedData);
    } catch (err) {
      console.error("Error fetching references:", err);
      setError(`Failed to load references: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const nextReference = () => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % references.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1000); // Resume auto-advance after 1 second
  };

  const previousReference = () => {
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + references.length) % references.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1000);
  };

  const goToReference = (index) => {
    setDirection(index > currentIndex ? "next" : "prev");
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1000);
  };

  if (loading) {
    return (
      <section className="section references-section">
        <div className="container">
          <h2 className="section-title">References</h2>
          <p className="loading-text">Loading references...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section references-section">
        <div className="container">
          <h2 className="section-title">References</h2>
          <p className="error-text">{error}</p>
        </div>
      </section>
    );
  }

  if (references.length === 0) {
    return (
      <section className="section references-section">
        <div className="container">
          <h2 className="section-title">References</h2>
          <p className="no-references-text">No references available yet.</p>
        </div>
      </section>
    );
  }

  const currentReference = references[currentIndex];

  return (
    <section className="section references-section">
      <div className="container">
        <h2 className="section-title">What People Say</h2>

        <div className="references-carousel">
          {references.length > 1 && (
            <button
              className="carousel-button carousel-button-prev"
              onClick={previousReference}
              aria-label="Previous reference"
            >
              ‹
            </button>
          )}

          <div className="carousel-track">
            {references.map((reference, index) => (
              <div
                key={reference.id || index}
                className={`reference-card ${index === currentIndex ? "active" : ""}`}
              >
                <div className="reference-rating">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`star ${i < reference.rating ? "filled" : ""}`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p className="reference-message">"{reference.message}"</p>

                <div className="reference-author">
                  <div className="author-info">
                    <h4 className="author-name">{reference.name}</h4>
                    {reference.title && (
                      <p className="author-title">
                        {reference.title}
                        {reference.company && ` at ${reference.company}`}
                      </p>
                    )}
                    {reference.relationship && (
                      <p className="author-relationship">
                        {reference.relationship.charAt(0).toUpperCase() +
                          reference.relationship.slice(1).replace("-", " ")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {references.length > 1 && (
            <button
              className="carousel-button carousel-button-next"
              onClick={nextReference}
              aria-label="Next reference"
            >
              ›
            </button>
          )}
        </div>

        {references.length > 1 && (
          <div className="carousel-dots">
            {references.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => goToReference(index)}
                aria-label={`Go to reference ${index + 1}`}
              />
            ))}
          </div>
        )}

        {onWriteReference && (
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <button
              onClick={onWriteReference}
              className="btn-primary"
              style={{ fontSize: "1rem" }}
            >
              ✍️ Write a Reference
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default References;
