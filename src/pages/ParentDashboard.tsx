
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '@/components/AnimatedPage';
import ProfileCard from '@/components/ProfileCard';
import { 
  users, 
  rewards,
  getAllChildren,
  getTasksForChild
} from '@/utils/dummyData';

// Import the newly created components
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ChildOverview from '@/components/dashboard/ChildOverview';
import ChildTasks from '@/components/dashboard/ChildTasks';
import ActivitySummary from '@/components/dashboard/ActivitySummary';
import QuickActions from '@/components/dashboard/QuickActions';

const ParentDashboard = () => {
  // For demo purposes, we're using parent with ID 3
  const parent = users.find(user => user.id === '3');
  const children = getAllChildren();
  
  const [selectedChildId, setSelectedChildId] = useState(children[0]?.id || '');
  
  const childTasks = selectedChildId 
    ? getTasksForChild(selectedChildId) 
    : [];
    
  const selectedChild = children.find(child => child.id === selectedChildId);

  if (!parent) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Parent not found</p>
      </div>
    );
  }

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 pb-10">
        {/* Header */}
        <DashboardHeader title="Parent Dashboard" />
        
        {/* Main Content */}
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-6">
              <ProfileCard user={parent} />
              
              <ChildOverview 
                children={children}
                selectedChildId={selectedChildId}
                onSelectChild={setSelectedChildId}
              />
              
              <ChildTasks 
                tasks={childTasks}
                rewards={rewards}
                selectedChild={selectedChild}
              />
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <ActivitySummary tasks={childTasks} rewards={rewards} />
              <QuickActions />
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ParentDashboard;
