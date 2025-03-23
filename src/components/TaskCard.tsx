
import React from 'react';
import { motion } from 'framer-motion';
import { Task, icons } from '@/utils/dummyData';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Award } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onComplete?: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete }) => {
  const { id, title, description, points, completed, dueDate, icon, reward } = task;
  const IconComponent = icons[icon];
  
  const formattedDate = new Date(dueDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const handleComplete = () => {
    if (onComplete) {
      onComplete(id);
      toast.success('Task completed! Points added.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className={`neo-card p-5 transition-all ${completed ? 'bg-gray-50' : ''}`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${completed ? 'bg-gray-200' : 'bg-app-blue/10'}`}>
          <IconComponent size={22} className={completed ? 'text-gray-500' : 'text-app-blue'} />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`font-medium text-lg mb-1 ${completed ? 'text-gray-500' : ''}`}>{title}</h3>
              <p className={`text-sm ${completed ? 'text-gray-400' : 'text-muted-foreground'}`}>{description}</p>
            </div>
            
            <Badge variant="outline" className={`${completed ? 'bg-gray-200 text-gray-500' : 'bg-app-purple/10 text-app-purple'} border-none`}>
              {points} pts
            </Badge>
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar size={14} />
                <span>{formattedDate}</span>
              </div>
              
              {reward && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Award size={14} className="text-app-yellow" />
                  <span>{reward.title}</span>
                </div>
              )}
            </div>
            
            {!completed && (
              <Button 
                size="sm" 
                variant="outline"
                className="text-xs bg-app-green/10 text-app-green hover:bg-app-green hover:text-white border-none"
                onClick={handleComplete}
              >
                Complete
              </Button>
            )}
            
            {completed && (
              <Badge variant="outline" className="bg-app-green/10 text-app-green border-none">
                Completed
              </Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
