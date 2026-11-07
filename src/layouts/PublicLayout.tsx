import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';

export const PublicLayout: React.FC = () => {
  return (
    <div className="public-layout-root">
      <Navbar />
      <main className="public-main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

