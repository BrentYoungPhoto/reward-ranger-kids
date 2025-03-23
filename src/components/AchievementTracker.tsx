
import React from 'react';
import { motion } from 'framer-motion';
import { Achievement, User } from '@/utils/types';
import { Progress } from '@/components/ui/progress';
import { calculateUnlockedAchievements } from '@/utils/achievementsData';
import { Award, Star, Gift } from 'lucide-react';

interface AchievementTrackerProps {
  achievements: Achievement[];
  user: User;
}

const AchievementTracker: React.FC<AchievementTrackerProps> = ({ achievements, user }) => {
  const totalPoints = user.totalPoints || 0;
  
  // Calculate which achievements are unlocked based on points
  const updatedAchievements = calculateUnlockedAchievements(achievements, totalPoints);
  
  // Find next achievement to unlock
  const nextAchievement = updatedAchievements.find(a => !a.unlocked);
  
  // Find current level (highest unlocked achievement)
  const currentLevel = updatedAchievements.filter(a => a.unlocked).length;
  
  // Calculate progress percentage for next achievement
  const calculateProgress = (achievement: Achievement) => {
    const previousAchievement = updatedAchievements.find(a => a.level === achievement.level - 1);
    const previousPoints = previousAchievement ? previousAchievement.pointsNeeded : 0;
    const pointsForThisLevel = achievement.pointsNeeded - previousPoints;
    const userPointsForThisLevel = totalPoints - previousPoints;
    return Math.min(100, (userPointsForThisLevel / pointsForThisLevel) * 100);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="neo-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Achievements</h3>
        <div className="text-sm text-muted-foreground flex items-center">
          <Award className="h-4 w-4 mr-1" /> 
          <span>Level {currentLevel}</span>
        </div>
      </div>
      
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
            
            {nextAchievement.reward && (
              <div className="mt-2 text-sm flex items-center text-app-purple">
                <Gift className="h-4 w-4 mr-1" />
                <span>Reward: {nextAchievement.reward.title}</span>
              </div>
            )}
          </div>
        )}
        
        {/* Unlocked Achievements */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm uppercase text-muted-foreground">Unlocked</h4>
          
          <div className="grid grid-cols-2 gap-3">
            {updatedAchievements
              .filter(a => a.unlocked)
              .slice(0, 4) // Show only most recent achievements
              .map(achievement => (
                <motion.div
                  key={achievement.id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-secondary p-3 rounded-xl flex items-center gap-2"
                >
                  <span className="text-xl">{achievement.icon}</span>
                  <div>
                    <p className="font-medium text-sm">{achievement.title}</p>
                    <div className="text-xs text-muted-foreground flex items-center">
                      <Star className="h-3 w-3 mr-1 text-app-yellow" />
                      <span>Level {achievement.level}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
              
            {updatedAchievements.filter(a => a.unlocked).length === 0 && (
              <p className="text-sm text-muted-foreground col-span-2 py-2">
                Complete tasks to unlock achievements!
              </p>
            )}
          </div>
          
          {updatedAchievements.filter(a => a.unlocked).length > 4 && (
            <p className="text-xs text-center text-muted-foreground">
              +{updatedAchievements.filter(a => a.unlocked).length - 4} more achievements unlocked
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementTracker;
