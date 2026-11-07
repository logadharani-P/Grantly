import { ALL_SCHOLARSHIPS, VERIFIED_SCHOLARSHIPS } from '../../data/scholarships';
import { Scholarship, StudentProfile, EducationLevel, ProviderType, FundingType, EligibilityStatus } from '../../types';
import { eligibilityService } from '../eligibility/eligibilityService';

const STORAGE_SAVED_KEY = 'grantly_saved_scholarships';

export interface ScholarshipFilterOptions {
  query?: string;
  educationLevel?: EducationLevel | 'all';
  country?: string;
  providerType?: ProviderType | 'all';
  fundingType?: FundingType | 'all';
  eligibilityStatus?: EligibilityStatus | 'all';
  sortBy?: 'relevance' | 'deadline' | 'amount';
  onlyVerified?: boolean;
}

class ScholarshipService {
  private scholarships: Scholarship[] = ALL_SCHOLARSHIPS;

  getAll(onlyVerified = false): Scholarship[] {
    return onlyVerified ? VERIFIED_SCHOLARSHIPS : this.scholarships;
  }

  getById(id: string): Scholarship | undefined {
    return this.scholarships.find(s => s.id === id);
  }

  filterScholarships(
    options: ScholarshipFilterOptions, 
    currentStudent: StudentProfile | null
  ): { scholarship: Scholarship; status: EligibilityStatus; matchScore: number }[] {
    const {
      query = '',
      educationLevel = 'all',
      country = 'all',
      providerType = 'all',
      fundingType = 'all',
      eligibilityStatus = 'all',
      sortBy = 'relevance',
      onlyVerified = false
    } = options;

    let list = onlyVerified ? VERIFIED_SCHOLARSHIPS : this.scholarships;

    // Filter by query
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter(s => 
        s.title.toLowerCase().includes(q) ||
        s.provider.toLowerCase().includes(q) ||
        s.country.toLowerCase().includes(q) ||
        s.courseField.some(c => c.toLowerCase().includes(q)) ||
        s.overview.toLowerCase().includes(q)
      );
    }

    // Filter by educationLevel
    if (educationLevel !== 'all') {
      list = list.filter(s => s.educationLevel.includes(educationLevel as EducationLevel));
    }

    // Filter by country
    if (country !== 'all') {
      list = list.filter(s => s.country.toLowerCase() === country.toLowerCase());
    }

    // Filter by providerType
    if (providerType !== 'all') {
      list = list.filter(s => s.providerType === providerType);
    }

    // Filter by fundingType
    if (fundingType !== 'all') {
      list = list.filter(s => s.fundingType === fundingType);
    }

    // Map each scholarship to its eligibility assessment
    let evaluated = list.map(scholarship => {
      const assessment = eligibilityService.assessEligibility(scholarship, currentStudent);
      return {
        scholarship,
        status: assessment.status,
        matchScore: assessment.score
      };
    });

    // Filter by eligibilityStatus
    if (eligibilityStatus !== 'all') {
      evaluated = evaluated.filter(item => item.status === eligibilityStatus);
    }

    // Sort
    evaluated.sort((a, b) => {
      if (sortBy === 'deadline') {
        return new Date(a.scholarship.deadline).getTime() - new Date(b.scholarship.deadline).getTime();
      }
      if (sortBy === 'amount') {
        return b.scholarship.awardAmountNumeric - a.scholarship.awardAmountNumeric;
      }
      // default: relevance
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore;
      }
      return new Date(a.scholarship.deadline).getTime() - new Date(b.scholarship.deadline).getTime();
    });

    return evaluated;
  }

  // Saved Scholarships
  getSavedIds(): string[] {
    const raw = localStorage.getItem(STORAGE_SAVED_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as string[];
    } catch {
      return [];
    }
  }

  isSaved(id: string): boolean {
    return this.getSavedIds().includes(id);
  }

  toggleSave(id: string): boolean {
    const saved = this.getSavedIds();
    let updated: string[];
    let isNowSaved: boolean;
    if (saved.includes(id)) {
      updated = saved.filter(savedId => savedId !== id);
      isNowSaved = false;
    } else {
      updated = [...saved, id];
      isNowSaved = true;
    }
    localStorage.setItem(STORAGE_SAVED_KEY, JSON.stringify(updated));
    return isNowSaved;
  }

  getSavedScholarships(): Scholarship[] {
    const savedIds = this.getSavedIds();
    return this.scholarships.filter(s => savedIds.includes(s.id));
  }
}

export const scholarshipService = new ScholarshipService();

