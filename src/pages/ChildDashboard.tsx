import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AnimatedPage from '@/components/AnimatedPage';
import ProfileCard from '@/components/ProfileCard';
import TaskList from '@/components/TaskList';
import AchievementTracker from '@/components/AchievementTracker';
import RewardCard from '@/components/RewardCard';
import ProfileCustomization from '@/components/ProfileCustomization';
import { 
  getChildById, 
  getTasksForChild, 
  getAchievementsForChild,
  setTasksForChild,
  updateUser,
  achievements,
  rewards,
  User,
  Achievement
} from '@/utils/dummyData';
import { Button } from '@/components/ui/button';
import { Gift, Sparkles, CheckSquare, Award, ArrowLeft } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const ChildDashboard = () => {
  const { childId } = useParams<{ childId: string }>();
  const navigate = useNavigate();
  
  const [childData, setChildData] = useState<User | null>(null);
  const [childTasks, setChildTasks] = useState<any[]>([]);
  const [childAchievements, setChildAchievements] = useState<Achievement[]>([]);
  
  const [claimedRewardIds, setClaimedRewardIds] = useState<string[]>(
    rewards.filter(reward => reward.claimed).map(reward => reward.id)
  );

  useEffect(() => {
    if (childId) {
      const child = getChildById(childId);
      const tasks = getTasksForChild(childId);
      const achievements = getAchievementsForChild(childId);
      
      if (child) {
        setChildData(child);
        setChildTasks(tasks);
        setChildAchievements(achievements);
      } else {
        // Navigate back to parent dashboard if child not found
        navigate('/parent');
      }
    } else {
      // Navigate back to parent dashboard if no childId
      navigate('/parent');
    }
  }, [childId, navigate]);

  const handleClaimReward = (id: string) => {
    setClaimedRewardIds(prev => [...prev, id]);
  };

  const handleCompleteTask = (taskId: string) => {
    const updatedTasks = childTasks.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    );
    setChildTasks(updatedTasks);
    // Save to the shared data store
    setTasksForChild(childId || '', updatedTasks);
    toast.success('Task completed! Points earned!');
  };

  const handleUpdateProfile = (updates: Partial<User>) => {
    if (childData) {
      // Update local state
      const updatedChild = { ...childData, ...updates };
      setChildData(updatedChild);
      
      // Save to the shared data store
      if (childId) {
        updateUser(childId, updates);
        toast.success('Profile updated successfully!');
      }
    }
  };

  if (!childData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
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
        <DashboardHeader title={`${childData?.displayName || childData?.name}'s Dashboard`}>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/80"
            asChild
          >
            <Link to="/parent">
              <ArrowLeft size={16} className="mr-1" />
              Back to Parent Dashboard
            </Link>
          </Button>
        </DashboardHeader>
        
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
              <span className="text-xs text-muted-foreground">
                {childData?.totalPoints ? (
                  `Level ${Math.floor(childData.totalPoints / 100)}`
                ) : (
                  'Start earning!'
                )}
              </span>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-6">
              <ProfileCard user={childData} />
              <TaskList 
                tasks={childTasks} 
                onComplete={handleCompleteTask}
              />
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              {childData && <AchievementTracker achievements={childAchievements} user={childData} />}
              
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
