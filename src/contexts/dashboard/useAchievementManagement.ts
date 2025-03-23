
import { useState } from 'react';
import { toast } from 'sonner';
import { Achievement, getAllAchievements, updateAchievement } from '@/utils/dummyData';

export function useAchievementManagement() {
  const [achievements, setAchievements] = useState(getAllAchievements());
  const [achievementFormOpen, setAchievementFormOpen] = useState(false);
  const [achievementToEdit, setAchievementToEdit] = useState<Achievement | undefined>(undefined);

  const handleAddAchievement = () => {
    setAchievementToEdit(undefined);
    setAchievementFormOpen(true);
  };

  const handleEditAchievement = (achievement: Achievement) => {
    setAchievementToEdit(achievement);
    setAchievementFormOpen(true);
  };

  const handleSaveAchievement = (achievementData: Partial<Achievement>) => {
    if (achievementData.id) {
      // Update existing achievement
      setAchievements(prev => 
        prev.map(achievement => 
          achievement.id === achievementData.id 
            ? { ...achievement, ...achievementData } 
            : achievement
        )
      );
      
      // Update in shared data store
      if (achievementData.id) {
        updateAchievement(achievementData.id, achievementData);
      }
      
      toast.success(`Updated achievement: ${achievementData.title}`);
    } else {
      // Add new achievement (should rarely happen as we pre-generate all levels)
      const newAchievement: Achievement = {
        id: `achievement-${Date.now()}`,
        title: achievementData.title || 'New Achievement',
        description: achievementData.description || 'Achievement description',
        pointsNeeded: achievementData.pointsNeeded || 100,
        icon: achievementData.icon || '🏆',
        unlocked: false,
        rewardId: achievementData.rewardId,
        level: achievementData.level || achievements.length + 1
      };
      
      setAchievements(prev => [...prev, newAchievement]);
      toast.success(`Added new achievement: ${newAchievement.title}`);
    }
  };

  return {
    achievements,
    achievementFormOpen,
    achievementToEdit,
    setAchievementFormOpen,
    handleAddAchievement,
    handleEditAchievement,
    handleSaveAchievement
  };
}
