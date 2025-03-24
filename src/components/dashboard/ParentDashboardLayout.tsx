
import React from 'react';
import { useParentDashboard } from '@/contexts/ParentDashboardContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ProfileCard from '@/components/ProfileCard';
import ChildOverview from '@/components/dashboard/ChildOverview';
import ChildTasks from '@/components/dashboard/ChildTasks';
import ActivitySummary from '@/components/dashboard/ActivitySummary';
import QuickActions from '@/components/dashboard/QuickActions';
import { rewards } from '@/utils/dummyData';
import { toast } from 'sonner';
import ProfileCustomization from '@/components/ProfileCustomization';

const ParentDashboardLayout: React.FC = () => {
  const {
    parent,
    children,
    selectedChildId,
    childTasks,
    selectedChild,
    achievements,
    handleSelectChild,
    handleAddChild,
    handleEditChild,
    handleDeleteChild,
    handleAddTask,
    handleEditTask,
    handleAddAchievement,
    handleEditAchievement
  } = useParentDashboard();

  if (!parent) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Parent not found</p>
      </div>
    );
  }

  const handleOpenSettings = () => {
    toast.info("Settings functionality coming soon!");
  };
  
  const handleOpenProfileSettings = () => {
    // Programmatically trigger the profile customization dialog
    document.getElementById('profile-customization-dialog')?.click();
  };
  
  const handleUpdateProfile = (updates: Partial<typeof parent>) => {
    // In a real app, this would update the user profile in the backend
    toast.success("Profile updated successfully!");
    console.log("Profile updates:", updates);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <DashboardHeader 
        title="Parent Dashboard" 
        onOpenProfileSettings={handleOpenProfileSettings}
      />
      
      {/* Main Content */}
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            <ProfileCard user={parent} />
            
            <ChildOverview 
              children={children}
              selectedChildId={selectedChildId}
              onSelectChild={handleSelectChild}
              onAddChild={handleAddChild}
              onEditChild={handleEditChild}
              onDeleteChild={handleDeleteChild}
            />
            
            <ChildTasks 
              tasks={childTasks}
              rewards={rewards}
              achievements={achievements}
              selectedChild={selectedChild}
              onAddTask={handleAddTask}
              onAddReward={() => toast.info("Add reward functionality coming soon!")}
              onAddAchievement={handleAddAchievement}
              onEditTask={handleEditTask}
              onEditAchievement={handleEditAchievement}
            />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <ActivitySummary tasks={childTasks} rewards={rewards} />
            <QuickActions 
              onAddTask={handleAddTask}
              onAddChild={handleAddChild}
              onOpenSettings={handleOpenSettings}
            />
          </div>
        </div>
      </div>
      
      {/* Profile Customization Dialog */}
      <ProfileCustomization 
        user={parent} 
        onUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
};

export default ParentDashboardLayout;
