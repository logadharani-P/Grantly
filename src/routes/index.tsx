import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';

// Public Pages
import { HomePage } from '../pages/public/HomePage';
import { AboutPage } from '../pages/public/AboutPage';
import { VisionMissionPage } from '../pages/public/VisionMissionPage';
import { HowItWorksPage } from '../pages/public/HowItWorksPage';
import { ContactPage } from '../pages/public/ContactPage';
import { PrivacyPage } from '../pages/public/PrivacyPage';
import { TermsPage } from '../pages/public/TermsPage';

// Auth Pages
import { SignInPage } from '../pages/auth/SignInPage';
import { SignUpPage } from '../pages/auth/SignUpPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';

// Onboarding
import { OnboardingPage } from '../pages/onboarding/OnboardingPage';

// Dashboard Pages
import { DashboardOverviewPage } from '../pages/dashboard/DashboardOverviewPage';
import { ScholarshipListPage } from '../pages/scholarships/ScholarshipListPage';
import { ScholarshipDetailsPage } from '../pages/scholarships/ScholarshipDetailsPage';
import { EligibilityCheckerPage } from '../pages/scholarships/EligibilityCheckerPage';
import { SavedScholarshipsPage } from '../pages/scholarships/SavedScholarshipsPage';
import { ApplicationAssistantPage } from '../pages/applications/ApplicationAssistantPage';
import { ApplicationTrackerPage } from '../pages/applications/ApplicationTrackerPage';
import { AIAssistantPage } from '../pages/assistant/AIAssistantPage';
import { NewsListPage } from '../pages/news/NewsListPage';
import { NewsArticleDetailsPage } from '../pages/news/NewsArticleDetailsPage';
import { StudentProfilePage } from '../pages/profile/StudentProfilePage';
import { SettingsPage } from '../pages/profile/SettingsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/vision" element={<VisionMissionPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        
        {/* Discovery & News available publicly as well */}
        <Route path="/scholarships" element={<ScholarshipListPage />} />
        <Route path="/scholarships/:id" element={<ScholarshipDetailsPage />} />
        <Route path="/news" element={<NewsListPage />} />
        <Route path="/news/:id" element={<NewsArticleDetailsPage />} />
      </Route>

      {/* Auth Flow */}
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Onboarding Flow */}
      <Route path="/onboarding" element={<OnboardingPage />} />

      {/* Authenticated Student Portal */}
      <Route path="/app" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardOverviewPage />} />
        <Route path="scholarships" element={<ScholarshipListPage />} />
        <Route path="scholarships/:id" element={<ScholarshipDetailsPage />} />
        <Route path="recommended" element={<ScholarshipListPage defaultOnlyRecommended={true} />} />
        <Route path="saved" element={<SavedScholarshipsPage />} />
        <Route path="eligibility" element={<EligibilityCheckerPage />} />
        <Route path="apply/:id" element={<ApplicationAssistantPage />} />
        <Route path="applications" element={<ApplicationTrackerPage />} />
        <Route path="assistant" element={<AIAssistantPage />} />
        <Route path="news" element={<NewsListPage />} />
        <Route path="news/:id" element={<NewsArticleDetailsPage />} />
        <Route path="profile" element={<StudentProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

