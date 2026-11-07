import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Sliders, 
  ArrowRight, 
  GraduationCap, 
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ALL_SCHOLARSHIPS } from '../../data/scholarships';
import { eligibilityService } from '../../services/eligibility/eligibilityService';
import { Scholarship, StudentProfile } from '../../types';

export const EligibilityCheckerPage: React.FC = () => {
  const { user } = useAuth();

  const [selectedScholarshipId, setSelectedScholarshipId] = useState<string>(
    ALL_SCHOLARSHIPS[0].id
  );

  // Simulation test state
  const [testMarks, setTestMarks] = useState<number>(
    user?.undergraduateDetails?.cgpaOrPercentage 
      ? (user.undergraduateDetails.gradingScale === '10' ? user.undergraduateDetails.cgpaOrPercentage * 9.5 : user.undergraduateDetails.cgpaOrPercentage)
      : user?.schoolDetails?.currentPerformance || 84
  );
  const [testIncome, setTestIncome] = useState<number>(
    user?.financialEligibility?.annualIncomeValue || 350000
  );
  const [testEducationLevel, setTestEducationLevel] = useState<any>(
    user?.educationLevel || 'undergraduate'
  );
  const [testGender, setTestGender] = useState<any>(user?.gender || 'male');

  const selectedScholarship = useMemo(() => {
    return ALL_SCHOLARSHIPS.find(s => s.id === selectedScholarshipId) || ALL_SCHOLARSHIPS[0];
  }, [selectedScholarshipId]);

  // Construct simulated student profile for what-if calculations
  const simulatedStudent: StudentProfile = useMemo(() => {
    return {
      ...(user || {
        id: 'sim-user',
        name: 'Guest Scholar',
        email: 'guest@example.com',
        dob: '2004-01-01',
        age: 22,
        gender: testGender,
        countryOfResidence: 'India',
        nationality: 'Indian',
        educationLevel: testEducationLevel,
        financialEligibility: {
          familyIncomeRange: `₹${testIncome.toLocaleString('en-IN')}`,
          annualIncomeValue: testIncome,
          stateOrRegion: 'Karnataka'
        },
        preferences: {
          destination: 'both',
          preferredCountries: ['India'],
          preferredDegreeLevel: 'Undergraduate',
          preferredField: 'All',
          providerTypes: ['government']
        },
        profileCompleted: true,
        createdAt: '',
        updatedAt: ''
      }),
      educationLevel: testEducationLevel,
      gender: testGender,
      undergraduateDetails: {
        collegeName: 'Simulated University',
        collegeLocation: 'India',
        degree: 'B.Tech',
        department: 'Engineering',
        currentYear: '3rd Year',
        currentSemester: 'Sem 5',
        cgpaOrPercentage: testMarks,
        gradingScale: '100',
        tenthMarks: testMarks,
        twelfthMarks: testMarks
      },
      schoolDetails: {
        schoolName: 'Simulated School',
        schoolLocation: 'India',
        board: 'CBSE',
        currentStandard: '11th',
        academicYear: '2026-2027',
        mediumOfInstruction: 'English',
        tenthMarks: testMarks,
        currentPerformance: testMarks
      },
      postgraduateDetails: {
        universityName: 'Simulated PG Institute',
        institutionLocation: 'India',
        previousDegree: 'UG',
        currentDegree: 'Master',
        department: 'Science',
        currentYear: '1st Year',
        currentSemester: 'Sem 1',
        ugPerformance: testMarks
      },
      financialEligibility: {
        familyIncomeRange: `₹${testIncome.toLocaleString('en-IN')}`,
        annualIncomeValue: testIncome,
        stateOrRegion: 'Karnataka'
      }
    };
  }, [user, testMarks, testIncome, testEducationLevel, testGender]);

  const assessment = useMemo(() => {
    return eligibilityService.assessEligibility(selectedScholarship, simulatedStudent);
  }, [selectedScholarship, simulatedStudent]);

  const handleResetSimulation = () => {
    if (user) {
      setTestMarks(
        user.undergraduateDetails?.cgpaOrPercentage 
          ? (user.undergraduateDetails.gradingScale === '10' ? user.undergraduateDetails.cgpaOrPercentage * 9.5 : user.undergraduateDetails.cgpaOrPercentage)
          : user.schoolDetails?.currentPerformance || 84
      );
      setTestIncome(user.financialEligibility?.annualIncomeValue || 350000);
      setTestEducationLevel(user.educationLevel);
      setTestGender(user.gender);
    }
  };

  return (
    <div className="checker-page-root">
      {/* Header */}
      <section className="checker-header-banner">
        <div className="container">
          <div className="header-meta-row">
            <span className="section-eyebrow">Interactive Simulator</span>
            <span className="provenance-tag">
              <ShieldCheck size={16} className="text-success" />
              100% Algorithmic Transparency
            </span>
          </div>
          <h1 className="checker-title">Scholarship Eligibility Engine</h1>
          <p className="checker-subtitle">
            Evaluate your qualification against official gazette criteria or test "what-if" scenarios by adjusting marks and income ceilings.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="checker-dual-grid">
            {/* Left: Input & Scheme Selector */}
            <div className="card checker-controls-card">
              <h3>1. Select Scholarship</h3>
              <p className="sub-text">Choose any opportunity from our verified catalog:</p>
              
              <div className="form-group">
                <select
                  value={selectedScholarshipId}
                  onChange={(e) => setSelectedScholarshipId(e.target.value)}
                  className="form-select scheme-dropdown"
                >
                  {ALL_SCHOLARSHIPS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.country} • {s.providerType})
                    </option>
                  ))}
                </select>
              </div>

              <div className="selected-scheme-brief card">
                <div className="brief-badges">
                  <span className="badge badge-primary">{selectedScholarship.providerType.toUpperCase()}</span>
                  <span className="badge badge-neutral">{selectedScholarship.country}</span>
                </div>
                <h4>{selectedScholarship.title}</h4>
                <p className="brief-award">Benefit: <strong>{selectedScholarship.awardAmountFormatted}</strong></p>
                <span className="brief-source">Source: {selectedScholarship.officialInformationSource}</span>
              </div>

              <hr className="checker-divider" />

              <div className="simulation-header-row">
                <h3>2. Candidate Parameters (What-If Simulator)</h3>
                <button onClick={handleResetSimulation} className="reset-sim-btn" title="Reset to your saved profile">
                  <RotateCcw size={14} /> Reset
                </button>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span>Current Academic Score:</span>
                  <strong>{testMarks.toFixed(1)}%</strong>
                </label>
                <input
                  type="range"
                  min="40"
                  max="100"
                  step="1"
                  value={testMarks}
                  onChange={(e) => setTestMarks(Number(e.target.value))}
                  className="range-slider"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span>Annual Family Income:</span>
                  <strong>₹{(testIncome / 100000).toFixed(1)} Lakh / yr</strong>
                </label>
                <input
                  type="range"
                  min="100000"
                  max="1500000"
                  step="50000"
                  value={testIncome}
                  onChange={(e) => setTestIncome(Number(e.target.value))}
                  className="range-slider"
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Study Level</label>
                  <select
                    value={testEducationLevel}
                    onChange={(e) => setTestEducationLevel(e.target.value)}
                    className="form-select"
                  >
                    <option value="school">School</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="postgraduate">Postgraduate</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select
                    value={testGender}
                    onChange={(e) => setTestGender(e.target.value)}
                    className="form-select"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right: Results & Analysis */}
            <div className="card checker-results-card">
              <div className="results-badge-header">
                <span className={`badge ${
                  assessment.status === 'eligible' ? 'badge-success' : 
                  assessment.status === 'potentially-eligible' ? 'badge-info' : 
                  assessment.status === 'additional-info-required' ? 'badge-warning' : 'badge-danger'
                }`} style={{ fontSize: '0.9rem', padding: '0.4rem 0.9rem' }}>
                  {assessment.status.toUpperCase()}
                </span>
                <span className="results-score-pill">{assessment.score}% Match</span>
              </div>

              <h2 className="results-summary-text">{assessment.summary}</h2>

              {/* Criteria Reasons Breakdown List */}
              <div className="breakdown-list">
                <h4>Verified Criteria Verification</h4>
                {assessment.reasons.map((r, i) => (
                  <div key={i} className={`breakdown-row ${r.matched ? 'passed' : 'failed'}`}>
                    <div className="row-icon">
                      {r.matched ? <CheckCircle2 size={18} className="text-success" /> : <AlertCircle size={18} className="text-danger" />}
                    </div>
                    <div className="row-text">
                      <div className="row-title-flex">
                        <h5>{r.criteria}</h5>
                        <span className={`badge ${r.matched ? 'badge-success' : 'badge-danger'}`}>
                          {r.matched ? 'Criteria Met' : 'Unmet'}
                        </span>
                      </div>
                      {r.studentValue && (
                        <p className="row-values">
                          Evaluated: <strong>{r.studentValue}</strong> | Benchmark: <strong>{r.requiredValue}</strong>
                        </p>
                      )}
                      <p className="row-note">{r.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Row */}
              <div className="results-action-row">
                <Link to={`/app/apply/${selectedScholarship.id}`} className="btn btn-primary btn-md">
                  Start Application Preparation <ArrowRight size={16} />
                </Link>
                <Link to={`/scholarships/${selectedScholarship.id}`} className="btn btn-outline btn-sm">
                  View Full Prospectus
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

