import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  FileCheck, 
  Upload, 
  ExternalLink, 
  AlertTriangle,
  Building,
  Calendar,
  Lock,
  Clock,
  Check
} from 'lucide-react';
import { scholarshipService } from '../../services/scholarships/scholarshipService';
import { applicationService } from '../../services/applications/applicationService';
import { eligibilityService } from '../../services/eligibility/eligibilityService';
import { useAuth } from '../../contexts/AuthContext';
import { ApplicationRecord, DocumentItem, ApplicationStatus } from '../../types';

export const ApplicationAssistantPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const scholarship = id ? scholarshipService.getById(id) : undefined;
  const [appRecord, setAppRecord] = useState<ApplicationRecord | null>(null);
  const [step, setStep] = useState<number>(1);
  const [submissionDate, setSubmissionDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [externalReferenceNo, setExternalReferenceNo] = useState<string>('');
  const [studentNotes, setStudentNotes] = useState<string>('');

  useEffect(() => {
    if (scholarship) {
      const app = applicationService.startOrGetApplication(scholarship);
      setAppRecord(app);
      setStep(app.preparationStep || 1);
      if (app.submittedDate) setSubmissionDate(app.submittedDate);
      if (app.studentNotes) setStudentNotes(app.studentNotes);
    }
  }, [scholarship]);

  if (!scholarship || !appRecord) {
    return (
      <div className="container section-padding">
        <div className="card empty-results-box">
          <h2>Application Initialization Error</h2>
          <p>Please select a valid scholarship from the catalog to start preparation.</p>
          <Link to="/app/scholarships" className="btn btn-primary">Find Scholarships</Link>
        </div>
      </div>
    );
  }

  const assessment = eligibilityService.assessEligibility(scholarship, user);

  // Simulated Document Upload Toggle
  const handleToggleUpload = (docId: string, currentUploaded: boolean) => {
    const updated = applicationService.updateDocument(
      appRecord.id, 
      docId, 
      !currentUploaded, 
      !currentUploaded ? `${docId}_scanned_document.pdf` : undefined
    );
    if (updated) setAppRecord({ ...updated });
  };

  const handleNextStep = () => {
    const nextStep = Math.min(step + 1, 9);
    setStep(nextStep);
    const updated = { ...appRecord, preparationStep: nextStep };
    if (nextStep === 7) {
      updated.status = 'ready-to-apply';
    }
    applicationService.saveApplication(updated);
    setAppRecord(updated);
  };

  const handlePrevStep = () => {
    const prev = Math.max(step - 1, 1);
    setStep(prev);
    const updated = { ...appRecord, preparationStep: prev };
    applicationService.saveApplication(updated);
    setAppRecord(updated);
  };

  const handleRecordSubmission = () => {
    const noteText = `Self-reported submission on ${scholarship.officialApplicationUrl}. Reference No: ${externalReferenceNo || 'N/A'}. Student Note: ${studentNotes}`;
    applicationService.updateStatus(appRecord.id, 'submitted', 'self-reported', noteText);
    navigate('/app/applications');
  };

  const stepTitles = [
    'Eligibility Review',
    'Official Instructions',
    'Required Documents',
    'Profile Information Check',
    'Document Upload Checklist',
    'Pre-Submission Review',
    'Official Portal Redirection',
    'Open External Portal',
    'Record Submission'
  ];

  const allDocumentsUploaded = appRecord.documents.every(d => d.uploaded);

  return (
    <div className="app-assistant-root">
      {/* Header */}
      <section className="assistant-header-banner">
        <div className="container">
          <button onClick={() => navigate('/app/applications')} className="back-nav-btn">
            <ArrowLeft size={16} /> Back to Applications
          </button>

          <div className="assistant-title-row">
            <div>
              <span className="badge badge-primary">Guided Preparation Assistant</span>
              <h1 className="assistant-title">{scholarship.title}</h1>
              <p className="assistant-provider"><Building size={16} /> {scholarship.provider}</p>
            </div>
            <div className="deadline-badge-pill">
              <Clock size={16} className="text-warning" />
              <span>Deadline: <strong>{scholarship.deadline}</strong></span>
            </div>
          </div>

          {/* Stepper progress */}
          <div className="stepper-track-wrap">
            <div className="stepper-label-row">
              <span>Step {step} of 9: <strong>{stepTitles[step - 1]}</strong></span>
              <span>{Math.round((step / 9) * 100)}% Prepared</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${(step / 9) * 100}%` }} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Assistant Body */}
      <section className="section-padding">
        <div className="container container-narrow">
          <div className="card assistant-step-card">
            {/* STEP 1: ELIGIBILITY REVIEW */}
            {step === 1 && (
              <div className="step-content">
                <span className="badge badge-primary">Step 1 of 9</span>
                <h2>Step 1: Formal Eligibility Verification</h2>
                <p>Ensure that your profile meets the published qualifying thresholds before gathering paperwork.</p>

                <div className={`eligibility-summary-box card ${assessment.status === 'eligible' ? 'border-success' : ''}`}>
                  <div className="eligibility-status-header">
                    <span className={`badge ${assessment.status === 'eligible' ? 'badge-success' : 'badge-warning'}`}>
                      {assessment.status.toUpperCase()}
                    </span>
                    <span className="score-val">{assessment.score}% Profile Alignment</span>
                  </div>
                  <p className="summary-desc">{assessment.summary}</p>
                </div>

                <div className="criteria-check-list">
                  {assessment.reasons.map((r, i) => (
                    <div key={i} className="criteria-check-item">
                      <div className="check-icon-circle">
                        {r.matched ? <Check size={16} className="text-success" /> : <AlertTriangle size={16} className="text-warning" />}
                      </div>
                      <div>
                        <h5>{r.criteria}</h5>
                        <p>{r.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: APPLICATION INSTRUCTIONS */}
            {step === 2 && (
              <div className="step-content">
                <span className="badge badge-primary">Step 2 of 9</span>
                <h2>Step 2: Read Important Portal Guidelines</h2>
                <p>Official procedural instructions issued by {scholarship.provider}:</p>

                <div className="instructions-callout card">
                  <div className="callout-icon"><AlertTriangle size={20} className="text-warning" /></div>
                  <div>
                    <h4>Never Pay Application Fees</h4>
                    <p>Government portal registration (scholarships.gov.in) and trusted international fellowships are free. Beware of touts asking for processing payments.</p>
                  </div>
                </div>

                <ol className="official-instructions-list">
                  {scholarship.importantInstructions.map((inst, i) => (
                    <li key={i}>{inst}</li>
                  ))}
                  <li>Ensure your Aadhaar name matches your 10th marksheet exact spelling.</li>
                  <li>Verify that your bank account is active, seeded with Aadhaar, and does not have an inactive DBT mandate.</li>
                </ol>
              </div>
            )}

            {/* STEP 3: REQUIRED DOCUMENTS */}
            {step === 3 && (
              <div className="step-content">
                <span className="badge badge-primary">Step 3 of 9</span>
                <h2>Step 3: Document Requirements Overview</h2>
                <p>You must gather valid scanned digital copies (PDF/JPEG, under 2 MB each):</p>

                <div className="docs-required-grid">
                  {scholarship.requiredDocuments.map((doc, i) => (
                    <div key={i} className="doc-spec-card card">
                      <FileCheck size={20} className="text-primary" />
                      <div>
                        <h4>{doc}</h4>
                        <span className="doc-authority-note">Must be current and clearly legible</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: PREPARE INFORMATION */}
            {step === 4 && (
              <div className="step-content">
                <span className="badge badge-primary">Step 4 of 9</span>
                <h2>Step 4: Candidate Information Review</h2>
                <p>The following profile details will be referenced when filling out the official application form:</p>

                <div className="candidate-info-summary card">
                  <div className="summary-field-row">
                    <span className="field-name">Candidate Name:</span>
                    <span className="field-val"><strong>{user?.name}</strong></span>
                  </div>
                  <div className="summary-field-row">
                    <span className="field-name">Stage of Study:</span>
                    <span className="field-val">{user?.educationLevel.toUpperCase()}</span>
                  </div>
                  <div className="summary-field-row">
                    <span className="field-name">Institution:</span>
                    <span className="field-val">
                      {user?.undergraduateDetails?.collegeName || user?.schoolDetails?.schoolName || user?.postgraduateDetails?.universityName}
                    </span>
                  </div>
                  <div className="summary-field-row">
                    <span className="field-name">Household Income:</span>
                    <span className="field-val">{user?.financialEligibility?.familyIncomeRange}</span>
                  </div>
                  <div className="summary-field-row">
                    <span className="field-name">State of Domicile:</span>
                    <span className="field-val">{user?.financialEligibility?.stateOrRegion}</span>
                  </div>
                </div>

                <p className="info-update-hint">
                  Need to correct any values? You can update your details in <Link to="/app/profile" className="text-primary font-medium">My Profile</Link> at any time.
                </p>
              </div>
            )}

            {/* STEP 5: DOCUMENT CHECKLIST & UPLOAD INTERFACE */}
            {step === 5 && (
              <div className="step-content">
                <span className="badge badge-primary">Step 5 of 9</span>
                <h2>Step 5: Document Preparation Checklist & Upload</h2>
                <p>Prepare and upload your files locally to ensure you have everything ready before opening the portal:</p>

                <div className="document-upload-manager">
                  {appRecord.documents.map((doc) => (
                    <div key={doc.id} className={`doc-upload-item card ${doc.uploaded ? 'uploaded' : ''}`}>
                      <div className="doc-item-left">
                        <FileCheck size={20} className={doc.uploaded ? 'text-success' : 'text-muted'} />
                        <div>
                          <h4>{doc.name}</h4>
                          <span className="doc-desc-text">
                            {doc.uploaded 
                              ? `Uploaded: ${doc.fileName} (${doc.fileSize}) on ${doc.uploadedAt}` 
                              : doc.description}
                          </span>
                        </div>
                      </div>

                      <div className="doc-item-right">
                        <button
                          type="button"
                          onClick={() => handleToggleUpload(doc.id, doc.uploaded)}
                          className={`btn btn-sm ${doc.uploaded ? 'btn-secondary' : 'btn-outline'}`}
                        >
                          {doc.uploaded ? <Check size={14} /> : <Upload size={14} />}
                          <span>{doc.uploaded ? 'Ready' : 'Upload File'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {!allDocumentsUploaded && (
                  <p className="upload-note text-warning">
                    *Tip: Click "Upload File" on each item above to simulate uploading all required documents.
                  </p>
                )}
              </div>
            )}

            {/* STEP 6: PRE-SUBMISSION REVIEW */}
            {step === 6 && (
              <div className="step-content">
                <span className="badge badge-primary">Step 6 of 9</span>
                <h2>Step 6: Pre-Submission Readiness Audit</h2>
                <p>Everything is compiled and validated for portal entry:</p>

                <div className="readiness-banner card">
                  <CheckCircle2 size={32} className="text-success" />
                  <div>
                    <h4>All Required Documents Compiled</h4>
                    <p>You have gathered all {appRecord.documents.length} mandatory certificates according to {scholarship.provider} guidelines.</p>
                  </div>
                </div>

                <div className="readiness-checklist-box">
                  <div className="r-check-item"><Check size={16} className="text-success" /> Eligibility confirmed (Score: {assessment.score}%)</div>
                  <div className="r-check-item"><Check size={16} className="text-success" /> Bank details verified & Aadhaar seeded</div>
                  <div className="r-check-item"><Check size={16} className="text-success" /> Income certificate within current fiscal year</div>
                  <div className="r-check-item"><Check size={16} className="text-success" /> Official closing date noted: {scholarship.deadline}</div>
                </div>
              </div>
            )}

            {/* STEP 7: OFFICIAL APPLICATION PORTAL LINK */}
            {step === 7 && (
              <div className="step-content">
                <span className="badge badge-primary">Step 7 of 9</span>
                <h2>Step 7: Official Application Portal Link</h2>
                <p>GRANTLY connects you directly to the genuine government or university portal:</p>

                <div className="portal-outlink-card card">
                  <div className="outlink-header">
                    <ShieldCheck size={28} className="text-success" />
                    <div>
                      <span className="portal-authority">{scholarship.officialInformationSource}</span>
                      <h3 className="portal-name">{scholarship.title}</h3>
                    </div>
                  </div>

                  <div className="portal-url-box">
                    <span className="url-label">Verified Official Application Destination:</span>
                    <a 
                      href={scholarship.officialApplicationUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="portal-actual-url"
                    >
                      {scholarship.officialApplicationUrl} <ExternalLink size={16} />
                    </a>
                  </div>

                  <div className="anti-phishing-note">
                    <Lock size={16} className="text-success" />
                    <span>Always verify that the website URL matches the official domain. Never enter confidential banking PINs or passcodes on external unofficial sites.</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 8: LET STUDENT OPEN THE OFFICIAL PORTAL */}
            {step === 8 && (
              <div className="step-content">
                <span className="badge badge-primary">Step 8 of 9</span>
                <h2>Step 8: Open Portal & Submit Form</h2>
                <p>Click the link below to open the official provider portal in a new tab:</p>

                <div className="open-portal-action-box card">
                  <p>When you click the button below, you will be navigated to:</p>
                  <h4 className="text-primary">{scholarship.officialApplicationUrl}</h4>
                  <p className="portal-action-sub">
                    Follow the portal's registration, fill in the applicant details you reviewed in Step 4, attach your verified documents from Step 5, and submit.
                  </p>

                  <a
                    href={scholarship.officialApplicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg"
                    style={{ margin: '1rem 0' }}
                  >
                    Launch Official Provider Portal <ExternalLink size={18} />
                  </a>

                  <p className="after-portal-note">
                    Once you receive your application acknowledgement or application ID from the portal, return to Step 9 to log your submission.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 9: RECORD SUBMISSION STATUS */}
            {step === 9 && (
              <div className="step-content">
                <span className="badge badge-success">Final Step 9 of 9</span>
                <h2>Step 9: Log Your Official Submission</h2>
                <p>Record your submission details to track deadlines and institution verification in your tracker:</p>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Official Portal Application / Reference ID *</label>
                    <input
                      type="text"
                      placeholder="e.g. NSP-2026-KA-498192 or CHEV-IND-2026"
                      value={externalReferenceNo}
                      onChange={(e) => setExternalReferenceNo(e.target.value)}
                      className="form-input"
                    />
                    <span className="form-helper">The acknowledgement number issued on the official portal.</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Date Submitted *</label>
                    <input
                      type="date"
                      value={submissionDate}
                      onChange={(e) => setSubmissionDate(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group full-grid-width">
                    <label className="form-label">Student Notes & Follow-up Actions</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Submitted online. Need to submit physical verification printout to College Dean office by Friday."
                      value={studentNotes}
                      onChange={(e) => setStudentNotes(e.target.value)}
                      className="form-textarea"
                    />
                  </div>
                </div>

                <div className="self-report-disclaimer card">
                  <p>
                    <strong>Provenance Integrity Note:</strong> GRANTLY records this as <em>"Submitted (Self-Reported)"</em> until institutional verification (L1) is confirmed by your college nodal officer.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleRecordSubmission}
                  className="btn btn-primary btn-lg full-w"
                >
                  <CheckCircle2 size={18} />
                  <span>Confirm Submission & Save to Application Tracker</span>
                </button>
              </div>
            )}

            {/* Stepper Navigation Footer */}
            <div className="assistant-controls-footer">
              {step > 1 ? (
                <button type="button" onClick={handlePrevStep} className="btn btn-outline">
                  <ArrowLeft size={16} /> Previous Step
                </button>
              ) : <div></div>}

              {step < 9 && (
                <button type="button" onClick={handleNextStep} className="btn btn-primary">
                  Next Step: {stepTitles[step]} <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

