import { Scholarship } from '../../types';

export const VERIFIED_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'sch-nsp-cs-01',
    title: 'Central Sector Scheme of Scholarship for College and University Students',
    provider: 'Department of Higher Education, Ministry of Education, Government of India',
    country: 'India',
    eligibleNationalities: ['Indian'],
    educationLevel: ['undergraduate', 'postgraduate'],
    courseField: ['All Disciplines', 'Engineering', 'Medicine', 'Commerce', 'Arts', 'Science'],
    awardAmount: '₹12,000 to ₹20,000 per annum',
    awardAmountFormatted: '₹20,000 / yr',
    awardAmountNumeric: 20000,
    currency: 'INR',
    fundingType: 'Cash Grant',
    providerType: 'government',
    overview: 'The Central Sector Scheme of Scholarship for College and University Students is aimed at providing financial assistance to meritorious students from low-income families to meet a part of their day-to-day expenses while pursuing higher studies.',
    benefits: [
      '₹12,000 per annum at Graduation level for first three years of College and University courses',
      '₹20,000 per annum at Post-Graduation level',
      'For 5-year integrated courses, ₹20,000 per annum is paid in 4th and 5th year',
      'Direct Benefit Transfer (DBT) directly into verified Aadhaar-seeded student bank account'
    ],
    eligibilityCriteria: {
      minPercentage: 80,
      maxFamilyIncome: 450000,
      incomeCriteriaText: 'Gross family income must not exceed ₹4,50,000 per annum from all sources.',
      eligibleGenders: ['all'],
      specificConditions: [
        'Above 80th percentile of successful candidates in the relevant stream from a recognized Board of Examination in Class XII',
        'Pursuing regular (not correspondence or distance mode) degree courses in recognized Colleges/Institutions',
        'Not availing any other government scholarship or stipend'
      ],
      domicileRequired: 'All Indian States and Union Territories'
    },
    requiredDocuments: [
      'Class 12th Board Marksheet',
      'Income Certificate issued by competent Revenue Authority (Tahsildar/SDM)',
      'Aadhaar Card / Enrolment ID',
      'College Admission Fee Receipt or Bonafide Student Certificate',
      'Bank Account Passbook (seeded with Aadhaar)'
    ],
    applicationOpeningDate: '2026-07-01',
    deadline: '2026-11-30',
    selectionProcess: [
      'Online application on National Scholarship Portal (scholarships.gov.in)',
      'Institute Level Verification (L1) by College Nodal Officer',
      'District / State Nodal Officer Verification (L2)',
      'Merit list generation based on Board percentile quota',
      'Public Financial Management System (PFMS) direct disbursement'
    ],
    importantInstructions: [
      'Applications must be submitted exclusively via the National Scholarship Portal.',
      'Ensure bank account is in the name of student and linked with Aadhaar.',
      'Renewal requires obtaining minimum 50% marks in previous annual examination.'
    ],
    faqs: [
      {
        question: 'Can I apply if I am enrolled in distance education?',
        answer: 'No, this scheme is strictly for regular students enrolled in recognized universities or degree colleges.'
      },
      {
        question: 'Is there an application fee on NSP?',
        answer: 'No, registration and application on the official National Scholarship Portal are completely free of charge.'
      }
    ],
    officialApplicationUrl: 'https://scholarships.gov.in',
    officialInformationSource: 'Ministry of Education, Government of India Official Gazette',
    lastVerifiedDate: '2026-10-15',
    verificationStatus: 'verified',
    verificationNotes: 'Verified against current guidelines of the Department of Higher Education (scholarships.gov.in).',
    isFeatured: true
  },
  {
    id: 'sch-aicte-pragati-02',
    title: 'AICTE Pragati Scholarship Scheme for Girl Students',
    provider: 'All India Council for Technical Education (AICTE)',
    country: 'India',
    eligibleNationalities: ['Indian'],
    educationLevel: ['undergraduate'],
    courseField: ['Engineering', 'Technology', 'Architecture', 'Pharmacy'],
    awardAmount: '₹50,000 per annum',
    awardAmountFormatted: '₹50,000 / yr',
    awardAmountNumeric: 50000,
    currency: 'INR',
    fundingType: 'Cash Grant',
    providerType: 'government',
    overview: 'AICTE Pragati scheme is envisioned to empower young women through technical education by providing financial assistance to female students admitted to AICTE-approved degree or diploma level technical programs.',
    benefits: [
      '₹50,000 per annum towards payment of college fees, purchase of computers, stationery, books, and equipment',
      'Renewable for each year of study (up to maximum 4 years for Degree)',
      'Disbursed through DBT directly to student account'
    ],
    eligibilityCriteria: {
      maxFamilyIncome: 800000,
      incomeCriteriaText: 'Total family income should not be more than ₹8 Lakh per annum.',
      eligibleGenders: ['female'],
      specificConditions: [
        'Admitted to 1st year of Degree level course OR 2nd year through Lateral Entry in an AICTE approved institution',
        'Maximum two girl children per family are eligible'
      ]
    },
    requiredDocuments: [
      'Class 10th and 12th Marksheets',
      'Centralized Admission Process (CAP) allotment letter',
      'Tuition Fee receipt for current academic year',
      'Annual Family Income Certificate issued by Tahsildar / competent authority',
      'Aadhaar Card and Bank details'
    ],
    applicationOpeningDate: '2026-08-01',
    deadline: '2026-12-15',
    selectionProcess: [
      'Submission through National Scholarship Portal (NSP)',
      'Scrutiny and verification of institutional admission records by AICTE nodal team',
      'Merit ranking based on Qualifying Examination (12th / Diploma) scores'
    ],
    importantInstructions: [
      'Student must maintain satisfactory academic attendance and clear all subjects to claim annual renewal.'
    ],
    faqs: [
      {
        question: 'Are private engineering colleges covered?',
        answer: 'Yes, provided the institution and the specific technical course hold valid AICTE approval.'
      }
    ],
    officialApplicationUrl: 'https://scholarships.gov.in',
    officialInformationSource: 'AICTE Official Portal (aicte-india.org)',
    lastVerifiedDate: '2026-09-28',
    verificationStatus: 'verified',
    verificationNotes: 'Verified against AICTE Pragati Guidelines Booklet published on NSP.',
    isFeatured: true
  },
  {
    id: 'sch-chevening-03',
    title: 'Chevening Scholarships (UK Government Global Scholarship Programme)',
    provider: 'Foreign, Commonwealth & Development Office (FCDO), United Kingdom',
    country: 'United Kingdom',
    eligibleNationalities: ['Indian', 'International (Chevening-eligible countries)'],
    educationLevel: ['postgraduate'],
    courseField: ['All Master Disciplines', 'Public Policy', 'Law', 'Sustainability', 'Technology', 'Economics'],
    awardAmount: 'Full Tuition Fees + Monthly Living Allowance + Airfare',
    awardAmountFormatted: 'Full UK Funding (Approx £38,000+)',
    awardAmountNumeric: 3800000,
    currency: 'GBP',
    fundingType: 'Full Tuition',
    providerType: 'government',
    overview: 'Chevening is the UK government international awards programme, offering future leaders, influencers, and decision-makers from all over the world an exceptional opportunity to develop professionally and academically through a one-year Master degree at any UK university.',
    benefits: [
      'Full payment of tuition fees (no cap for standard master courses)',
      'Monthly living stipend sufficient to cover accommodation and daily expenses in the UK',
      'Economy class return airfare from country of residence to the UK',
      'Arrival allowance, homeward departure allowance, and visa application fee reimbursement'
    ],
    eligibilityCriteria: {
      eligibleGenders: ['all'],
      specificConditions: [
        'Citizen of a Chevening-eligible country (India is fully eligible)',
        'Hold an undergraduate degree enabling entry to a postgraduate programme at a UK university',
        'Have at least two years (equivalent to 2,800 hours) of demonstrable work or leadership experience',
        'Commit to returning to country of citizenship for a minimum of two years after award ends',
        'Apply to three different eligible UK university courses and receive an unconditional offer from at least one'
      ]
    },
    requiredDocuments: [
      'Undergraduate Degree Certificate and Transcripts',
      'Two professional or academic reference letters',
      'Valid International Passport',
      'Three UK university course choices',
      'Four Chevening Leadership and Networking essay responses'
    ],
    applicationOpeningDate: '2026-08-05',
    deadline: '2026-11-05',
    selectionProcess: [
      'Global online application submission via Chevening Portal',
      'Independent Reading Committee assessment of leadership essays',
      'Shortlisting for in-person interview at British High Commission / Embassy',
      'Final selection announcements in June'
    ],
    importantInstructions: [
      'Chevening does not fund part-time or distance-learning courses.',
      'Plagiarism or use of undisclosed external AI generation in essays leads to automatic disqualification.'
    ],
    faqs: [
      {
        question: 'Does freelance work count toward the 2,800 hours work experience?',
        answer: 'Yes, full-time, part-time, voluntary work, and paid internships completed after or during graduation count.'
      }
    ],
    officialApplicationUrl: 'https://www.chevening.org/scholarship/india/',
    officialInformationSource: 'Chevening Secretariat & British High Commission New Delhi',
    lastVerifiedDate: '2026-10-02',
    verificationStatus: 'verified',
    verificationNotes: 'Verified with UK FCDO 2026-2027 application cycle guidelines.',
    isFeatured: true
  },
  {
    id: 'sch-fulbright-nehru-04',
    title: 'Fulbright-Nehru Master Fellowships',
    provider: 'United States-India Educational Foundation (USIEF)',
    country: 'United States',
    eligibleNationalities: ['Indian'],
    educationLevel: ['postgraduate'],
    courseField: ['Arts and Culture', 'Environmental Science', 'Higher Education Administration', 'Public Health', 'Public Administration', 'Gender Studies'],
    awardAmount: 'Full Tuition, J-1 Visa Support, Living Stipend & Sickness Insurance',
    awardAmountFormatted: 'Full US Funding (Approx $75,000+)',
    awardAmountNumeric: 6200000,
    currency: 'USD',
    fundingType: 'Full Tuition',
    providerType: 'government',
    overview: 'The Fulbright-Nehru Master Fellowships are designed for highly motivated individuals with leadership qualities, who have completed the equivalent of a US bachelor degree and have at least three years of professional work experience.',
    benefits: [
      'J-1 visa support and round-trip economy air travel',
      'Full tuition fees and mandatory institutional fees at a designated US university',
      'Living stipend and health and accident coverage as per US Government guidelines'
    ],
    eligibilityCriteria: {
      minPercentage: 55,
      eligibleGenders: ['all'],
      specificConditions: [
        'Must be a responsible Indian citizen residing in India at the time of application',
        'Completed at least a 4-year Indian bachelor degree OR completed a Master degree if the bachelor degree was 3 years',
        'At least three years of full-time professional work experience in the relevant field',
        'Demonstrated leadership and community service record'
      ]
    },
    requiredDocuments: [
      'Academic transcripts and degree diplomas',
      'Three confidential letters of recommendation',
      'Personal Statement and Study/Research Objectives essays',
      'Resume/CV outlining employment history and community involvement',
      'Valid Indian Passport'
    ],
    applicationOpeningDate: '2026-01-20',
    deadline: '2026-05-15',
    selectionProcess: [
      'Screening by USIEF national selection committee',
      'Interviews conducted by binational panels in New Delhi',
      'Approval by the J. William Fulbright Foreign Scholarship Board in Washington D.C.'
    ],
    importantInstructions: [
      'Recipients must return to India upon completion of the fellowship under the J-1 two-year home residency rule.'
    ],
    faqs: [
      {
        question: 'Do I need to have a US university admission in hand when applying to USIEF?',
        answer: 'No. The Institute of International Education (IIE) assists selected finalists with US university placements.'
      }
    ],
    officialApplicationUrl: 'https://www.usief.org.in/Fellowships/Fulbright-Nehru-Master-Fellowships.aspx',
    officialInformationSource: 'United States-India Educational Foundation Official Portal',
    lastVerifiedDate: '2026-10-10',
    verificationStatus: 'verified',
    verificationNotes: 'Verified against USIEF official announcement for Indian scholars.',
    isFeatured: true
  },
  {
    id: 'sch-daad-epos-05',
    title: 'DAAD EPOS (Development-Related Postgraduate Courses)',
    provider: 'German Academic Exchange Service (DAAD)',
    country: 'Germany',
    eligibleNationalities: ['Indian', 'Developing Nation Nationals'],
    educationLevel: ['postgraduate'],
    courseField: ['Development Studies', 'Engineering', 'Renewable Energy', 'Agricultural Economics', 'Public Health'],
    awardAmount: '€934/month stipend + travel allowance + health insurance',
    awardAmountFormatted: '€934 / month + Full Tuition Waiver',
    awardAmountNumeric: 1400000,
    currency: 'EUR',
    fundingType: 'Stipend & Living Allowance',
    providerType: 'government',
    overview: 'The DAAD EPOS programme offers foreign graduates from development and newly industrialized countries from all disciplines the chance to take a postgraduate or Master degree at a state or state-recognized German university.',
    benefits: [
      'Monthly scholarship payment of €934 for graduates',
      'Payments towards health, accident and personal liability insurance cover in Germany',
      'Travel allowance, unless these costs are covered by the home country or another source of funding',
      'One-off study allowance and preparatory German language course'
    ],
    eligibilityCriteria: {
      eligibleGenders: ['all'],
      specificConditions: [
        'Candidates have a Bachelor degree (usually four-year) in an appropriate subject',
        'Have at least two years of professional experience in a relevant field after Bachelor graduation',
        'Academic degrees should normally not be more than six years old'
      ]
    },
    requiredDocuments: [
      'DAAD application form',
      'Hand-signed CV (Europass format)',
      'Hand-signed Letter of Motivation (with reference to current occupation)',
      'Academic Letter of Recommendation from university professor',
      'Professional Letter of Recommendation from employer',
      'Certificates of Employment confirming minimum 2 years of work experience'
    ],
    applicationOpeningDate: '2026-08-01',
    deadline: '2026-10-31',
    selectionProcess: [
      'Direct application to the German university offering the EPOS master course',
      'Pre-selection by university faculty committee',
      'Final approval and formal award letter issued by DAAD Bonn'
    ],
    importantInstructions: [
      'Each participating German university course has its own deadline ranging between August and December.'
    ],
    faqs: [
      {
        question: 'Are the courses taught in English or German?',
        answer: 'Most EPOS programs are taught 100% in English, while some dual tracks require German proficiency.'
      }
    ],
    officialApplicationUrl: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/',
    officialInformationSource: 'DAAD Regional Office New Delhi & Bonn Headquarters',
    lastVerifiedDate: '2026-09-15',
    verificationStatus: 'verified',
    verificationNotes: 'Verified with official DAAD EPOS scholarship directory 2026.',
    isFeatured: false
  },
  {
    id: 'sch-tata-trusts-06',
    title: 'Tata Trusts Means Grant and Educational Financial Assistance',
    provider: 'Tata Trusts',
    country: 'India',
    eligibleNationalities: ['Indian'],
    educationLevel: ['school', 'undergraduate', 'postgraduate'],
    courseField: ['All Fields', 'Medical', 'Healthcare', 'Engineering', 'B.Sc Nursing'],
    awardAmount: 'Partial Tuition Fee Grant (30% to 80% of College Tuition)',
    awardAmountFormatted: 'Up to ₹1,00,000 / yr',
    awardAmountNumeric: 100000,
    currency: 'INR',
    fundingType: 'Cash Grant',
    providerType: 'private',
    overview: 'Tata Trusts offers financial assistance to underprivileged and deserving Indian students pursuing undergraduate and postgraduate studies across recognized Indian institutions, with a focus on medical, nursing, and professional education.',
    benefits: [
      'Direct payment towards semester/annual tuition fees to the institution or reimbursed against official fee receipts',
      'Merit-cum-means assessment tailored to family hardship'
    ],
    eligibilityCriteria: {
      minPercentage: 60,
      maxFamilyIncome: 400000,
      incomeCriteriaText: 'Annual family income should strictly not exceed ₹4 Lakh per annum.',
      eligibleGenders: ['all'],
      specificConditions: [
        'Enrolled as a full-time student in an institution recognized by UGC/AICTE/MCI/INC',
        'Passing all subjects in first attempt'
      ]
    },
    requiredDocuments: [
      'Original Fee Receipts of current academic year',
      'Salary Slips / Income Tax Returns / Income Certificate of parents',
      'Previous year college marksheets',
      'Cancelled cheque of the educational institution or student account',
      'Student Identity Card'
    ],
    applicationOpeningDate: '2026-07-15',
    deadline: '2026-11-15',
    selectionProcess: [
      'Online application on Tata Trusts scholarship portal',
      'Verification of income and fee structure documents',
      'Direct institutional disbursement'
    ],
    importantInstructions: [
      'Only one application per academic year is entertained.',
      'Distance learning and executive courses are not supported.'
    ],
    faqs: [
      {
        question: 'Is this scholarship loan-based or non-repayable?',
        answer: 'The Means Grant is an outright non-repayable educational grant.'
      }
    ],
    officialApplicationUrl: 'https://www.tatatrusts.org/our-work/individual-grants-programme/education-grants',
    officialInformationSource: 'Tata Trusts Official Individual Grants Portal',
    lastVerifiedDate: '2026-10-05',
    verificationStatus: 'verified',
    verificationNotes: 'Verified against Tata Trusts Individual Grants guidelines.',
    isFeatured: true
  },
  {
    id: 'sch-kc-mahindra-07',
    title: 'K. C. Mahindra Scholarships for Post-Graduate Studies Abroad',
    provider: 'K. C. Mahindra Education Trust',
    country: 'International',
    eligibleNationalities: ['Indian'],
    educationLevel: ['postgraduate'],
    courseField: ['Engineering', 'Technology', 'Medicine', 'Business Administration', 'Social Sciences'],
    awardAmount: 'Interest-free loan scholarship up to ₹10,00,000 (Top 3 receive ₹10 Lakh; others ₹5 Lakh)',
    awardAmountFormatted: 'Up to ₹10,00,000 Grant/Loan',
    awardAmountNumeric: 1000000,
    currency: 'INR',
    fundingType: 'Cash Grant',
    providerType: 'private',
    overview: 'Since 1956, the K. C. Mahindra Education Trust has granted interest-free loan scholarships to deserving Indian students who have secured admission into reputable universities abroad for postgraduate study.',
    benefits: [
      'Top 3 K.C. Mahindra Fellows receive ₹10,00,000 each',
      'Remaining selected scholars receive ₹5,00,000 each',
      'Interest-free repayment structure starting after completion of degree and initial employment grace period'
    ],
    eligibilityCriteria: {
      minPercentage: 65,
      eligibleGenders: ['all'],
      specificConditions: [
        'Must possess a First Class degree or equivalent from a recognized Indian University',
        'Must have secured admission or applied for admission to reputable foreign universities'
      ]
    },
    requiredDocuments: [
      'Copy of admission letter from foreign university',
      'Complete degree marksheets and graduation certificate',
      'Two letters of recommendation',
      'Statement of Purpose highlighting career aspirations',
      'Financial need statement'
    ],
    applicationOpeningDate: '2026-01-10',
    deadline: '2026-03-31',
    selectionProcess: [
      'Initial application screening',
      'Mandatory in-person / hybrid final interview with senior board members in Mumbai'
    ],
    importantInstructions: [
      'Students awaiting formal admission confirmation can also apply by submitting proof of submitted university applications.'
    ],
    faqs: [
      {
        question: 'When does repayment begin?',
        answer: 'Repayment starts in manageable installments 24 months after course completion or upon employment.'
      }
    ],
    officialApplicationUrl: 'https://www.kcmet.org/what-we-do-scholarships-empowerment.aspx',
    officialInformationSource: 'K. C. Mahindra Education Trust Mumbai',
    lastVerifiedDate: '2026-09-20',
    verificationStatus: 'verified',
    verificationNotes: 'Verified against KCMET annual scholarship prospectus.',
    isFeatured: false
  },
  {
    id: 'sch-pmss-08',
    title: 'Prime Minister Scholarship Scheme (PMSS) for Wards of Ex-Servicemen & Paramilitary',
    provider: 'Kendriya Sainik Board (KSB) & Ministry of Home Affairs, Govt. of India',
    country: 'India',
    eligibleNationalities: ['Indian'],
    educationLevel: ['undergraduate'],
    courseField: ['Engineering', 'Medicine', 'Dental', 'Veterinary', 'BBA', 'BCA', 'Pharmacy'],
    awardAmount: '₹30,000/yr for Boys, ₹36,000/yr for Girls',
    awardAmountFormatted: '₹36,000 / yr',
    awardAmountNumeric: 36000,
    currency: 'INR',
    fundingType: 'Cash Grant',
    providerType: 'government',
    overview: 'Prime Minister Scholarship Scheme encourages higher professional education for dependent wards and widows of Ex-Servicemen, Ex-Coast Guard personnel, and Central Armed Police Forces (CAPF/Assam Rifles).',
    benefits: [
      '₹3,000 per month for girls (₹36,000 per year)',
      '₹2,500 per month for boys (₹30,000 per year)',
      'Disbursed annually through direct bank transfer via PFMS'
    ],
    eligibilityCriteria: {
      minPercentage: 60,
      eligibleGenders: ['all'],
      specificConditions: [
        'Dependent ward or widow of deceased/disabled Ex-Servicemen or CAPF personnel',
        'Pursuing first professional degree (B.Tech, MBBS, B.Sc Nursing, etc.) in approved colleges',
        'Minimum 60% marks in Minimum Educational Qualification (MEQ) - 10+2 / Diploma'
      ]
    },
    requiredDocuments: [
      'Ex-Servicemen Discharge Book / PPO copy / Service Certificate',
      'Bonafide Certificate from College Principal',
      'Class 12th / Diploma Marksheet',
      'Aadhaar seeded bank account passbook',
      'Annexure 1 & 2 signed by Zila Sainik Board'
    ],
    applicationOpeningDate: '2026-08-10',
    deadline: '2026-11-30',
    selectionProcess: [
      'Application submission on National Scholarship Portal',
      'Verification by Zila Sainik Board (ZSB) / Rajya Sainik Board (RSB)',
      'Priority Category sorting (Category 1 to 6) as per KSB guidelines'
    ],
    importantInstructions: [
      'Master degree courses (except MCA/MBA in specified branches) are not covered under PMSS.'
    ],
    faqs: [
      {
        question: 'Is there a minimum mark requirement for yearly renewal?',
        answer: 'Yes, students must achieve at least 50% in each semester examination to continue receiving PMSS.'
      }
    ],
    officialApplicationUrl: 'https://ksb.gov.in',
    officialInformationSource: 'Kendriya Sainik Board, Ministry of Defence, New Delhi',
    lastVerifiedDate: '2026-10-12',
    verificationStatus: 'verified',
    verificationNotes: 'Verified via Kendriya Sainik Board official policy document.',
    isFeatured: false
  },
  {
    id: 'sch-nmms-09',
    title: 'National Means-cum-Merit Scholarship Scheme (NMMSS)',
    provider: 'Department of School Education & Literacy, Ministry of Education, Govt. of India',
    country: 'India',
    eligibleNationalities: ['Indian'],
    educationLevel: ['school'],
    courseField: ['Secondary Schooling (Class 9th to 12th)'],
    awardAmount: '₹12,000 per annum (₹1,000 per month)',
    awardAmountFormatted: '₹12,000 / yr',
    awardAmountNumeric: 12000,
    currency: 'INR',
    fundingType: 'Cash Grant',
    providerType: 'government',
    overview: 'The centrally sponsored National Means-cum-Merit Scholarship Scheme awards 100,000 scholarships to meritorious students whose parental income is not more than ₹3,50,000 per annum, to prevent dropouts after class 8th and encourage continuation of secondary stage education.',
    benefits: [
      '₹12,000 per annum (₹1,000 per month) for 4 continuous years from Class 9th through Class 12th',
      'Quarterly/annual credit straight to student bank account via SBI DBT'
    ],
    eligibilityCriteria: {
      minPercentage: 55,
      maxFamilyIncome: 350000,
      incomeCriteriaText: 'Parental income from all sources must not exceed ₹3,50,000 per annum.',
      eligibleGenders: ['all'],
      specificConditions: [
        'Studying as regular student in a Government, Local Body, or Government-aided school',
        'Minimum 55% marks or equivalent grade in Class 7 examination (5% relaxation for SC/ST)',
        'Must qualify the State-level NMMS selection test (Mental Ability Test + Scholastic Aptitude Test)'
      ]
    },
    requiredDocuments: [
      'Class 7 and 8 Marksheets',
      'State NMMS Examination Roll Number and Scorecard',
      'Income Certificate issued by Revenue Authority',
      'Aadhaar card of student',
      'School Principal Bonafide Verification'
    ],
    applicationOpeningDate: '2026-07-15',
    deadline: '2026-11-30',
    selectionProcess: [
      'Two-stage written exam conducted by respective State SCERT/Education Board',
      'Merit quota allocation by district and category',
      'Registration on National Scholarship Portal for payment onboarding'
    ],
    importantInstructions: [
      'Students of Kendriya Vidyalayas, Jawahar Navodaya Vidyalayas, and residential schools run by State Governments where boarding/lodging are provided are not eligible.'
    ],
    faqs: [
      {
        question: 'What is the examination pattern?',
        answer: 'It consists of two 90-minute tests: Mental Ability Test (MAT - 90 questions) and Scholastic Aptitude Test (SAT - 90 questions).'
      }
    ],
    officialApplicationUrl: 'https://scholarships.gov.in',
    officialInformationSource: 'Department of School Education & Literacy, New Delhi',
    lastVerifiedDate: '2026-10-18',
    verificationStatus: 'verified',
    verificationNotes: 'Verified against current NMMS guidelines on education.gov.in and scholarships.gov.in.',
    isFeatured: true
  },
  {
    id: 'sch-erasmus-10',
    title: 'Erasmus Mundus Joint Masters Scholarship',
    provider: 'European Commission / European Union',
    country: 'International (Multiple European Countries)',
    eligibleNationalities: ['All Nationalities', 'Indian'],
    educationLevel: ['postgraduate'],
    courseField: ['Interdisciplinary Sciences', 'Data Science', 'Humanities', 'Marine Biology', 'Artificial Intelligence', 'Public Health'],
    awardAmount: 'Full Tuition Waiver + €1,400 Monthly Living Allowance + Travel and Installation Costs',
    awardAmountFormatted: 'Full EU Funding (Approx €42,000+)',
    awardAmountNumeric: 3750000,
    currency: 'EUR',
    fundingType: 'Full Tuition',
    providerType: 'university',
    overview: 'Erasmus Mundus Joint Masters are high-level integrated study programmes designed and delivered by an international partnership of higher education institutions across at least two European countries, funded by the European Union.',
    benefits: [
      'Covers 100% of student participation costs including tuition, library and laboratory costs',
      'Comprehensive health and accident insurance throughout Europe',
      'Monthly contribution of €1,400 to individual subsistence costs for the entire duration (up to 24 months)',
      'Joint, double, or multiple degrees awarded from prestigious European universities'
    ],
    eligibilityCriteria: {
      eligibleGenders: ['all'],
      specificConditions: [
        'Bachelor degree or recognized equivalent level of learning',
        'Not having already benefited from a previous Erasmus Mundus scholarship',
        'Meeting course-specific language proficiencies (usually IELTS 6.5+ or TOEFL equivalent)'
      ]
    },
    requiredDocuments: [
      'Official Bachelor transcripts and degree diploma',
      'Proof of Nationality (Passport)',
      'Proof of Place of Residence',
      'Curriculum Vitae in Europass format',
      'Motivation Letter',
      'Two Academic / Professional recommendation letters'
    ],
    applicationOpeningDate: '2026-10-01',
    deadline: '2027-01-15',
    selectionProcess: [
      'Direct online submission to the selected Erasmus Mundus consortium portal',
      'Joint academic panel evaluation',
      'Consortium ranking and European Education and Culture Executive Agency (EACEA) approval'
    ],
    importantInstructions: [
      'Candidates may apply to a maximum of three different Erasmus Mundus programmes in the same intake.'
    ],
    faqs: [
      {
        question: 'Do I live in only one country?',
        answer: 'No! Study takes place in at least two different European countries, and often includes international internship mobility.'
      }
    ],
    officialApplicationUrl: 'https://erasmus-plus.ec.europa.eu/opportunities/opportunities-for-individuals/students/erasmus-mundus-joint-masters',
    officialInformationSource: 'European Commission Directorate-General for Education, Youth, Sport and Culture',
    lastVerifiedDate: '2026-10-25',
    verificationStatus: 'verified',
    verificationNotes: 'Verified against European Commission Erasmus+ 2026 Programme Guide.',
    isFeatured: true
  }
];

