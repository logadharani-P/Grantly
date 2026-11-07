import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Scholarship Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="inner-page-root">
      <section className="inner-hero-banner">
        <div className="container">
          <span className="section-eyebrow">Support & Inquiries</span>
          <h1 className="inner-hero-title">Contact GRANTLY</h1>
          <p className="inner-hero-subtitle">
            Have questions about scholarship listings, provenance verification, or our platform? We are here to help.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info Column */}
            <div className="contact-info-card card">
              <h2>Get in Touch</h2>
              <p>
                Our team responds to student questions, university partnership queries, and source verification feedback.
              </p>

              <div className="contact-channels">
                <div className="contact-item">
                  <div className="contact-icon-box"><Mail size={20} /></div>
                  <div>
                    <h4>Email Support</h4>
                    <p>support@grantly.education</p>
                    <span className="channel-note">Typical response within 24 business hours</span>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-box"><MessageSquare size={20} /></div>
                  <div>
                    <h4>AI Student Assistant</h4>
                    <p>Available 24/7 inside your student dashboard for instant eligibility questions.</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-box"><MapPin size={20} /></div>
                  <div>
                    <h4>Headquarters</h4>
                    <p>GRANTLY Education Technologies Pvt. Ltd.<br />Koramangala, Bengaluru, Karnataka, 560034, India</p>
                  </div>
                </div>
              </div>

              <div className="provenance-disclaimer-card">
                <h4>Official Portal Notice</h4>
                <p>
                  GRANTLY is an independent discovery platform. For official grievances regarding government scholarship payment delays on NSP or state DBT portals, please reach out directly to the official ministry grievance cell at <strong>helpdesk@nsp.gov.in</strong>.
                </p>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="contact-form-card card">
              {submitted ? (
                <div className="contact-success-state">
                  <CheckCircle2 size={48} className="text-success" />
                  <h3>Message Received</h3>
                  <p>
                    Thank you for reaching out, <strong>{formData.name}</strong>. Our student assistance desk has received your note and will contact you at <strong>{formData.email}</strong>.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-outline btn-sm">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2>Send Us a Message</h2>
                  <p className="form-sub-desc">Fill in the form below and we will get back to you promptly.</p>

                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="student@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="form-select"
                    >
                      <option value="Scholarship Inquiry">Scholarship Inquiry</option>
                      <option value="Eligibility Verification">Eligibility Verification</option>
                      <option value="Report Data Discrepancy">Report Data Discrepancy</option>
                      <option value="Partnership & Listing">University / Trust Partnership</option>
                      <option value="General Feedback">General Feedback</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="How can we assist you with scholarship discovery?"
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="form-textarea"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg full-w">
                    <Send size={18} />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

