
import React from 'react';
import { motion } from 'framer-motion';
import { User } from '@/utils/dummyData';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ChildOverviewProps {
  children: User[];
  selectedChildId: string;
  onSelectChild: (id: string) => void;
}

const ChildOverview: React.FC<ChildOverviewProps> = ({ 
  children, 
  selectedChildId, 
  onSelectChild 
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Child Overview</CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            className="text-app-blue border-app-blue hover:bg-app-blue hover:text-white"
          >
            <Plus size={16} className="mr-1" />
            Add Child
          </Button>
        </div>
        <CardDescription>
          Select a child to view and manage their tasks and rewards
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {children.map(child => (
            <motion.button
              key={child.id}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all border ${
                selectedChildId === child.id 
                  ? 'border-app-blue bg-app-blue/5' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onSelectChild(child.id)}
            >
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img 
                  src={child.avatar} 
                  alt={child.name}
                  className="h-full w-full object-cover" 
                />
              </div>
              <div className="text-left">
                <h3 className="font-medium">{child.name}</h3>
                <p className="text-xs text-muted-foreground">{child.totalPoints} points</p>
              </div>
            </motion.button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChildOverview;
