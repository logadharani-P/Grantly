import { AIMessage, StudentProfile } from '../../types';
import { ALL_SCHOLARSHIPS } from '../../data/scholarships';
import { eligibilityService } from '../eligibility/eligibilityService';

export interface AIServiceAdapter {
  sendMessage(userQuery: string, history: AIMessage[], profile: StudentProfile | null): Promise<AIMessage>;
}

class MockAIInteractionService implements AIServiceAdapter {
  async sendMessage(userQuery: string, history: AIMessage[], profile: StudentProfile | null): Promise<AIMessage> {
    // Simulate natural AI thinking latency
    await new Promise(res => setTimeout(res, 850));

    const q = userQuery.toLowerCase();

    // Check query intent against factual scholarship dataset

    // 1. Matching scholarships for academic background
    if (q.includes('match') || q.includes('my background') || q.includes('recommend') || q.includes('qualify for')) {
      if (!profile) {
        return {
          id: 'msg-' + Date.now(),
          role: 'assistant',
          content: 'To give you accurate, verified recommendations, please sign in or complete your student profile with your current academic level, scores, and country of residence.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          confidence: 'requires_verification'
        };
      }

      const matching = ALL_SCHOLARSHIPS.filter(s => s.educationLevel.includes(profile.educationLevel));
      const top3 = matching.slice(0, 3);

      const itemsList = top3.map(s => {
        const assessment = eligibilityService.assessEligibility(s, profile);
        return `• **${s.title}** (${s.provider})\n  - Status: **${assessment.status.toUpperCase()}** (${assessment.score}% Match)\n  - Benefit: ${s.awardAmountFormatted}\n  - Official Source: [${s.officialInformationSource}](${s.officialApplicationUrl})`;
      }).join('\n\n');

      return {
        id: 'msg-' + Date.now(),
        role: 'assistant',
        content: `Based on your profile as an **${profile.educationLevel.toUpperCase()}** scholar with **${profile.countryOfResidence}** residence, here are top verified opportunities that align with your criteria:\n\n${itemsList}\n\n*Note: GRANTLY recommendations are calculated from public eligibility criteria. Final admissions decisions rest solely with the respective scholarship authorities.*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceReferences: top3.map(s => ({
          title: s.title,
          url: s.officialApplicationUrl,
          note: `Verified on ${s.lastVerifiedDate} via ${s.officialInformationSource}`
        })),
        confidence: 'high'
      };
    }

    // 2. Documents inquiry
    if (q.includes('document') || q.includes('paperwork') || q.includes('certificate')) {
      return {
        id: 'msg-' + Date.now(),
        role: 'assistant',
        content: `Required documents vary depending on whether you are applying for an Indian government scheme or an International fellowship:\n\n**Common Mandatory Documents for Indian Schemes (NSP / State Portals):**\n1. Previous Year Qualifying Marksheet (Class 10th, 12th, or UG semester).\n2. Competent Authority Income Certificate (Tahsildar / SDM) dated within the current financial year.\n3. Aadhaar Card (Must be seeded with your active bank account).\n4. Bonafide Student Certificate / Fee Receipt from your college.\n\n**For International Fellowships (Chevening, Fulbright, DAAD):**\n1. Official Degree Transcripts & Provisional Degree Certificate.\n2. Statement of Purpose (SOP) & Essays explaining your leadership vision.\n3. 2–3 Academic/Professional Letters of Recommendation.\n4. Valid International Passport.\n\nNever share your password or submit unverified originals to any external agent. All official submissions take place directly on government and university portals.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceReferences: [
          {
            title: 'National Scholarship Portal Guidelines',
            url: 'https://scholarships.gov.in',
            note: 'Department of Higher Education, Govt of India'
          },
          {
            title: 'Chevening Application Documents Guide',
            url: 'https://www.chevening.org',
            note: 'UK Foreign, Commonwealth & Development Office'
          }
        ],
        confidence: 'high'
      };
    }

    // 3. Income requirement clarification
    if (q.includes('income') || q.includes('means') || q.includes('financial')) {
      return {
        id: 'msg-' + Date.now(),
        role: 'assistant',
        content: `Income ceilings in scholarship schemes refer to the **Gross Annual Household Income** from all combined sources (salary, agriculture, business, pensions) of parents or guardians:\n\n• **Central Sector Scheme (NSP):** Max ₹4,50,000 per annum.\n• **AICTE Pragati / Saksham:** Max ₹8,00,000 per annum.\n• **Tata Trusts Means Grants:** Max ₹4,00,000 per annum.\n• **NMMSS (School):** Max ₹3,50,000 per annum.\n\n**Crucial Provenance Note:** Self-declared affidavits are not accepted on government portals. You must obtain an official Income Certificate issued by an authorized revenue officer (Revenue Inspector, Tahsildar, or Sub-Divisional Magistrate).`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceReferences: [
          {
            title: 'Revenue Authority Guidelines for Means-Tested Schemes',
            url: 'https://scholarships.gov.in',
            note: 'Official Ministry Income Verification Rulebook'
          }
        ],
        confidence: 'high'
      };
    }

    // 4. Postgraduate scholarships
    if (q.includes('postgraduate') || q.includes('master') || q.includes('phd') || q.includes('pg')) {
      const pgSchemes = ALL_SCHOLARSHIPS.filter(s => s.educationLevel.includes('postgraduate'));
      const list = pgSchemes.map(s => `• **${s.title}** (${s.country}) — *${s.awardAmountFormatted}* [Deadline: ${s.deadline}]`).join('\n');

      return {
        id: 'msg-' + Date.now(),
        role: 'assistant',
        content: `Here are active postgraduate opportunities currently verified on GRANTLY:\n\n${list}\n\nNotice that international PG schemes like Chevening (UK) and DAAD EPOS (Germany) require at least 2 years of demonstrable work experience, whereas university fellowships like Erasmus Mundus evaluate primarily academic research excellence.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceReferences: pgSchemes.map(s => ({
          title: s.title,
          url: s.officialApplicationUrl,
          note: s.officialInformationSource
        })),
        confidence: 'high'
      };
    }

    // 5. Application deadline or process
    if (q.includes('deadline') || q.includes('close') || q.includes('when')) {
      const sortedByDeadline = [...ALL_SCHOLARSHIPS].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
      const next3 = sortedByDeadline.slice(0, 3);
      const items = next3.map(s => `• **${s.title}**: **${s.deadline}** (${s.provider})`).join('\n');

      return {
        id: 'msg-' + Date.now(),
        role: 'assistant',
        content: `Here are the upcoming application deadlines recorded from official announcements:\n\n${items}\n\n**Advice:** We recommend completing your document uploads and institute-level bonafide certificates at least 10 days before the closing date, as government and university portal servers frequently experience heavy traffic near deadlines.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceReferences: next3.map(s => ({
          title: s.title,
          url: s.officialApplicationUrl,
          note: `Closing date: ${s.deadline}`
        })),
        confidence: 'high'
      };
    }

    // Generic educational guidance response
    return {
      id: 'msg-' + Date.now(),
      role: 'assistant',
      content: `I am your GRANTLY Scholarship Assistant. I can help you with:\n\n1. Evaluating your eligibility for specific Indian or International scholarships.\n2. Breaking down required documentation and gazette criteria.\n3. Explaining income certificates, merit cutoffs, and quota rules.\n4. Providing direct links to official portals (NSP, Chevening, USIEF, DAAD, AICTE).\n\n*Important Disclaimers: GRANTLY is an independent discovery and preparation platform. We do not charge application fees, award direct grants, or submit external applications on your behalf.*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      confidence: 'medium'
    };
  }
}

export const aiService = new MockAIInteractionService();

