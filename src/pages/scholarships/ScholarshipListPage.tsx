import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  X, 
  Bookmark, 
  BookmarkCheck, 
  ShieldCheck, 
  Calendar, 
  GraduationCap, 
  ExternalLink,
  SlidersHorizontal,
  ArrowUpDown,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useSavedScholarships } from '../../contexts/SavedScholarshipsContext';
import { scholarshipService, ScholarshipFilterOptions } from '../../services/scholarships/scholarshipService';
import { EducationLevel, ProviderType, FundingType, EligibilityStatus } from '../../types';

export const ScholarshipListPage: React.FC<{ defaultOnlyRecommended?: boolean }> = ({ defaultOnlyRecommended = false }) => {
  const { user } = useAuth();
  const { isSaved, toggleSave } = useSavedScholarships();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state initialized from URL search params if present
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [educationLevel, setEducationLevel] = useState<EducationLevel | 'all'>(
    (searchParams.get('level') as EducationLevel) || (defaultOnlyRecommended && user ? user.educationLevel : 'all')
  );
  const [country, setCountry] = useState<string>(searchParams.get('country') || 'all');
  const [providerType, setProviderType] = useState<ProviderType | 'all'>(
    (searchParams.get('type') as ProviderType) || 'all'
  );
  const [fundingType, setFundingType] = useState<FundingType | 'all'>('all');
  const [eligibilityStatus, setEligibilityStatus] = useState<EligibilityStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'deadline' | 'amount'>('relevance');
  const [onlyVerified, setOnlyVerified] = useState(false);

  // Clear filters
  const handleClearFilters = () => {
    setQuery('');
    setEducationLevel('all');
    setCountry('all');
    setProviderType('all');
    setFundingType('all');
    setEligibilityStatus('all');
    setSortBy('relevance');
    setOnlyVerified(false);
  };

  const hasActiveFilters = query || educationLevel !== 'all' || country !== 'all' || providerType !== 'all' || fundingType !== 'all' || eligibilityStatus !== 'all' || onlyVerified;

  // Execute filtering & evaluation
  const evaluatedScholarships = useMemo(() => {
    const options: ScholarshipFilterOptions = {
      query,
      educationLevel,
      country,
      providerType,
      fundingType,
      eligibilityStatus,
      sortBy,
      onlyVerified
    };
    return scholarshipService.filterScholarships(options, user);
  }, [query, educationLevel, country, providerType, fundingType, eligibilityStatus, sortBy, onlyVerified, user]);

  return (
    <div className="discovery-page-root">
      {/* Header Banner */}
      <section className="discovery-header-banner">
        <div className="container">
          <div className="header-meta-row">
            <span className="section-eyebrow">
              {defaultOnlyRecommended ? 'Personalized Matching' : 'Official Catalog'}
            </span>
            <div className="provenance-pill-header">
              <ShieldCheck size={16} className="text-success" />
              <span>100% Provenance & Verified Gazette Records</span>
            </div>
          </div>

          <h1 className="discovery-title">
            {defaultOnlyRecommended ? 'Your Tailored Scholarships' : 'Scholarship Discovery'}
          </h1>
          <p className="discovery-subtitle">
            Explore authentic Indian national schemes and international fellowships verified against official government and university portals.
          </p>

          {/* Search Box */}
          <div className="search-bar-wrap">
            <div className="search-input-box">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search by scholarship title, provider (e.g. AICTE, Chevening, Tata, NSP)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-main-input"
              />
              {query && (
                <button 
                  onClick={() => setQuery('')} 
                  className="search-clear-btn"
                  title="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className="section-padding">
        <div className="container">
          {/* Controls Bar: Filters & Sorter */}
          <div className="discovery-controls-card card">
            <div className="filters-row">
              {/* Level Filter */}
              <div className="filter-group">
                <label className="filter-label">Education Level</label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value as any)}
                  className="filter-select"
                >
                  <option value="all">All Levels</option>
                  <option value="school">School (6th–12th)</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="postgraduate">Postgraduate</option>
                </select>
              </div>

              {/* Country Filter */}
              <div className="filter-group">
                <label className="filter-label">Country / Destination</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Countries</option>
                  <option value="India">India</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Germany">Germany</option>
                  <option value="International">International</option>
                </select>
              </div>

              {/* Provider Type Filter */}
              <div className="filter-group">
                <label className="filter-label">Provider Type</label>
                <select
                  value={providerType}
                  onChange={(e) => setProviderType(e.target.value as any)}
                  className="filter-select"
                >
                  <option value="all">All Providers</option>
                  <option value="government">Government Schemes</option>
                  <option value="private">Private Trusts</option>
                  <option value="university">University Consortia</option>
                </select>
              </div>

              {/* Eligibility Status Filter */}
              <div className="filter-group">
                <label className="filter-label">Eligibility Match</label>
                <select
                  value={eligibilityStatus}
                  onChange={(e) => setEligibilityStatus(e.target.value as any)}
                  className="filter-select"
                >
                  <option value="all">All Statuses</option>
                  <option value="eligible">Eligible (100% Match)</option>
                  <option value="potentially-eligible">Potentially Eligible</option>
                  <option value="additional-info-required">Info Needed</option>
                  <option value="not-eligible">Not Eligible</option>
                </select>
              </div>

              {/* Sorter */}
              <div className="filter-group sort-group">
                <label className="filter-label">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="filter-select"
                >
                  <option value="relevance">Best Match (Relevance)</option>
                  <option value="deadline">Earliest Deadline</option>
                  <option value="amount">Highest Award Value</option>
                </select>
              </div>
            </div>

            {/* Filter tags & Reset */}
            <div className="filters-bottom-bar">
              <span className="results-count-text">
                Showing <strong>{evaluatedScholarships.length}</strong> opportunities
              </span>

              {hasActiveFilters && (
                <button onClick={handleClearFilters} className="clear-all-btn">
                  <X size={14} /> Clear All Filters
                </button>
              )}
            </div>
          </div>

          {/* RESULTS GRID */}
          {evaluatedScholarships.length === 0 ? (
            <div className="empty-results-box card">
              <GraduationCap size={48} className="empty-icon text-muted" />
              <h3>No Scholarships Found</h3>
              <p>No opportunities match your current filter criteria. Try expanding your search or clearing filters.</p>
              <button onClick={handleClearFilters} className="btn btn-primary btn-sm">
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="scholarships-grid-results">
              {evaluatedScholarships.map(({ scholarship: s, status, matchScore }) => {
                const saved = isSaved(s.id);
                const isSpecimenDemo = s.verificationStatus === 'demo';

                return (
                  <div key={s.id} className="card scholarship-card card-hover">
                    {/* Card Top Badges */}
                    <div className="sch-card-header">
                      <div className="sch-badges">
                        <span className="badge badge-primary">{s.providerType.toUpperCase()}</span>
                        <span className="badge badge-neutral">{s.country}</span>
                      </div>
                      <div className="header-actions-pill">
                        {isSpecimenDemo ? (
                          <span className="badge badge-warning" title="Clearly labelled specimen demonstration record">
                            Specimen Demo
                          </span>
                        ) : (
                          <span className="badge badge-success" title="Verified against official portal gazette">
                            <ShieldCheck size={12} /> Verified
                          </span>
                        )}
                        <button
                          onClick={() => toggleSave(s.id)}
                          className={`card-bookmark-btn ${saved ? 'is-saved' : ''}`}
                          title={saved ? 'Remove from saved' : 'Save scholarship'}
                          aria-label="Save scholarship"
                        >
                          {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* Title & Provider */}
                    <Link to={`/scholarships/${s.id}`} className="sch-card-title-link">
                      <h3 className="sch-card-title">{s.title}</h3>
                    </Link>
                    <p className="sch-provider-name">{s.provider}</p>

                    {/* Key Metrics */}
                    <div className="sch-key-metrics">
                      <div className="metric-box">
                        <span className="metric-label">Award Value</span>
                        <span className="metric-val text-primary">{s.awardAmountFormatted}</span>
                      </div>
                      <div className="metric-box">
                        <span className="metric-label">Deadline</span>
                        <span className="metric-val">{s.deadline}</span>
                      </div>
                    </div>

                    {/* Eligibility Match Bar */}
                    <div className="sch-match-row">
                      <div className="match-status-pill">
                        <span className={`badge ${
                          status === 'eligible' ? 'badge-success' : 
                          status === 'potentially-eligible' ? 'badge-info' : 
                          status === 'additional-info-required' ? 'badge-warning' : 'badge-danger'
                        }`}>
                          {status === 'eligible' ? 'Eligible' : 
                           status === 'potentially-eligible' ? 'Potentially Eligible' : 
                           status === 'additional-info-required' ? 'Info Needed' : 'Not Eligible'}
                        </span>
                        <span className="match-score-text">{matchScore}% Match</span>
                      </div>
                    </div>

                    <p className="sch-overview-snippet">
                      {s.overview.substring(0, 115)}...
                    </p>

                    {/* Provenance footer */}
                    <div className="sch-provenance-info">
                      <span className="prov-source-link">
                        Source: {s.officialInformationSource}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="sch-actions-grid">
                      <Link to={`/scholarships/${s.id}`} className="btn btn-outline btn-sm">
                        View Details
                      </Link>
                      <Link to={`/app/apply/${s.id}`} className="btn btn-primary btn-sm">
                        Start Application
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

