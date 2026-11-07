import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentProfile } from '../types';
import { authService } from '../services/auth/authService';

interface AuthContextType {
  user: StudentProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<StudentProfile>;
  signInAsDemo: () => Promise<StudentProfile>;
  signUp: (name: string, email: string, password: string) => Promise<StudentProfile>;
  signOut: () => void;
  updateProfile: (profile: StudentProfile) => void;
  resetAllData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<StudentProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check initial auth state
    const currentUser = authService.getCurrentUser();
    const hasToken = authService.isAuthenticated();

    if (hasToken && currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const loggedInUser = await authService.signIn(email, password);
      setUser(loggedInUser);
      setIsAuthenticated(true);
      return loggedInUser;
    } finally {
      setIsLoading(false);
    }
  };

  const signInAsDemo = async () => {
    setIsLoading(true);
    try {
      const demoUser = await authService.signInAsDemo();
      setUser(demoUser);
      setIsAuthenticated(true);
      return demoUser;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const newUser = await authService.signUp(name, email, password);
      setUser(newUser);
      setIsAuthenticated(true);
      return newUser;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    authService.signOut();
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (updatedProfile: StudentProfile) => {
    authService.updateProfile(updatedProfile);
    setUser({ ...updatedProfile });
  };

  const resetAllData = () => {
    authService.resetAllData();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        signIn,
        signInAsDemo,
        signUp,
        signOut,
        updateProfile,
        resetAllData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

