
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
import { Gift, Sparkles, CheckSquare, Award, ArrowLeft } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Card, CardContent } from '@/components/ui/card';

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
      case 'candy':
        return '#ff758c';
      default:
        return '#9b87f5'; // Default purple theme
    }
  };

  // Get the gradient class based on the theme
  const getGradientClass = () => {
    switch (childData.theme) {
      case 'ocean':
        return 'bg-gradient-ocean';
      case 'sunset':
        return 'bg-gradient-sunset';
      case 'forest':
        return 'bg-gradient-forest';
      case 'berry':
        return 'bg-gradient-berry';
      case 'candy':
        return 'bg-gradient-candy';
      default:
        return ''; // Default - no gradient
    }
  };

  const themeColor = getThemeColor();
  const gradientClass = getGradientClass();
  const themeStyle = {
    '--app-accent-color': themeColor,
    '--app-accent-light': `${themeColor}20`, // 20% opacity version for backgrounds
  } as React.CSSProperties;

  return (
    <AnimatedPage>
      <div 
        className={`min-h-screen pb-10 relative ${gradientClass}`} 
        style={themeStyle}
      >
        <DashboardHeader title={`${childData.displayName || childData.name}'s Dashboard`} />
        
        {/* Main Content */}
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 pt-6">
          {/* Activity Tiles Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {/* Customize Tile */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg shadow-subtle p-4 flex flex-col items-center justify-center cursor-pointer"
              onClick={() => {
                document.getElementById('profile-customization-dialog')?.click();
              }}
            >
              <Sparkles size={32} className="text-app-blue mb-2" />
              <span className="font-bold text-center">Change My Look!</span>
            </motion.div>
            
            {/* Tasks Tile */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg shadow-subtle p-4 flex flex-col items-center justify-center"
            >
              <CheckSquare size={32} className="text-app-green mb-2" />
              <span className="font-bold text-center">My Tasks</span>
              <span className="text-xs text-muted-foreground">{childTasks.filter(t => !t.completed).length} to do</span>
            </motion.div>
            
            {/* Rewards Tile */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg shadow-subtle p-4 flex flex-col items-center justify-center"
            >
              <Gift size={32} className="text-app-purple mb-2" />
              <span className="font-bold text-center">My Rewards</span>
              <span className="text-xs text-muted-foreground">{rewards.filter(r => !r.claimed).length} available</span>
            </motion.div>
            
            {/* Achievements Tile */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg shadow-subtle p-4 flex flex-col items-center justify-center"
            >
              <Award size={32} className="text-app-yellow mb-2" />
              <span className="font-bold text-center">My Achievements</span>
              <span className="text-xs text-muted-foreground">{achievements.filter(a => a.completed).length} earned</span>
            </motion.div>
          </div>
          
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
                <h3 className="text-lg font-medium mb-4">My Rewards</h3>
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
              </div>
            </div>
          </div>
        </div>

        {/* Hidden Dialog Trigger for Profile Customization */}
        <div className="hidden">
          <ProfileCustomization 
            user={childData}
            onUpdateProfile={handleUpdateProfile}
          />
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ChildDashboard;
