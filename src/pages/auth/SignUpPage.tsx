import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, Mail, Lock, Eye, EyeOff, Compass, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const SignUpPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Please provide your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid educational or personal email');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!agreeTerms) {
      setError('Please accept the Terms of Service to continue');
      return;
    }

    setIsSubmitting(true);
    try {
      await signUp(fullName, email, password);
      // Direct newly registered student to multi-step onboarding
      navigate('/onboarding');
    } catch (err: any) {
      setError(err?.message || 'Failed to create student account');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page-root">
      <div className="auth-container">
        <div className="auth-card card">
          {/* Header */}
          <div className="auth-header">
            <Link to="/" className="brand-logo auth-logo-center">
              <div className="logo-icon-box">
                <Compass className="logo-svg" size={24} />
              </div>
              <div className="brand-text-wrap">
                <span className="brand-name">GRANTLY</span>
                <span className="brand-sub">OPPORTUNITIES</span>
              </div>
            </Link>
            <h1 className="auth-title">{t('auth.signUpTitle')}</h1>
            <p className="auth-subtitle">{t('auth.signUpSubtitle')}</p>
          </div>

          {error && <div className="badge badge-danger auth-error-alert">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">{t('auth.fullNameLabel')} *</label>
              <div className="input-with-icon">
                <User size={18} className="input-leading-icon" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="form-input has-icon-left"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t('auth.emailLabel')} *</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-leading-icon" />
                <input
                  type="email"
                  required
                  placeholder="student@example.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input has-icon-left"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t('auth.passwordLabel')} *</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-leading-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input has-icon-left has-icon-right"
                />
                <button
                  type="button"
                  className="input-trailing-icon-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t('auth.confirmPasswordLabel')} *</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-leading-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input has-icon-left"
                />
              </div>
            </div>

            <div className="auth-options-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>
                  I agree to the <Link to="/terms" target="_blank" className="text-primary">Terms of Service</Link> and acknowledge the <Link to="/privacy" target="_blank" className="text-primary">Privacy Policy</Link>.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg full-w"
            >
              {isSubmitting ? 'Creating Profile...' : t('auth.signUpBtn')}
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Footer link */}
          <div className="auth-footer-link">
            <span>{t('auth.haveAccount')} </span>
            <Link to="/signin" className="text-primary font-semibold">
              Sign In here
            </Link>
          </div>

          <div className="auth-disclaimer-pill">
            <ShieldCheck size={14} className="text-success" />
            <span>Registration takes you straight to our adaptive onboarding.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

