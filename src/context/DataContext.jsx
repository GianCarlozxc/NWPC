import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { wageData as defaultWageData, summaryStats as defaultSummaryStats } from '../data/wageData';
import { newsData as defaultNewsData } from '../data/newsData';
import { productivityModules as defaultModules, trainingSchedule as defaultSchedule } from '../data/productivityData';
import { faqData as defaultFaqData, faqCategories as defaultFaqCategories } from '../data/faqData';
import { rtwpbDirectory as defaultRtwpb } from '../data/rtwpbData';
import { agenciesData as defaultAgencies } from '../data/agenciesData';

const DataContext = createContext(null);

const STORAGE_KEYS = {
  WAGES: 'nwpc_data_wages_v3',
  NEWS: 'nwpc_data_news_v3',
  SCHEDULE: 'nwpc_data_schedule_v3',
  FAQS: 'nwpc_data_faqs_v3',
  SETTINGS: 'nwpc_data_settings_v3',
  AGENCIES: 'nwpc_data_agencies_v3',
  APPLICATIONS: 'nwpc_live_real_applications_v5',
  AUTH: 'nwpc_admin_auth_v3'
};

const SYNC_CHANNEL_NAME = 'nwpc_portal_live_sync_channel';

// Unique session tab identifier to prevent echo loops
const TAB_SESSION_ID = typeof window !== 'undefined' 
  ? (window.__NWPC_TAB_ID || (window.__NWPC_TAB_ID = Math.random().toString(36).substring(2) + Date.now().toString(36)))
  : 'node_env';

const defaultSettings = {
  centralOfficeAddress: '11th Floor, Trium Square, Sen. Gil J. Puyat Avenue, Pasay City, 1306 Metro Manila',
  centralOfficePhone: '8527-8013',
  doleHotline: '8527-8013',
  doleShortCode: '1349',
  officialEmail: 'info@nwpc.dole.gov.ph',
  facebookUrl: 'https://www.facebook.com/dole.nwpc',
  xUrl: 'https://x.com/DOLE_NWPC',
  youtubeUrl: 'https://www.youtube.com/channel/UCTRCkNR3HMBAipgfRHOcKZQ',
  viberUrl: 'https://invite.viber.com/?g2=AQBCnUKzqOZ5Tk0OWCGiQChLDnyMFq52k%2BXZqKLLSc745oouvaSmLNPXrws4zXqi&lang=en'
};

