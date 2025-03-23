
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedPage from '@/components/AnimatedPage';
import ProfileCard from '@/components/ProfileCard';
import TaskList from '@/components/TaskList';
import AchievementTracker from '@/components/AchievementTracker';
import RewardCard from '@/components/RewardCard';
import ProfileCustomization from '@/components/ProfileCustomization';
import { 
  getChildById, 
  getTasksForChild, 
  achievements,
  rewards,
  User
} from '@/utils/dummyData';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Gift } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const ChildDashboard = () => {
  // For demo purposes, we're using child with ID 1
  const childId = '1';
  const [childData, setChildData] = useState<User | null>(getChildById(childId));
  const childTasks = getTasksForChild(childId);
  
  const [claimedRewardIds, setClaimedRewardIds] = useState<string[]>(
    rewards.filter(reward => reward.claimed).map(reward => reward.id)
  );

  const handleClaimReward = (id: string) => {
    setClaimedRewardIds(prev => [...prev, id]);
  };

  const handleUpdateProfile = (updates: Partial<User>) => {
    if (childData) {
      const updatedChild = { ...childData, ...updates };
      setChildData(updatedChild);
      // In a real app, you would save this to the backend
      console.log('Profile updated:', updatedChild);
    }
  };

  if (!childData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Child not found</p>
      </div>
    );
  }

  // Apply custom theme colors based on the child's theme preference
  const getThemeColor = () => {
    switch (childData.theme) {
      case 'ocean':
        return '#0EA5E9';
      case 'sunset':
        return '#F97316';
      case 'forest':
        return '#22C55E';
      case 'berry':
        return '#D946EF';
      default:
        return '#9b87f5'; // Default purple theme
    }
  };

  const themeColor = getThemeColor();
  const themeStyle = {
    '--app-accent-color': themeColor,
    '--app-accent-light': `${themeColor}20`, // 20% opacity version for backgrounds
  } as React.CSSProperties;

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 pb-10" style={themeStyle}>
        <DashboardHeader title={`${childData.displayName || childData.name}'s Dashboard`} />
        
        {/* Main Content */}
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-6">
              <ProfileCard user={childData} />
              <TaskList tasks={childTasks} />
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <AchievementTracker achievements={achievements} user={childData} />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">My Rewards</h3>
                  <Link to="/">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <Gift size={16} className="mr-1" />
                      All Rewards
                    </Button>
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {rewards.slice(0, 3).map(reward => (
                    <RewardCard 
                      key={reward.id} 
                      reward={{
                        ...reward,
                        claimed: claimedRewardIds.includes(reward.id) || reward.claimed
                      }}
                      onClaim={handleClaimReward}
                    />
                  ))}
                </div>

                <ProfileCustomization 
                  user={childData}
                  onUpdateProfile={handleUpdateProfile}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ChildDashboard;
