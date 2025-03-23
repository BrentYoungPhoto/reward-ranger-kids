
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckSquare, Gift } from 'lucide-react';
import { Task, Reward } from '@/utils/dummyData';

interface ActivitySummaryProps {
  tasks: Task[];
  rewards: Reward[];
}

const ActivitySummary: React.FC<ActivitySummaryProps> = ({ tasks, rewards }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Summary</CardTitle>
        <CardDescription>Overall progress for all children</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-app-blue/10 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckSquare size={20} className="text-app-blue" />
              <span>Total Tasks</span>
            </div>
            <span className="font-semibold">{tasks.length}</span>
          </div>
          
          <div className="bg-app-green/10 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckSquare size={20} className="text-app-green" />
              <span>Completed</span>
            </div>
            <span className="font-semibold">{tasks.filter(t => t.completed).length}</span>
          </div>
          
          <div className="bg-app-purple/10 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gift size={20} className="text-app-purple" />
              <span>Rewards Given</span>
            </div>
            <span className="font-semibold">{rewards.filter(r => r.claimed).length}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivitySummary;
