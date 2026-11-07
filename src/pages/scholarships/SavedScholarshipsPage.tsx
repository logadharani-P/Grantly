import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bookmark, 
  Trash2, 
  Scale, 
  ArrowRight, 
  ShieldCheck, 
  GraduationCap, 
  ExternalLink,
  X,
  Check
} from 'lucide-react';
import { useSavedScholarships } from '../../contexts/SavedScholarshipsContext';
import { Scholarship } from '../../types';

export const SavedScholarshipsPage: React.FC = () => {
  const { savedScholarships, toggleSave } = useSavedScholarships();
  const [comparing, setComparing] = useState(false);

  return (
    <div className="saved-page-root">
      {/* Header */}
      <section className="saved-header-banner">
        <div className="container">
          <div className="header-meta-row">
            <span className="section-eyebrow">Personal Vault</span>
            <span className="provenance-tag">
              <Bookmark size={16} className="text-primary" />
              Locally Persisted
            </span>
          </div>
          <h1 className="saved-title">Saved Scholarships</h1>
          <p className="saved-subtitle">
            Manage your shortlisted opportunities, compare award amounts and eligibility side-by-side, and initiate preparation.
          </p>

          {savedScholarships.length >= 2 && (
            <div className="compare-bar-cta">
              <button 
                onClick={() => setComparing(true)} 
                className="btn btn-secondary btn-sm"
              >
                <Scale size={16} /> Compare Shortlisted Schemes Side-by-Side
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container">
          {savedScholarships.length === 0 ? (
            <div className="card empty-results-box">
              <Bookmark size={48} className="text-muted empty-icon" />
              <h3>Your Saved List is Empty</h3>
              <p>You haven't bookmarked any scholarships yet. Explore our discovery catalog and bookmark opportunities you qualify for.</p>
              <Link to="/app/scholarships" className="btn btn-primary btn-sm">
                Discover Scholarships
              </Link>
            </div>
          ) : (
            <div className="saved-cards-grid">
              {savedScholarships.map((s) => (
                <div key={s.id} className="card scholarship-card card-hover">
                  <div className="sch-card-header">
                    <div className="sch-badges">
                      <span className="badge badge-primary">{s.providerType.toUpperCase()}</span>
                      <span className="badge badge-neutral">{s.country}</span>
                    </div>
                    <button
                      onClick={() => toggleSave(s.id)}
                      className="btn-remove-saved"
                      title="Remove from saved"
                      aria-label="Remove from saved"
                    >
                      <Trash2 size={16} className="text-danger" />
                    </button>
                  </div>

                  <Link to={`/scholarships/${s.id}`} className="sch-card-title-link">
                    <h3 className="sch-card-title">{s.title}</h3>
                  </Link>
                  <p className="sch-provider-name">{s.provider}</p>

                  <div className="sch-key-metrics">
                    <div className="metric-box">
                      <span className="metric-label">Award</span>
                      <span className="metric-val text-primary">{s.awardAmountFormatted}</span>
                    </div>
                    <div className="metric-box">
                      <span className="metric-label">Closing Date</span>
                      <span className="metric-val">{s.deadline}</span>
                    </div>
                  </div>

                  <p className="sch-overview-snippet">
                    {s.overview.substring(0, 110)}...
                  </p>

                  <div className="sch-actions-grid">
                    <Link to={`/scholarships/${s.id}`} className="btn btn-outline btn-sm">
                      Details
                    </Link>
                    <Link to={`/app/apply/${s.id}`} className="btn btn-primary btn-sm">
                      Start Prep <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Side-by-Side Comparison Modal */}
      {comparing && (
        <div className="modal-backdrop" onClick={() => setComparing(false)}>
          <div className="card comparison-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex-title">
                <Scale size={20} className="text-primary" />
                <h3>Side-by-Side Scholarship Comparison</h3>
              </div>
              <button onClick={() => setComparing(false)} className="close-btn">
                <X size={20} />
              </button>
            </div>

            <div className="comparison-table-wrap">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Feature / Criteria</th>
                    {savedScholarships.map(s => (
                      <th key={s.id}>{s.title}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Provider & Authority</td>
                    {savedScholarships.map(s => (
                      <td key={s.id}><strong>{s.provider}</strong></td>
                    ))}
                  </tr>
                  <tr>
                    <td>Award Value</td>
                    {savedScholarships.map(s => (
                      <td key={s.id} className="text-primary font-semibold">{s.awardAmountFormatted}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Country / Destination</td>
                    {savedScholarships.map(s => (
                      <td key={s.id}>{s.country}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Eligible Study Level</td>
                    {savedScholarships.map(s => (
                      <td key={s.id}>{s.educationLevel.join(', ')}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Family Income Ceiling</td>
                    {savedScholarships.map(s => (
                      <td key={s.id}>
                        {s.eligibilityCriteria.maxFamilyIncome 
                          ? `Max ₹${(s.eligibilityCriteria.maxFamilyIncome / 100000).toFixed(1)} Lakh/yr`
                          : 'No income ceiling'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Academic Cutoff</td>
                    {savedScholarships.map(s => (
                      <td key={s.id}>
                        {s.eligibilityCriteria.minPercentage 
                          ? `Min ${s.eligibilityCriteria.minPercentage}% marks`
                          : 'Satisfactory academic standing'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Closing Deadline</td>
                    {savedScholarships.map(s => (
                      <td key={s.id} className="text-danger font-medium">{s.deadline}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Official Source</td>
                    {savedScholarships.map(s => (
                      <td key={s.id}>
                        <a href={s.officialApplicationUrl} target="_blank" rel="noopener noreferrer" className="table-source-link">
                          {s.officialInformationSource} <ExternalLink size={12} />
                        </a>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Action</td>
                    {savedScholarships.map(s => (
                      <td key={s.id}>
                        <Link to={`/app/apply/${s.id}`} className="btn btn-primary btn-sm full-w">
                          Prepare Application
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

