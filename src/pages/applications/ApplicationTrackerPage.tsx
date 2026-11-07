import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  ArrowRight, 
  ExternalLink,
  Edit3,
  X,
  Filter
} from 'lucide-react';
import { applicationService } from '../../services/applications/applicationService';
import { ApplicationRecord, ApplicationStatus, StatusType } from '../../types';

export const ApplicationTrackerPage: React.FC = () => {
  const [applications, setApplications] = useState<ApplicationRecord[]>(() => {
    return applicationService.getApplications();
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus | 'all'>('all');
  const [editingApp, setEditingApp] = useState<ApplicationRecord | null>(null);

  // Edit status modal state
  const [modalStatus, setModalStatus] = useState<ApplicationStatus>('submitted');
  const [modalStatusType, setModalStatusType] = useState<StatusType>('self-reported');
  const [modalNote, setModalNote] = useState('');

  const refreshApplications = () => {
    setApplications(applicationService.getApplications());
  };

  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = app.scholarshipTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            app.provider.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [applications, searchQuery, selectedStatus]);

  const handleOpenEditModal = (app: ApplicationRecord) => {
    setEditingApp(app);
    setModalStatus(app.status);
    setModalStatusType(app.statusType);
    setModalNote('');
  };

  const handleSaveStatusUpdate = () => {
    if (!editingApp) return;
    applicationService.updateStatus(editingApp.id, modalStatus, modalStatusType, modalNote || undefined);
    refreshApplications();
    setEditingApp(null);
  };

  const statusBadgeClass = (status: ApplicationStatus) => {
    switch (status) {
      case 'approved': return 'badge-success';
      case 'submitted': return 'badge-info';
      case 'under-review': return 'badge-primary';
      case 'ready-to-apply': return 'badge-warning';
      case 'rejected': return 'badge-danger';
      default: return 'badge-neutral';
    }
  };

  return (
    <div className="tracker-page-root">
      {/* Header */}
      <section className="tracker-header-banner">
        <div className="container">
          <div className="header-meta-row">
            <span className="section-eyebrow">Application Central</span>
            <span className="provenance-tag">
              <CheckCircle2 size={16} className="text-success" />
              Verified Tracking Engine
            </span>
          </div>
          <h1 className="tracker-title">My Applications</h1>
          <p className="tracker-subtitle">
            Track your preparation milestones, document checklists, and self-reported submission statuses for all applied scholarships.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container">
          {/* Controls Bar */}
          <div className="tracker-controls-card card">
            <div className="tracker-controls-row">
              <div className="tracker-search-box">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search tracked applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="tracker-input"
                />
              </div>

              <div className="tracker-status-filter">
                <Filter size={16} />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as any)}
                  className="tracker-select"
                >
                  <option value="all">All Application Statuses</option>
                  <option value="draft">Draft</option>
                  <option value="preparing">Preparing Checklist</option>
                  <option value="ready-to-apply">Ready to Apply</option>
                  <option value="submitted">Submitted (Self-Reported)</option>
                  <option value="under-review">Under Verification (L1/L2)</option>
                  <option value="approved">Sanctioned / Approved</option>
                  <option value="rejected">Rejected / Ineligible</option>
                </select>
              </div>

              <Link to="/app/scholarships" className="btn btn-primary btn-sm">
                + Prepare New Scholarship
              </Link>
            </div>
          </div>

          {/* List or Empty State */}
          {filteredApps.length === 0 ? (
            <div className="card empty-results-box">
              <FileText size={48} className="text-muted empty-icon" />
              <h3>No Applications in this View</h3>
              <p>You have not created any applications under this filter status yet.</p>
              <Link to="/app/scholarships" className="btn btn-primary btn-sm">
                Browse Scholarships Catalog
              </Link>
            </div>
          ) : (
            <div className="applications-table-card card">
              <div className="table-responsive">
                <table className="apps-table">
                  <thead>
                    <tr>
                      <th>Scholarship & Provider</th>
                      <th>Status & Provenance</th>
                      <th>Submission Date</th>
                      <th>Closing Deadline</th>
                      <th>Documents</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApps.map((app) => {
                      const completedDocs = app.documents.filter(d => d.uploaded).length;
                      const totalDocs = app.documents.length;

                      return (
                        <tr key={app.id}>
                          <td>
                            <div className="table-title-cell">
                              <Link to={`/app/apply/${app.scholarshipId}`} className="app-title-link">
                                {app.scholarshipTitle}
                              </Link>
                              <span className="app-provider-sub">{app.provider}</span>
                              {app.studentNotes && (
                                <p className="app-notes-snippet">
                                  <strong>Note:</strong> {app.studentNotes}
                                </p>
                              )}
                            </div>
                          </td>

                          <td>
                            <div className="table-status-cell">
                              <span className={`badge ${statusBadgeClass(app.status)}`}>
                                {app.status.toUpperCase()}
                              </span>
                              <span className="status-provenance-type">
                                ({app.statusType})
                              </span>
                            </div>
                          </td>

                          <td>
                            <span className="table-date">
                              {app.submittedDate || 'Not yet submitted'}
                            </span>
                          </td>

                          <td>
                            <span className="table-date text-danger font-medium">
                              {app.deadline}
                            </span>
                          </td>

                          <td>
                            <div className="table-docs-cell">
                              <span className="docs-ratio font-medium">{completedDocs} / {totalDocs}</span>
                              <div className="progress-bar-bg mini">
                                <div 
                                  className="progress-bar-fill" 
                                  style={{ width: `${totalDocs > 0 ? (completedDocs / totalDocs) * 100 : 0}%` }}
                                />
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="table-actions-cell">
                              <Link 
                                to={`/app/apply/${app.scholarshipId}`} 
                                className="btn btn-secondary btn-sm"
                                title="Open Guided Assistant"
                              >
                                Continue Prep
                              </Link>
                              <button
                                onClick={() => handleOpenEditModal(app)}
                                className="btn btn-outline btn-sm"
                                title="Update Status"
                              >
                                <Edit3 size={14} /> Update
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Timeline of Recent Applications */}
          {applications.length > 0 && (
            <div className="card tracker-timeline-card">
              <h3>Recent Application Activity Log</h3>
              <div className="timeline-activity-list">
                {applications.flatMap(app => 
                  app.timeline.map((event, idx) => ({
                    ...event,
                    scholarshipTitle: app.scholarshipTitle,
                    key: `${app.id}-${idx}`
                  }))
                ).slice(0, 6).map((item) => (
                  <div key={item.key} className="timeline-activity-item">
                    <div className="activity-dot"></div>
                    <div className="activity-details">
                      <div className="activity-header">
                        <span className="activity-sch-title">{item.scholarshipTitle}</span>
                        <span className="activity-time">{item.timestamp}</span>
                      </div>
                      <p className="activity-note">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Update Status Modal */}
      {editingApp && (
        <div className="modal-backdrop" onClick={() => setEditingApp(null)}>
          <div className="card modal-content-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Update Application Status</h3>
              <button onClick={() => setEditingApp(null)} className="close-btn"><X size={18} /></button>
            </div>
            <div className="modal-body">
              <p className="modal-sch-title">
                Updating: <strong>{editingApp.scholarshipTitle}</strong>
              </p>

              <div className="form-group">
                <label className="form-label">Current Status</label>
                <select
                  value={modalStatus}
                  onChange={(e) => setModalStatus(e.target.value as ApplicationStatus)}
                  className="form-select"
                >
                  <option value="draft">Draft</option>
                  <option value="preparing">Preparing Checklist</option>
                  <option value="ready-to-apply">Ready to Apply</option>
                  <option value="submitted">Submitted</option>
                  <option value="under-review">Under Review / Verification (L1/L2)</option>
                  <option value="approved">Approved / Sanctioned</option>
                  <option value="rejected">Rejected / Disqualified</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Status Verification Authority</label>
                <select
                  value={modalStatusType}
                  onChange={(e) => setModalStatusType(e.target.value as StatusType)}
                  className="form-select"
                >
                  <option value="self-reported">Self-Reported (Student confirmed on portal)</option>
                  <option value="provider-confirmed">Provider-Confirmed (Official notification / PFMS letter)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Update Note / Portal Reference</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Cleared College Nodal Officer verification; currently pending with District Officer."
                  value={modalNote}
                  onChange={(e) => setModalNote(e.target.value)}
                  className="form-textarea"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setEditingApp(null)} className="btn btn-outline btn-sm">
                Cancel
              </button>
              <button onClick={handleSaveStatusUpdate} className="btn btn-primary btn-sm">
                Save Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

