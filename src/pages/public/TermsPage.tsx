import React from 'react';
import { FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="inner-page-root">
      <section className="inner-hero-banner">
        <div className="container">
          <span className="section-eyebrow">Legal Notice</span>
          <h1 className="inner-hero-title">Terms of Service</h1>
          <p className="inner-hero-subtitle">
            Conditions governing the use of GRANTLY's discovery platform and assistant tools.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container container-narrow">
          <div className="card legal-card">
            <div className="legal-badge-header">
              <FileText className="text-primary" size={24} />
              <span>Effective Date: November 2026</span>
            </div>

            <h2>1. Independent Information Platform</h2>
            <p>
              GRANTLY is an independent scholarship discovery, eligibility calculation, and application preparation tool. GRANTLY is not a government body, financial lender, or scholarship-sanctioning authority.
            </p>

            <h2>2. No Application Submission Warranty</h2>
            <p>
              The platform prepares applicants by generating checklists, verifying eligibility against published guidelines, and linking students to official application portals (e.g. National Scholarship Portal, Chevening, USIEF, DAAD). Actual application submissions occur exclusively on those third-party portals, and GRANTLY does not guarantee that any student will be granted financial aid.
            </p>

            <h2>3. Provenance and Accuracy</h2>
            <p>
              We endeavor to maintain authentic, timely records verified against official government gazettes and university announcements. However, official portal dates, rules, or funding amounts may change at the discretion of the issuing authority. Users must always verify critical instructions on the linked official portal.
            </p>

            <h2>4. User Responsibilities</h2>
            <p>
              Students agree to provide accurate information when utilizing our matching algorithms and not to impersonate other scholars or misuse platform resources.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

