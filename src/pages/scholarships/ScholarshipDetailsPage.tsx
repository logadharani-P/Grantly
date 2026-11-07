import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  ArrowLeft, 
  FileCheck, 
  Check, 
  AlertCircle,
  Building,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { scholarshipService } from '../../services/scholarships/scholarshipService';
import { eligibilityService } from '../../services/eligibility/eligibilityService';
import { useAuth } from '../../contexts/AuthContext';
import { useSavedScholarships } from '../../contexts/SavedScholarshipsContext';
import { EligibilityIntelligencePanel } from '../../components/eligibility/EligibilityIntelligencePanel';

export const ScholarshipDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isSaved, toggleSave } = useSavedScholarships();

  const scholarship = id ? scholarshipService.getById(id) : undefined;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showEligibilityModal, setShowEligibilityModal] = useState(false);

  if (!scholarship) {
    return (
      <div className="container section-padding">
        <div className="card empty-results-box">
          <AlertCircle size={48} className="text-warning" />
          <h2>Scholarship Record Not Found</h2>
          <p>The requested scholarship identifier does not exist in our verified database.</p>
          <Link to="/scholarships" className="btn btn-primary">
            Return to Discovery Catalog
          </Link>
        </div>
      </div>
    );
  }

  const saved = isSaved(scholarship.id);
  const assessment = eligibilityService.assessEligibility(scholarship, user);

  return (
    <div className="details-page-root">
      {/* Top Breadcrumb & Actions */}
      <section className="details-header-banner">
        <div className="container">
          <button onClick={() => navigate(-1)} className="back-nav-btn">
            <ArrowLeft size={16} /> Back to Search
          </button>

          {/* Provenance Card Banner */}
          <div className="provenance-banner-card card">
            <div className="provenance-left">
              <ShieldCheck size={24} className="text-success" />
              <div>
                <span className="provenance-title">Official Source Provenance</span>
                <p className="provenance-text">
                  Verified against <strong>{scholarship.officialInformationSource}</strong>. Last audited on <strong>{scholarship.lastVerifiedDate}</strong>.
                </p>
              </div>
            </div>
            <div className="provenance-right">
              <a 
                href={scholarship.officialApplicationUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                Official Portal <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Scholarship Headline Info */}
          <div className="details-hero-info">
            <div className="details-badges-row">
              <span className="badge badge-primary">{scholarship.providerType.toUpperCase()}</span>
              <span className="badge badge-neutral">{scholarship.country}</span>
              <span className="badge badge-neutral">{scholarship.educationLevel.join(', ').toUpperCase()}</span>
              <span className="badge badge-success">{scholarship.fundingType}</span>
            </div>

            <h1 className="details-title">{scholarship.title}</h1>
            <p className="details-provider-name">
              <Building size={18} className="inline-icon" /> {scholarship.provider}
            </p>

            {/* Quick Action Bar */}
            <div className="details-action-bar">
              <Link to={`/app/apply/${scholarship.id}`} className="btn btn-primary btn-lg">
                Start Guided Application
              </Link>
              <button 
                onClick={() => setShowEligibilityModal(true)} 
                className="btn btn-secondary btn-lg"
              >
                Check My Eligibility ({assessment.score}% Match)
              </button>
              <button
                onClick={() => toggleSave(scholarship.id)}
                className={`btn btn-outline btn-lg ${saved ? 'active-saved' : ''}`}
              >
                {saved ? <BookmarkCheck size={18} className="text-primary" /> : <Bookmark size={18} />}
                <span>{saved ? 'Saved' : 'Save Scholarship'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details Body */}
      <section className="section-padding">
        <div className="container">
          <div className="details-layout-grid">
            {/* Left Main Information Column */}
            <div className="details-content-column">
              {/* 1. Overview */}
              <div className="card details-section-card">
                <h3>Program Overview</h3>
                <p className="details-overview-text">{scholarship.overview}</p>
                {scholarship.verificationNotes && (
                  <div className="audit-notes-pill">
                    <strong>Auditor Provenance Note:</strong> {scholarship.verificationNotes}
                  </div>
                )}
              </div>

              {/* 2. Benefits & Award Amount */}
              <div className="card details-section-card">
                <h3>Award Benefits & Financial Assistance</h3>
                <div className="award-highlight-box">
                  <span className="award-label">Total Potential Benefit</span>
                  <h2 className="award-number text-primary">{scholarship.awardAmount}</h2>
                  <span className="award-currency">Currency: {scholarship.currency}</span>
                </div>
                <ul className="benefits-checklist">
                  {scholarship.benefits.map((b, i) => (
                    <li key={i} className="benefit-item">
                      <Check size={18} className="text-success check-icon" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. WHY THIS SCHOLARSHIP MATCHES YOU – Intelligence Panel */}
              <div className="card details-section-card eip-section-card">
                <EligibilityIntelligencePanel
                  scholarship={scholarship}
                  student={user}
                  isSaved={saved}
                  onToggleSave={() => toggleSave(scholarship.id)}
                />
              </div>

              {/* 4. Detailed Eligibility Criteria */}
              <div className="card details-section-card">
                <h3>Detailed Eligibility Criteria</h3>
                <div className="criteria-specs-grid">
                  <div className="spec-item">
                    <span className="spec-label">Eligible Education Level</span>
                    <span className="spec-val">{scholarship.educationLevel.join(', ')}</span>
                  </div>

                  <div className="spec-item">
                    <span className="spec-label">Academic Cutoff</span>
                    <span className="spec-val">
                      {scholarship.eligibilityCriteria.minPercentage 
                        ? `Minimum ${scholarship.eligibilityCriteria.minPercentage}% or equivalent CGPA`
                        : 'Passed relevant qualifying examination'}
                    </span>
                  </div>

                  <div className="spec-item">
                    <span className="spec-label">Family Income Limit</span>
                    <span className="spec-val">
                      {scholarship.eligibilityCriteria.maxFamilyIncome 
                        ? `Maximum ₹${(scholarship.eligibilityCriteria.maxFamilyIncome / 100000).toFixed(1)} Lakh / year`
                        : 'No mandatory income ceiling (Merit based)'}
                    </span>
                  </div>

                  <div className="spec-item">
                    <span className="spec-label">Eligible Nationalities</span>
                    <span className="spec-val">{scholarship.eligibleNationalities.join(', ')}</span>
                  </div>
                </div>

                {scholarship.eligibilityCriteria.specificConditions && (
                  <div className="specific-conditions-box">
                    <h4>Mandatory Conditions</h4>
                    <ul>
                      {scholarship.eligibilityCriteria.specificConditions.map((cond, i) => (
                        <li key={i}>{cond}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 4. Required Documents Checklist */}
              <div className="card details-section-card">
                <h3>Mandatory Documents Checklist</h3>
                <p className="sub-text">Prepare these scanned certificates prior to initiating your portal submission.</p>
                <div className="docs-list">
                  {scholarship.requiredDocuments.map((doc, i) => (
                    <div key={i} className="doc-pill-item">
                      <FileCheck size={18} className="text-primary" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Selection Process */}
              <div className="card details-section-card">
                <h3>Official Selection Process</h3>
                <ol className="selection-steps-list">
                  {scholarship.selectionProcess.map((step, i) => (
                    <li key={i}>
                      <span className="step-num">{i + 1}</span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* 6. Frequently Asked Questions */}
              {scholarship.faqs && scholarship.faqs.length > 0 && (
                <div className="card details-section-card">
                  <h3>Frequently Asked Questions</h3>
                  <div className="faqs-accordion">
                    {scholarship.faqs.map((faq, i) => (
                      <div key={i} className="faq-accordion-item">
                        <button
                          className="faq-question-btn"
                          onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                        >
                          <span>{faq.question}</span>
                          {openFaqIndex === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                        {openFaqIndex === i && (
                          <div className="faq-answer-panel">
                            <p>{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sticky Sidebar Column */}
            <div className="details-sidebar-column">
              {/* Snapshot Card */}
              <div className="card sticky-snapshot-card">
                <h4>Application Snapshot</h4>
                <div className="snapshot-dates-row">
                  <div className="date-cell">
                    <span className="date-label">Opens</span>
                    <span className="date-val">{scholarship.applicationOpeningDate}</span>
                  </div>
                  <div className="date-cell">
                    <span className="date-label">Closing Deadline</span>
                    <span className="date-val text-danger">{scholarship.deadline}</span>
                  </div>
                </div>

                {/* Eligibility Summary Pill */}
                <div className="sidebar-eligibility-box">
                  <div className="status-indicator-row">
                    <span className="label">Your Profile Status:</span>
                    <span className={`badge ${
                      assessment.status === 'eligible' ? 'badge-success' : 
                      assessment.status === 'potentially-eligible' ? 'badge-info' : 
                      assessment.status === 'additional-info-required' ? 'badge-warning' : 'badge-danger'
                    }`}>
                      {assessment.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="assessment-note">{assessment.summary}</p>
                  <button 
                    onClick={() => setShowEligibilityModal(true)} 
                    className="btn btn-outline btn-sm full-w"
                  >
                    View Criteria Breakdown
                  </button>
                </div>

                <Link to={`/app/apply/${scholarship.id}`} className="btn btn-primary btn-md full-w">
                  Start Application Preparation
                </Link>

                <div className="official-portal-link-box">
                  <span className="portal-sub">External Government/Provider Portal:</span>
                  <a
                    href={scholarship.officialApplicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="official-link-row"
                  >
                    <span>{scholarship.officialApplicationUrl}</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Eligibility Breakdown Modal */}
      {showEligibilityModal && (
        <div className="modal-backdrop" onClick={() => setShowEligibilityModal(false)}>
          <div className="card modal-content-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Eligibility Breakdown</h3>
              <button onClick={() => setShowEligibilityModal(false)} className="close-btn">×</button>
            </div>
            <div className="modal-body">
              <div className="modal-score-banner">
                <span className="score-big">{assessment.score}%</span>
                <div>
                  <h4>Eligibility Match Score</h4>
                  <p>{assessment.summary}</p>
                </div>
              </div>

              <div className="criteria-reasons-list">
                {assessment.reasons.map((r, i) => (
                  <div key={i} className={`reason-item ${r.matched ? 'passed' : 'flagged'}`}>
                    <div className="reason-status-icon">
                      {r.matched ? <Check size={16} className="text-success" /> : <AlertCircle size={16} className="text-danger" />}
                    </div>
                    <div>
                      <h5 className="reason-title">{r.criteria}</h5>
                      {r.studentValue && (
                        <p className="reason-comparison">
                          Your profile: <strong>{r.studentValue}</strong> | Required: <strong>{r.requiredValue}</strong>
                        </p>
                      )}
                      <p className="reason-note">{r.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <Link to="/app/profile" className="btn btn-outline btn-sm" onClick={() => setShowEligibilityModal(false)}>
                Update Profile Scores
              </Link>
              <button onClick={() => setShowEligibilityModal(false)} className="btn btn-primary btn-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

