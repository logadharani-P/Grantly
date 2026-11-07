import React from 'react';
import { Link } from 'react-router-dom';
import { UserCheck, Search, ShieldCheck, Send, CheckCircle2, ArrowRight } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="inner-page-root">
      <section className="inner-hero-banner">
        <div className="container">
          <span className="section-eyebrow">Clear & Simple</span>
          <h1 className="inner-hero-title">How GRANTLY Works</h1>
          <p className="inner-hero-subtitle">
            Four structured steps to discover, evaluate, prepare, and track your scholarship applications.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container container-narrow">
          <div className="timeline-steps-flow">
            {/* Step 1 */}
            <div className="flow-step-item">
              <div className="flow-marker">
                <div className="marker-circle">1</div>
                <div className="marker-line"></div>
              </div>
              <div className="flow-content card">
                <div className="flow-header">
                  <UserCheck className="text-primary" size={24} />
                  <h3>Step 1: Create Your Student Profile</h3>
                </div>
                <p>
                  Sign up and complete our adaptive onboarding. Tell us whether you are a school student (Class 6th–12th), undergraduate, or postgraduate. We collect only what is relevant to scholarship qualification, automatically calculate your age, and let you voluntarily provide income or reservation categories when assessing specific schemes.
                </p>
                <div className="flow-tags">
                  <span className="badge badge-primary">Age Auto-Calculation</span>
                  <span className="badge badge-neutral">Conditional Education Paths</span>
                  <span className="badge badge-neutral">Consent & Safeguards</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flow-step-item">
              <div className="flow-marker">
                <div className="marker-circle">2</div>
                <div className="marker-line"></div>
              </div>
              <div className="flow-content card">
                <div className="flow-header">
                  <Search className="text-primary" size={24} />
                  <h3>Step 2: Discover Curated Opportunities</h3>
                </div>
                <p>
                  Explore our verified repository of Indian central and state scholarships, private trust grants, and global master/doctorate fellowships. Filter by level, country, provider type, funding amount, and closing date.
                </p>
                <div className="flow-tags">
                  <span className="badge badge-primary">Official Gazette Links</span>
                  <span className="badge badge-neutral">Provenanced Records</span>
                  <span className="badge badge-neutral">Live Deadlines</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flow-step-item">
              <div className="flow-marker">
                <div className="marker-circle">3</div>
                <div className="marker-line"></div>
              </div>
              <div className="flow-content card">
                <div className="flow-header">
                  <ShieldCheck className="text-primary" size={24} />
                  <h3>Step 3: Check Your Eligibility with 100% Transparency</h3>
                </div>
                <p>
                  Our rule engine compares your marks, domicile, income, and educational level against the scholarship's official criteria. You will see an unambiguous status: <em>Eligible</em>, <em>Potentially Eligible</em>, <em>Additional Info Required</em>, or <em>Not Eligible</em> with exact itemized explanations.
                </p>
                <div className="flow-tags">
                  <span className="badge badge-success">Criteria Breakdown</span>
                  <span className="badge badge-neutral">No Mystery Black Boxes</span>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flow-step-item">
              <div className="flow-marker">
                <div className="marker-circle">4</div>
              </div>
              <div className="flow-content card">
                <div className="flow-header">
                  <Send className="text-primary" size={24} />
                  <h3>Step 4: Prepare, Link Out & Track</h3>
                </div>
                <p>
                  Follow our 9-step Guided Application Assistant. Gather all required documents (income certificates, transcripts, recommendation letters) using our checklist, then click directly to the official government or university application portal. Afterwards, record your submission reference to monitor status and deadlines.
                </p>
                <div className="flow-tags">
                  <span className="badge badge-primary">Document Checklist</span>
                  <span className="badge badge-neutral">Official Portal Redirection</span>
                  <span className="badge badge-neutral">Self-Reported Tracking</span>
                </div>
              </div>
            </div>
          </div>

          <div className="how-it-works-cta card">
            <h3>Ready to find your eligible scholarships?</h3>
            <p>Start your free discovery journey today.</p>
            <Link to="/signup" className="btn btn-primary btn-lg">
              Get Started Free <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

