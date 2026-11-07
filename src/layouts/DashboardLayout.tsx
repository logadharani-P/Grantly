import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Compass, 
  LayoutDashboard, 
  Search, 
  Sparkles, 
  Bookmark, 
  FileText, 
  Bot, 
  Newspaper, 
  User, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  Sun, 
  Moon, 
  Menu, 
  X,
  ShieldCheck,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FloatingAIAssistant } from '../components/assistant/FloatingAIAssistant';
import { LanguageSelector } from '../components/common/LanguageSelector';

export const DashboardLayout: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If not authenticated, redirect to signin
  if (!isAuthenticated || !user) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'hi' ? 'en' : 'hi';
    i18n.changeLanguage(nextLang);
    localStorage.setItem('grantly_language', nextLang);
  };

  const navItems = [
    { to: '/app/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/app/scholarships', label: 'Find Scholarships', icon: Search },
    { to: '/app/recommended', label: 'Recommended', icon: Sparkles, badge: 'Tailored' },
    { to: '/app/saved', label: 'Saved Scholarships', icon: Bookmark },
    { to: '/app/applications', label: 'My Applications', icon: FileText },
    { to: '/app/eligibility', label: 'Eligibility Checker', icon: ShieldCheck },
    { to: '/app/assistant', label: 'AI Assistant', icon: Bot },
    { to: '/app/news', label: 'Education News', icon: Newspaper },
    { to: '/app/profile', label: 'My Profile', icon: User },
    { to: '/app/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/app/dashboard') return location.pathname === '/app/dashboard';
    return location.pathname.startsWith(path);
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className={`dashboard-wrapper ${sidebarCollapsed ? 'sidebar-is-collapsed' : ''}`}>
      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="sidebar-mobile-backdrop" 
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* LEFT SIDEBAR */}
      <aside className={`dashboard-sidebar ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
        {/* Sidebar Brand Header */}
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand-link">
            <div className="logo-icon-box">
              <Compass className="logo-svg" size={24} />
            </div>
            {!sidebarCollapsed && (
              <div className="brand-text-wrap">
                <span className="brand-name">GRANTLY</span>
                <span className="brand-sub">OPPORTUNITIES</span>
              </div>
            )}
          </Link>
          <button
            className="sidebar-collapse-btn desktop-only"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={sidebarCollapsed ? 'Expand' : 'Collapse'}
          >
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button
            className="sidebar-close-btn mobile-only"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="sidebar-nav" aria-label="Dashboard Menu">
          <div className="sidebar-nav-group">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`sidebar-nav-item ${active ? 'active' : ''}`}
                  onClick={() => setMobileSidebarOpen(false)}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon size={20} className="nav-icon" />
                  {!sidebarCollapsed && <span className="nav-label">{item.label}</span>}
                  {!sidebarCollapsed && item.badge && (
                    <span className="badge badge-primary sidebar-badge">{item.badge}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          {/* Quick theme & lang toggles */}
          <div className="sidebar-utility-row">
            <button
              onClick={toggleTheme}
              className="sidebar-util-btn"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              {!sidebarCollapsed && <span>{theme === 'light' ? 'Dark' : 'Light'}</span>}
            </button>
            <button
              onClick={toggleLanguage}
              className="sidebar-util-btn"
              title="Toggle language"
            >
              <Globe size={18} />
              {!sidebarCollapsed && <span>{i18n.language === 'hi' ? 'हिंदी' : 'English'}</span>}
            </button>
          </div>

          {/* User profile capsule */}
          <div className="sidebar-user-pill">
            <Link to="/app/profile" className="user-info-area" title={user.name}>
              <div className="user-avatar-circle">
                {user.name.charAt(0).toUpperCase()}
              </div>
              {!sidebarCollapsed && (
                <div className="user-meta">
                  <span className="user-name-text">{user.name}</span>
                  <span className="user-role-text">{user.educationLevel.toUpperCase()}</span>
                </div>
              )}
            </Link>
            <button
              onClick={handleSignOut}
              className="sidebar-logout-btn"
              title="Log out"
              aria-label="Log out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="dashboard-main-wrapper">
        {/* Top Header Bar */}
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <button
              className="topbar-mobile-menu-btn mobile-only"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>
            <div className="breadcrumb-box">
              <span className="provenance-tag">
                <CheckCircle2 size={14} className="text-success" />
                Verified Student Portal
              </span>
            </div>
          </div>

          <div className="topbar-right">
            <LanguageSelector compact={false} />
            <Link to="/app/scholarships" className="btn btn-secondary btn-sm desktop-only">
              <Search size={16} />
              <span>Explore All Scholarships</span>
            </Link>
            <Link to="/app/assistant" className="btn btn-primary btn-sm">
              <Bot size={16} />
              <span>Ask AI</span>
            </Link>
          </div>
        </header>

        {/* Page Inner Container */}
        <main className="dashboard-page-content">
          <Outlet />
        </main>
      </div>

      {/* Floating AI Assistant Widget */}
      <FloatingAIAssistant />
    </div>
  );
};

