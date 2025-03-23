
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CheckSquare, Gift, Award, Plus, Pencil } from 'lucide-react';
import TaskList from '@/components/TaskList';
import RewardCard from '@/components/RewardCard';
import AchievementManager from '@/components/dashboard/AchievementManager';
import { Task, Reward, User, Achievement } from '@/utils/types';
import { getAchievementsForChild, updateAchievements } from '@/utils/achievementsData';

interface ChildTasksProps {
  tasks: Task[];
  rewards: Reward[];
  selectedChild: User | undefined;
  onAddTask: () => void;
  onAddReward: () => void;
  onEditTask?: (task: Task) => void;
}

const ChildTasks: React.FC<ChildTasksProps> = ({ 
  tasks, 
  rewards, 
  selectedChild,
  onAddTask,
  onAddReward,
  onEditTask
}) => {
  const [achievements, setAchievements] = React.useState<Achievement[]>([]);

  React.useEffect(() => {
    if (selectedChild) {
      // Get achievements for the selected child
      const childAchievements = getAchievementsForChild(selectedChild.id);
      setAchievements(childAchievements);
    }
  }, [selectedChild]);

  const handleUpdateAchievements = (updatedAchievements: Achievement[]) => {
    if (selectedChild) {
      setAchievements(updatedAchievements);
      // Save to the backend/data store
      updateAchievements(selectedChild.id, updatedAchievements);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-subtle">
      <Tabs defaultValue="tasks" className="w-full">
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="tasks" className="flex items-center gap-1">
                <CheckSquare size={16} />
                <span>Tasks</span>
              </TabsTrigger>
              <TabsTrigger value="rewards" className="flex items-center gap-1">
                <Gift size={16} />
                <span>Rewards</span>
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center gap-1">
                <Award size={16} />
                <span>Achievements</span>
              </TabsTrigger>
            </TabsList>
            
            <div>
              <Button 
                size="sm"
                className="mr-2 bg-app-green hover:bg-app-green/90"
                onClick={onAddTask}
              >
                <Plus size={16} className="mr-1" />
                Add Task
              </Button>
              <Button 
                size="sm"
                variant="outline"
                className="border-app-purple text-app-purple hover:bg-app-purple hover:text-white"
                onClick={onAddReward}
              >
                <Plus size={16} className="mr-1" />
                Add Reward
              </Button>
            </div>
          </div>
        </div>
        
        <TabsContent value="tasks" className="p-6 pt-0">
          <TaskList 
            tasks={tasks} 
            title={`${selectedChild?.name || 'Child'}'s Tasks`}
            onEditTask={onEditTask}
          />
        </TabsContent>
        
        <TabsContent value="rewards" className="p-6 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {rewards.map(reward => (
              <RewardCard key={reward.id} reward={reward} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="achievements" className="p-6 pt-0">
          {selectedChild ? (
            <AchievementManager 
              achievements={achievements}
              onUpdateAchievements={handleUpdateAchievements}
            />
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <p className="text-muted-foreground">
                Select a child to manage achievements
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChildTasks;
