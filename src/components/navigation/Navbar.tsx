import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Compass, Menu, X, Sun, Moon, LogIn, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { LanguageSelector } from '../common/LanguageSelector';

export const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/how-it-works', label: t('nav.howItWorks') },
    { to: '/scholarships', label: t('nav.scholarships') },
    { to: '/news', label: t('nav.news') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="site-header">
      <div className="container nav-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="logo-icon-box">
            <Compass className="logo-svg" size={24} />
          </div>
          <div className="brand-text-wrap">
            <span className="brand-name">GRANTLY</span>
            <span className="brand-sub">OPPORTUNITIES</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="header-actions">
          {/* Language Selector Dropdown */}
          <LanguageSelector compact={false} />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="icon-btn"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Auth Action */}
          {isAuthenticated && user ? (
            <Link to="/app/dashboard" className="btn btn-primary btn-sm user-nav-pill">
              <User size={16} />
              <span>{user.name.split(' ')[0]}</span>
            </Link>
          ) : (
            <div className="auth-btns-group">
              <Link to="/signin" className="btn btn-ghost btn-sm">
                <LogIn size={16} />
                <span>{t('nav.signIn')}</span>
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                {t('nav.getStarted')}
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <nav className="mobile-nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`mobile-nav-item ${isActive(link.to) ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mobile-auth-area">
              {isAuthenticated ? (
                <Link
                  to="/app/dashboard"
                  className="btn btn-primary btn-lg full-w"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="btn btn-outline btn-lg full-w"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('nav.signIn')}
                  </Link>
                  <Link
                    to="/signup"
                    className="btn btn-primary btn-lg full-w"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('nav.getStarted')}
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

