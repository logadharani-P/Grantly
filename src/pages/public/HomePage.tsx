import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Search, 
  CheckCircle, 
  FileCheck, 
  Bot, 
  TrendingUp, 
  GraduationCap, 
  BookOpen, 
  Clock, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { ALL_SCHOLARSHIPS } from '../../data/scholarships';
import { EDUCATION_NEWS } from '../../data/news';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const featuredScholarships = ALL_SCHOLARSHIPS.filter(s => s.isFeatured).slice(0, 3);
  const latestNews = EDUCATION_NEWS.slice(0, 3);

  return (
    <div className="landing-page-root">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} className="badge-sparkle" />
              <span>{t('hero.badge')}</span>
            </div>

            <h1 className="hero-title">
              {t('hero.title')}
            </h1>

            <p className="hero-subtitle">
              {t('hero.subtitle')}
            </p>

            <div className="hero-actions">
              <Link to="/scholarships" className="btn btn-primary btn-lg">
                <Search size={18} />
                <span>{t('hero.exploreBtn')}</span>
              </Link>
              <Link to="/signup" className="btn btn-secondary btn-lg">
                <span>{t('hero.getStartedBtn')}</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="hero-trust-bar">
              <div className="trust-item">
                <ShieldCheck size={20} className="trust-icon" />
                <span>100% Provenance from Official Portals</span>
              </div>
              <div className="trust-item">
                <GraduationCap size={20} className="trust-icon" />
                <span>School • UG • PG Opportunities</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Preview Card */}
          <div className="hero-preview-wrapper">
            <div className="hero-glass-card">
              <div className="preview-top-bar">
                <div className="preview-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="preview-header-title">Live Eligibility Engine</span>
                <span className="badge badge-success">Active Match</span>
              </div>

              <div className="preview-card-body">
                <div className="preview-scholarship-sample">
                  <div className="sample-badge-row">
                    <span className="badge badge-primary">Government of India</span>
                    <span className="badge badge-neutral">Undergraduate</span>
                  </div>
                  <h3 className="sample-title">Central Sector Scheme of Scholarship</h3>
                  <div className="sample-amount-row">
                    <span className="sample-amount">₹20,000 / year</span>
                    <span className="sample-deadline">Closes Nov 30</span>
                  </div>

                  <div className="sample-match-box">
                    <div className="match-percent-row">
                      <span className="match-label">Eligibility Match</span>
                      <span className="match-value">100% Qualified</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill" style={{ width: '100%' }}></div>
                    </div>
                    <div className="match-checks-list">
                      <div className="check-item"><Check size={14} className="text-success" /> Class 12th Score: 88% (Cutoff: 80%)</div>
                      <div className="check-item"><Check size={14} className="text-success" /> Income &lt; ₹4.5L (Verified criteria)</div>
                    </div>
                  </div>

                  <div className="preview-cta-row">
                    <span className="provenance-source-text">Source: scholarships.gov.in</span>
                    <span className="btn btn-primary btn-sm">Start Preparation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION (Explicitly Identified Illustrative Metrics) */}
      <section className="stats-section">
        <div className="container stats-container">
          <div className="stat-card">
            <span className="stat-number">{t('hero.stat1Value')}</span>
            <span className="stat-label">{t('hero.stat1Label')}</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{t('hero.stat2Value')}</span>
            <span className="stat-label">{t('hero.stat2Label')}</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{t('hero.stat3Value')}</span>
            <span className="stat-label">{t('hero.stat3Label')}</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">0 Cost</span>
            <span className="stat-label">Free Student Discovery</span>
          </div>
        </div>
      </section>

      {/* PROBLEM & ABOUT SECTION */}
      <section className="about-overview-section section-padding">
        <div className="container">
          <div className="split-grid">
            <div className="grid-left">
              <span className="section-eyebrow">The Challenge</span>
              <h2 className="section-title">{t('landing.problemTitle')}</h2>
              <p className="section-desc">
                {t('landing.problemText')}
              </p>
              <div className="challenge-bullets">
                <div className="bullet-card">
                  <div className="bullet-icon-box danger">!</div>
                  <div>
                    <h4>Fragmented Information</h4>
                    <p>Opportunities are buried across hundreds of separate government portals, trust notices, and foreign embassies.</p>
                  </div>
                </div>
                <div className="bullet-card">
                  <div className="bullet-icon-box danger">!</div>
                  <div>
                    <h4>Ambiguous Eligibility</h4>
                    <p>Students waste hours applying to schemes only to find they failed an unstated domicile or income condition.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid-right">
              <span className="section-eyebrow">The Solution</span>
              <h2 className="section-title">{t('landing.solutionTitle')}</h2>
              <p className="section-desc">
                {t('landing.solutionText')}
              </p>
              <div className="solution-bullets">
                <div className="bullet-card success">
                  <div className="bullet-icon-box success"><Check size={18} /></div>
                  <div>
                    <h4>Verified Provenance</h4>
                    <p>Every scholarship lists its exact government gazette, portal link, and last verified timestamp.</p>
                  </div>
                </div>
                <div className="bullet-card success">
                  <div className="bullet-icon-box success"><Check size={18} /></div>
                  <div>
                    <h4>Grounded AI Guidance</h4>
                    <p>An intelligent assistant that references real documents and never fabricates dead links or fake guarantees.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION & MISSION SECTION */}
      <section className="vision-mission-section section-padding bg-lavender-subtle">
        <div className="container">
          <div className="section-header-center">
            <span className="section-eyebrow">Our Purpose</span>
            <h2 className="section-title">Built on Trust, Transparency & Opportunity</h2>
          </div>

          <div className="vision-mission-grid">
            <div className="card vision-card">
              <div className="card-icon-header">
                <TrendingUp size={28} className="brand-purple-icon" />
              </div>
              <h3 className="card-heading">{t('landing.visionTitle')}</h3>
              <p className="card-text">{t('landing.visionText')}</p>
            </div>

            <div className="card mission-card">
              <div className="card-icon-header">
                <ShieldCheck size={28} className="brand-purple-icon" />
              </div>
              <h3 className="card-heading">{t('landing.missionTitle')}</h3>
              <p className="card-text">{t('landing.missionText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works-section section-padding">
        <div className="container">
          <div className="section-header-center">
            <span className="section-eyebrow">Student Workflow</span>
            <h2 className="section-title">{t('landing.howItWorksTitle')}</h2>
            <p className="section-subtitle">
              A guided experience that takes you from eligibility discovery to official portal submission.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number-pill">01</div>
              <h3 className="step-title">{t('landing.step1Title')}</h3>
              <p className="step-desc">{t('landing.step1Desc')}</p>
            </div>

            <div className="step-card">
              <div className="step-number-pill">02</div>
              <h3 className="step-title">{t('landing.step2Title')}</h3>
              <p className="step-desc">{t('landing.step2Desc')}</p>
            </div>

            <div className="step-card">
              <div className="step-number-pill">03</div>
              <h3 className="step-title">{t('landing.step3Title')}</h3>
              <p className="step-desc">{t('landing.step3Desc')}</p>
            </div>

            <div className="step-card">
              <div className="step-number-pill">04</div>
              <h3 className="step-title">{t('landing.step4Title')}</h3>
              <p className="step-desc">{t('landing.step4Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SCHOLARSHIPS CAROUSEL / GRID */}
      <section className="featured-scholarships-section section-padding bg-lavender-subtle">
        <div className="container">
          <div className="section-header-split">
            <div>
              <span className="section-eyebrow">Authentic Opportunities</span>
              <h2 className="section-title">Verified Scholarships Available Now</h2>
            </div>
            <Link to="/scholarships" className="btn btn-outline">
              <span>View All Scholarships</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="scholarships-grid">
            {featuredScholarships.map(s => (
              <div key={s.id} className="card scholarship-card card-hover">
                <div className="sch-card-header">
                  <div className="sch-badges">
                    <span className="badge badge-primary">{s.providerType.toUpperCase()}</span>
                    <span className="badge badge-neutral">{s.country}</span>
                  </div>
                  <span className="badge badge-success">
                    <ShieldCheck size={12} /> Verified
                  </span>
                </div>

                <h3 className="sch-card-title">{s.title}</h3>
                <p className="sch-provider-name">{s.provider}</p>

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

                <p className="sch-overview-snippet">
                  {s.overview.substring(0, 110)}...
                </p>

                <div className="sch-card-footer">
                  <span className="provenance-tag-sm">Source: {s.officialInformationSource}</span>
                  <Link to={`/scholarships/${s.id}`} className="btn btn-primary btn-sm full-w">
                    View Full Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section section-padding">
        <div className="container">
          <div className="section-header-center">
            <span className="section-eyebrow">Platform Capabilities</span>
            <h2 className="section-title">{t('landing.featuresTitle')}</h2>
          </div>

          <div className="features-grid">
            <div className="card feature-box">
              <div className="feature-icon-box"><Sparkles size={24} /></div>
              <h4>{t('landing.feature1Title')}</h4>
              <p>{t('landing.feature1Desc')}</p>
            </div>

            <div className="card feature-box">
              <div className="feature-icon-box"><Bot size={24} /></div>
              <h4>{t('landing.feature2Title')}</h4>
              <p>{t('landing.feature2Desc')}</p>
            </div>

            <div className="card feature-box">
              <div className="feature-icon-box"><CheckCircle size={24} /></div>
              <h4>{t('landing.feature3Title')}</h4>
              <p>{t('landing.feature3Desc')}</p>
            </div>

            <div className="card feature-box">
              <div className="feature-icon-box"><FileCheck size={24} /></div>
              <h4>{t('landing.feature4Title')}</h4>
              <p>{t('landing.feature4Desc')}</p>
            </div>

            <div className="card feature-box">
              <div className="feature-icon-box"><ShieldCheck size={24} /></div>
              <h4>{t('landing.feature5Title')}</h4>
              <p>{t('landing.feature5Desc')}</p>
            </div>

            <div className="card feature-box">
              <div className="feature-icon-box"><Clock size={24} /></div>
              <h4>{t('landing.feature6Title')}</h4>
              <p>{t('landing.feature6Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION NEWS TEASER */}
      <section className="news-teaser-section section-padding bg-lavender-subtle">
        <div className="container">
          <div className="section-header-split">
            <div>
              <span className="section-eyebrow">Education News & Alerts</span>
              <h2 className="section-title">Latest Official Announcements</h2>
            </div>
            <Link to="/news" className="btn btn-outline">
              <span>All News</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="news-grid">
            {latestNews.map(item => (
              <div key={item.id} className="card news-card card-hover">
                <div className="news-card-badge-row">
                  <span className="badge badge-primary">{item.category}</span>
                  <span className="news-date">{item.publicationDate}</span>
                </div>
                <h3 className="news-title">{item.title}</h3>
                <p className="news-summary">{item.summary}</p>
                <div className="news-footer">
                  <span className="news-publisher">{item.publisher}</span>
                  <Link to={`/news/${item.id}`} className="read-more-link">
                    Read Article →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE TESTIMONIALS (Clearly Identified Sample Testimonials) */}
      <section className="testimonials-section section-padding">
        <div className="container">
          <div className="section-header-center">
            <span className="section-eyebrow">Student Experiences</span>
            <h2 className="section-title">Sample Demonstration Feedback</h2>
            <p className="section-subtitle">
              *Clearly identified illustrative student testimonials representing potential platform utility.
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="card testimonial-card">
              <p className="testimonial-quote">
                "GRANTLY made it obvious why I was eligible for the Central Sector Scheme and what document was missing from my Tahsildar office. I never knew my 12th percentile qualified."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">P</div>
                <div>
                  <h4 className="author-name">Pooja K. (Sample Student)</h4>
                  <span className="author-sub">B.Sc Physics, Delhi University</span>
                </div>
              </div>
            </div>

            <div className="card testimonial-card">
              <p className="testimonial-quote">
                "Finding international master fellowships with strict citizenship and work-experience cutoffs used to take weeks of digging. The AI assistant filtered out what I couldn't apply for in seconds."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">R</div>
                <div>
                  <h4 className="author-name">Rahul V. (Sample Student)</h4>
                  <span className="author-sub">M.Tech Scholar, NIT Trichy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="cta-banner-section section-padding">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-content">
              <h2 className="cta-title">{t('landing.ctaTitle')}</h2>
              <p className="cta-text">{t('landing.ctaText')}</p>
              <div className="cta-buttons">
                <Link to="/signup" className="btn btn-primary btn-lg">
                  {t('landing.ctaBtn')}
                </Link>
                <Link to="/scholarships" className="btn btn-outline btn-lg cta-btn-white">
                  Browse Catalog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

