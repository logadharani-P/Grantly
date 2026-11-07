import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../../i18n';

interface LanguageSelectorProps {
  compact?: boolean;
  showLabel?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  compact = false, 
  showLabel = true 
}) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === i18n.language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('grantly_language', langCode);
    setIsOpen(false);
  };

  return (
    <div className="language-selector-root" ref={dropdownRef}>
      <button
        type="button"
        className={`lang-trigger-btn ${compact ? 'compact' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe size={18} className="globe-icon" />
        <span className="lang-flag">{currentLang.flag}</span>
        {showLabel && (
          <span className="lang-name-label">
            {compact ? currentLang.code.toUpperCase() : currentLang.nativeName}
          </span>
        )}
        <ChevronDown size={14} className={`chevron-icon ${isOpen ? 'rotated' : ''}`} />
      </button>

      {isOpen && (
        <div className="lang-dropdown-menu card">
          <div className="lang-dropdown-header">
            <span>Select Language / भाषा चुनें</span>
          </div>
          <div className="lang-options-list">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  className={`lang-option-item ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSelectLanguage(lang.code)}
                >
                  <span className="lang-option-flag">{lang.flag}</span>
                  <div className="lang-option-text">
                    <span className="lang-native-title">{lang.nativeName}</span>
                    <span className="lang-english-sub">{lang.name}</span>
                  </div>
                  {isSelected && <Check size={16} className="text-primary selected-check" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

