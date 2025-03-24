
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Gift, UserRoundPlus, Settings } from 'lucide-react';

interface QuickActionsProps {
  onAddTask: () => void;
  onAddChild: () => void;
  onOpenSettings?: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onAddTask, onAddChild, onOpenSettings }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Button className="w-full bg-app-blue hover:bg-app-blue/90 justify-start" onClick={onAddTask}>
            <Plus size={16} className="mr-2" />
            Add New Task
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={onAddChild}>
            <UserRoundPlus size={16} className="mr-2" />
            Add New Child
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={onOpenSettings}
          >
            <Settings size={16} className="mr-2" />
            Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
