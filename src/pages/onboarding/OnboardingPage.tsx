import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Compass, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  User, 
  GraduationCap, 
  BookOpen, 
  DollarSign, 
  Compass as CompassIcon, 
  ClipboardCheck, 
  ShieldAlert, 
  AlertCircle,
  Edit2
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { EducationLevel, Gender, StudentProfile, ProviderType } from '../../types';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState(user?.name || '');
  const [dob, setDob] = useState(user?.dob || '2004-05-14');
  const [age, setAge] = useState(user?.age || 22);
  const [gender, setGender] = useState<Gender>(user?.gender || 'prefer-not-to-say');
  const [countryOfResidence, setCountryOfResidence] = useState(user?.countryOfResidence || 'India');
  const [nationality, setNationality] = useState(user?.nationality || 'Indian');

  // Step 2: Education Level
  const [educationLevel, setEducationLevel] = useState<EducationLevel>(user?.educationLevel || 'undergraduate');

  // Step 3A: School Details
  const [schoolName, setSchoolName] = useState(user?.schoolDetails?.schoolName || '');
  const [schoolLocation, setSchoolLocation] = useState(user?.schoolDetails?.schoolLocation || '');
  const [schoolBoard, setSchoolBoard] = useState(user?.schoolDetails?.board || 'CBSE');
  const [currentStandard, setCurrentStandard] = useState(user?.schoolDetails?.currentStandard || '11th');
  const [academicYear, setAcademicYear] = useState(user?.schoolDetails?.academicYear || '2026-2027');
  const [mediumOfInstruction, setMediumOfInstruction] = useState(user?.schoolDetails?.mediumOfInstruction || 'English');
  const [tenthMarks, setTenthMarks] = useState<number | undefined>(user?.schoolDetails?.tenthMarks || 88);
  const [twelfthMarks, setTwelfthMarks] = useState<number | undefined>(user?.schoolDetails?.twelfthMarks);
  const [currentSchoolPerformance, setCurrentSchoolPerformance] = useState<number | undefined>(user?.schoolDetails?.currentPerformance || 85);

  // Step 3B: Undergraduate Details
  const [collegeName, setCollegeName] = useState(user?.undergraduateDetails?.collegeName || 'National Institute of Technology');
  const [collegeLocation, setCollegeLocation] = useState(user?.undergraduateDetails?.collegeLocation || 'Karnataka, India');
  const [ugDegree, setUgDegree] = useState(user?.undergraduateDetails?.degree || 'B.Tech / B.E.');
  const [ugDepartment, setUgDepartment] = useState(user?.undergraduateDetails?.department || 'Computer Science and Engineering');
  const [ugYear, setUgYear] = useState(user?.undergraduateDetails?.currentYear || '2nd Year');
  const [ugSemester, setUgSemester] = useState(user?.undergraduateDetails?.currentSemester || 'Semester 4');
  const [ugPerformance, setUgPerformance] = useState<number>(user?.undergraduateDetails?.cgpaOrPercentage || 8.5);
  const [ugGradingScale, setUgGradingScale] = useState<'10' | '100'>(user?.undergraduateDetails?.gradingScale || '10');
  const [ugTenthMarks, setUgTenthMarks] = useState<number>(user?.undergraduateDetails?.tenthMarks || 92);
  const [ugTwelfthMarks, setUgTwelfthMarks] = useState<number>(user?.undergraduateDetails?.twelfthMarks || 89);

  // Step 3C: Postgraduate Details
  const [pgUniversity, setPgUniversity] = useState(user?.postgraduateDetails?.universityName || '');
  const [pgLocation, setPgLocation] = useState(user?.postgraduateDetails?.institutionLocation || '');
  const [pgPreviousDegree, setPgPreviousDegree] = useState(user?.postgraduateDetails?.previousDegree || 'B.Tech');
  const [pgCurrentDegree, setPgCurrentDegree] = useState(user?.postgraduateDetails?.currentDegree || 'M.Tech / M.S.');
  const [pgDepartment, setPgDepartment] = useState(user?.postgraduateDetails?.department || 'Data Science');
  const [pgYear, setPgYear] = useState(user?.postgraduateDetails?.currentYear || '1st Year');
  const [pgSemester, setPgSemester] = useState(user?.postgraduateDetails?.currentSemester || 'Semester 2');
  const [pgUgPerformance, setPgUgPerformance] = useState<number>(user?.postgraduateDetails?.ugPerformance || 82);
  const [pgAdditionalDetails, setPgAdditionalDetails] = useState(user?.postgraduateDetails?.additionalAcademicDetails || '');

  // Step 4: Financial & Category
  const [familyIncomeRange, setFamilyIncomeRange] = useState(user?.financialEligibility?.familyIncomeRange || '₹2,50,000 – ₹5,00,000');
  const [annualIncomeValue, setAnnualIncomeValue] = useState<number>(user?.financialEligibility?.annualIncomeValue || 350000);
  const [stateOrRegion, setStateOrRegion] = useState(user?.financialEligibility?.stateOrRegion || 'Karnataka');
  const [category, setCategory] = useState(user?.financialEligibility?.category || 'General / EWS');
  const [disabilityStatus, setDisabilityStatus] = useState(user?.financialEligibility?.disabilityStatus || 'No');
  const [guardianConsentForMinor, setGuardianConsentForMinor] = useState(user?.financialEligibility?.guardianConsentForMinor || false);
  const [parentName, setParentName] = useState(user?.financialEligibility?.parentOrGuardianName || '');

  // Step 5: Preferences
  const [destination, setDestination] = useState<'india' | 'international' | 'both'>(user?.preferences?.destination || 'both');
  const [preferredCountries, setPreferredCountries] = useState<string[]>(user?.preferences?.preferredCountries || ['India', 'United Kingdom', 'Germany']);
  const [preferredField, setPreferredField] = useState(user?.preferences?.preferredField || 'Engineering, Technology & Applied Sciences');
  const [preferredDegreeLevel, setPreferredDegreeLevel] = useState(user?.preferences?.preferredDegreeLevel || 'Undergraduate & Masters');
  const [providerTypes, setProviderTypes] = useState<ProviderType[]>(user?.preferences?.providerTypes || ['government', 'private', 'university']);

  // Calculate age automatically from DOB
  useEffect(() => {
    if (!dob) return;
    const birthDate = new Date(dob);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    setAge(calculatedAge >= 0 ? calculatedAge : 0);
  }, [dob]);

  // Handle Step Validation
  const validateAndProceed = () => {
    setError(null);

    if (currentStep === 1) {
      if (!name.trim()) {
        setError('Please enter your full name');
        return;
      }
      if (!dob) {
        setError('Please enter your date of birth');
        return;
      }
      if (age < 10 || age > 80) {
        setError('Please enter a valid date of birth');
        return;
      }
      if (!countryOfResidence) {
        setError('Please select your country of residence');
        return;
      }
      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      // Step 2 is selecting level
      setCurrentStep(3);
      return;
    }

    if (currentStep === 3) {
      // Step 3 depends on level
      if (educationLevel === 'school') {
        if (!schoolName.trim()) {
          setError('Please provide your school name');
          return;
        }
      } else if (educationLevel === 'undergraduate') {
        if (!collegeName.trim()) {
          setError('Please provide your college or university name');
          return;
        }
        if (!ugTenthMarks || !ugTwelfthMarks) {
          setError('Please provide your Class 10th and 12th percentage');
          return;
        }
      } else if (educationLevel === 'postgraduate') {
        if (!pgUniversity.trim()) {
          setError('Please provide your university name');
          return;
        }
      }
      setCurrentStep(4);
      return;
    }

    if (currentStep === 4) {
      if (!stateOrRegion.trim()) {
        setError('Please select your state / region of domicile');
        return;
      }
      if (age < 18 && !guardianConsentForMinor) {
        setError('For minor applicants, parent/guardian acknowledgment is required.');
        return;
      }
      setCurrentStep(5);
      return;
    }

    if (currentStep === 5) {
      setCurrentStep(6);
      return;
    }
  };

  const handleComplete = () => {
    const updatedProfile: StudentProfile = {
      id: user?.id || 'student-' + Date.now(),
      name: name.trim(),
      email: user?.email || 'student@example.edu',
      dob,
      age,
      gender,
      countryOfResidence,
      nationality,
      educationLevel,
      schoolDetails: educationLevel === 'school' ? {
        schoolName,
        schoolLocation,
        board: schoolBoard,
        currentStandard,
        academicYear,
        mediumOfInstruction,
        tenthMarks: parseInt(currentStandard) > 10 ? tenthMarks : undefined,
        twelfthMarks: currentStandard === '12th' ? twelfthMarks : undefined,
        currentPerformance: currentSchoolPerformance
      } : undefined,
      undergraduateDetails: educationLevel === 'undergraduate' ? {
        collegeName,
        collegeLocation,
        degree: ugDegree,
        department: ugDepartment,
        currentYear: ugYear,
        currentSemester: ugSemester,
        cgpaOrPercentage: ugPerformance,
        gradingScale: ugGradingScale,
        tenthMarks: ugTenthMarks,
        twelfthMarks: ugTwelfthMarks
      } : undefined,
      postgraduateDetails: educationLevel === 'postgraduate' ? {
        universityName: pgUniversity,
        institutionLocation: pgLocation,
        previousDegree: pgPreviousDegree,
        currentDegree: pgCurrentDegree,
        department: pgDepartment,
        currentYear: pgYear,
        currentSemester: pgSemester,
        ugPerformance: pgUgPerformance,
        additionalAcademicDetails: pgAdditionalDetails
      } : undefined,
      financialEligibility: {
        familyIncomeRange,
        annualIncomeValue,
        stateOrRegion,
        category,
        disabilityStatus,
        guardianConsentForMinor,
        parentOrGuardianName: parentName
      },
      preferences: {
        destination,
        preferredCountries,
        preferredField,
        preferredDegreeLevel,
        providerTypes
      },
      profileCompleted: true,
      createdAt: user?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    updateProfile(updatedProfile);
    navigate('/app/dashboard');
  };

  const stepNames = [
    'Personal Info',
    'Study Level',
    'Academic Details',
    'Eligibility & Income',
    'Preferences',
    'Profile Review'
  ];

  return (
    <div className="onboarding-root">
      {/* Header bar */}
      <header className="onboarding-header">
        <div className="container onboarding-header-container">
          <Link to="/" className="brand-logo">
            <div className="logo-icon-box">
              <Compass className="logo-svg" size={24} />
            </div>
            <div className="brand-text-wrap">
              <span className="brand-name">GRANTLY</span>
              <span className="brand-sub">STUDENT ONBOARDING</span>
            </div>
          </Link>

          <div className="step-counter-badge">
            <span>Step {currentStep} of 6: <strong>{stepNames[currentStep - 1]}</strong></span>
          </div>
        </div>
      </header>

      {/* Main Step Body */}
      <main className="container onboarding-body">
        {/* Progress Bar */}
        <div className="onboarding-progress-track">
          <div 
            className="onboarding-progress-fill" 
            style={{ width: `${(currentStep / 6) * 100}%` }}
          />
        </div>

        {/* Step Indicator Bullets */}
        <div className="onboarding-step-bullets">
          {stepNames.map((name, i) => (
            <div 
              key={i} 
              className={`step-bullet ${currentStep === i + 1 ? 'current' : currentStep > i + 1 ? 'completed' : ''}`}
            >
              <div className="bullet-circle">
                {currentStep > i + 1 ? <CheckCircle2 size={16} /> : i + 1}
              </div>
              <span className="bullet-label desktop-only">{name}</span>
            </div>
          ))}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="card onboarding-error-alert">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Step Container */}
        <div className="card onboarding-card">
          {/* STEP 1: PERSONAL INFORMATION */}
          {currentStep === 1 && (
            <div className="onboarding-step-view">
              <div className="step-intro">
                <span className="badge badge-primary">Step 1 of 6</span>
                <h2>Personal Information</h2>
                <p>Provide verified identification details to match age and domicile requirements.</p>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="As listed on official identification"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="form-input"
                  />
                  <span className="form-helper">
                    Automatically calculated age: <strong>{age} years old</strong>
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">Gender (Voluntary)</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Gender)}
                    className="form-select"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other / Non-Binary</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  <span className="form-helper">
                    Required only for gender-specific schemes such as AICTE Pragati for girls.
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">Country of Residence *</label>
                  <select
                    value={countryOfResidence}
                    onChange={(e) => setCountryOfResidence(e.target.value)}
                    className="form-select"
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
                    placeholder="e.g. Indian"
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: EDUCATIONAL LEVEL */}
          {currentStep === 2 && (
            <div className="onboarding-step-view">
              <div className="step-intro">
                <span className="badge badge-primary">Step 2 of 6</span>
                <h2>Select Your Current Education Level</h2>
                <p>GRANTLY adapts the next academic questions based on your selection.</p>
              </div>

              <div className="education-options-grid">
                <div 
                  className={`card edu-choice-card ${educationLevel === 'school' ? 'selected' : ''}`}
                  onClick={() => setEducationLevel('school')}
                >
                  <div className="edu-choice-icon"><BookOpen size={32} /></div>
                  <h3>School Student</h3>
                  <span className="edu-sub">Class 6th to 12th</span>
                  <p>Discover National Means-cum-Merit, state talent searches, and school-level fee assistance.</p>
                  <div className="radio-pill">
                    <input 
                      type="radio" 
                      name="edu_level" 
                      checked={educationLevel === 'school'} 
                      onChange={() => setEducationLevel('school')} 
                    />
                  </div>
                </div>

                <div 
                  className={`card edu-choice-card ${educationLevel === 'undergraduate' ? 'selected' : ''}`}
                  onClick={() => setEducationLevel('undergraduate')}
                >
                  <div className="edu-choice-icon"><GraduationCap size={32} /></div>
                  <h3>Undergraduate Student</h3>
                  <span className="edu-sub">B.Tech, B.Sc, B.Com, MBBS, etc.</span>
                  <p>Central Sector Schemes, AICTE Pragati, state higher education scholarships, and private grants.</p>
                  <div className="radio-pill">
                    <input 
                      type="radio" 
                      name="edu_level" 
                      checked={educationLevel === 'undergraduate'} 
                      onChange={() => setEducationLevel('undergraduate')} 
                    />
                  </div>
                </div>

                <div 
                  className={`card edu-choice-card ${educationLevel === 'postgraduate' ? 'selected' : ''}`}
                  onClick={() => setEducationLevel('postgraduate')}
                >
                  <div className="edu-choice-icon"><CompassIcon size={32} /></div>
                  <h3>Postgraduate / Master / Ph.D</h3>
                  <span className="edu-sub">M.Tech, M.Sc, MBA, Chevening, Fulbright</span>
                  <p>National PG fellowships, research stipends, and fully-funded international study abroad awards.</p>
                  <div className="radio-pill">
                    <input 
                      type="radio" 
                      name="edu_level" 
                      checked={educationLevel === 'postgraduate'} 
                      onChange={() => setEducationLevel('postgraduate')} 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3A: SCHOOL STUDENT */}
          {currentStep === 3 && educationLevel === 'school' && (
            <div className="onboarding-step-view">
              <div className="step-intro">
                <span className="badge badge-primary">Step 3 of 6</span>
                <h2>School Student Information</h2>
                <p>Provide details about your current school enrollment.</p>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">School Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kendriya Vidyalaya or Delhi Public School"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">School Location (City / District) *</label>
                  <input
                    type="text"
                    placeholder="e.g. Bengaluru, Karnataka"
                    value={schoolLocation}
                    onChange={(e) => setSchoolLocation(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Education Board *</label>
                  <select
                    value={schoolBoard}
                    onChange={(e) => setSchoolBoard(e.target.value)}
                    className="form-select"
                  >
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State Board">State Secondary Board</option>
                    <option value="IB / Cambridge">IB / Cambridge</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Current Standard / Class *</label>
                  <select
                    value={currentStandard}
                    onChange={(e) => setCurrentStandard(e.target.value)}
                    className="form-select"
                  >
                    <option value="6th">Class 6th</option>
                    <option value="7th">Class 7th</option>
                    <option value="8th">Class 8th</option>
                    <option value="9th">Class 9th</option>
                    <option value="10th">Class 10th</option>
                    <option value="11th">Class 11th</option>
                    <option value="12th">Class 12th</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Current Academic Performance (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="e.g. 85"
                    value={currentSchoolPerformance || ''}
                    onChange={(e) => setCurrentSchoolPerformance(Number(e.target.value))}
                    className="form-input"
                  />
                </div>

                {parseInt(currentStandard) > 10 && (
                  <div className="form-group">
                    <label className="form-label">Class 10th Board Marks (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="e.g. 88"
                      value={tenthMarks || ''}
                      onChange={(e) => setTenthMarks(Number(e.target.value))}
                      className="form-input"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3B: UNDERGRADUATE STUDENT */}
          {currentStep === 3 && educationLevel === 'undergraduate' && (
            <div className="onboarding-step-view">
              <div className="step-intro">
                <span className="badge badge-primary">Step 3 of 6</span>
                <h2>Undergraduate Academic Details</h2>
                <p>Provide your college enrollment and prior secondary school achievements.</p>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">College / University Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. National Institute of Technology Karnataka"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">College Location *</label>
                  <input
                    type="text"
                    placeholder="e.g. Surathkal, Karnataka"
                    value={collegeLocation}
                    onChange={(e) => setCollegeLocation(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Degree *</label>
                  <select
                    value={ugDegree}
                    onChange={(e) => setUgDegree(e.target.value)}
                    className="form-select"
                  >
                    <option value="B.Tech / B.E.">B.Tech / B.E. (Engineering)</option>
                    <option value="MBBS / BDS">MBBS / BDS (Medicine)</option>
                    <option value="B.Sc">B.Sc (Pure Sciences / Nursing)</option>
                    <option value="B.Com / BBA">B.Com / BBA (Commerce / Management)</option>
                    <option value="B.A. / Law">B.A. / B.A. LL.B (Humanities / Law)</option>
                    <option value="Other Degree">Other Undergraduate Degree</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Department / Major *</label>
                  <input
                    type="text"
                    placeholder="e.g. Computer Science and Engineering"
                    value={ugDepartment}
                    onChange={(e) => setUgDepartment(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Current Academic Year</label>
                  <select
                    value={ugYear}
                    onChange={(e) => setUgYear(e.target.value)}
                    className="form-select"
                  >
                    <option value="1st Year">1st Year (Fresher)</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="5th Year">5th Year</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Current CGPA or Marks</label>
                  <div className="inline-input-group">
                    <input
                      type="number"
                      step="0.1"
                      placeholder="e.g. 8.5"
                      value={ugPerformance || ''}
                      onChange={(e) => setUgPerformance(Number(e.target.value))}
                      className="form-input"
                    />
                    <select
                      value={ugGradingScale}
                      onChange={(e) => setUgGradingScale(e.target.value as '10' | '100')}
                      className="form-select narrow-select"
                    >
                      <option value="10">On 10-scale CGPA</option>
                      <option value="100">Percentage %</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Class 10th Marks (%) *</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="e.g. 92"
                    value={ugTenthMarks || ''}
                    onChange={(e) => setUgTenthMarks(Number(e.target.value))}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Class 12th Marks (%) *</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="e.g. 88"
                    value={ugTwelfthMarks || ''}
                    onChange={(e) => setUgTwelfthMarks(Number(e.target.value))}
                    className="form-input"
                  />
                  <span className="form-helper">
                    Important: Central Sector Scheme requires above 80th percentile.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3C: POSTGRADUATE STUDENT */}
          {currentStep === 3 && educationLevel === 'postgraduate' && (
            <div className="onboarding-step-view">
              <div className="step-intro">
                <span className="badge badge-primary">Step 3 of 6</span>
                <h2>Postgraduate Academic Details</h2>
                <p>Provide details of your undergraduate qualification and master degree.</p>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">University / Institution Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. IIT Bombay / Delhi University"
                    value={pgUniversity}
                    onChange={(e) => setPgUniversity(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Completed Undergraduate Degree *</label>
                  <input
                    type="text"
                    placeholder="e.g. B.Tech Computer Science (4-year)"
                    value={pgPreviousDegree}
                    onChange={(e) => setPgPreviousDegree(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Current Postgraduate Degree *</label>
                  <input
                    type="text"
                    placeholder="e.g. M.Tech / M.Sc / Ph.D"
                    value={pgCurrentDegree}
                    onChange={(e) => setPgCurrentDegree(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Undergraduate Cumulative Score (%) *</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="e.g. 78"
                    value={pgUgPerformance || ''}
                    onChange={(e) => setPgUgPerformance(Number(e.target.value))}
                    className="form-input"
                  />
                </div>

                <div className="form-group full-grid-width">
                  <label className="form-label">Work Experience or Research Publications (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. 2 years of software engineering experience (Chevening / DAAD criteria)"
                    value={pgAdditionalDetails}
                    onChange={(e) => setPgAdditionalDetails(e.target.value)}
                    className="form-textarea"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: FINANCIAL & ELIGIBILITY INFORMATION */}
          {currentStep === 4 && (
            <div className="onboarding-step-view">
              <div className="step-intro">
                <span className="badge badge-primary">Step 4 of 6</span>
                <h2>Financial & Category Eligibility</h2>
                <p>Criteria strictly utilized to evaluate merit-cum-means and affirmative schemes.</p>
              </div>

              <div className="privacy-callout card">
                <ShieldAlert size={20} className="text-primary" />
                <p>
                  <strong>Why we ask this:</strong> Government schemes (such as Central Sector Scheme, Pragati, and NMMSS) and private trusts (Tata Trusts) have explicit family income caps. Sensitive social category information is voluntary.
                </p>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Annual Family Income Ceiling *</label>
                  <select
                    value={annualIncomeValue}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setAnnualIncomeValue(val);
                      if (val <= 250000) setFamilyIncomeRange('Under ₹2,50,000');
                      else if (val <= 450000) setFamilyIncomeRange('₹2,50,000 – ₹4,50,000');
                      else if (val <= 800000) setFamilyIncomeRange('₹4,50,000 – ₹8,00,000');
                      else setFamilyIncomeRange('Above ₹8,00,000');
                    }}
                    className="form-select"
                  >
                    <option value={200000}>Under ₹2,50,000 / annum (Qualifies for all means schemes)</option>
                    <option value={350000}>₹2,50,000 – ₹4,50,000 / annum (Central Sector & Tata eligible)</option>
                    <option value={600000}>₹4,50,000 – ₹8,00,000 / annum (AICTE Pragati eligible)</option>
                    <option value={1200000}>Above ₹8,00,000 / annum (Merit-only & International focus)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">State or Region of Domicile *</label>
                  <select
                    value={stateOrRegion}
                    onChange={(e) => setStateOrRegion(e.target.value)}
                    className="form-select"
                  >
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Other State">Other Indian State / UT</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Social / Reservation Category (Optional)</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-select"
                  >
                    <option value="General / EWS">General / Economically Weaker Section (EWS)</option>
                    <option value="OBC-NCL">Other Backward Class (OBC-NCL)</option>
                    <option value="SC">Scheduled Caste (SC)</option>
                    <option value="ST">Scheduled Tribe (ST)</option>
                    <option value="Minority Community">Minority Community</option>
                    <option value="Prefer not to say">Prefer not to disclose</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Disability / PwD Status (Optional)</label>
                  <select
                    value={disabilityStatus}
                    onChange={(e) => setDisabilityStatus(e.target.value)}
                    className="form-select"
                  >
                    <option value="No">No</option>
                    <option value="Yes - 40%+ Benchmarked Disability">Yes - 40%+ Benchmarked (AICTE Saksham eligible)</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* Safeguard for minors (under 18) */}
              {age < 18 && (
                <div className="guardian-consent-box card">
                  <h4>Parental / Guardian Consent Workflow</h4>
                  <p>
                    Because you are <strong>{age} years old</strong> (under 18), please confirm parental or guardian awareness. GRANTLY notes that official government scholarship submissions require countersignatures.
                  </p>
                  <div className="form-group">
                    <label className="form-label">Parent / Legal Guardian Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Rajesh Sharma"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={guardianConsentForMinor}
                      onChange={(e) => setGuardianConsentForMinor(e.target.checked)}
                    />
                    <span>
                      I confirm that my parent or legal guardian has reviewed and consented to my scholarship profile creation.
                    </span>
                  </label>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: SCHOLARSHIP PREFERENCES */}
          {currentStep === 5 && (
            <div className="onboarding-step-view">
              <div className="step-intro">
                <span className="badge badge-primary">Step 5 of 6</span>
                <h2>Scholarship Preferences</h2>
                <p>Customize what opportunities you wish to prioritize on your dashboard.</p>
              </div>

              <div className="form-grid">
                <div className="form-group full-grid-width">
                  <label className="form-label">Preferred Scholarship Destination *</label>
                  <div className="radio-cards-row">
                    <div 
                      className={`radio-card ${destination === 'india' ? 'active' : ''}`}
                      onClick={() => setDestination('india')}
                    >
                      <h4>India Only</h4>
                      <p>National Scholarship Portal, AICTE, state government and Indian trusts.</p>
                    </div>
                    <div 
                      className={`radio-card ${destination === 'international' ? 'active' : ''}`}
                      onClick={() => setDestination('international')}
                    >
                      <h4>International Only</h4>
                      <p>Study abroad in UK, USA, Germany, European Union and Commonwealth.</p>
                    </div>
                    <div 
                      className={`radio-card ${destination === 'both' ? 'active' : ''}`}
                      onClick={() => setDestination('both')}
                    >
                      <h4>Both India & Abroad</h4>
                      <p>View all opportunities matching your educational degree stage.</p>
                    </div>
                  </div>
                </div>

                <div className="form-group full-grid-width">
                  <label className="form-label">Preferred Field of Study</label>
                  <input
                    type="text"
                    value={preferredField}
                    onChange={(e) => setPreferredField(e.target.value)}
                    placeholder="e.g. Engineering, Sciences, Commerce, Arts"
                    className="form-input"
                  />
                </div>

                <div className="form-group full-grid-width">
                  <label className="form-label">Preferred Scholarship Provider Types</label>
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
                      <span>Government Schemes (NSP, AICTE, MHRD)</span>
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
                      <span>Private Charitable Trusts (Tata, Mahindra)</span>
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
                      <span>University Fellowships (Erasmus, Inlaks)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: PROFILE REVIEW */}
          {currentStep === 6 && (
            <div className="onboarding-step-view">
              <div className="step-intro">
                <span className="badge badge-success">Final Step 6 of 6</span>
                <h2>Review Your Profile Before Launch</h2>
                <p>Verify that your academic and financial criteria are accurate for optimal matching.</p>
              </div>

              <div className="review-sections-list">
                {/* Personal Section */}
                <div className="review-section-box card">
                  <div className="review-box-header">
                    <h4>Personal Details</h4>
                    <button onClick={() => setCurrentStep(1)} className="btn btn-ghost btn-sm">
                      <Edit2 size={14} /> Edit
                    </button>
                  </div>
                  <div className="review-details-grid">
                    <div><strong>Name:</strong> {name}</div>
                    <div><strong>Date of Birth:</strong> {dob} (Age {age})</div>
                    <div><strong>Gender:</strong> {gender}</div>
                    <div><strong>Country:</strong> {countryOfResidence} ({nationality})</div>
                  </div>
                </div>

                {/* Education Section */}
                <div className="review-section-box card">
                  <div className="review-box-header">
                    <h4>Education & Academics</h4>
                    <button onClick={() => setCurrentStep(2)} className="btn btn-ghost btn-sm">
                      <Edit2 size={14} /> Edit
                    </button>
                  </div>
                  <div className="review-details-grid">
                    <div><strong>Stage:</strong> {educationLevel.toUpperCase()}</div>
                    {educationLevel === 'school' && (
                      <>
                        <div><strong>School:</strong> {schoolName} ({schoolBoard})</div>
                        <div><strong>Class:</strong> {currentStandard}</div>
                        <div><strong>Performance:</strong> {currentSchoolPerformance}%</div>
                      </>
                    )}
                    {educationLevel === 'undergraduate' && (
                      <>
                        <div><strong>College:</strong> {collegeName}</div>
                        <div><strong>Degree:</strong> {ugDegree} ({ugDepartment})</div>
                        <div><strong>Year / Sem:</strong> {ugYear}, {ugSemester}</div>
                        <div><strong>Score:</strong> {ugPerformance} ({ugGradingScale === '10' ? 'CGPA' : '%'})</div>
                        <div><strong>10th / 12th:</strong> {ugTenthMarks}% / {ugTwelfthMarks}%</div>
                      </>
                    )}
                    {educationLevel === 'postgraduate' && (
                      <>
                        <div><strong>University:</strong> {pgUniversity}</div>
                        <div><strong>Current PG:</strong> {pgCurrentDegree}</div>
                        <div><strong>UG Degree:</strong> {pgPreviousDegree} ({pgUgPerformance}%)</div>
                      </>
                    )}
                  </div>
                </div>

                {/* Financial Section */}
                <div className="review-section-box card">
                  <div className="review-box-header">
                    <h4>Financial & Category Info</h4>
                    <button onClick={() => setCurrentStep(4)} className="btn btn-ghost btn-sm">
                      <Edit2 size={14} /> Edit
                    </button>
                  </div>
                  <div className="review-details-grid">
                    <div><strong>Family Income:</strong> {familyIncomeRange}</div>
                    <div><strong>Domicile:</strong> {stateOrRegion}</div>
                    <div><strong>Category:</strong> {category}</div>
                    <div><strong>Disability Status:</strong> {disabilityStatus}</div>
                  </div>
                </div>
              </div>

              <div className="final-confirmation-banner">
                <CheckCircle2 size={24} className="text-success" />
                <div>
                  <strong>Ready to Generate Your Personalized Recommendations</strong>
                  <p>Your details will be persisted locally to evaluate matching eligibility across verified scholarships.</p>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="onboarding-controls-bar">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setCurrentStep(currentStep - 1);
                }}
                className="btn btn-outline"
              >
                <ArrowLeft size={16} /> Back
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < 6 ? (
              <button
                type="button"
                onClick={validateAndProceed}
                className="btn btn-primary"
              >
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleComplete}
                className="btn btn-primary btn-lg"
              >
                Complete Profile & Open Dashboard <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