export const DEMO_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'demo-stem-future-99',
    title: '[DEMO SPECIMEN] Global NextGen STEM Fellowship',
    provider: 'Global Tech Innovation Foundation (Specimen Organization)',
    country: 'International',
    eligibleNationalities: ['All Nationalities'],
    educationLevel: ['undergraduate', 'postgraduate'],
    courseField: ['Computer Science', 'Robotics', 'Biotechnology'],
    awardAmount: '$15,000 Annual Stipend + Mentorship',
    awardAmountFormatted: '$15,000 / yr',
    awardAmountNumeric: 1250000,
    currency: 'USD',
    fundingType: 'Mentorship & Grant',
    providerType: 'private',
    overview: 'This is an illustrative specimen record designed to demonstrate simulated interface features without presenting real provider credentials.',
    benefits: [
      'Direct monetary award',
      'Quarterly executive mentorship'
    ],
    eligibilityCriteria: {
      minPercentage: 70,
      eligibleGenders: ['all'],
      specificConditions: ['Enrolled in an accredited STEM degree']
    },
    requiredDocuments: [
      'Specimen resume',
      'Statement of intent'
    ],
    applicationOpeningDate: '2026-09-01',
    deadline: '2026-12-31',
    selectionProcess: ['Sample application', 'Mock committee review'],
    importantInstructions: ['Demonstration record only. Not an actual scholarship authority.'],
    faqs: [
      {
        question: 'Is this a real scholarship?',
        answer: 'No, this entry is clearly flagged with demo verification status to safeguard provenance standards.'
      }
    ],
    officialApplicationUrl: 'https://example.com/demo-grant',
    officialInformationSource: 'GRANTLY Demo Specimen Catalog',
    lastVerifiedDate: '2026-11-01',
    verificationStatus: 'demo',
    verificationNotes: 'Clearly identified illustrative demo record.',
    isFeatured: false
  }
];

export const ALL_SCHOLARSHIPS: Scholarship[] = [
  ...VERIFIED_SCHOLARSHIPS,
  ...DEMO_SCHOLARSHIPS
];

