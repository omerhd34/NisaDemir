'use client';
import { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext(undefined);

export const useAppContext = () => {
 const context = useContext(AppContext);
 if (context === undefined) {
  throw new Error('useAppContext must be used within AppProvider');
 }
 return context;
};

export const AppProvider = ({ children }) => {
 const [theme, setTheme] = useState(() => {
  if (typeof window !== 'undefined') {
   return localStorage.getItem('theme') || 'light';
  }
  return 'light';
 });
 const [siteData, setSiteData] = useState(null);
 const [dataLoading, setDataLoading] = useState(true);
 const [dataError, setDataError] = useState(null);

 useEffect(() => {
  if (typeof document !== 'undefined') {
   const root = document.documentElement;
   if (theme === 'dark') {
    root.classList.add('dark');
   } else {
    root.classList.remove('dark');
   }
   if (typeof window !== 'undefined') {
    localStorage.setItem('theme', theme);
   }
  }
 }, [theme]);

 const toggleTheme = () => {
  setTheme(prev => prev === 'light' ? 'dark' : 'light');
 };

 useEffect(() => {
  async function loadData() {
   try {
    const endpoints = ['home', 'about', 'work', 'articles', 'contact', 'footer'];
    const promises = endpoints.map(endpoint =>
     fetch(`/api/data/${endpoint}`)
      .then(res => {
       if (!res.ok) {
        throw new Error(`Failed to fetch ${endpoint}: ${res.status}`);
       }
       return res.json();
      })
    );

    const results = await Promise.all(promises);

    window.data = {
     home: results[0],
     about: results[1],
     work: results[2],
     articles: results[3],
     contact: results[4],
     footer: results[5],
    };

    setSiteData(window.data);
    setDataError(null);
   } catch (error) {
    console.error('Data loading error:', error);
    setDataError(error.message);
    setSiteData(null);
   } finally {
    setDataLoading(false);
   }
  }

  loadData();
 }, []);

 const value = {
  theme,
  toggleTheme,
  data: siteData,
  dataLoading,
  dataError,
 };

 return (
  <AppContext.Provider value={value}>
   {children}
  </AppContext.Provider>
 );
};

export default AppContext;