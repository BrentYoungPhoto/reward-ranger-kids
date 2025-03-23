
import React from 'react';
import AnimatedPage from '@/components/AnimatedPage';
import { 
  users
} from '@/utils/dummyData';
import { ParentDashboardProvider } from '@/contexts/ParentDashboardContext';
import ParentDashboardLayout from '@/components/dashboard/ParentDashboardLayout';
import ParentDashboardModals from '@/components/dashboard/ParentDashboardModals';

const ParentDashboard = () => {
  // For demo purposes, we're using parent with ID 3
  const parent = users.find(user => user.id === '3');

  if (!parent) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Parent not found</p>
      </div>
    );
  }

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
