
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedPage from '@/components/AnimatedPage';
import ProfileCard from '@/components/ProfileCard';
import TaskList from '@/components/TaskList';
import AchievementTracker from '@/components/AchievementTracker';
import RewardCard from '@/components/RewardCard';
import { 
  getChildById, 
  getTasksForChild, 
  achievements,
  rewards
} from '@/utils/dummyData';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Gift } from 'lucide-react';

const ChildDashboard = () => {
  // For demo purposes, we're using child with ID 1
  const childId = '1';
  const child = getChildById(childId);
  const childTasks = getTasksForChild(childId);
  
  const [claimedRewardIds, setClaimedRewardIds] = useState<string[]>(
    rewards.filter(reward => reward.claimed).map(reward => reward.id)
  );

  const handleClaimReward = (id: string) => {
    setClaimedRewardIds(prev => [...prev, id]);
  };

  if (!child) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Child not found</p>
      </div>
    );
  }

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 pb-10">
        {/* Header */}
        <div className="bg-white shadow-subtle">
          <div className="container max-w-5xl mx-auto py-4 px-4 sm:px-6">
            <div className="flex justify-between items-center">
              <Link to="/">
                <Button variant="ghost" className="flex items-center gap-1 text-sm">
                  <ArrowLeft size={16} />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-xl font-semibold">My Dashboard</h1>
              <div className="w-10"></div> {/* For balance */}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-6">
              <ProfileCard user={child} />
              <TaskList tasks={childTasks} />
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <AchievementTracker achievements={achievements} user={child} />
              
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ChildDashboard;
