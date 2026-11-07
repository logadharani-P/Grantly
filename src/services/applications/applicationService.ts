import { ApplicationRecord, ApplicationStatus, StatusType, Scholarship, DocumentItem } from '../../types';

const STORAGE_APPLICATIONS_KEY = 'grantly_applications';

// Seed demo application record so new users see realistic tracking immediately if desired
const SEED_APPLICATIONS: ApplicationRecord[] = [
  {
    id: 'app-seed-01',
    scholarshipId: 'sch-nsp-cs-01',
    scholarshipTitle: 'Central Sector Scheme of Scholarship for College and University Students',
    provider: 'Ministry of Education, Government of India',
    deadline: '2026-11-30',
    awardAmountFormatted: '₹20,000 / yr',
    currency: 'INR',
    country: 'India',
    status: 'submitted',
    statusType: 'self-reported',
    preparationStep: 9,
    documents: [
      { id: 'doc-1', name: 'Class 12th Board Marksheet', description: 'Original scanned copy showing 80%+ marks', required: true, uploaded: true, fileName: 'Class12_Marksheet_Verified.pdf', fileSize: '1.2 MB', uploadedAt: '2026-10-10' },
      { id: 'doc-2', name: 'Income Certificate', description: 'Issued by Tahsildar / SDM (< ₹4.5 Lakh)', required: true, uploaded: true, fileName: 'Income_Certificate_2026.pdf', fileSize: '850 KB', uploadedAt: '2026-10-11' },
      { id: 'doc-3', name: 'Aadhaar Card Copy', description: 'Masked Aadhaar linked to bank account', required: true, uploaded: true, fileName: 'Aadhaar_Document.pdf', fileSize: '620 KB', uploadedAt: '2026-10-11' },
      { id: 'doc-4', name: 'College Admission Fee Receipt', description: 'Bonafide proof of regular enrolment', required: true, uploaded: true, fileName: 'NITK_Admission_Receipt.pdf', fileSize: '1.4 MB', uploadedAt: '2026-10-12' }
    ],
    studentNotes: 'Submitted on National Scholarship Portal on Oct 14. INO Institute verification pending.',
    externalApplicationStarted: true,
    submittedDate: '2026-10-14',
    createdAt: '2026-10-08T09:00:00Z',
    updatedAt: '2026-10-14T15:20:00Z',
    timeline: [
      { status: 'draft', timestamp: '2026-10-08 09:00', note: 'Application preparation started in GRANTLY.' },
      { status: 'preparing', timestamp: '2026-10-11 14:15', note: 'All required documents prepared and verified against checklist.' },
      { status: 'ready-to-apply', timestamp: '2026-10-12 16:30', note: 'Ready for submission on official National Scholarship Portal.' },
      { status: 'submitted', timestamp: '2026-10-14 11:20', note: 'Self-reported submission on scholarships.gov.in (NSP Ref #NSP2026-KA-88192).' }
    ]
  }
];

class ApplicationService {
  getApplications(): ApplicationRecord[] {
    const raw = localStorage.getItem(STORAGE_APPLICATIONS_KEY);
    if (!raw) {
      // Initialize with seed record
      localStorage.setItem(STORAGE_APPLICATIONS_KEY, JSON.stringify(SEED_APPLICATIONS));
      return SEED_APPLICATIONS;
    }
    try {
      return JSON.parse(raw) as ApplicationRecord[];
    } catch {
      return [];
    }
  }

  getApplicationById(id: string): ApplicationRecord | undefined {
    return this.getApplications().find(app => app.id === id);
  }

  getApplicationByScholarshipId(scholarshipId: string): ApplicationRecord | undefined {
    return this.getApplications().find(app => app.scholarshipId === scholarshipId);
  }

  startOrGetApplication(scholarship: Scholarship): ApplicationRecord {
    const existing = this.getApplicationByScholarshipId(scholarship.id);
    if (existing) {
      return existing;
    }

    const defaultDocs: DocumentItem[] = scholarship.requiredDocuments.map((docName, idx) => ({
      id: `doc-${idx + 1}`,
      name: docName,
      description: `Official document required by ${scholarship.provider}`,
      required: true,
      uploaded: false
    }));

    const newApp: ApplicationRecord = {
      id: 'app-' + Date.now(),
      scholarshipId: scholarship.id,
      scholarshipTitle: scholarship.title,
      provider: scholarship.provider,
      deadline: scholarship.deadline,
      awardAmountFormatted: scholarship.awardAmountFormatted,
      currency: scholarship.currency,
      country: scholarship.country,
      status: 'preparing',
      statusType: 'self-reported',
      preparationStep: 1,
      documents: defaultDocs,
      studentNotes: '',
      externalApplicationStarted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        {
          status: 'draft',
          timestamp: new Date().toLocaleString(),
          note: 'Started guided application preparation on GRANTLY.'
        }
      ]
    };

    const currentApps = this.getApplications();
    const updated = [newApp, ...currentApps];
    localStorage.setItem(STORAGE_APPLICATIONS_KEY, JSON.stringify(updated));
    return newApp;
  }

  saveApplication(app: ApplicationRecord): void {
    const all = this.getApplications();
    const index = all.findIndex(a => a.id === app.id);
    const updatedRecord = {
      ...app,
      updatedAt: new Date().toISOString()
    };

    if (index >= 0) {
      all[index] = updatedRecord;
    } else {
      all.unshift(updatedRecord);
    }
    localStorage.setItem(STORAGE_APPLICATIONS_KEY, JSON.stringify(all));
  }

  updateDocument(appId: string, docId: string, uploaded: boolean, fileName?: string): ApplicationRecord | undefined {
    const app = this.getApplicationById(appId);
    if (!app) return undefined;

    const docIndex = app.documents.findIndex(d => d.id === docId);
    if (docIndex >= 0) {
      app.documents[docIndex].uploaded = uploaded;
      app.documents[docIndex].fileName = uploaded ? (fileName || 'Document_Uploaded.pdf') : undefined;
      app.documents[docIndex].fileSize = uploaded ? '1.1 MB' : undefined;
      app.documents[docIndex].uploadedAt = uploaded ? new Date().toISOString().split('T')[0] : undefined;
    }

    this.saveApplication(app);
    return app;
  }

  updateStatus(
    appId: string, 
    status: ApplicationStatus, 
    statusType: StatusType = 'self-reported',
    note?: string
  ): ApplicationRecord | undefined {
    const app = this.getApplicationById(appId);
    if (!app) return undefined;

    app.status = status;
    app.statusType = statusType;
    if (status === 'submitted' && !app.submittedDate) {
      app.submittedDate = new Date().toISOString().split('T')[0];
    }

    app.timeline.push({
      status,
      timestamp: new Date().toLocaleString(),
      note: note || `Status updated to ${status} (${statusType})`
    });

    this.saveApplication(app);
    return app;
  }
}

export const applicationService = new ApplicationService();

