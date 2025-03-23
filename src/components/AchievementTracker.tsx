
import React from 'react';
import { motion } from 'framer-motion';
import { Achievement, User } from '@/utils/dummyData';
import { Progress } from '@/components/ui/progress';

interface AchievementTrackerProps {
  achievements: Achievement[];
  user: User;
}

const AchievementTracker: React.FC<AchievementTrackerProps> = ({ achievements, user }) => {
  const totalPoints = user.totalPoints || 0;
  
  // Find next achievement to unlock
  const nextAchievement = achievements.find(a => !a.unlocked);
  
  // Calculate progress percentage for next achievement
  const calculateProgress = (achievement: Achievement) => {
    return Math.min(100, (totalPoints / achievement.pointsNeeded) * 100);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="neo-card p-6"
    >
      <h3 className="text-lg font-medium mb-4">Achievements</h3>
      
      <div className="space-y-6">
        {/* Next Achievement Progress */}
        {nextAchievement && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{nextAchievement.icon}</span>
                <h4 className="font-medium">{nextAchievement.title}</h4>
              </div>
              <span className="text-sm text-muted-foreground">
                {totalPoints}/{nextAchievement.pointsNeeded} points
              </span>
            </div>
            
            <Progress 
              value={calculateProgress(nextAchievement)} 
              className="h-2" 
            />
            
            <p className="text-sm text-muted-foreground">
              {nextAchievement.description}
            </p>
          </div>
        )}
        
        {/* Unlocked Achievements */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm uppercase text-muted-foreground">Unlocked</h4>
          
          <div className="grid grid-cols-2 gap-3">
            {achievements
              .filter(a => a.unlocked)
              .map(achievement => (
                <motion.div
                  key={achievement.id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-secondary p-3 rounded-xl flex items-center gap-2"
                >
                  <span className="text-xl">{achievement.icon}</span>
                  <div>
                    <p className="font-medium text-sm">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                </motion.div>
              ))}
              
            {achievements.filter(a => a.unlocked).length === 0 && (
              <p className="text-sm text-muted-foreground col-span-2 py-2">
                Complete tasks to unlock achievements!
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementTracker;
