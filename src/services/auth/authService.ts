import { StudentProfile } from '../../types';

const STORAGE_KEY_USER = 'grantly_current_user';
const STORAGE_KEY_TOKEN = 'grantly_auth_token';

// Default initial demo student for quick preview
export const DEFAULT_DEMO_STUDENT: StudentProfile = {
  id: 'demo-student-01',
  name: 'Aarav Mehta',
  email: 'aarav.mehta@example.edu',
  dob: '2004-05-14',
  age: 22,
  gender: 'male',
  countryOfResidence: 'India',
  nationality: 'Indian',
  educationLevel: 'undergraduate',
  undergraduateDetails: {
    collegeName: 'National Institute of Technology (NIT)',
    collegeLocation: 'Karnataka, India',
    degree: 'Bachelor of Technology (B.Tech)',
    department: 'Computer Science and Engineering',
    currentYear: '3rd Year',
    currentSemester: 'Semester 5',
    cgpaOrPercentage: 8.4,
    gradingScale: '10',
    tenthMarks: 92.5,
    twelfthMarks: 88.0
  },
  financialEligibility: {
    familyIncomeRange: '₹3,00,000 – ₹5,00,000',
    annualIncomeValue: 420000,
    stateOrRegion: 'Karnataka',
    category: 'General / EWS',
    disabilityStatus: 'No',
    guardianConsentForMinor: false
  },
  preferences: {
    destination: 'both',
    preferredCountries: ['India', 'United Kingdom', 'Germany'],
    preferredDegreeLevel: 'Undergraduate & Postgraduate',
    preferredField: 'Engineering & Technology',
    providerTypes: ['government', 'private', 'university']
  },
  profileCompleted: true,
  createdAt: '2026-09-01T10:00:00Z',
  updatedAt: '2026-10-20T14:30:00Z'
};

class AuthService {
  getCurrentUser(): StudentProfile | null {
    const raw = localStorage.getItem(STORAGE_KEY_USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as StudentProfile;
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(STORAGE_KEY_TOKEN);
  }

  signIn(email: string, _password: string): Promise<StudentProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !email.includes('@')) {
          reject(new Error('Please enter a valid email address'));
          return;
        }

        const existingUser = this.getCurrentUser();
        const user = existingUser || {
          ...DEFAULT_DEMO_STUDENT,
          email: email,
          name: email.split('@')[0].replace('.', ' ').toUpperCase()
        };

        localStorage.setItem(STORAGE_KEY_TOKEN, 'demo-jwt-token-grantly-session');
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
        resolve(user);
      }, 500);
    });
  }

  signInAsDemo(): Promise<StudentProfile> {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(STORAGE_KEY_TOKEN, 'demo-jwt-token-grantly-session');
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(DEFAULT_DEMO_STUDENT));
        resolve(DEFAULT_DEMO_STUDENT);
      }, 300);
    });
  }

  signUp(name: string, email: string, _password: string): Promise<StudentProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!name.trim()) {
          reject(new Error('Please enter your full name'));
          return;
        }
        if (!email || !email.includes('@')) {
          reject(new Error('Please enter a valid email address'));
          return;
        }

        const newUser: StudentProfile = {
          id: 'student_' + Date.now(),
          name: name.trim(),
          email: email.trim(),
          dob: '',
          age: 0,
          gender: 'prefer-not-to-say',
          countryOfResidence: 'India',
          nationality: 'Indian',
          educationLevel: 'undergraduate',
          financialEligibility: {
            familyIncomeRange: 'Under ₹2,50,000',
            stateOrRegion: ''
          },
          preferences: {
            destination: 'both',
            preferredCountries: ['India'],
            preferredDegreeLevel: 'Undergraduate',
            preferredField: 'All Disciplines',
            providerTypes: ['government', 'private']
          },
          profileCompleted: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        localStorage.setItem(STORAGE_KEY_TOKEN, 'demo-jwt-token-grantly-session');
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
        resolve(newUser);
      }, 500);
    });
  }

  updateProfile(profile: StudentProfile): void {
    const updated = {
      ...profile,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
  }

  signOut(): void {
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    // Keep user in storage or clear as desired. We clear token to end session.
  }

  resetAllData(): void {
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem('grantly_saved_scholarships');
    localStorage.removeItem('grantly_applications');
  }
}

export const authService = new AuthService();

