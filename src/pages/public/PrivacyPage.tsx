import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="inner-page-root">
      <section className="inner-hero-banner">
        <div className="container">
          <span className="section-eyebrow">Data Ethics</span>
          <h1 className="inner-hero-title">Privacy Policy & Safeguards</h1>
          <p className="inner-hero-subtitle">
            How GRANTLY respects student privacy, voluntary disclosures, and minor protections.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container container-narrow">
          <div className="card legal-card">
            <div className="legal-badge-header">
              <ShieldCheck className="text-primary" size={24} />
              <span>Effective Date: November 2026</span>
            </div>

            <h2>1. Minimal Data Collection Principle</h2>
            <p>
              GRANTLY collects only information directly necessary for determining scholarship eligibility (e.g., current stage of study, broad income bracket, marks, and state of residence). We do not require or collect Aadhaar OTPs, bank account passwords, or national identity biometrics.
            </p>

            <h2>2. Handling of Sensitive Information</h2>
            <p>
              Fields relating to social category, caste reservations, annual household income, and disability status are <strong>strictly optional</strong> during initial onboarding. These fields are only requested when you specifically run an eligibility check on a scheme that legally mandates such criteria.
            </p>

            <h2>3. Safeguarding of Minors</h2>
            <p>
              For applicants under 18 years of age (school students), parental or guardian consent must be confirmed. We remind students and guardians that this frontend demonstration does not constitute legal power of attorney and that final official portal submissions require direct parent/guardian supervision.
            </p>

            <h2>4. Demonstration Persistence</h2>
            <p>
              In this frontend release, your data is maintained in your browser's private LocalStorage session for demonstration and state persistence. You can reset or delete all stored profile information at any time from the Settings page.
            </p>

            <h2>5. No Sale of Student Data</h2>
            <p>
              GRANTLY will never sell, lease, or monetize student contact records or academic data to unverified marketing agencies or predatory loan providers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

