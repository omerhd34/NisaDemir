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

 const value = {
  theme,
  toggleTheme,
 };

 return (
  <AppContext.Provider value={value}>
   {children}
  </AppContext.Provider>
 );
};

export default AppContext;
