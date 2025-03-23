
import React, { useState } from 'react';
import { Achievement } from '@/utils/types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Save, Award } from 'lucide-react';
import { toast } from 'sonner';

interface AchievementManagerProps {
  achievements: Achievement[];
  onUpdateAchievements: (achievements: Achievement[]) => void;
}

const AchievementManager: React.FC<AchievementManagerProps> = ({ 
  achievements,
  onUpdateAchievements
}) => {
  const [editing, setEditing] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{
    title: string;
    description: string;
    icon: string;
    rewardTitle: string;
    rewardDescription: string;
    rewardIcon: string;
  }>({
    title: '',
    description: '',
    icon: '',
    rewardTitle: '',
    rewardDescription: '',
    rewardIcon: ''
  });

  const handleEdit = (achievement: Achievement) => {
    setEditing(achievement.id);
    setEditValues({
      title: achievement.title,
      description: achievement.description,
      icon: achievement.icon,
      rewardTitle: achievement.reward?.title || '',
      rewardDescription: achievement.reward?.description || '',
      rewardIcon: achievement.reward?.icon || ''
    });
  };

  const handleSave = (achievement: Achievement) => {
    const updatedAchievements = achievements.map(a => {
      if (a.id === achievement.id) {
        return {
          ...a,
          title: editValues.title,
          description: editValues.description,
          icon: editValues.icon,
          reward: {
            ...a.reward,
            title: editValues.rewardTitle,
            description: editValues.rewardDescription,
            icon: editValues.rewardIcon,
          }
        };
      }
      return a;
    });

    onUpdateAchievements(updatedAchievements);
    setEditing(null);
    toast.success(`Achievement level ${achievement.level} updated`);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Sort achievements by level
  const sortedAchievements = [...achievements].sort((a, b) => a.level - b.level);

  // Icons for suggestions
  const iconSuggestions = ['🏆', '🌟', '🚀', '🎖️', '🏅', '🥇', '👑', '⭐', '✨', '💫'];
  const rewardIconSuggestions = ['🍦', '🎬', '💰', '📱', '🚗', '🎮', '🍕', '🎪', '🎯', '🎁'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium flex items-center">
          <Award className="h-5 w-5 mr-2" />
          Achievement Levels
        </h3>
      </div>

      <div className="bg-white rounded-lg shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Level</TableHead>
                <TableHead>Achievement</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Reward</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAchievements.map((achievement) => (
                <TableRow key={achievement.id}>
                  <TableCell className="font-medium">{achievement.level}</TableCell>
                  <TableCell>
                    {editing === achievement.id ? (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <div className="w-14">
                            <Input 
                              value={editValues.icon}
                              onChange={(e) => handleInputChange('icon', e.target.value)}
                              className="text-xl text-center h-9"
                            />
                          </div>
                          <Input 
                            value={editValues.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="h-9"
                          />
                        </div>
                        <div className="flex gap-1 overflow-x-auto py-1">
                          {iconSuggestions.map((icon) => (
                            <button
                              key={icon}
                              onClick={() => handleInputChange('icon', icon)}
                              className="w-7 h-7 flex items-center justify-center rounded hover:bg-secondary"
                            >
                              {icon}
                            </button>
                          ))}
                        </div>
                        <Input 
                          value={editValues.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          placeholder="Description"
                          className="h-9"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{achievement.icon}</span>
                        <div>
                          <div className="font-medium">{achievement.title}</div>
                          <div className="text-sm text-muted-foreground">{achievement.description}</div>
                        </div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{achievement.pointsNeeded} pts</TableCell>
                  <TableCell>
                    {editing === achievement.id ? (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <div className="w-14">
                            <Input 
                              value={editValues.rewardIcon}
                              onChange={(e) => handleInputChange('rewardIcon', e.target.value)}
                              className="text-xl text-center h-9"
                            />
                          </div>
                          <Input 
                            value={editValues.rewardTitle}
                            onChange={(e) => handleInputChange('rewardTitle', e.target.value)}
                            className="h-9"
                          />
                        </div>
                        <div className="flex gap-1 overflow-x-auto py-1">
                          {rewardIconSuggestions.map((icon) => (
                            <button
                              key={icon}
                              onClick={() => handleInputChange('rewardIcon', icon)}
                              className="w-7 h-7 flex items-center justify-center rounded hover:bg-secondary"
                            >
                              {icon}
                            </button>
                          ))}
                        </div>
                        <Input 
                          value={editValues.rewardDescription}
                          onChange={(e) => handleInputChange('rewardDescription', e.target.value)}
                          placeholder="Reward description"
                          className="h-9"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{achievement.reward?.icon}</span>
                        <div>
                          <div className="font-medium">{achievement.reward?.title}</div>
                          <div className="text-sm text-muted-foreground">{achievement.reward?.description}</div>
                        </div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {editing === achievement.id ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handleSave(achievement)}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => handleEdit(achievement)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AchievementManager;
