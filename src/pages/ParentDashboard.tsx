
import React, { useState } from 'react';
import AnimatedPage from '@/components/AnimatedPage';
import { users } from '@/utils/dummyData';
import { ParentDashboardProvider } from '@/contexts/ParentDashboardContext';
import ParentDashboardLayout from '@/components/dashboard/ParentDashboardLayout';
import ParentDashboardModals from '@/components/dashboard/ParentDashboardModals';

const ParentDashboard = () => {
  // For demo purposes, we're using parent with ID 3
  const [parent, setParent] = useState(() => {
    const foundParent = users.find(user => user.id === '3');
    return foundParent || null;
  });

  if (!parent) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Parent not found</p>
      </div>
    );
  }

  const handleUpdateParent = (updates: Partial<typeof parent>) => {
    setParent(prev => ({
      ...prev,
      ...updates
    }));
  };

  return (
    <AnimatedPage>
      <ParentDashboardProvider parent={parent}>
        <ParentDashboardLayout />
        <ParentDashboardModals />
      </ParentDashboardProvider>
    </AnimatedPage>
  );
};

export default ParentDashboard;
