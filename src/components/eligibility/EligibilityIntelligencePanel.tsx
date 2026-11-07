import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  BookmarkPlus,
  BookmarkCheck,
  FileCheck2,
  GraduationCap,
  Wallet,
  Globe,
  UserCheck,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Info,
  ClipboardList,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Scholarship, StudentProfile, EligibilityAssessment } from '../../types';
import { eligibilityService } from '../../services/eligibility/eligibilityService';

// ─── Types ───────────────────────────────────────────────────────────────────

type DimensionStatus = 'matched' | 'not-matched' | 'needs-review' | 'not-applicable';

interface EligibilityDimension {
  key: string;
  icon: React.ReactNode;
  label: string;
  status: DimensionStatus;
  studentValue: string;
  requiredValue: string;
  note: string;
}

interface Props {
  scholarship: Scholarship;
  student: StudentProfile | null;
  isSaved: boolean;
  onToggleSave: () => void;
  /** If true, renders in compact card-footer mode for list views */
  compact?: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function statusIcon(status: DimensionStatus) {
  switch (status) {
    case 'matched':
      return <CheckCircle2 size={18} className="eip-icon-matched" />;
    case 'not-matched':
      return <XCircle size={18} className="eip-icon-not-matched" />;
    case 'needs-review':
      return <AlertCircle size={18} className="eip-icon-review" />;
    case 'not-applicable':
      return <HelpCircle size={18} className="eip-icon-na" />;
  }
}

function statusBadgeClass(status: DimensionStatus) {
  switch (status) {
    case 'matched':     return 'eip-badge-matched';
    case 'not-matched': return 'eip-badge-not-matched';
    case 'needs-review':return 'eip-badge-review';
    case 'not-applicable': return 'eip-badge-na';
  }
}

function statusLabel(status: DimensionStatus) {
  switch (status) {
    case 'matched':       return 'Matched';
    case 'not-matched':   return 'Not Matched';
    case 'needs-review':  return 'Needs Review';
    case 'not-applicable':return 'Not Applicable';
  }
}

function overallBannerClass(assessment: EligibilityAssessment) {
  switch (assessment.status) {
    case 'eligible':                 return 'eip-banner-eligible';
    case 'potentially-eligible':     return 'eip-banner-potential';
    case 'additional-info-required': return 'eip-banner-review';
    case 'not-eligible':             return 'eip-banner-ineligible';
  }
}

function overallLabel(assessment: EligibilityAssessment) {
  switch (assessment.status) {
    case 'eligible':                 return 'Strong Match';
    case 'potentially-eligible':     return 'Potential Match';
    case 'additional-info-required': return 'Info Needed';
    case 'not-eligible':             return 'Not Eligible';
  }
}

/** Build a human-readable explanation paragraph from the assessment */
function buildExplanation(scholarship: Scholarship, assessment: EligibilityAssessment, student: StudentProfile | null): string {
  if (!student) {
    return 'Sign in and complete your profile to see a personalised eligibility explanation for this scholarship.';
  }

  const matched   = assessment.reasons.filter(r => r.matched).map(r => r.criteria);
  const unmatched = assessment.reasons.filter(r => !r.matched).map(r => r.criteria);
  const missing   = assessment.missingFields;

  let text = `This scholarship appears relevant to your academic profile`;

  if (matched.length) {
    text += ` because your ${matched.join(', ').toLowerCase()} meet the available criteria`;
  }

  if (unmatched.length && assessment.status === 'not-eligible') {
    text += `. However, there are mandatory requirements that your current profile does not satisfy: ${unmatched.join(', ').toLowerCase()}`;
  } else if (missing.length) {
    text += `. To confirm full eligibility, please provide: ${missing.join(', ').toLowerCase()}`;
  } else if (assessment.status === 'eligible') {
    text += ` and you currently satisfy all primary criteria for this scheme`;
  }

  text += '. GRANTLY cannot guarantee selection — final determination rests with the scholarship provider.';
  return text;
}

/** Map eligibilityService reasons → structured dimensions with icons */
function buildDimensions(
  scholarship: Scholarship,
  student: StudentProfile | null,
  assessment: EligibilityAssessment
): EligibilityDimension[] {
  const dims: EligibilityDimension[] = [];

  // 1. Education Level
  const eduReason = assessment.reasons.find(r => r.criteria === 'Education Level');
  dims.push({
    key: 'edu-level',
    icon: <GraduationCap size={16} />,
    label: 'Education Level',
    status: !student ? 'needs-review' : (eduReason?.matched ? 'matched' : 'not-matched'),
    studentValue: student?.educationLevel ? student.educationLevel.charAt(0).toUpperCase() + student.educationLevel.slice(1) : '—',
    requiredValue: scholarship.educationLevel.map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(', '),
    note: eduReason?.note || 'Education level comparison unavailable.',
  });

  // 2. Nationality
  const natReason = assessment.reasons.find(r => r.criteria === 'Nationality & Citizenship');
  dims.push({
    key: 'nationality',
    icon: <Globe size={16} />,
    label: 'Nationality',
    status: !student ? 'needs-review' : (natReason?.matched ? 'matched' : 'not-matched'),
    studentValue: student?.nationality || '—',
    requiredValue: scholarship.eligibleNationalities.join(', '),
    note: natReason?.note || '',
  });

  // 3. Academic Merit
  const meritReason = assessment.reasons.find(r => r.criteria === 'Academic Merit Minimum');
  if (scholarship.eligibilityCriteria.minPercentage) {
    dims.push({
      key: 'academic',
      icon: <TrendingUp size={16} />,
      label: 'Academic Performance',
      status: !student ? 'needs-review'
        : meritReason
          ? (meritReason.matched ? 'matched' : (assessment.missingFields.includes('Academic Marks / CGPA') ? 'needs-review' : 'not-matched'))
          : 'needs-review',
      studentValue: meritReason?.studentValue || (student ? 'Not provided' : '—'),
      requiredValue: `Min ${scholarship.eligibilityCriteria.minPercentage}%`,
      note: meritReason?.note || 'Enter your marks in profile to verify.',
    });
  } else {
    dims.push({
      key: 'academic',
      icon: <TrendingUp size={16} />,
      label: 'Academic Performance',
      status: 'matched',
      studentValue: student ? 'Any passing score' : '—',
      requiredValue: 'No minimum cutoff',
      note: 'No minimum academic cutoff is specified for this scholarship.',
    });
  }

  // 4. Family Income
  const incomeReason = assessment.reasons.find(r => r.criteria === 'Family Income Ceiling');
  if (scholarship.eligibilityCriteria.maxFamilyIncome) {
    dims.push({
      key: 'income',
      icon: <Wallet size={16} />,
      label: 'Income Criteria',
      status: !student ? 'needs-review'
        : incomeReason
          ? (incomeReason.matched ? 'matched' : (assessment.missingFields.includes('Family Annual Income') ? 'needs-review' : 'not-matched'))
          : 'needs-review',
      studentValue: incomeReason?.studentValue || (student ? 'Not provided' : '—'),
      requiredValue: `Max ₹${(scholarship.eligibilityCriteria.maxFamilyIncome / 100000).toFixed(1)} Lakh/yr`,
      note: incomeReason?.note || 'Update income information in your profile.',
    });
  } else {
    dims.push({
      key: 'income',
      icon: <Wallet size={16} />,
      label: 'Income Criteria',
      status: 'not-applicable',
      studentValue: '—',
      requiredValue: 'No income ceiling',
      note: 'This scholarship has no means-testing income requirement.',
    });
  }

  // 5. Gender Eligibility
  const genderReason = assessment.reasons.find(r => r.criteria === 'Gender Eligibility');
  if (scholarship.eligibilityCriteria.eligibleGenders && !scholarship.eligibilityCriteria.eligibleGenders.includes('all')) {
    dims.push({
      key: 'gender',
      icon: <UserCheck size={16} />,
      label: 'Gender Eligibility',
      status: !student ? 'needs-review'
        : genderReason
          ? (genderReason.matched ? 'matched' : 'needs-review')
          : 'needs-review',
      studentValue: student?.gender === 'prefer-not-to-say' ? 'Not disclosed' : (student?.gender || '—'),
      requiredValue: scholarship.eligibilityCriteria.eligibleGenders.join(', '),
      note: genderReason?.note || 'Disclose gender in profile to verify this criterion.',
    });
  } else {
    dims.push({
      key: 'gender',
      icon: <UserCheck size={16} />,
      label: 'Gender Eligibility',
      status: 'not-applicable',
      studentValue: 'Open to all',
      requiredValue: 'All genders',
      note: 'No specific gender restriction for this scholarship.',
    });
  }

  // 6. Required Documents
  const docCount = scholarship.requiredDocuments.length;
  dims.push({
    key: 'documents',
    icon: <FileCheck2 size={16} />,
    label: 'Required Documents',
    status: !student ? 'needs-review' : 'needs-review',
    studentValue: 'Profile vault available',
    requiredValue: `${docCount} document${docCount !== 1 ? 's' : ''} required`,
    note: 'Review the document checklist below to confirm you have all certificates ready.',
  });

  return dims;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export const EligibilityIntelligencePanel: React.FC<Props> = ({
  scholarship,
  student,
  isSaved,
  onToggleSave,
  compact = false,
}) => {
  const assessment = useMemo(
    () => eligibilityService.assessEligibility(scholarship, student),
    [scholarship, student]
  );

  const dimensions = useMemo(
    () => buildDimensions(scholarship, student, assessment),
    [scholarship, student, assessment]
  );

  const explanation = useMemo(
    () => buildExplanation(scholarship, assessment, student),
    [scholarship, assessment, student]
  );

  if (compact) {
    return <CompactEligibilityBar assessment={assessment} scholarship={scholarship} />;
  }

  return (
    <div className="eip-panel">
      {/* ── Header ── */}
      <div className="eip-header">
        <div className="eip-header-left">
          <div className="eip-header-icon">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="eip-title">Why This Scholarship Matches You</h3>
            <p className="eip-subtitle">
              Rule-based eligibility analysis against your saved profile data
            </p>
          </div>
        </div>
        <div className={`eip-overall-badge ${overallBannerClass(assessment)}`}>
          <span className="eip-score">{assessment.score}%</span>
          <span className="eip-score-label">{overallLabel(assessment)}</span>
        </div>
      </div>

      {/* ── Score Bar ── */}
      <div className="eip-score-bar-wrap">
        <div className="eip-score-track">
          <motion.div
            className={`eip-score-fill ${overallBannerClass(assessment)}-fill`}
            initial={{ width: 0 }}
            animate={{ width: `${assessment.score}%` }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          />
        </div>
        <span className="eip-score-hint">Profile match score (rule-based analysis)</span>
      </div>

      {/* ── Explanation ── */}
      <div className="eip-explanation-box">
        <Info size={16} className="eip-info-icon" />
        <p className="eip-explanation-text">{explanation}</p>
      </div>

      {/* ── Dimension Rows ── */}
      <div className="eip-dimensions-list">
        {dimensions.map((dim, i) => (
          <motion.div
            key={dim.key}
            className={`eip-dimension-row eip-row-${dim.status}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.07, duration: 0.3 }}
          >
            <div className="eip-row-left">
              <div className="eip-row-status-icon">{statusIcon(dim.status)}</div>
              <div className="eip-row-icon-label">{dim.icon}</div>
              <div className="eip-row-content">
                <span className="eip-row-label">{dim.label}</span>
                <div className="eip-row-values">
                  <span className="eip-your-val">
                    You: <strong>{dim.studentValue}</strong>
                  </span>
                  <span className="eip-sep">·</span>
                  <span className="eip-req-val">
                    Required: <strong>{dim.requiredValue}</strong>
                  </span>
                </div>
                {dim.note && <p className="eip-row-note">{dim.note}</p>}
              </div>
            </div>
            <span className={`eip-row-badge ${statusBadgeClass(dim.status)}`}>
              {statusLabel(dim.status)}
            </span>
          </motion.div>
        ))}
      </div>

      {/* ── Missing Fields Notice ── */}
      {assessment.missingFields.length > 0 && (
        <div className="eip-missing-box">
          <AlertCircle size={16} className="eip-missing-icon" />
          <div>
            <p className="eip-missing-title">Profile fields needed for full verification:</p>
            <div className="eip-missing-tags">
              {assessment.missingFields.map((f, i) => (
                <span key={i} className="eip-missing-tag">{f}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Next Steps ── */}
      <div className="eip-next-steps">
        <h4 className="eip-ns-title">Recommended Next Steps</h4>
        <ol className="eip-ns-list">
          {!student && (
            <li>
              <ArrowRight size={14} className="eip-ns-icon" />
              <span>Sign in and complete your GRANTLY student profile for personalised matching.</span>
            </li>
          )}
          {assessment.missingFields.length > 0 && student && (
            <li>
              <ArrowRight size={14} className="eip-ns-icon" />
              <Link to="/app/profile" className="eip-ns-link">
                Update your profile
              </Link>
              <span> with: {assessment.missingFields.join(', ')}.</span>
            </li>
          )}
          <li>
            <ArrowRight size={14} className="eip-ns-icon" />
            <span>
              Review all {scholarship.requiredDocuments.length} required documents listed in the checklist below.
            </span>
          </li>
          <li>
            <ArrowRight size={14} className="eip-ns-icon" />
            <span>Verify your eligibility on the official portal before submitting — GRANTLY is a preparation aid only.</span>
          </li>
          {assessment.status !== 'not-eligible' && (
            <li>
              <ArrowRight size={14} className="eip-ns-icon" />
              <Link to={`/app/apply/${scholarship.id}`} className="eip-ns-link">
                Start your application checklist
              </Link>
              <span> to track progress and document readiness.</span>
            </li>
          )}
        </ol>
      </div>

      {/* ── Action Bar ── */}
      <div className="eip-action-bar">
        <button
          onClick={onToggleSave}
          className={`btn btn-outline btn-sm ${isSaved ? 'eip-saved-active' : ''}`}
        >
          {isSaved
            ? <><BookmarkCheck size={16} className="text-primary" /> Saved</>
            : <><BookmarkPlus size={16} /> Save Scholarship</>
          }
        </button>
        <Link to={`/app/apply/${scholarship.id}`} className="btn btn-secondary btn-sm">
          <ClipboardList size={16} /> Prepare Checklist
        </Link>
        <Link to={`/app/eligibility`} className="btn btn-primary btn-sm">
          <FileCheck2 size={16} /> Full Eligibility Check
        </Link>
      </div>

      {/* ── Disclaimer ── */}
      <p className="eip-disclaimer">
        ⚠ This analysis is based solely on the data in your GRANTLY profile and publicly available criteria. 
        It is an informational aid — not an official eligibility determination. 
        Always verify directly with the scholarship provider.
      </p>
    </div>
  );
};

// ─── Compact bar for list cards ───────────────────────────────────────────────

const CompactEligibilityBar: React.FC<{
  assessment: EligibilityAssessment;
  scholarship: Scholarship;
}> = ({ assessment }) => {
  const matchedCount = assessment.reasons.filter(r => r.matched).length;
  const totalCount   = assessment.reasons.length;

  const colorClass =
    assessment.status === 'eligible'                 ? 'eip-compact-eligible' :
    assessment.status === 'potentially-eligible'     ? 'eip-compact-potential' :
    assessment.status === 'additional-info-required' ? 'eip-compact-review' :
                                                       'eip-compact-ineligible';

  return (
    <div className={`eip-compact-bar ${colorClass}`}>
      <div className="eip-compact-left">
        <Sparkles size={14} className="eip-compact-spark" />
        <span className="eip-compact-text">
          {matchedCount}/{totalCount} criteria matched
          {assessment.missingFields.length > 0 && ` · ${assessment.missingFields.length} field${assessment.missingFields.length > 1 ? 's' : ''} needed`}
        </span>
      </div>
      <div className="eip-compact-score">
        <div className="eip-compact-track">
          <div
            className="eip-compact-fill"
            style={{ width: `${assessment.score}%` }}
          />
        </div>
        <span className="eip-compact-pct">{assessment.score}%</span>
      </div>
    </div>
  );
};

