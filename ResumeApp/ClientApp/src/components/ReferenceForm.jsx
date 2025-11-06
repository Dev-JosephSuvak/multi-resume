import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

function ReferenceForm({ isOpen, onClose, useApi = false }) {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    company: "",
    email: "",
    relationship: "",
    message: "",
    rating: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitViaApi = async () => {
    const response = await fetch("/api/reference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit reference");
    }

    return await response.json();
  };

  const submitViaFirebase = async () => {
    await addDoc(collection(db, "references"), {
      ...formData,
      rating: parseInt(formData.rating),
      approved: false,
      createdAt: serverTimestamp(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (useApi) {
        await submitViaApi();
      } else {
        await submitViaFirebase();
      }

      setIsSuccess(true);

      // Close modal after 3 seconds
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (err) {
      console.error("Error submitting reference:", err);
      setError(err.message || "Failed to submit reference. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      title: "",
      company: "",
      email: "",
      relationship: "",
      message: "",
      rating: 5,
    });
    setIsSuccess(false);
    setError("");
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          ×
        </button>

        {!isSuccess ? (
          <>
            <h2 className="modal-title">Write a Reference</h2>
            <p className="modal-subtitle">
              Share your experience working with me. Your reference will be reviewed before being published.
            </p>

            <form onSubmit={handleSubmit} className="service-request-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Current Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Senior Developer"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g., Tech Corp"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="relationship">
                    Relationship <span className="required">*</span>
                  </label>
                  <select
                    id="relationship"
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select relationship</option>
                    <option value="colleague">Colleague</option>
                    <option value="manager">Manager</option>
                    <option value="direct-report">Direct Report</option>
                    <option value="client">Client</option>
                    <option value="mentor">Mentor</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="rating">
                    Rating <span className="required">*</span>
                  </label>
                  <select
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                  >
                    <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                    <option value="4">⭐⭐⭐⭐ Very Good</option>
                    <option value="3">⭐⭐⭐ Good</option>
                    <option value="2">⭐⭐ Fair</option>
                    <option value="1">⭐ Poor</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  Your Reference <span className="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Share your experience working with me, including skills, work ethic, and any notable achievements..."
                  required
                ></textarea>
              </div>

              {error && <div className="form-error">{error}</div>}

              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn-secondary"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Reference"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Reference Submitted!</h2>
            <p>Thank you for taking the time to write a reference.</p>
            <p>It will be reviewed and published shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReferenceForm;
