import React, { createContext, useContext, useState, useEffect } from 'react';
import { scholarshipService } from '../services/scholarships/scholarshipService';
import { Scholarship } from '../types';

interface SavedScholarshipsContextType {
  savedIds: string[];
  savedScholarships: Scholarship[];
  toggleSave: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  refreshSaved: () => void;
}

const SavedScholarshipsContext = createContext<SavedScholarshipsContextType | undefined>(undefined);

export const SavedScholarshipsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [savedScholarships, setSavedScholarships] = useState<Scholarship[]>([]);

  const refreshSaved = () => {
    const ids = scholarshipService.getSavedIds();
    setSavedIds(ids);
    setSavedScholarships(scholarshipService.getSavedScholarships());
  };

  useEffect(() => {
    refreshSaved();
  }, []);

  const toggleSave = (id: string): boolean => {
    const isNowSaved = scholarshipService.toggleSave(id);
    refreshSaved();
    return isNowSaved;
  };

  const isSaved = (id: string): boolean => {
    return savedIds.includes(id);
  };

  return (
    <SavedScholarshipsContext.Provider
      value={{
        savedIds,
        savedScholarships,
        toggleSave,
        isSaved,
        refreshSaved,
      }}
    >
      {children}
    </SavedScholarshipsContext.Provider>
  );
};

export const useSavedScholarships = () => {
  const context = useContext(SavedScholarshipsContext);
  if (!context) {
    throw new Error('useSavedScholarships must be used within SavedScholarshipsProvider');
  }
  return context;
};

