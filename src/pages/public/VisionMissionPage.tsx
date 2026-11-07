import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Target, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

export const VisionMissionPage: React.FC = () => {
  return (
    <div className="inner-page-root">
      <section className="inner-hero-banner">
        <div className="container">
          <span className="section-eyebrow">Purpose & Principles</span>
          <h1 className="inner-hero-title">Our Vision and Mission</h1>
          <p className="inner-hero-subtitle">
            Democratizing access to higher education through authentic information and student-first technology.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="vision-mission-dual-grid">
            <div className="card vm-card-large">
              <div className="vm-badge-icon">
                <Compass size={32} className="text-primary" />
              </div>
              <span className="section-eyebrow">Our Vision</span>
              <h2>Accessible Educational Opportunities for Every Deserving Student</h2>
              <blockquote className="vm-quote">
                "Our vision is to make educational opportunities accessible by simplifying the journey towards financial assistance for every deserving student."
              </blockquote>
              <p>
                We envision a world where no student abandons their educational ambitions simply because they lacked timely information about legitimate financial grants, government scholarships, or university fellowships.
              </p>
            </div>

            <div className="card vm-card-large">
              <div className="vm-badge-icon">
                <Target size={32} className="text-primary" />
              </div>
              <span className="section-eyebrow">Our Mission</span>
              <h2>Empowering Students with Transparent Guidance</h2>
              <blockquote className="vm-quote">
                "Our mission is to empower students through personalized scholarship discovery, transparent eligibility guidance, accessible information and simplified application assistance."
              </blockquote>
              <p>
                We fulfill this mission by structuring public and private scholarship programs into standardized, queryable data, providing clear eligibility logic, and assisting applicants step-by-step.
              </p>
            </div>
          </div>

          <div className="core-values-section">
            <h3 className="section-center-title">Our Foundational Values</h3>
            <div className="values-grid">
              <div className="value-item card">
                <h4>Authenticity First</h4>
                <p>We source every scholarship condition directly from official gazettes and authorities. If an entry is unverified or a specimen, it is clearly flagged.</p>
              </div>
              <div className="value-item card">
                <h4>Student Privacy & Safeguarding</h4>
                <p>Financial and category questions are kept strictly voluntary until needed for a specific scheme assessment. Minor safeguards are strictly maintained.</p>
              </div>
              <div className="value-item card">
                <h4>Zero False Claims</h4>
                <p>We never claim to submit applications directly to government databases or guarantee scholarship sanction. The power remains in the student's hands.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

