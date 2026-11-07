import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { SavedScholarshipsProvider } from './contexts/SavedScholarshipsContext';
import { AppRoutes } from './routes';
import './i18n';
import './styles/index.css';

// Automatically scroll window to top upon route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <SavedScholarshipsProvider>
            <ScrollToTop />
            <AppRoutes />
          </SavedScholarshipsProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;

