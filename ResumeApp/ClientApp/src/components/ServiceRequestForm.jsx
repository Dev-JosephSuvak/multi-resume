import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

function ServiceRequestForm({ isOpen, onClose, calendlyUrl, useApi = false }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitViaApi = async () => {
    const response = await fetch("/api/servicerequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit request");
    }

    return await response.json();
  };

  const submitViaFirebase = async () => {
    await addDoc(collection(db, "serviceRequests"), {
      ...formData,
      createdAt: serverTimestamp(),
      status: "new",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Use .NET API if running locally, otherwise use Firebase directly
      if (useApi) {
        await submitViaApi();
      } else {
        await submitViaFirebase();
      }

      setIsSuccess(true);

      // Wait 2 seconds then open Calendly
      setTimeout(() => {
        if (window.Calendly && calendlyUrl) {
          window.Calendly.initPopupWidget({ url: calendlyUrl });
        }
        // Close modal after another 2 seconds
        setTimeout(() => {
          handleClose();
        }, 2000);
      }, 2000);
    } catch (err) {
      console.error("Error submitting service request:", err);
      setError(err.message || "Failed to submit request. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      projectType: "",
      budget: "",
      timeline: "",
      description: "",
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
            <h2 className="modal-title">Request Consulting</h2>
            <p className="modal-subtitle">
              Tell me about your project and I'll get back to you soon!
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
                  <label htmlFor="company">Company/Organization</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="projectType">
                    Project Type <span className="required">*</span>
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a type</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-app">Mobile App</option>
                    <option value="api-development">API Development</option>
                    <option value="modernization">
                      Legacy System Modernization
                    </option>
                    <option value="consulting">Technical Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="budget">Budget Range</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select a range</option>
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-plus">$50,000+</option>
                    <option value="not-sure">Not Sure Yet</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="timeline">
                  Desired Timeline <span className="required">*</span>
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a timeline</option>
                  <option value="asap">ASAP (1-2 weeks)</option>
                  <option value="1-month">Within 1 Month</option>
                  <option value="1-3-months">1-3 Months</option>
                  <option value="3-6-months">3-6 Months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">
                  Project Description <span className="required">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell me about your project, goals, and any specific requirements..."
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
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Request Submitted!</h2>
            <p>Thank you for your interest! Your request has been received.</p>
            <p>Opening Calendly to schedule a call...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceRequestForm;
