import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Compass, ShieldCheck, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <Link to="/" className="brand-logo footer-logo">
            <div className="logo-icon-box">
              <Compass className="logo-svg" size={24} />
            </div>
            <div className="brand-text-wrap">
              <span className="brand-name">GRANTLY</span>
              <span className="brand-sub">OPPORTUNITIES</span>
            </div>
          </Link>
          <p className="footer-desc">
            {t('footer.desc')}
          </p>
          <div className="provenance-pill">
            <ShieldCheck size={16} className="text-success" />
            <span>100% Provenance & Verified Sources</span>
          </div>
        </div>

        {/* Links Column 1: Platform */}
        <div className="footer-col">
          <h4 className="footer-heading">Platform</h4>
          <ul className="footer-links">
            <li><Link to="/scholarships">Discover Scholarships</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/news">Education & Policy News</Link></li>
            <li><Link to="/app/eligibility">Eligibility Checker</Link></li>
            <li><Link to="/app/assistant">AI Scholarship Assistant</Link></li>
          </ul>
        </div>

        {/* Links Column 2: Who We Serve */}
        <div className="footer-col">
          <h4 className="footer-heading">Scholarships By Level</h4>
          <ul className="footer-links">
            <li><Link to="/scholarships?level=school">School Students (6th-12th)</Link></li>
            <li><Link to="/scholarships?level=undergraduate">Undergraduate Degree</Link></li>
            <li><Link to="/scholarships?level=postgraduate">Postgraduate & Masters</Link></li>
            <li><Link to="/scholarships?country=India">Indian National Schemes</Link></li>
            <li><Link to="/scholarships?funding=International">Study Abroad Fellowships</Link></li>
          </ul>
        </div>

        {/* Links Column 3: Organization */}
        <div className="footer-col">
          <h4 className="footer-heading">Organization</h4>
          <ul className="footer-links">
            <li><Link to="/about">About GRANTLY</Link></li>
            <li><Link to="/vision">Our Vision & Mission</Link></li>
            <li><Link to="/contact">Contact Support</Link></li>
            <li><Link to="/privacy">Privacy Notice</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      {/* Disclaimers & Copyright */}
      <div className="container footer-bottom">
        <div className="footer-disclaimer-box">
          <p className="footer-disclaimer-text">
            <strong>Provenance Disclaimer:</strong> {t('footer.disclaimer')} Official scholarship citations are verified against official gazettes, university directives, and government portals (such as National Scholarship Portal scholarships.gov.in, AICTE, Chevening FCDO, USIEF).
          </p>
        </div>
        <div className="bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} GRANTLY Inc. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <span className="built-with">
              Crafted with <Heart size={14} className="heart-icon" /> for deserving scholars
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

