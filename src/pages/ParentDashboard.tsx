
import React, { useState } from 'react';
import AnimatedPage from '@/components/AnimatedPage';
import { users } from '@/utils/dummyData';
import { ParentDashboardProvider } from '@/contexts/ParentDashboardContext';
import ParentDashboardLayout from '@/components/dashboard/ParentDashboardLayout';
import ParentDashboardModals from '@/components/dashboard/ParentDashboardModals';

const ParentDashboard = () => {
  // For demo purposes, we're using parent with ID 3
  const parent = users.find(user => user.id === '3');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Toggle dark class on document element for dark mode styling
    document.documentElement.classList.toggle('dark');
  };

  if (!parent) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Parent not found</p>
      </div>
    );
  }

  return (
    <AnimatedPage>
      <div className={darkMode ? 'dark' : ''}>
        <ParentDashboardProvider parent={parent}>
          <ParentDashboardLayout darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
          <ParentDashboardModals />
        </ParentDashboardProvider>
      </div>
    </AnimatedPage>
  );
};

export default ParentDashboard;
