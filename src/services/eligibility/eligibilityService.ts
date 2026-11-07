import { 
  Scholarship, 
  StudentProfile, 
  EligibilityAssessment, 
  EligibilityStatus, 
  MatchReason 
} from '../../types';

class EligibilityService {
  assessEligibility(scholarship: Scholarship, student: StudentProfile | null): EligibilityAssessment {
    if (!student) {
      return {
        scholarshipId: scholarship.id,
        status: 'additional-info-required',
        score: 50,
        reasons: [{
          matched: false,
          criteria: 'Profile Required',
          note: 'Sign in and complete your student profile to run automated eligibility calculation.'
        }],
        missingFields: ['Complete Profile'],
        summary: 'Please sign in or complete your profile to verify your match.'
      };
    }

    const reasons: MatchReason[] = [];
    const missingFields: string[] = [];
    let passedChecks = 0;
    let totalChecks = 0;
    let hasHardDisqualification = false;

    // 1. Education Level Check
    totalChecks++;
    const levelMatch = scholarship.educationLevel.includes(student.educationLevel);
    if (levelMatch) {
      passedChecks++;
      reasons.push({
        matched: true,
        criteria: 'Education Level',
        studentValue: student.educationLevel.toUpperCase(),
        requiredValue: scholarship.educationLevel.join(', ').toUpperCase(),
        note: 'Your current study level qualifies for this scheme.'
      });
    } else {
      hasHardDisqualification = true;
      reasons.push({
        matched: false,
        criteria: 'Education Level',
        studentValue: student.educationLevel.toUpperCase(),
        requiredValue: scholarship.educationLevel.join(', ').toUpperCase(),
        note: `This scholarship is restricted to ${scholarship.educationLevel.join(', ')} students.`
      });
    }

    // 2. Nationality / Residency Check
    totalChecks++;
    const isAllNationalities = scholarship.eligibleNationalities.some(n => 
      n.toLowerCase().includes('all') || n.toLowerCase().includes('international')
    );
    const nationalityMatch = isAllNationalities || scholarship.eligibleNationalities.includes(student.nationality);
    
    if (nationalityMatch) {
      passedChecks++;
      reasons.push({
        matched: true,
        criteria: 'Nationality & Citizenship',
        studentValue: student.nationality,
        requiredValue: scholarship.eligibleNationalities.join(', '),
        note: 'Your citizenship is eligible for this opportunity.'
      });
    } else {
      hasHardDisqualification = true;
      reasons.push({
        matched: false,
        criteria: 'Nationality & Citizenship',
        studentValue: student.nationality,
        requiredValue: scholarship.eligibleNationalities.join(', '),
        note: `Citizenship required: ${scholarship.eligibleNationalities.join(', ')}.`
      });
    }

    // 3. Gender Requirement Check
    if (scholarship.eligibilityCriteria.eligibleGenders && !scholarship.eligibilityCriteria.eligibleGenders.includes('all')) {
      totalChecks++;
      if (student.gender === 'prefer-not-to-say') {
        missingFields.push('Gender verification');
        reasons.push({
          matched: false,
          criteria: 'Gender Eligibility',
          note: `Scheme has specific gender requirement (${scholarship.eligibilityCriteria.eligibleGenders.join(', ')}). Voluntary disclosure required for confirmation.`
        });
      } else if (scholarship.eligibilityCriteria.eligibleGenders.includes(student.gender as any)) {
        passedChecks++;
        reasons.push({
          matched: true,
          criteria: 'Gender Eligibility',
          studentValue: student.gender,
          requiredValue: scholarship.eligibilityCriteria.eligibleGenders.join(', '),
          note: 'You satisfy the specific gender criteria.'
        });
      } else {
        hasHardDisqualification = true;
        reasons.push({
          matched: false,
          criteria: 'Gender Eligibility',
          studentValue: student.gender,
          requiredValue: scholarship.eligibilityCriteria.eligibleGenders.join(', '),
          note: `This scholarship specifically targets ${scholarship.eligibilityCriteria.eligibleGenders.join(', ')} applicants.`
        });
      }
    }

    // 4. Academic Performance Check
    let studentScore: number | undefined;
    if (student.educationLevel === 'school') {
      studentScore = student.schoolDetails?.currentPerformance || student.schoolDetails?.tenthMarks;
    } else if (student.educationLevel === 'undergraduate') {
      if (student.undergraduateDetails?.gradingScale === '10') {
        studentScore = (student.undergraduateDetails.cgpaOrPercentage || 0) * 9.5; // convert 10-scale to approx percentage
      } else {
        studentScore = student.undergraduateDetails?.cgpaOrPercentage;
      }
    } else if (student.educationLevel === 'postgraduate') {
      studentScore = student.postgraduateDetails?.ugPerformance;
    }

    if (scholarship.eligibilityCriteria.minPercentage) {
      totalChecks++;
      if (studentScore === undefined || studentScore === 0) {
        missingFields.push('Academic Marks / CGPA');
        reasons.push({
          matched: false,
          criteria: 'Academic Merit Minimum',
          requiredValue: `${scholarship.eligibilityCriteria.minPercentage}%`,
          note: 'Please update your academic scores in your profile to check this requirement.'
        });
      } else if (studentScore >= scholarship.eligibilityCriteria.minPercentage) {
        passedChecks++;
        reasons.push({
          matched: true,
          criteria: 'Academic Merit Minimum',
          studentValue: `~${studentScore.toFixed(1)}%`,
          requiredValue: `Min ${scholarship.eligibilityCriteria.minPercentage}%`,
          note: 'Your academic score meets or exceeds the minimum cutoff.'
        });
      } else {
        hasHardDisqualification = true;
        reasons.push({
          matched: false,
          criteria: 'Academic Merit Minimum',
          studentValue: `~${studentScore.toFixed(1)}%`,
          requiredValue: `Min ${scholarship.eligibilityCriteria.minPercentage}%`,
          note: `Your recorded score is below the ${scholarship.eligibilityCriteria.minPercentage}% requirement.`
        });
      }
    }

    // 5. Family Income Check
    if (scholarship.eligibilityCriteria.maxFamilyIncome) {
      totalChecks++;
      const studentIncome = student.financialEligibility?.annualIncomeValue;
      if (studentIncome === undefined || studentIncome === 0) {
        missingFields.push('Family Annual Income');
        reasons.push({
          matched: false,
          criteria: 'Family Income Ceiling',
          requiredValue: `Max ₹${(scholarship.eligibilityCriteria.maxFamilyIncome / 100000).toFixed(1)} Lakh/yr`,
          note: scholarship.eligibilityCriteria.incomeCriteriaText || 'Income certificate verification needed.'
        });
      } else if (studentIncome <= scholarship.eligibilityCriteria.maxFamilyIncome) {
        passedChecks++;
        reasons.push({
          matched: true,
          criteria: 'Family Income Ceiling',
          studentValue: `₹${(studentIncome / 100000).toFixed(1)} Lakh/yr`,
          requiredValue: `Max ₹${(scholarship.eligibilityCriteria.maxFamilyIncome / 100000).toFixed(1)} Lakh/yr`,
          note: 'Your declared household income is within the required ceiling.'
        });
      } else {
        hasHardDisqualification = true;
        reasons.push({
          matched: false,
          criteria: 'Family Income Ceiling',
          studentValue: `₹${(studentIncome / 100000).toFixed(1)} Lakh/yr`,
          requiredValue: `Max ₹${(scholarship.eligibilityCriteria.maxFamilyIncome / 100000).toFixed(1)} Lakh/yr`,
          note: `Your declared income exceeds the maximum threshold of ₹${scholarship.eligibilityCriteria.maxFamilyIncome.toLocaleString('en-IN')}.`
        });
      }
    }

    // Calculate score
    const score = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 50;

    let status: EligibilityStatus = 'eligible';
    let summary = '';

    if (hasHardDisqualification) {
      status = 'not-eligible';
      summary = 'You do not currently satisfy one or more mandatory eligibility requirements for this scholarship.';
    } else if (missingFields.length > 0) {
      status = 'additional-info-required';
      summary = `Additional information needed: ${missingFields.join(', ')}. Complete these to verify full qualification.`;
    } else if (score >= 90) {
      status = 'eligible';
      summary = 'Congratulations! You meet all primary eligibility criteria according to your profile.';
    } else {
      status = 'potentially-eligible';
      summary = 'You meet key criteria, but may need to fulfill specific institutional conditions upon submission.';
    }

    return {
      scholarshipId: scholarship.id,
      status,
      score,
      reasons,
      missingFields,
      summary
    };
  }
}

export const eligibilityService = new EligibilityService();

