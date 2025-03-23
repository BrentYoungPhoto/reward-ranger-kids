
import React from 'react';
import { motion } from 'framer-motion';
import { Task, icons } from '@/utils/dummyData';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Calendar, Award, RefreshCw, Pencil, Image } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onComplete?: (id: string) => void;
  onEdit?: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete, onEdit }) => {
  const { id, title, description, points, completed, dueDate, icon, reward, recurrence, imageURL } = task;
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

  const handleEdit = () => {
    if (onEdit) {
      onEdit(task);
    }
  };

  const getRecurrenceLabel = (recurrenceType?: string) => {
    if (!recurrenceType || recurrenceType === 'none') return null;
    return `Repeats ${recurrenceType}`;
  };

  const recurrenceLabel = getRecurrenceLabel(recurrence);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className={`neo-card p-5 transition-all ${completed ? 'bg-gray-50' : ''}`}
    >
      {imageURL && (
        <div className="mb-4">
          <img 
            src={imageURL} 
            alt={title} 
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>
      )}
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
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar size={14} />
                <span>{formattedDate}</span>
              </div>
              
              {recurrenceLabel && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <RefreshCw size={14} className="text-app-blue" />
                  <span>{recurrenceLabel}</span>
                </div>
              )}
              
              {reward && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Award size={14} className="text-app-yellow" />
                  <span>{reward.title}</span>
                </div>
              )}
              
              {imageURL && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Image size={14} />
                  <span>Has image</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              {onEdit && (
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-xs bg-app-blue/10 text-app-blue hover:bg-app-blue hover:text-white border-none"
                  onClick={handleEdit}
                >
                  <Pencil size={14} className="mr-1" />
                  Edit
                </Button>
              )}
              
              {!completed && onComplete && (
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
      </div>
    </motion.div>
  );
};

export default TaskCard;
