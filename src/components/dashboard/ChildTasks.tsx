
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CheckSquare, Gift, Award, Plus } from 'lucide-react';
import TaskList from '@/components/TaskList';
import RewardCard from '@/components/RewardCard';
import { Task, Reward, User } from '@/utils/dummyData';

interface ChildTasksProps {
  tasks: Task[];
  rewards: Reward[];
  selectedChild: User | undefined;
}

const ChildTasks: React.FC<ChildTasksProps> = ({ tasks, rewards, selectedChild }) => {
  const handleAddTask = () => {
    toast.info("This would open a task creation form!");
  };
  
  const handleAddReward = () => {
    toast.info("This would open a reward creation form!");
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
                onClick={handleAddTask}
              >
                <Plus size={16} className="mr-1" />
                Add Task
              </Button>
              <Button 
                size="sm"
                variant="outline"
                className="border-app-purple text-app-purple hover:bg-app-purple hover:text-white"
                onClick={handleAddReward}
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
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-muted-foreground">
              Achievement management coming soon!
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChildTasks;
