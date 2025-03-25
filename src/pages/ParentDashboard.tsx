
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '@/components/AnimatedPage';
import { users } from '@/utils/dummyData';
import { ParentDashboardProvider } from '@/contexts/ParentDashboardContext';
import ParentDashboardLayout from '@/components/dashboard/ParentDashboardLayout';
import ParentDashboardModals from '@/components/dashboard/ParentDashboardModals';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ParentDashboard = () => {
  const navigate = useNavigate();
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

  const handleLogout = () => {
    // Clear the authenticated user by navigating to the root and
    // resetting the app state
    toast({
      title: "Logging out",
      description: "You have been successfully logged out."
    });
    
    // Small timeout to allow the toast to be displayed before redirecting
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 500);
  };

  return (
    <AnimatedPage>
      <ParentDashboardProvider parent={parent}>
        <div className="fixed top-4 right-4 z-10">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white"
            onClick={handleLogout}
          >
            <LogOut size={16} className="mr-1" />
            Logout
          </Button>
        </div>
        <ParentDashboardLayout />
        <ParentDashboardModals />
      </ParentDashboardProvider>
    </AnimatedPage>
  );
};

export default ParentDashboard;
