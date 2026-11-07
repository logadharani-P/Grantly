import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Bookmark, 
  FileText, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Bot, 
  Calendar, 
  TrendingUp, 
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { useAuth } from '../../contexts/AuthContext';
import { useSavedScholarships } from '../../contexts/SavedScholarshipsContext';
import { scholarshipService } from '../../services/scholarships/scholarshipService';
import { applicationService } from '../../services/applications/applicationService';
import { newsService } from '../../services/news/newsService';
import { ALL_SCHOLARSHIPS } from '../../data/scholarships';

export const DashboardOverviewPage: React.FC = () => {
  const { user } = useAuth();
  const { savedIds } = useSavedScholarships();

  const applications = applicationService.getApplications();
  const latestNews = newsService.getAll().slice(0, 2);

  // Recommendations calculated based on student profile
  const evaluatedScholarships = useMemo(() => {
    return scholarshipService.filterScholarships({ sortBy: 'relevance' }, user);
  }, [user]);

  const topRecommendations = evaluatedScholarships.slice(0, 3);
  const eligibleCount = evaluatedScholarships.filter(s => s.status === 'eligible').length;

  // Profile completion calculation
  const profileCompletionRate = useMemo(() => {
    if (!user) return 30;
    let score = 50;
    if (user.dob) score += 10;
    if (user.educationLevel) score += 10;
    if (user.undergraduateDetails?.cgpaOrPercentage || user.schoolDetails?.currentPerformance || user.postgraduateDetails?.ugPerformance) score += 15;
    if (user.financialEligibility?.familyIncomeRange) score += 15;
    return Math.min(score, 100);
  }, [user]);

  // Upcoming deadlines sorted
  const upcomingDeadlines = useMemo(() => {
    return [...ALL_SCHOLARSHIPS]
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
      .slice(0, 4);
  }, []);

  // Recharts Chart Data: Provider Types distribution among matched
  const providerData = useMemo(() => {
    const gov = ALL_SCHOLARSHIPS.filter(s => s.providerType === 'government').length;
    const priv = ALL_SCHOLARSHIPS.filter(s => s.providerType === 'private').length;
    const uni = ALL_SCHOLARSHIPS.filter(s => s.providerType === 'university').length;
    return [
      { name: 'Government', count: gov, color: '#8055D9' },
      { name: 'Private Trust', count: priv, color: '#A78BFA' },
      { name: 'University', count: uni, color: '#10B981' },
    ];
  }, []);

  const appStatusData = useMemo(() => {
    const counts: { [key: string]: number } = {
      'Draft / Preparing': 0,
      'Ready to Apply': 0,
      'Submitted': 0,
    };
    applications.forEach(app => {
      if (app.status === 'draft' || app.status === 'preparing') counts['Draft / Preparing']++;
      else if (app.status === 'ready-to-apply') counts['Ready to Apply']++;
      else counts['Submitted']++;
    });
    return Object.keys(counts).map(k => ({ name: k, value: counts[k] }));
  }, [applications]);

  const COLORS = ['#8055D9', '#3B82F6', '#10B981'];

  return (
    <div className="dashboard-content-flow">
      {/* Personalized Welcome Banner */}
      <section className="dashboard-welcome-card card">
        <div className="welcome-text-side">
          <div className="welcome-tag">
            <Sparkles size={16} className="text-primary" />
            <span>Student Command Center</span>
          </div>
          <h1 className="welcome-title">
            Welcome back, {user?.name.split(' ')[0] || 'Scholar'}!
          </h1>
          <p className="welcome-subtitle">
            You are enrolled as an <strong>{user?.educationLevel.toUpperCase()}</strong> student. We found <strong>{eligibleCount} scholarships</strong> matching your academic qualifications and domicile.
          </p>
          <div className="welcome-actions">
            <Link to="/app/scholarships" className="btn btn-primary btn-sm">
              Explore Matches
            </Link>
            <Link to="/app/eligibility" className="btn btn-outline btn-sm">
              Run Eligibility Check
            </Link>
          </div>
        </div>

        {/* Profile Completion Dial / Pill */}
        <div className="profile-completion-box">
          <div className="completion-header">
            <span className="completion-title">Profile Strength</span>
            <span className="completion-val">{profileCompletionRate}%</span>
          </div>
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${profileCompletionRate}%` }}
            />
          </div>
          <p className="completion-note">
            {profileCompletionRate === 100 
              ? 'Complete profile! Match algorithms running with highest confidence.' 
              : 'Add recent semester marks to unlock additional institution grants.'}
          </p>
          {profileCompletionRate < 100 && (
            <Link to="/app/profile" className="btn btn-ghost btn-sm">
              Complete Profile →
            </Link>
          )}
        </div>
      </section>

      {/* KPI METRIC CARDS */}
      <section className="dashboard-kpi-grid">
        <Link to="/app/recommended" className="card kpi-card card-hover">
          <div className="kpi-icon-box primary">
            <Sparkles size={22} />
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">Recommended</span>
            <h3 className="kpi-val">{evaluatedScholarships.length}</h3>
            <span className="kpi-sub text-success">{eligibleCount} Fully Qualified</span>
          </div>
        </Link>

        <Link to="/app/saved" className="card kpi-card card-hover">
          <div className="kpi-icon-box secondary">
            <Bookmark size={22} />
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">Saved Schemes</span>
            <h3 className="kpi-val">{savedIds.length}</h3>
            <span className="kpi-sub">Ready to apply</span>
          </div>
        </Link>

        <Link to="/app/applications" className="card kpi-card card-hover">
          <div className="kpi-icon-box success">
            <FileText size={22} />
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">Active Applications</span>
            <h3 className="kpi-val">{applications.length}</h3>
            <span className="kpi-sub">Tracked in portal</span>
          </div>
        </Link>

        <div className="card kpi-card">
          <div className="kpi-icon-box warning">
            <Clock size={22} />
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">Next Deadline</span>
            <h3 className="kpi-val" style={{ fontSize: '1.25rem' }}>Nov 30</h3>
            <span className="kpi-sub">NSP Central Sector</span>
          </div>
        </div>
      </section>

      {/* CHARTS ROW */}
      <section className="dashboard-charts-grid">
        {/* Chart 1: Opportunity Breakdown */}
        <div className="card chart-card">
          <div className="chart-header">
            <h4>Available Schemes by Provider Type</h4>
            <span className="badge badge-neutral">Verified Catalog</span>
          </div>
          <div className="chart-container" style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={providerData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#8055D9" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="chart-footnote">
            Distribution across Indian National bodies, international trusts, and universities.
          </p>
        </div>

        {/* Chart 2: Student Application Pipeline */}
        <div className="card chart-card">
          <div className="chart-header">
            <h4>My Application Tracker Status</h4>
            <span className="badge badge-primary">Self-Reported</span>
          </div>
          {applications.length === 0 ? (
            <div className="chart-empty-state">
              <FileText size={32} className="text-muted" />
              <p>No active applications yet. Start preparing one from your recommended list!</p>
              <Link to="/app/scholarships" className="btn btn-secondary btn-sm">Find Scholarships</Link>
            </div>
          ) : (
            <div className="chart-container" style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={appStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {appStatusData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-legend">
                {appStatusData.map((d, i) => (
                  <div key={i} className="pie-legend-item">
                    <span className="legend-dot" style={{ backgroundColor: COLORS[i] }}></span>
                    <span>{d.name}: {d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* TOP RECOMMENDED SCHOLARSHIPS SECTION */}
      <section className="dashboard-section">
        <div className="section-header-split">
          <div>
            <h3>Personalized Recommendations</h3>
            <p className="sub-text">Calculated directly against your marks, stage of study, and domicile.</p>
          </div>
          <Link to="/app/recommended" className="btn btn-ghost btn-sm">
            View All ({evaluatedScholarships.length}) <ArrowRight size={16} />
          </Link>
        </div>

        <div className="recommendations-list">
          {topRecommendations.map(({ scholarship: s, status, matchScore }) => (
            <div key={s.id} className="card rec-item-card card-hover">
              <div className="rec-left">
                <div className="rec-title-row">
                  <h4 className="rec-title">{s.title}</h4>
                  <div className="rec-badges">
                    <span className={`badge ${
                      status === 'eligible' ? 'badge-success' : 
                      status === 'potentially-eligible' ? 'badge-info' : 
                      status === 'additional-info-required' ? 'badge-warning' : 'badge-danger'
                    }`}>
                      {status === 'eligible' ? 'Fully Eligible' : 
                       status === 'potentially-eligible' ? 'Potentially Eligible' : 
                       status === 'additional-info-required' ? 'Info Needed' : 'Not Eligible'}
                    </span>
                    <span className="badge badge-primary">{matchScore}% Match</span>
                  </div>
                </div>

                <span className="rec-provider">{s.provider}</span>

                <div className="rec-meta-pills">
                  <span className="meta-pill"><strong>Award:</strong> {s.awardAmountFormatted}</span>
                  <span className="meta-pill"><strong>Country:</strong> {s.country}</span>
                  <span className="meta-pill"><strong>Deadline:</strong> {s.deadline}</span>
                  <span className="meta-pill"><strong>Level:</strong> {s.educationLevel.join(', ')}</span>
                </div>
              </div>

              <div className="rec-actions">
                <Link to={`/app/scholarships/${s.id}`} className="btn btn-outline btn-sm">
                  View Criteria
                </Link>
                <Link to={`/app/apply/${s.id}`} className="btn btn-primary btn-sm">
                  Prepare Application
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TWO COLUMNS: DEADLINES & NEWS */}
      <section className="dashboard-split-columns">
        {/* Left: Upcoming Deadlines */}
        <div className="card dashboard-deadlines-card">
          <div className="card-header-flex">
            <div className="flex-title">
              <Clock size={18} className="text-primary" />
              <h4>Upcoming Application Deadlines</h4>
            </div>
            <span className="badge badge-neutral">Live Catalog</span>
          </div>

          <div className="deadlines-list">
            {upcomingDeadlines.map((sch) => (
              <div key={sch.id} className="deadline-row">
                <div className="deadline-date-box">
                  <span className="deadline-day">{sch.deadline.split('-')[2]}</span>
                  <span className="deadline-month">
                    {new Date(sch.deadline).toLocaleString('default', { month: 'short' })}
                  </span>
                </div>
                <div className="deadline-info">
                  <Link to={`/app/scholarships/${sch.id}`} className="deadline-sch-title">
                    {sch.title}
                  </Link>
                  <span className="deadline-provider">{sch.provider}</span>
                </div>
                <Link to={`/app/apply/${sch.id}`} className="btn btn-ghost btn-sm" title="Prepare application">
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Latest Education & Policy News */}
        <div className="card dashboard-news-card">
          <div className="card-header-flex">
            <div className="flex-title">
              <ShieldCheck size={18} className="text-primary" />
              <h4>Official Notifications & Policy</h4>
            </div>
            <Link to="/app/news" className="text-primary font-medium" style={{ fontSize: '0.85rem' }}>
              View All News →
            </Link>
          </div>

          <div className="dash-news-list">
            {latestNews.map(item => (
              <div key={item.id} className="dash-news-item">
                <span className="badge badge-primary">{item.category}</span>
                <Link to={`/news/${item.id}`} className="dash-news-headline">
                  {item.title}
                </Link>
                <p className="dash-news-snippet">{item.summary.substring(0, 90)}...</p>
                <div className="dash-news-footer">
                  <span className="dash-news-pub">{item.publisher}</span>
                  <span className="dash-news-time">{item.publicationDate}</span>
                </div>
              </div>
            ))}
          </div>

          {/* AI Callout Card inside dashboard */}
          <div className="ai-entry-callout">
            <div className="ai-callout-icon"><Bot size={22} /></div>
            <div>
              <h5>Need help with required certificates?</h5>
              <p>Ask our grounded AI Assistant for instant checklist breakdowns.</p>
            </div>
            <Link to="/app/assistant" className="btn btn-secondary btn-sm">
              Ask AI
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

