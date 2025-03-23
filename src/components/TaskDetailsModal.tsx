
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Task, icons } from '@/utils/dummyData';
import { Calendar, Award, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TaskDetailsModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ task, isOpen, onClose }) => {
  const { title, description, points, dueDate, icon, reward, recurrence, imageURL } = task;
  const IconComponent = icons[icon];
  
  const formattedDate = new Date(dueDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const getRecurrenceLabel = (recurrenceType?: string) => {
    if (!recurrenceType || recurrenceType === 'none') return null;
    return `Repeats ${recurrenceType}`;
  };

  const recurrenceLabel = getRecurrenceLabel(recurrence);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconComponent className="h-5 w-5" />
            <span>{title}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {imageURL && (
            <div className="w-full">
              <img 
                src={imageURL} 
                alt={title} 
                className="w-full rounded-lg object-contain" 
              />
            </div>
          )}
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
            <p>{description}</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className="bg-app-purple/10 text-app-purple border-none">
              {points} points
            </Badge>
            
            <div className="flex items-center gap-1 text-xs border px-2 py-1 rounded-full">
              <Calendar size={14} />
              <span>{formattedDate}</span>
            </div>
            
            {recurrenceLabel && (
              <div className="flex items-center gap-1 text-xs border px-2 py-1 rounded-full">
                <RefreshCw size={14} className="text-app-blue" />
                <span>{recurrenceLabel}</span>
              </div>
            )}
            
            {reward && (
              <div className="flex items-center gap-1 text-xs border px-2 py-1 rounded-full">
                <Award size={14} className="text-app-yellow" />
                <span>{reward.title}</span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailsModal;
