import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Lock, Mail, Compass, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const SignInPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signInAsDemo } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/app/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please enter both your email address and password');
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err?.message || 'Invalid login credentials');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoSignIn = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await signInAsDemo();
      navigate('/app/dashboard', { replace: true });
    } catch {
      setError('Failed to initiate demo login');
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
            <h1 className="auth-title">{t('auth.signInTitle')}</h1>
            <p className="auth-subtitle">{t('auth.signInSubtitle')}</p>
          </div>

          {/* Quick Demo Sign-in Box */}
          <div className="demo-login-box">
            <div className="demo-box-content">
              <UserCheck size={18} className="text-primary" />
              <div>
                <strong>Explore with Demo Profile</strong>
                <p>Pre-populated with authentic student grades and active matches.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDemoSignIn}
              disabled={isSubmitting}
              className="btn btn-secondary btn-sm"
            >
              Sign In as Demo Student
            </button>
          </div>

          <div className="auth-divider">
            <span>OR SIGN IN WITH EMAIL</span>
          </div>

          {/* Form */}
          {error && <div className="badge badge-danger auth-error-alert">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">{t('auth.emailLabel')} *</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-leading-icon" />
                <input
                  type="email"
                  required
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input has-icon-left"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">
                <span>{t('auth.passwordLabel')} *</span>
                <Link to="/forgot-password" className="forgot-password-link">
                  {t('auth.forgotPassword')}
                </Link>
              </div>
              <div className="input-with-icon">
                <Lock size={18} className="input-leading-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
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

            <div className="auth-options-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>{t('auth.rememberMe')}</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg full-w"
            >
              {isSubmitting ? 'Authenticating...' : t('auth.signInBtn')}
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Footer link */}
          <div className="auth-footer-link">
            <span>{t('auth.noAccount')} </span>
            <Link to="/signup" className="text-primary font-semibold">
              Create an account
            </Link>
          </div>

          <div className="auth-disclaimer-pill">
            <ShieldCheck size={14} className="text-success" />
            <span>{t('auth.demoNote')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

