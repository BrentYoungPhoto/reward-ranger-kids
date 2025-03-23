
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Pencil } from 'lucide-react';
import { Achievement, Reward, User } from '@/utils/dummyData';

interface AchievementLevelsProps {
  achievements: Achievement[];
  rewards: Reward[];
  selectedChild?: User;
  onEditAchievement: (achievement: Achievement) => void;
}

const AchievementLevels: React.FC<AchievementLevelsProps> = ({
  achievements,
  rewards,
  selectedChild,
  onEditAchievement
}) => {
  // Sort achievements by level
  const sortedAchievements = [...achievements].sort((a, b) => a.level - b.level);

  // Calculate the progress for each achievement
  const calculateProgress = (achievement: Achievement) => {
    if (!selectedChild?.totalPoints) return 0;
    return Math.min(100, (selectedChild.totalPoints / achievement.pointsNeeded) * 100);
  };

  // Get the reward title for an achievement
  const getRewardTitle = (rewardId?: string) => {
    if (!rewardId) return 'No reward set';
    const reward = rewards.find(r => r.id === rewardId);
    return reward ? reward.title : 'Unknown reward';
  };

  return (
    <Card className="shadow-subtle">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Achievement Levels</span>
          <span className="text-sm font-normal text-muted-foreground">
            {selectedChild ? `${selectedChild.totalPoints || 0} points earned` : 'Select a child'}
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {sortedAchievements.slice(0, 5).map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-secondary/30 p-4 rounded-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{achievement.icon}</span>
                  <div>
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onEditAchievement(achievement)}
                >
                  <Pencil size={16} />
                </Button>
              </div>
              
              <div className="space-y-2 mt-3">
                <div className="flex justify-between items-center text-sm">
                  <span>
                    <span className="font-medium">Level {achievement.level}</span>
                    <span className="text-muted-foreground ml-1">({achievement.pointsNeeded} pts)</span>
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Reward: {getRewardTitle(achievement.rewardId)}
                  </span>
                </div>
                
                <Progress 
                  value={calculateProgress(achievement)} 
                  className="h-2" 
                />
                
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>
                    {selectedChild?.totalPoints || 0}/{achievement.pointsNeeded} points
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          
          {sortedAchievements.length > 5 && (
            <div className="text-center py-2">
              <Button variant="link" className="text-muted-foreground">
                View all {sortedAchievements.length} achievement levels
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementLevels;
