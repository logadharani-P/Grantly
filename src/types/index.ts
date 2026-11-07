export type EducationLevel = 'school' | 'undergraduate' | 'postgraduate';

export type Gender = 'male' | 'female' | 'other' | 'prefer-not-to-say';

export type FundingType = 
  | 'Full Tuition' 
  | 'Partial Tuition' 
  | 'Stipend & Living Allowance' 
  | 'Cash Grant' 
  | 'Mentorship & Grant';

export type ProviderType = 'government' | 'private' | 'university';

export type VerificationStatus = 'verified' | 'unverified' | 'demo';

export type EligibilityStatus = 
  | 'eligible' 
  | 'potentially-eligible' 
  | 'additional-info-required' 
  | 'not-eligible';

export type ApplicationStatus = 
  | 'draft' 
  | 'preparing' 
  | 'ready-to-apply' 
  | 'submitted' 
  | 'under-review' 
  | 'approved' 
  | 'rejected';

export type StatusType = 'self-reported' | 'provider-confirmed';

export interface SchoolDetails {
  schoolName: string;
  schoolLocation: string;
  board: string;
  currentStandard: string; // 6th to 12th
  academicYear: string;
  mediumOfInstruction: string;
  tenthMarks?: number;
  twelfthMarks?: number;
  currentPerformance?: number; // current percentage
}

export interface UndergraduateDetails {
  collegeName: string;
  collegeLocation: string;
  degree: string;
  department: string;
  currentYear: string; // 1st, 2nd, 3rd, 4th, 5th
  currentSemester: string;
  cgpaOrPercentage: number;
  gradingScale: '10' | '100';
  tenthMarks: number;
  twelfthMarks: number;
}

export interface PostgraduateDetails {
  universityName: string;
  institutionLocation: string;
  previousDegree: string;
  currentDegree: string;
  department: string;
  currentYear: string;
  currentSemester: string;
  ugPerformance: number;
  additionalAcademicDetails?: string;
}

export interface FinancialEligibility {
  familyIncomeRange: string;
  annualIncomeValue?: number; // Estimated numeric ceiling
  stateOrRegion: string;
  category?: string; // General, OBC, SC, ST, EWS, Minority
  disabilityStatus?: string; // Yes / No / Voluntary disclosure
  guardianConsentForMinor?: boolean;
  parentOrGuardianName?: string;
}

export interface ScholarshipPreferences {
  destination: 'india' | 'international' | 'both';
  preferredCountries: string[];
  preferredDegreeLevel: string;
  preferredField: string;
  providerTypes: ProviderType[];
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  dob: string;
  age: number;
  gender: Gender;
  countryOfResidence: string;
  nationality: string;
  educationLevel: EducationLevel;
  schoolDetails?: SchoolDetails;
  undergraduateDetails?: UndergraduateDetails;
  postgraduateDetails?: PostgraduateDetails;
  financialEligibility: FinancialEligibility;
  preferences: ScholarshipPreferences;
  profileCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EligibilityCriteria {
  minPercentage?: number;
  minCgpa?: number;
  maxFamilyIncome?: number;
  incomeCriteriaText?: string;
  ageLimit?: { min?: number; max?: number };
  eligibleGenders?: ('male' | 'female' | 'other' | 'all')[];
  allowedStreams?: string[];
  specificConditions?: string[];
  domicileRequired?: string;
  nationalityRequired?: string[];
}

export interface ScholarshipFAQ {
  question: string;
  answer: string;
}

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  logoUrl?: string;
  country: string;
  eligibleNationalities: string[];
  educationLevel: EducationLevel[];
  courseField: string[];
  awardAmount: string;
  awardAmountFormatted: string;
  awardAmountNumeric: number;
  currency: string;
  fundingType: FundingType;
  providerType: ProviderType;
  overview: string;
  benefits: string[];
  eligibilityCriteria: EligibilityCriteria;
  requiredDocuments: string[];
  applicationOpeningDate: string;
  deadline: string;
  selectionProcess: string[];
  importantInstructions: string[];
  faqs: ScholarshipFAQ[];
  officialApplicationUrl: string;
  officialInformationSource: string;
  lastVerifiedDate: string;
  verificationStatus: VerificationStatus;
  verificationNotes?: string;
  isFeatured?: boolean;
}

export interface MatchReason {
  matched: boolean;
  criteria: string;
  studentValue?: string;
  requiredValue?: string;
  note?: string;
}

export interface EligibilityAssessment {
  scholarshipId: string;
  status: EligibilityStatus;
  score: number; // 0 to 100 percentage
  reasons: MatchReason[];
  missingFields: string[];
  summary: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  description: string;
  required: boolean;
  uploaded: boolean;
  fileName?: string;
  fileSize?: string;
  uploadedAt?: string;
}

export interface ApplicationRecord {
  id: string;
  scholarshipId: string;
  scholarshipTitle: string;
  provider: string;
  deadline: string;
  awardAmountFormatted: string;
  currency: string;
  country: string;
  status: ApplicationStatus;
  statusType: StatusType;
  preparationStep: number;
  documents: DocumentItem[];
  studentNotes: string;
  externalApplicationStarted: boolean;
  submittedDate?: string;
  createdAt: string;
  updatedAt: string;
  timeline: {
    status: ApplicationStatus;
    timestamp: string;
    note: string;
  }[];
}

export type NewsCategory = 
  | 'Government Scholarships' 
  | 'International Scholarships' 
  | 'Education Announcements' 
  | 'University Admissions' 
  | 'Examination Notifications' 
  | 'Scholarship Deadlines' 
  | 'Education Policy Updates';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string[];
  publisher: string;
  publicationDate: string;
  category: NewsCategory;
  imageUrl?: string;
  readTime: string;
  sourceUrl: string;
  isVerifiedSource: boolean;
  tags: string[];
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  sourceReferences?: {
    title: string;
    url?: string;
    note?: string;
  }[];
  confidence?: 'high' | 'medium' | 'requires_verification';
}

