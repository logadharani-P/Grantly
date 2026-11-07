import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  User, 
  GraduationCap, 
  DollarSign, 
  Compass, 
  CheckCircle2, 
  Save, 
  ShieldCheck, 
  AlertCircle,
  FileText,
  MapPin,
  Calendar,
  Sparkles,
  Award,
  Upload,
  Download,
  Lock,
  ExternalLink,
  Building,
  Check,
  RefreshCw,
  Camera,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useSavedScholarships } from '../../contexts/SavedScholarshipsContext';
import { EducationLevel, Gender, StudentProfile, ProviderType } from '../../types';

export const StudentProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { user, updateProfile } = useAuth();
  const { savedIds } = useSavedScholarships();

  const [activeTab, setActiveTab] = useState<'academic' | 'personal' | 'financial' | 'preferences' | 'vault'>('academic');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [avatarIndex, setAvatarIndex] = useState(0);

  // Avatar presets simulation
  const avatarColors = ['#8055D9', '#3B82F6', '#10B981', '#EC4899', '#F59E0B'];

  // Form State
  const [name, setName] = useState(user?.name || 'Aarav Mehta');
  const [dob, setDob] = useState(user?.dob || '2004-05-14');
  const [age, setAge] = useState(user?.age || 22);
  const [gender, setGender] = useState<Gender>(user?.gender || 'male');
  const [countryOfResidence, setCountryOfResidence] = useState(user?.countryOfResidence || 'India');
  const [nationality, setNationality] = useState(user?.nationality || 'Indian');
  const [educationLevel, setEducationLevel] = useState<EducationLevel>(user?.educationLevel || 'undergraduate');

  // Academic Info
  const [institutionName, setInstitutionName] = useState(
    user?.undergraduateDetails?.collegeName || user?.schoolDetails?.schoolName || user?.postgraduateDetails?.universityName || 'National Institute of Technology'
  );
  const [locationName, setLocationName] = useState(
    user?.undergraduateDetails?.collegeLocation || user?.schoolDetails?.schoolLocation || user?.postgraduateDetails?.institutionLocation || 'Karnataka, India'
  );
  const [degreeName, setDegreeName] = useState(
    user?.undergraduateDetails?.degree || user?.schoolDetails?.currentStandard || user?.postgraduateDetails?.currentDegree || 'Bachelor of Technology (B.Tech)'
  );
  const [departmentName, setDepartmentName] = useState(
    user?.undergraduateDetails?.department || user?.postgraduateDetails?.department || 'Computer Science and Engineering'
  );
  const [currentYear, setCurrentYear] = useState(
    user?.undergraduateDetails?.currentYear || user?.postgraduateDetails?.currentYear || '3rd Year'
  );
  const [currentSemester, setCurrentSemester] = useState(
    user?.undergraduateDetails?.currentSemester || user?.postgraduateDetails?.currentSemester || 'Semester 5'
  );
  const [scoreValue, setScoreValue] = useState<number>(
    user?.undergraduateDetails?.cgpaOrPercentage || user?.schoolDetails?.currentPerformance || user?.postgraduateDetails?.ugPerformance || 8.4
  );
  const [gradingScale, setGradingScale] = useState<'10' | '100'>(
    user?.undergraduateDetails?.gradingScale || '10'
  );
  const [tenthMarks, setTenthMarks] = useState<number>(
    user?.undergraduateDetails?.tenthMarks || user?.schoolDetails?.tenthMarks || 92.5
  );
  const [twelfthMarks, setTwelfthMarks] = useState<number>(
    user?.undergraduateDetails?.twelfthMarks || user?.schoolDetails?.twelfthMarks || 88.0
  );

  // Financial & Category Info
  const [familyIncomeRange, setFamilyIncomeRange] = useState(
    user?.financialEligibility?.familyIncomeRange || '₹2,50,000 – ₹4,50,000'
  );
  const [annualIncomeValue, setAnnualIncomeValue] = useState<number>(
    user?.financialEligibility?.annualIncomeValue || 350000
  );
  const [stateOrRegion, setStateOrRegion] = useState(
    user?.financialEligibility?.stateOrRegion || 'Karnataka'
  );
  const [category, setCategory] = useState(
    user?.financialEligibility?.category || 'General / EWS'
  );
  const [disabilityStatus, setDisabilityStatus] = useState(
    user?.financialEligibility?.disabilityStatus || 'No'
  );
  const [parentName, setParentName] = useState(
    user?.financialEligibility?.parentOrGuardianName || ''
  );
  const [guardianConsent, setGuardianConsent] = useState(
    user?.financialEligibility?.guardianConsentForMinor || false
  );

  // Preferences
  const [destination, setDestination] = useState<'india' | 'international' | 'both'>(
    user?.preferences?.destination || 'both'
  );
  const [preferredField, setPreferredField] = useState(
    user?.preferences?.preferredField || 'Engineering, Technology & Applied Sciences'
  );
  const [preferredDegreeLevel, setPreferredDegreeLevel] = useState(
    user?.preferences?.preferredDegreeLevel || 'Undergraduate & Masters'
  );
  const [providerTypes, setProviderTypes] = useState<ProviderType[]>(
    user?.preferences?.providerTypes || ['government', 'private', 'university']
  );

  // Simulated Vault Documents State
  const [vaultDocs, setVaultDocs] = useState([
    { id: 'v1', name: 'Class 10th Board Certificate', verified: true, date: '2026-08-14', size: '1.2 MB' },
    { id: 'v2', name: 'Class 12th Board Marksheet', verified: true, date: '2026-08-14', size: '1.4 MB' },
    { id: 'v3', name: 'Revenue Authority Income Certificate', verified: true, date: '2026-09-02', size: '890 KB' },
    { id: 'v4', name: 'Institution Bonafide & Fee Receipt', verified: true, date: '2026-10-10', size: '1.1 MB' },
    { id: 'v5', name: 'Aadhaar (DBT-Seeded Bank Passbook)', verified: true, date: '2026-10-10', size: '650 KB' },
  ]);

  // Automated age calculation
  useEffect(() => {
    if (!dob) return;
    const b = new Date(dob);
    const now = new Date();
    let calculated = now.getFullYear() - b.getFullYear();
    const m = now.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < b.getDate())) calculated--;
    setAge(calculated >= 0 ? calculated : 0);
  }, [dob]);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!user) return;

    const updatedProfile: StudentProfile = {
      ...user,
      name: name.trim(),
      dob,
      age,
      gender,
      countryOfResidence,
      nationality,
      educationLevel,
      undergraduateDetails: educationLevel === 'undergraduate' ? {
        collegeName: institutionName,
        collegeLocation: locationName,
        degree: degreeName,
        department: departmentName,
        currentYear,
        currentSemester,
        cgpaOrPercentage: Number(scoreValue),
        gradingScale,
        tenthMarks: Number(tenthMarks),
        twelfthMarks: Number(twelfthMarks)
      } : user.undergraduateDetails,
      schoolDetails: educationLevel === 'school' ? {
        schoolName: institutionName,
        schoolLocation: locationName,
        board: 'CBSE',
        currentStandard: degreeName,
        academicYear: '2026-2027',
        mediumOfInstruction: 'English',
        tenthMarks: Number(tenthMarks),
        currentPerformance: Number(scoreValue)
      } : user.schoolDetails,
      postgraduateDetails: educationLevel === 'postgraduate' ? {
        universityName: institutionName,
        institutionLocation: locationName,
        previousDegree: 'UG Degree',
        currentDegree: degreeName,
        department: departmentName,
        currentYear,
        currentSemester,
        ugPerformance: Number(scoreValue)
      } : user.postgraduateDetails,
      financialEligibility: {
        familyIncomeRange,
        annualIncomeValue: Number(annualIncomeValue),
        stateOrRegion,
        category,
        disabilityStatus,
        guardianConsentForMinor: guardianConsent,
        parentOrGuardianName: parentName
      },
      preferences: {
        destination,
        preferredCountries: user.preferences?.preferredCountries || ['India', 'United Kingdom', 'Germany'],
        preferredField,
        preferredDegreeLevel,
        providerTypes
      },
      profileCompleted: true,
      updatedAt: new Date().toISOString()
    };

    updateProfile(updatedProfile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleRecalculateMatches = () => {
    setIsRecalculating(true);
    handleSave();
    setTimeout(() => {
      setIsRecalculating(false);
    }, 800);
  };

  const cycleAvatarColor = () => {
    setAvatarIndex((prev) => (prev + 1) % avatarColors.length);
  };

  return (
    <div className="modern-profile-page">
      {/* 1. TOP HERO PROFILE BANNER */}
      <section className="profile-hero-card card">
        <div className="profile-hero-backdrop"></div>
        <div className="profile-hero-content">
          <div className="profile-avatar-wrapper">
            <div 
              className="modern-avatar-circle"
              style={{ background: `linear-gradient(135deg, ${avatarColors[avatarIndex]}, #2D224D)` }}
            >
              <span>{name.charAt(0).toUpperCase()}</span>
              <button 
                type="button" 
                onClick={cycleAvatarColor} 
                className="avatar-edit-overlay"
                title="Change theme color"
              >
                <Camera size={14} />
              </button>
            </div>
            <span className="online-status-badge" title="Active Scholar Session"></span>
          </div>

          <div className="profile-meta-info">
            <div className="profile-name-badges-row">
              <h1 className="profile-main-name">{name}</h1>
              <div className="profile-pills-cluster">
                <span className="badge badge-success">
                  <ShieldCheck size={13} /> {t('profile.badgeVerified')}
                </span>
                <span className="badge badge-primary">
                  <Award size={13} /> {t('profile.badgeComplete')} (100%)
                </span>
              </div>
            </div>

            <p className="profile-institution-line">
              <Building size={16} />
              <span>{institutionName}</span>
              <span className="bullet-sep">•</span>
              <MapPin size={16} />
              <span>{stateOrRegion}, {countryOfResidence}</span>
            </p>

            <div className="profile-tags-inline">
              <span className="mini-tag">ID: <strong>GRNT-2026-8819</strong></span>
              <span className="mini-tag">Level: <strong>{educationLevel.toUpperCase()}</strong></span>
              <span className="mini-tag">Citizen: <strong>{nationality}</strong></span>
              <span className="mini-tag">Age: <strong>{age} Years</strong></span>
            </div>
          </div>

          <div className="profile-hero-actions">
            <button 
              type="button" 
              onClick={handleRecalculateMatches} 
              disabled={isRecalculating}
              className="btn btn-secondary btn-sm"
            >
              <RefreshCw size={15} className={isRecalculating ? 'spin-anim' : ''} />
              <span>{isRecalculating ? 'Recalculating...' : t('profile.recalculate')}</span>
            </button>
            <button 
              type="button" 
              onClick={() => handleSave()} 
              className="btn btn-primary btn-sm"
            >
              <Save size={15} />
              <span>{t('profile.saveChanges')}</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Stats Bar */}
        <div className="profile-stats-ribbon">
          <div className="ribbon-cell">
            <span className="ribbon-label">{t('profile.stats.academicScore')}</span>
            <div className="ribbon-val-row">
              <span className="ribbon-val text-primary">
                {gradingScale === '10' ? `${scoreValue} / 10 CGPA` : `${scoreValue}%`}
              </span>
              <span className="badge badge-success">Top Tier</span>
            </div>
          </div>

          <div className="ribbon-cell">
            <span className="ribbon-label">{t('profile.stats.incomeBracket')}</span>
            <div className="ribbon-val-row">
              <span className="ribbon-val">{familyIncomeRange}</span>
              <span className="badge badge-neutral">Means Tested</span>
            </div>
          </div>

          <div className="ribbon-cell">
            <span className="ribbon-label">Class 12th Marks</span>
            <div className="ribbon-val-row">
              <span className="ribbon-val">{twelfthMarks}%</span>
              <span className="badge badge-info">Cutoff Passed</span>
            </div>
          </div>

          <div className="ribbon-cell">
            <span className="ribbon-label">{t('profile.stats.targetCountry')}</span>
            <div className="ribbon-val-row">
              <span className="ribbon-val">{destination === 'both' ? 'India & Global' : destination.toUpperCase()}</span>
              <span className="badge badge-primary">{savedIds.length} Saved</span>
            </div>
          </div>
        </div>
      </section>

      {/* Save Success Alert Notification */}
      {savedSuccess && (
        <div className="profile-toast-alert card">
          <div className="toast-left">
            <CheckCircle2 size={22} className="text-success" />
            <div>
              <h4>{t('profile.savedSuccessTitle')}</h4>
              <p>{t('profile.savedSuccessDesc')}</p>
            </div>
          </div>
          <Link to="/app/recommended" className="btn btn-secondary btn-sm">
            View New Recommendations <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* 2. SEGMENTED NAVIGATION TABS */}
      <div className="modern-profile-tabs-bar">
        <button
          type="button"
          onClick={() => setActiveTab('academic')}
          className={`tab-segment-btn ${activeTab === 'academic' ? 'active' : ''}`}
        >
          <GraduationCap size={18} />
          <span>{t('profile.tabs.academic')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('personal')}
          className={`tab-segment-btn ${activeTab === 'personal' ? 'active' : ''}`}
        >
          <User size={18} />
          <span>{t('profile.tabs.personal')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('financial')}
          className={`tab-segment-btn ${activeTab === 'financial' ? 'active' : ''}`}
        >
          <DollarSign size={18} />
          <span>{t('profile.tabs.financial')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('preferences')}
          className={`tab-segment-btn ${activeTab === 'preferences' ? 'active' : ''}`}
        >
          <Compass size={18} />
          <span>{t('profile.tabs.preferences')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('vault')}
          className={`tab-segment-btn ${activeTab === 'vault' ? 'active' : ''}`}
        >
          <FileText size={18} />
          <span>{t('profile.tabs.vault')}</span>
          <span className="badge badge-success mini-badge">5 Verified</span>
        </button>
      </div>

      {/* 3. ACTIVE TAB CONTENT PANEL */}
      <div className="tab-pane-container">
        {/* TAB 1: ACADEMIC CREDENTIALS */}
        {activeTab === 'academic' && (
          <div className="card modern-pane-card">
            <div className="pane-header">
              <div className="pane-header-left">
                <div className="pane-icon-bubble"><GraduationCap size={22} /></div>
                <div>
                  <h3>Academic Credentials & Degree Standing</h3>
                  <p>Accurate grades are required by Central Sector and merit fellowships.</p>
                </div>
              </div>
              <span className="badge badge-success">Official Gazette Cutoffs Evaluated</span>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Current Stage of Education *</label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value as EducationLevel)}
                  className="form-select modern-field"
                >
                  <option value="school">School Student (Class 6th – 12th)</option>
                  <option value="undergraduate">Undergraduate Student (B.Tech, B.Sc, MBBS, etc.)</option>
                  <option value="postgraduate">Postgraduate / Masters / Ph.D</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Institution / University Name *</label>
                <input
                  type="text"
                  required
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  placeholder="e.g. National Institute of Technology"
                  className="form-input modern-field"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Degree & Specialization *</label>
                <input
                  type="text"
                  required
                  value={degreeName}
                  onChange={(e) => setDegreeName(e.target.value)}
                  placeholder="e.g. B.Tech Computer Engineering"
                  className="form-input modern-field"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Department / Major Branch</label>
                <input
                  type="text"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  placeholder="e.g. Computer Science"
                  className="form-input modern-field"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Current Academic Year & Semester</label>
                <div className="input-split-pair">
                  <select
                    value={currentYear}
                    onChange={(e) => setCurrentYear(e.target.value)}
                    className="form-select modern-field"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="5th Year">5th Year</option>
                  </select>
                  <select
                    value={currentSemester}
                    onChange={(e) => setCurrentSemester(e.target.value)}
                    className="form-select modern-field"
                  >
                    <option value="Semester 1">Semester 1</option>
                    <option value="Semester 2">Semester 2</option>
                    <option value="Semester 3">Semester 3</option>
                    <option value="Semester 4">Semester 4</option>
                    <option value="Semester 5">Semester 5</option>
                    <option value="Semester 6">Semester 6</option>
                    <option value="Semester 7">Semester 7</option>
                    <option value="Semester 8">Semester 8</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Current Performance Score</label>
                <div className="input-split-pair">
                  <input
                    type="number"
                    step="0.05"
                    value={scoreValue}
                    onChange={(e) => setScoreValue(Number(e.target.value))}
                    className="form-input modern-field"
                  />
                  <select
                    value={gradingScale}
                    onChange={(e) => setGradingScale(e.target.value as '10' | '100')}
                    className="form-select modern-field"
                  >
                    <option value="10">10-Point CGPA</option>
                    <option value="100">Percentage %</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Class 10th Board Marks (%)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={tenthMarks}
                  onChange={(e) => setTenthMarks(Number(e.target.value))}
                  className="form-input modern-field"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Class 12th Board Marks (%) *</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={twelfthMarks}
                  onChange={(e) => setTwelfthMarks(Number(e.target.value))}
                  className="form-input modern-field"
                />
                <span className="form-helper">Crucial for Central Sector percentile qualification (Top 20th percentile).</span>
              </div>
            </div>

            {/* In-card Save Footer */}
            <div className="pane-card-footer">
              <button
                type="button"
                onClick={handleRecalculateMatches}
                disabled={isRecalculating}
                className="btn btn-secondary btn-md"
              >
                <RefreshCw size={15} className={isRecalculating ? 'spin-anim' : ''} />
                <span>{isRecalculating ? 'Recalculating...' : t('profile.recalculate')}</span>
              </button>
              <button
                type="button"
                onClick={() => handleSave()}
                className="btn btn-primary btn-md"
              >
                <Save size={15} />
                <span>{t('profile.saveChanges')}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: PERSONAL & RESIDENCY */}
        {activeTab === 'personal' && (
          <div className="card modern-pane-card">
            <div className="pane-header">
              <div className="pane-header-left">
                <div className="pane-icon-bubble"><User size={22} /></div>
                <div>
                  <h3>Personal Information & Domicile</h3>
                  <p>Used to verify citizenship and state domicile quotas.</p>
                </div>
              </div>
              <span className="badge badge-neutral">Confidential Data</span>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input modern-field"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth *</label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="form-input modern-field"
                />
                <span className="form-helper">
                  Current Verified Age: <strong>{age} years old</strong>
                </span>
              </div>

              <div className="form-group">
                <label className="form-label">Gender (Voluntary)</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as Gender)}
                  className="form-select modern-field"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other / Non-Binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                <span className="form-helper">Required for specialized affirmative schemes like AICTE Pragati for girls.</span>
              </div>

              <div className="form-group">
                <label className="form-label">Country of Residence *</label>
                <select
                  value={countryOfResidence}
                  onChange={(e) => setCountryOfResidence(e.target.value)}
                  className="form-select modern-field"
                >
                  <option value="India">India</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Germany">Germany</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Other">Other International</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Nationality / Citizenship *</label>
                <input
                  type="text"
                  required
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="form-input modern-field"
                />
              </div>

              <div className="form-group">
                <label className="form-label">State or Region of Domicile *</label>
                <select
                  value={stateOrRegion}
                  onChange={(e) => setStateOrRegion(e.target.value)}
                  className="form-select modern-field"
                >
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Other State">Other Indian State / UT</option>
                </select>
              </div>
            </div>

            {/* In-card Save Footer */}
            <div className="pane-card-footer">
              <button
                type="button"
                onClick={handleRecalculateMatches}
                disabled={isRecalculating}
                className="btn btn-secondary btn-md"
              >
                <RefreshCw size={15} className={isRecalculating ? 'spin-anim' : ''} />
                <span>{isRecalculating ? 'Recalculating...' : t('profile.recalculate')}</span>
              </button>
              <button
                type="button"
                onClick={() => handleSave()}
                className="btn btn-primary btn-md"
              >
                <Save size={15} />
                <span>{t('profile.saveChanges')}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: FINANCIAL & CATEGORY ELIGIBILITY */}
        {activeTab === 'financial' && (
          <div className="card modern-pane-card">
            <div className="pane-header">
              <div className="pane-header-left">
                <div className="pane-icon-bubble"><DollarSign size={22} /></div>
                <div>
                  <h3>Financial Need & Affirmative Criteria</h3>
                  <p>Evaluates means-tested grants like Central Sector, NMMSS, and Tata Trusts.</p>
                </div>
              </div>
              <div className="privacy-badge-pill">
                <Lock size={14} className="text-primary" />
                <span>Encrypted Client Storage</span>
              </div>
            </div>

            <div className="financial-slider-card card">
              <div className="slider-header-flex">
                <div>
                  <h4>Gross Annual Family Income Ceiling</h4>
                  <p>Income from all family members combined as per official Revenue Authority certificate.</p>
                </div>
                <div className="income-amount-pill">
                  ₹{(annualIncomeValue / 100000).toFixed(1)} Lakh / year
                </div>
              </div>

              <input
                type="range"
                min="100000"
                max="1500000"
                step="25000"
                value={annualIncomeValue}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setAnnualIncomeValue(val);
                  if (val <= 250000) setFamilyIncomeRange('Under ₹2,50,000');
                  else if (val <= 450000) setFamilyIncomeRange('₹2,50,000 – ₹4,50,000');
                  else if (val <= 800000) setFamilyIncomeRange('₹4,50,000 – ₹8,00,000');
                  else setFamilyIncomeRange('Above ₹8,00,000');
                }}
                className="range-slider modern-slider"
              />

              <div className="slider-threshold-marks">
                <span>₹1.0L (EWS)</span>
                <span className="mark-highlight">₹4.5L (Central Sector Cap)</span>
                <span className="mark-highlight">₹8.0L (Pragati Cap)</span>
                <span>₹15L+ (Merit Only)</span>
              </div>
            </div>

            <div className="form-grid" style={{ marginTop: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">Reservation / Social Category (Optional)</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select modern-field"
                >
                  <option value="General / EWS">General / Economically Weaker Section (EWS)</option>
                  <option value="OBC-NCL">Other Backward Class (OBC-NCL)</option>
                  <option value="SC">Scheduled Caste (SC)</option>
                  <option value="ST">Scheduled Tribe (ST)</option>
                  <option value="Minority Community">Minority Community</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Differently-Abled / PwD Status (Optional)</label>
                <select
                  value={disabilityStatus}
                  onChange={(e) => setDisabilityStatus(e.target.value)}
                  className="form-select modern-field"
                >
                  <option value="No">No</option>
                  <option value="Yes - 40%+ Benchmarked Disability">Yes - 40%+ Benchmarked (AICTE Saksham eligible)</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Safeguard for minor */}
            {age < 18 && (
              <div className="guardian-consent-box card" style={{ marginTop: '1.5rem' }}>
                <h4>Parental / Legal Guardian Consent</h4>
                <p>Because the student is {age} years old (under 18), please confirm guardian approval.</p>
                <div className="form-group">
                  <label className="form-label">Parent / Guardian Full Name</label>
                  <input
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. Ramesh Mehta"
                    className="form-input modern-field"
                  />
                </div>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={guardianConsent}
                    onChange={(e) => setGuardianConsent(e.target.checked)}
                  />
                  <span>Guardian confirms awareness of scholarship discovery and application preparation.</span>
                </label>
              </div>
            )}

            {/* In-card Save Footer */}
            <div className="pane-card-footer">
              <button
                type="button"
                onClick={handleRecalculateMatches}
                disabled={isRecalculating}
                className="btn btn-secondary btn-md"
              >
                <RefreshCw size={15} className={isRecalculating ? 'spin-anim' : ''} />
                <span>{isRecalculating ? 'Recalculating...' : t('profile.recalculate')}</span>
              </button>
              <button
                type="button"
                onClick={() => handleSave()}
                className="btn btn-primary btn-md"
              >
                <Save size={15} />
                <span>{t('profile.saveChanges')}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: SCHOLARSHIP TARGETS & PREFERENCES */}
        {activeTab === 'preferences' && (
          <div className="card modern-pane-card">
            <div className="pane-header">
              <div className="pane-header-left">
                <div className="pane-icon-bubble"><Compass size={22} /></div>
                <div>
                  <h3>Scholarship Destination & Study Targets</h3>
                  <p>Fine-tune which schemes receive priority in your personalized recommendations.</p>
                </div>
              </div>
            </div>

            <div className="form-group full-grid-width">
              <label className="form-label">Preferred Study Destination *</label>
              <div className="radio-cards-row">
                <div 
                  className={`radio-card ${destination === 'india' ? 'active' : ''}`}
                  onClick={() => setDestination('india')}
                >
                  <h4>India Only</h4>
                  <p>National Scholarship Portal, AICTE, state governments and Indian private trusts.</p>
                </div>
                <div 
                  className={`radio-card ${destination === 'international' ? 'active' : ''}`}
                  onClick={() => setDestination('international')}
                >
                  <h4>International Study Abroad</h4>
                  <p>UK Chevening, US Fulbright-Nehru, Germany DAAD, Erasmus Mundus.</p>
                </div>
                <div 
                  className={`radio-card ${destination === 'both' ? 'active' : ''}`}
                  onClick={() => setDestination('both')}
                >
                  <h4>Both India & International</h4>
                  <p>Show all opportunities matching your degree level across India and abroad.</p>
                </div>
              </div>
            </div>

            <div className="form-grid" style={{ marginTop: '1.5rem' }}>
              <div className="form-group full-grid-width">
                <label className="form-label">Target Field of Study</label>
                <input
                  type="text"
                  value={preferredField}
                  onChange={(e) => setPreferredField(e.target.value)}
                  className="form-input modern-field"
                />
              </div>

              <div className="form-group full-grid-width">
                <label className="form-label">Scholarship Provider Categories</label>
                <div className="checkbox-pills-row">
                  <label className="checkbox-pill">
                    <input
                      type="checkbox"
                      checked={providerTypes.includes('government')}
                      onChange={(e) => {
                        if (e.target.checked) setProviderTypes([...providerTypes, 'government']);
                        else setProviderTypes(providerTypes.filter(p => p !== 'government'));
                      }}
                    />
                    <span>Government Scholarships (NSP, AICTE, Ministry of Education)</span>
                  </label>
                  <label className="checkbox-pill">
                    <input
                      type="checkbox"
                      checked={providerTypes.includes('private')}
                      onChange={(e) => {
                        if (e.target.checked) setProviderTypes([...providerTypes, 'private']);
                        else setProviderTypes(providerTypes.filter(p => p !== 'private'));
                      }}
                    />
                    <span>Private Charitable Foundations (Tata Trusts, K.C. Mahindra)</span>
                  </label>
                  <label className="checkbox-pill">
                    <input
                      type="checkbox"
                      checked={providerTypes.includes('university')}
                      onChange={(e) => {
                        if (e.target.checked) setProviderTypes([...providerTypes, 'university']);
                        else setProviderTypes(providerTypes.filter(p => p !== 'university'));
                      }}
                    />
                    <span>University Consortia & International Fellowships (Erasmus, Inlaks)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* In-card Save Footer */}
            <div className="pane-card-footer">
              <button
                type="button"
                onClick={handleRecalculateMatches}
                disabled={isRecalculating}
                className="btn btn-secondary btn-md"
              >
                <RefreshCw size={15} className={isRecalculating ? 'spin-anim' : ''} />
                <span>{isRecalculating ? 'Recalculating...' : t('profile.recalculate')}</span>
              </button>
              <button
                type="button"
                onClick={() => handleSave()}
                className="btn btn-primary btn-md"
              >
                <Save size={15} />
                <span>{t('profile.saveChanges')}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: DOCUMENT VAULT */}
        {activeTab === 'vault' && (
          <div className="card modern-pane-card">
            <div className="pane-header">
              <div className="pane-header-left">
                <div className="pane-icon-bubble"><FileText size={22} /></div>
                <div>
                  <h3>{t('profile.vaultTitle')}</h3>
                  <p>{t('profile.vaultSubtitle')}</p>
                </div>
              </div>
              <span className="badge badge-success">5 Certificates Ready</span>
            </div>

            <div className="vault-documents-grid">
              {vaultDocs.map((doc) => (
                <div key={doc.id} className="vault-doc-card card">
                  <div className="vault-doc-icon">
                    <FileText size={24} className="text-primary" />
                  </div>
                  <div className="vault-doc-details">
                    <h4>{doc.name}</h4>
                    <span className="vault-doc-meta">
                      {doc.size} • Last verified {doc.date}
                    </span>
                    <span className="badge badge-success vault-badge">
                      <Check size={12} /> {t('profile.markVerified')}
                    </span>
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-ghost btn-sm"
                    title="Simulate re-upload"
                    onClick={() => alert(`Simulating file refresh for: ${doc.name}`)}
                  >
                    <Upload size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="vault-advisory-box card">
              <ShieldCheck size={20} className="text-success" />
              <div>
                <h4>DigiLocker & Official Verification Ready</h4>
                <p>
                  Documents compiled in GRANTLY match the standard file formatting required by the National Scholarship Portal and international admission portals.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. BOTTOM SAVE CONTROL BAR — static, no overlap */}
      <div className="profile-bottom-floating-bar">
        <div className="floating-bar-left">
          <Sparkles size={18} className="text-primary" />
          <span>Profile changes dynamically recalculate all scholarship eligibility matches.</span>
        </div>
        <div className="floating-bar-right">
          <button
            type="button"
            onClick={handleRecalculateMatches}
            disabled={isRecalculating}
            className="btn btn-secondary btn-md"
          >
            <RefreshCw size={16} className={isRecalculating ? 'spin-anim' : ''} />
            <span>{isRecalculating ? 'Recalculating...' : t('profile.recalculate')}</span>
          </button>
          <button
            type="button"
            onClick={() => handleSave()}
            className="btn btn-primary btn-md"
          >
            <Save size={16} />
            <span>{t('profile.saveChanges')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
