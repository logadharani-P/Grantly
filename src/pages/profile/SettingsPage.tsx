import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Globe, 
  Bell, 
  Trash2, 
  RotateCcw, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useSavedScholarships } from '../../contexts/SavedScholarshipsContext';
import { SUPPORTED_LANGUAGES } from '../../i18n';
import { LanguageSelector } from '../../components/common/LanguageSelector';

export const SettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme, setTheme } = useTheme();
  const { resetAllData } = useAuth();
  const { refreshSaved } = useSavedScholarships();

  const [notifications, setNotifications] = useState({
    deadlines: true,
    matchingAlerts: true,
    newsBulletins: false,
  });

  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('grantly_language', lang);
    showNotice(`Language switched to ${lang === 'hi' ? 'हिंदी (Hindi)' : 'English'}`);
  };

  const handleClearSaved = () => {
    localStorage.removeItem('grantly_saved_scholarships');
    refreshSaved();
    showNotice('Saved scholarships cleared successfully.');
  };

  const handleClearApplications = () => {
    localStorage.removeItem('grantly_applications');
    showNotice('Application tracker history reset.');
  };

  const handleFactoryReset = () => {
    if (window.confirm('Are you sure you want to reset all profile data? This will log you out and restore initial specimen state.')) {
      resetAllData();
      window.location.href = '/';
    }
  };

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div className="settings-page-root">
      {/* Header */}
      <section className="settings-header-banner">
        <div className="container">
          <div className="header-meta-row">
            <span className="section-eyebrow">Preferences & Privacy</span>
            <span className="provenance-tag">
              <ShieldCheck size={16} className="text-success" />
              Local Sandbox Controls
            </span>
          </div>
          <h1 className="settings-title">Platform Settings</h1>
          <p className="settings-subtitle">
            Configure appearance, interface language, deadline alerts, and manage stored application data.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container container-narrow">
          {actionNotice && (
            <div className="card settings-alert-banner">
              <CheckCircle2 size={18} className="text-success" />
              <span>{actionNotice}</span>
            </div>
          )}

          {/* Theme Section */}
          <div className="card settings-block-card">
            <div className="block-header">
              {theme === 'light' ? <Sun size={20} className="text-primary" /> : <Moon size={20} className="text-primary" />}
              <div>
                <h3>Appearance & Theme</h3>
                <p>Choose between daytime crisp light theme and accessible nighttime dark theme.</p>
              </div>
            </div>

            <div className="theme-toggle-row">
              <div 
                className={`theme-option-box ${theme === 'light' ? 'active' : ''}`}
                onClick={() => setTheme('light')}
              >
                <div className="preview-light-box">
                  <Sun size={24} />
                  <span>Light Mode (Default)</span>
                </div>
              </div>

              <div 
                className={`theme-option-box ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => setTheme('dark')}
              >
                <div className="preview-dark-box">
                  <Moon size={24} />
                  <span>Dark Mode</span>
                </div>
              </div>
            </div>
          </div>

          {/* Language Architecture */}
          <div className="card settings-block-card">
            <div className="block-header">
              <Globe size={20} className="text-primary" />
              <div>
                <h3>Multilingual Architecture (i18next)</h3>
                <p>GRANTLY uses translation keys for seamless localization.</p>
              </div>
            </div>

            <div className="lang-buttons-row">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`btn ${i18n.language === lang.code ? 'btn-primary' : 'btn-outline'}`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.nativeName} ({lang.name})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="card settings-block-card">
            <div className="block-header">
              <Bell size={20} className="text-primary" />
              <div>
                <h3>Alert Preferences</h3>
                <p>Simulated in-app deadline reminders and eligibility notifications.</p>
              </div>
            </div>

            <div className="notifications-toggle-list">
              <label className="toggle-row">
                <div>
                  <strong>Upcoming Deadline Alerts</strong>
                  <p>Notify me 7 days before saved scholarships close.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.deadlines}
                  onChange={(e) => setNotifications({ ...notifications, deadlines: e.target.checked })}
                />
              </label>

              <label className="toggle-row">
                <div>
                  <strong>New Matching Schemes</strong>
                  <p>Highlight newly verified opportunities matching my degree stage.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.matchingAlerts}
                  onChange={(e) => setNotifications({ ...notifications, matchingAlerts: e.target.checked })}
                />
              </label>
            </div>
          </div>

          {/* Data Management & Privacy Controls */}
          <div className="card settings-block-card danger-zone">
            <div className="block-header">
              <Trash2 size={20} className="text-danger" />
              <div>
                <h3>Data Persistence & Storage Controls</h3>
                <p>All demo records are stored strictly in your browser session.</p>
              </div>
            </div>

            <div className="data-actions-list">
              <div className="action-row">
                <div>
                  <strong>Clear Saved Bookmarks</strong>
                  <p>Removes all shortlisted scholarships from your saved list.</p>
                </div>
                <button onClick={handleClearSaved} className="btn btn-outline btn-sm">
                  Clear Saved
                </button>
              </div>

              <div className="action-row">
                <div>
                  <strong>Reset Application Tracker</strong>
                  <p>Clears self-reported milestones and preparation checklists.</p>
                </div>
                <button onClick={handleClearApplications} className="btn btn-outline btn-sm">
                  Reset Applications
                </button>
              </div>

              <div className="action-row">
                <div>
                  <strong>Factory Reset Demo Profile</strong>
                  <p>Deletes session token, profile edits, and restores clean slate.</p>
                </div>
                <button onClick={handleFactoryReset} className="btn btn-danger btn-sm">
                  Reset All Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

