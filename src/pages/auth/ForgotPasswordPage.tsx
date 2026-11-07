import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Compass, ArrowLeft, CheckCircle2, Send } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="auth-page-root">
      <div className="auth-container">
        <div className="auth-card card">
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
            <h1 className="auth-title">Reset Password</h1>
            <p className="auth-subtitle">
              Enter your email address and we will generate a secure reset link.
            </p>
          </div>

          {submitted ? (
            <div className="reset-success-box">
              <CheckCircle2 size={44} className="text-success" />
              <h3>Password Reset Link Sent</h3>
              <p>
                In this demonstration environment, a simulated password recovery email has been queued for <strong>{email}</strong>.
              </p>
              <Link to="/signin" className="btn btn-primary btn-md full-w">
                Return to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label className="form-label">Registered Email Address *</label>
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

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary btn-lg full-w"
              >
                {isLoading ? 'Sending Link...' : 'Send Password Reset Email'}
                <Send size={16} />
              </button>

              <div className="auth-footer-link">
                <Link to="/signin" className="back-to-login-link">
                  <ArrowLeft size={16} /> Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