export function DataProvider({ children }) {
  const broadcastChannelRef = useRef(null);
  // Keep track of last broadcasted string values to avoid circular loops
  const lastBroadcastRef = useRef({});

  // 1. Regional Wage Data
  const [wages, setWages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WAGES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Using default wage data', e);
    }
    return defaultWageData;
  });

  // 2. News & Advisories
  const [news, setNews] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NEWS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Using default news data', e);
    }
    return defaultNewsData;
  });

  // 3. Training Batch Schedules
  const [schedules, setSchedules] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SCHEDULE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Using default schedule data', e);
    }
    return defaultSchedule;
  });

  // 4. FAQs
  const [faqs, setFaqs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Using default FAQ data', e);
    }
    return defaultFaqData;
  });

  // 5. General Site Settings
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return { ...defaultSettings, ...parsed };
      }
    } catch (e) {
      console.warn('Using default settings', e);
    }
    return defaultSettings;
  });

  // 6. Attached Agencies
  const [agencies, setAgencies] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AGENCIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Using default agencies data', e);
    }
    return defaultAgencies;
  });

  // 7. Training Applications / Requests submitted by applicants
  const [trainingApplications, setTrainingApplications] = useState(() => {
    try {
      localStorage.removeItem('nwpc_data_applications_v3');
      localStorage.removeItem('nwpc_data_applications_v4');

      const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const mockNames = ['PhilCraft', 'Batangas Agro', 'Cebu Grand Horizon', 'Davao Prime', 'North Luzon Metal', 'Iloilo Maritime', 'Cordillera Fresh', 'Laguna Precision', 'Zamboanga Sea', 'Pampanga Artisanal', 'Cagayan de Oro'];
          const filtered = parsed.filter(a => !mockNames.some(m => a.companyName?.includes(m)));
          return filtered;
        }
      }
    } catch (e) {
      console.warn('Using default applications data', e);
    }
    return [];
  });

  // 8. Admin Authentication
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Handle incoming real-time sync without circular updates
  const handleIncomingSync = useCallback((key, payload) => {
    if (payload === undefined || payload === null) return;
    const strVal = JSON.stringify(payload);

    // Save as known last seen value so we don't echo it back
    lastBroadcastRef.current[key] = strVal;

    if (key === STORAGE_KEYS.WAGES) {
      setWages(prev => (JSON.stringify(prev) === strVal ? prev : payload));
    } else if (key === STORAGE_KEYS.NEWS) {
      setNews(prev => (JSON.stringify(prev) === strVal ? prev : payload));
    } else if (key === STORAGE_KEYS.SCHEDULE) {
      setSchedules(prev => (JSON.stringify(prev) === strVal ? prev : payload));
    } else if (key === STORAGE_KEYS.FAQS) {
      setFaqs(prev => (JSON.stringify(prev) === strVal ? prev : payload));
    } else if (key === STORAGE_KEYS.SETTINGS) {
      setSettings(prev => (JSON.stringify(prev) === strVal ? prev : payload));
    } else if (key === STORAGE_KEYS.AGENCIES) {
      setAgencies(prev => (JSON.stringify(prev) === strVal ? prev : payload));
    } else if (key === STORAGE_KEYS.APPLICATIONS) {
      setTrainingApplications(prev => (JSON.stringify(prev) === strVal ? prev : payload));
    }
  }, []);

  // Setup Broadcast Channel & Cross-Tab Sync Listeners
  useEffect(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        const bc = new BroadcastChannel(SYNC_CHANNEL_NAME);
        broadcastChannelRef.current = bc;

        bc.onmessage = (event) => {
          if (event && event.data && event.data.type === 'NWPC_DATA_SYNC') {
            // Ignore messages sent by this exact tab/session
            if (event.data.senderId === TAB_SESSION_ID) return;
            const { key, payload } = event.data;
            handleIncomingSync(key, payload);
          }
        };
      } catch (err) {
        console.warn('BroadcastChannel setup error', err);
      }
    }

    // Fallback: window storage event
    const handleStorageChange = (e) => {
      if (!e || !e.key) return;
      try {
        if (e.newValue) {
          const parsed = JSON.parse(e.newValue);
          handleIncomingSync(e.key, parsed);
        }
      } catch (err) {
        console.warn('Storage sync parse error', err);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      if (broadcastChannelRef.current) {
        broadcastChannelRef.current.close();
      }
    };
  }, [handleIncomingSync]);

  // Dispatch live sync message to other tabs/windows safely
  const broadcastSync = useCallback((key, payload) => {
    const strVal = JSON.stringify(payload);
    
    // If the value hasn't changed since last broadcast, skip sending
    if (lastBroadcastRef.current[key] === strVal) {
      return;
    }
    lastBroadcastRef.current[key] = strVal;

    if (broadcastChannelRef.current) {
      try {
        broadcastChannelRef.current.postMessage({
          type: 'NWPC_DATA_SYNC',
          key,
          payload,
          senderId: TAB_SESSION_ID,
          timestamp: Date.now()
        });
      } catch (err) {
        console.warn('Broadcast error', err);
      }
    }
  }, []);

  // Sync state changes to localStorage and safely broadcast live
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WAGES, JSON.stringify(wages));
      broadcastSync(STORAGE_KEYS.WAGES, wages);
    } catch {}
  }, [wages, broadcastSync]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
      broadcastSync(STORAGE_KEYS.NEWS, news);
    } catch {}
  }, [news, broadcastSync]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(schedules));
      broadcastSync(STORAGE_KEYS.SCHEDULE, schedules);
    } catch {}
  }, [schedules, broadcastSync]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
      broadcastSync(STORAGE_KEYS.FAQS, faqs);
    } catch {}
  }, [faqs, broadcastSync]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      broadcastSync(STORAGE_KEYS.SETTINGS, settings);
    } catch {}
  }, [settings, broadcastSync]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AGENCIES, JSON.stringify(agencies));
      broadcastSync(STORAGE_KEYS.AGENCIES, agencies);
    } catch {}
  }, [agencies, broadcastSync]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(trainingApplications));
      broadcastSync(STORAGE_KEYS.APPLICATIONS, trainingApplications);
    } catch {}
  }, [trainingApplications, broadcastSync]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH, isAuthenticated ? 'true' : 'false');
    } catch {}
  }, [isAuthenticated]);

  // Method to add new applicant training request
  const addTrainingApplication = (appData) => {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const monthYear = `${now.getFullYear()}-${pad(now.getMonth() + 1)}`;
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const dateFormatted = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newApp = {
      id: `TRN-${Date.now()}`,
      referenceCode: `TRN-${randomCode}`,
      submissionDate: dateFormatted,
      monthYear: monthYear,
      status: 'Pending',
      ...appData
    };

    setTrainingApplications(prev => [newApp, ...prev]);
    return newApp;
  };

  const updateTrainingApplicationStatus = (id, newStatus) => {
    setTrainingApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const deleteTrainingApplication = (id) => {
    setTrainingApplications(prev => prev.filter(app => app.id !== id));
  };

  const clearAllTrainingApplications = () => {
    setTrainingApplications([]);
    try {
      localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    } catch {}
  };

  // Compute live summary stats dynamically from wage dataset
  const computedSummaryStats = React.useMemo(() => {
    if (!wages || !Array.isArray(wages) || wages.length === 0) return defaultSummaryStats;
    let maxRate = 0;
    let maxRegion = '';
    let minRate = 999999;
    let minRegion = '';
    let total = 0;

    wages.forEach(w => {
      if (w.nonAgriculture > maxRate) {
        maxRate = w.nonAgriculture;
        maxRegion = `${w.region} (₱${w.nonAgriculture}.00)`;
      }
      if (w.agriculture < minRate) {
        minRate = w.agriculture;
        minRegion = `${w.region} (Agri - ₱${w.agriculture}.00)`;
      }
      total += (w.nonAgriculture || 0);
    });

    return {
      highestDailyRate: maxRate || 755,
      highestRegion: maxRegion || "NCR (₱755.00)",
      lowestDailyRate: minRate || 401,
      lowestRegion: minRegion || "BARMM (Agri - ₱401.00)",
      totalRegions: wages.length,
      averageMinimumWage: wages.length ? (total / wages.length) : 485,
      totalWorkersCovered: "4.2 Million+"
    };
  }, [wages]);

  // Reset to default factory data
  const resetToDefaults = () => {
    setWages(defaultWageData);
    setNews(defaultNewsData);
    setSchedules(defaultSchedule);
    setFaqs(defaultFaqData);
    setSettings(defaultSettings);
    setAgencies(defaultAgencies);
    setTrainingApplications([]);
    try {
      localStorage.removeItem(STORAGE_KEYS.WAGES);
      localStorage.removeItem(STORAGE_KEYS.NEWS);
      localStorage.removeItem(STORAGE_KEYS.SCHEDULE);
      localStorage.removeItem(STORAGE_KEYS.FAQS);
      localStorage.removeItem(STORAGE_KEYS.SETTINGS);
      localStorage.removeItem(STORAGE_KEYS.AGENCIES);
      localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    } catch {}
  };

  // Auth methods
  const login = (user, pass) => {
    if ((user === 'admin' || user === 'admin@nwpc.dole.gov.ph') && pass === 'admin123') {
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, message: 'Invalid admin username or password' };
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const value = {
    wages: wages || defaultWageData,
    setWages,
    news: news || defaultNewsData,
    setNews,
    schedules: schedules || defaultSchedule,
    setSchedules,
    faqs: faqs || defaultFaqData,
    setFaqs,
    settings: settings || defaultSettings,
    setSettings,
    agencies: agencies || defaultAgencies,
    setAgencies,
    trainingApplications: trainingApplications || [],
    setTrainingApplications,
    addTrainingApplication,
    updateTrainingApplicationStatus,
    deleteTrainingApplication,
    clearAllTrainingApplications,
    summaryStats: computedSummaryStats,
    isAuthenticated,
    login,
    logout,
    resetToDefaults
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
