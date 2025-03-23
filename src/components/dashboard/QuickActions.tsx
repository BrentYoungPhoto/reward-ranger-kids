
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Gift, User } from 'lucide-react';

const QuickActions: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Button className="w-full bg-app-blue hover:bg-app-blue/90 justify-start">
            <Plus size={16} className="mr-2" />
            Add New Task
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Gift size={16} className="mr-2" />
            Create New Reward
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <User size={16} className="mr-2" />
            Manage Children
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
