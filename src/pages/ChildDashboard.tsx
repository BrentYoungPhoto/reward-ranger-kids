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
  setTasksForChild,
  updateUser,
  achievements,
  rewards,
  User
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
  
  const [claimedRewardIds, setClaimedRewardIds] = useState<string[]>(
    rewards.filter(reward => reward.claimed).map(reward => reward.id)
  );

  useEffect(() => {
    if (childId) {
      const child = getChildById(childId);
      const tasks = getTasksForChild(childId);
      
      if (child) {
        setChildData(child);
        setChildTasks(tasks);
      } else {
        navigate('/parent');
      }
    } else {
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
    setTasksForChild(childId || '', updatedTasks);
    toast.success('Task completed! Points earned!');
  };

  const handleUpdateProfile = (updates: Partial<User>) => {
    if (childData) {
      const updatedChild = { ...childData, ...updates };
      setChildData(updatedChild);
      
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
        return '#9b87f5';
    }
  };

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
        return '';
    }
  };

  const themeColor = getThemeColor();
  const gradientClass = getGradientClass();
  const themeStyle = {
    '--app-accent-color': themeColor,
    '--app-accent-light': `${themeColor}20`,
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
        
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 pt-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
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
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg shadow-subtle p-4 flex flex-col items-center justify-center"
            >
              <CheckSquare size={32} className="text-app-green mb-2" />
              <span className="font-bold text-center">My Tasks</span>
              <span className="text-xs text-muted-foreground">{childTasks.filter(t => !t.completed).length} to do</span>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg shadow-subtle p-4 flex flex-col items-center justify-center"
            >
              <Gift size={32} className="text-app-purple mb-2" />
              <span className="font-bold text-center">My Rewards</span>
              <span className="text-xs text-muted-foreground">{rewards.filter(r => !r.claimed).length} available</span>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg shadow-subtle p-4 flex flex-col items-center justify-center"
            >
              <Award size={32} className="text-app-yellow mb-2" />
              <span className="font-bold text-center">My Achievements</span>
              <span className="text-xs text-muted-foreground">{achievements.filter(a => a.unlocked).length} earned</span>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <ProfileCard user={childData} />
              <TaskList 
                tasks={childTasks} 
                onComplete={handleCompleteTask}
              />
            </div>
            
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
