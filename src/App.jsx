import React, { useState, useEffect } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { GovHeader } from './components/GovHeader';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { QuickLinks } from './components/QuickLinks';
import { WageExplorer } from './components/WageExplorer';
import { ProductivityHub } from './components/ProductivityHub';
import { NewsSection } from './components/NewsSection';
import { RTWPBSection } from './components/RTWPBSection';
import { FAQSection } from './components/FAQSection';
import { AgenciesPage } from './components/AgenciesPage';
import { AdminDashboard } from './components/AdminDashboard';
import { FloatingSocialSidebar } from './components/FloatingSocialSidebar';
import { AboutModal } from './components/AboutModal';
import { TrainingModal } from './components/TrainingModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { TrainingReportPage } from './components/TrainingReportPage';

function MainApp() {
  // Page Navigation State: 'home' | 'agencies' | 'admin' | 'training-report'
  const [currentPage, setCurrentPage] = useState(() => {
    if (window.location.hash.startsWith('#training-report')) {
      return 'training-report';
    }
    if (window.location.hash === '#admin' || window.location.pathname.includes('/admin')) {
      return 'admin';
    }
    if (window.location.hash === '#agencies') {
      return 'agencies';
    }
    return 'home';
  });

  // Modals state
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);
  const [selectedTrainingModule, setSelectedTrainingModule] = useState('7s');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Listen to hash / url changes (e.g. #admin, #training-report or /admin)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.startsWith('#training-report')) {
        setCurrentPage('training-report');
      } else if (window.location.hash === '#admin') {
        setCurrentPage('admin');
      } else if (window.location.hash === '#agencies') {
        setCurrentPage('agencies');
      } else if (window.location.hash === '#home' || !window.location.hash) {
        if (currentPage === 'admin' || currentPage === 'agencies' || currentPage === 'training-report') {
          setCurrentPage('home');
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage]);

  const handleNavigateTo = (sectionId) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      window.location.hash = sectionId;
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleOpenAgencies = () => {
    setCurrentPage('agencies');
    window.location.hash = 'agencies';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdmin = () => {
    setCurrentPage('admin');
    window.location.hash = 'admin';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLiveSite = () => {
    setCurrentPage('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTraining = (moduleKeyOrTitle) => {
    if (moduleKeyOrTitle) {
      setSelectedTrainingModule(moduleKeyOrTitle);
    }
    setIsTrainingOpen(true);
  };

  // If Training Report Page is active
  if (currentPage === 'training-report') {
    return (
      <TrainingReportPage 
        onBackToAdmin={() => {
          setCurrentPage('admin');
          window.location.hash = 'admin';
        }}
      />
    );
  }

  // If Admin Page is active, render full Admin Console
  if (currentPage === 'admin') {
    return (
      <AdminDashboard 
        onBackToLiveSite={handleBackToLiveSite} 
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-800 relative">
      
      {/* 1. Official Philippine GOVPH Top Bar with PST Clock */}
      <GovHeader
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* 2. Official Portal Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenTraining={() => handleOpenTraining('7s')}
        onOpenAgencies={handleOpenAgencies}
        onNavigateTo={handleNavigateTo}
      />

      {/* Main Content Area - Page Router */}
      <main className="flex-grow">
        {currentPage === 'home' ? (
          <>
            {/* 3. Hero Feature Carousel */}
            <HeroSlider
              onNavigateTo={handleNavigateTo}
              onOpenTraining={() => handleOpenTraining('7s')}
            />

            {/* 4. Quick Access Links Hub */}
            <QuickLinks
              onNavigateTo={handleNavigateTo}
              onOpenTraining={() => handleOpenTraining('7s')}
              onOpenAbout={() => setIsAboutOpen(true)}
            />

            {/* 5. Interactive Regional Minimum Wage Explorer (17 Regions) */}
            <WageExplorer />

            {/* 6. Productivity Toolbox & Training Hub */}
            <ProductivityHub
              onOpenTraining={handleOpenTraining}
            />

            {/* 7. News, Press Releases & Advisories */}
            <NewsSection />

            {/* 8. Frequently Asked Questions (Official NWPC FAQs) */}
            <FAQSection />

            {/* 9. 17 RTWPBs Regional Directory */}
            <RTWPBSection />
          </>
        ) : (
          /* Dedicated Attached Agencies Page */
          <AgenciesPage />
        )}
      </main>

      {/* Floating Official Social Media Sidebar (Facebook, X, YouTube, Viber) */}
      <FloatingSocialSidebar />

      {/* 10. Official Philippine Government Standard Footer */}
      <Footer
        onNavigateTo={handleNavigateTo}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenTraining={() => handleOpenTraining('7s')}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Interactive Modals */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <TrainingModal
        isOpen={isTrainingOpen}
        initialModule={selectedTrainingModule}
        onClose={() => setIsTrainingOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigateTo={handleNavigateTo}
      />

    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  );
}
