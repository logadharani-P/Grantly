import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Target, Award, Heart, CheckCircle, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="inner-page-root">
      {/* Header Banner */}
      <section className="inner-hero-banner">
        <div className="container">
          <span className="section-eyebrow">About GRANTLY</span>
          <h1 className="inner-hero-title">Your Future. Your Opportunities.</h1>
          <p className="inner-hero-subtitle">
            Simplifying how students discover scholarships, understand eligibility, prepare applications, and take charge of their educational future.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container container-narrow">
          <div className="card about-main-card">
            <h2>The Challenge We Address</h2>
            <p>
              Across India and the world, hundreds of crores in scholarship funding remain underutilized or misallocated simply because deserving students and their families cannot find authentic, clear, and up-to-date eligibility rules.
            </p>
            <p>
              Information is routinely scattered across outdated government gazettes, complex institutional portals, unverified blogs, and social media channels filled with misinformation.
            </p>

            <div className="about-metrics-row">
              <div className="metric-cell">
                <span className="metric-big">100%</span>
                <span className="metric-text">Verified Provenance Checks</span>
              </div>
              <div className="metric-cell">
                <span className="metric-big">3</span>
                <span className="metric-text">Levels: School, UG, and PG</span>
              </div>
              <div className="metric-cell">
                <span className="metric-big">0</span>
                <span className="metric-text">Hidden Broker Fees</span>
              </div>
            </div>

            <h2>How GRANTLY Changes the Experience</h2>
            <p>
              GRANTLY is built on three core tenets:
            </p>
            <div className="tenets-list">
              <div className="tenet-item">
                <ShieldCheck className="text-primary" size={24} />
                <div>
                  <h4>1. Uncompromising Data Integrity</h4>
                  <p>Every scholarship record contains provenance data: official source URL, department name, and last-verified date. We never fabricate dead links or false claims.</p>
                </div>
              </div>
              <div className="tenet-item">
                <Target className="text-primary" size={24} />
                <div>
                  <h4>2. Transparent Matching Rules</h4>
                  <p>We do not give students ambiguous black-box recommendations. If you qualify, we show exactly which percentage and income limit you passed. If you need more paperwork, we list what is required.</p>
                </div>
              </div>
              <div className="tenet-item">
                <Award className="text-primary" size={24} />
                <div>
                  <h4>3. Guided Preparation, Not False Promises</h4>
                  <p>We guide students through checklists and document preparation before directing them to official portals (NSP, AICTE, university portals) for safe, direct submission.</p>
                </div>
              </div>
            </div>

            <div className="about-cta-box">
              <h3>Join the Discovery Revolution</h3>
              <p>Explore opportunities matched to your educational standing right now.</p>
              <Link to="/scholarships" className="btn btn-primary">
                Browse Scholarships <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

