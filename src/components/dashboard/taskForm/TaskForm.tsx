
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Task, User, RecurrenceType } from '@/utils/dummyData';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { taskFormSchema, TaskFormValues, IconName } from './taskFormSchema';
import TaskDetailsFields from './TaskDetailsFields';
import RewardFields from './RewardFields';
import ImageUploadField from './ImageUploadField';

interface TaskFormProps {
  open: boolean; // Changed from isOpen to open
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
  task?: Task;
  children: User[];
}

const TaskForm: React.FC<TaskFormProps> = ({ open, onClose, onSave, task, children }) => {
  const [dueDate, setDueDate] = useState<Date | undefined>(
    task?.dueDate ? new Date(task.dueDate) : new Date()
  );
  const [includeReward, setIncludeReward] = useState<boolean>(!!task?.reward);
  const isEditing = !!task;

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      assignedTo: task?.assignedTo || children[0]?.id || '',
      points: task?.points || 10,
      icon: task?.icon || 'star',
      recurrence: task?.recurrence || 'none',
      rewardTitle: task?.reward?.title || '',
      rewardDescription: task?.reward?.description || '',
      imageURL: task?.imageURL || '',
    }
  });

  // Reset form when task changes (especially important for edit mode)
  useEffect(() => {
    if (open) {
      form.reset({
        title: task?.title || '',
        description: task?.description || '',
        assignedTo: task?.assignedTo || children[0]?.id || '',
        points: task?.points || 10,
        icon: task?.icon || 'star',
        recurrence: task?.recurrence || 'none',
        rewardTitle: task?.reward?.title || '',
        rewardDescription: task?.reward?.description || '',
        imageURL: task?.imageURL || '',
      });
      
      setDueDate(task?.dueDate ? new Date(task.dueDate) : new Date());
      setIncludeReward(!!task?.reward);
    }
  }, [task, open, form, children]);

  const onSubmit = (data: TaskFormValues) => {
    const formattedDate = dueDate ? format(dueDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');
    
    const newTask: Partial<Task> = {
      id: task?.id,
      title: data.title,
      description: data.description,
      assignedTo: data.assignedTo,
      points: data.points,
      icon: data.icon as IconName,
      dueDate: formattedDate,
      recurrence: data.recurrence as RecurrenceType,
      completed: task?.completed || false,
      imageURL: data.imageURL,
    };
    
    if (includeReward && data.rewardTitle) {
      newTask.reward = {
        id: task?.reward?.id || `reward-${Date.now()}`,
        title: data.rewardTitle,
        description: data.rewardDescription || '',
        icon: 'star',
        claimed: false,
      };
    }
    
    onSave(newTask);
    toast.success(isEditing ? 'Task updated successfully!' : 'Task added successfully!');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEditing ? 'Edit Task' : 'Create New Task'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Update the task details below."
              : "Fill in the details to create a new task."}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <TaskDetailsFields 
              form={form} 
              dueDate={dueDate} 
              setDueDate={setDueDate} 
              children={children} 
            />
            
            <ImageUploadField form={form} />
            
            <RewardFields 
              form={form} 
              includeReward={includeReward} 
              setIncludeReward={setIncludeReward} 
            />
            
            <div className="flex justify-end gap-2 pt-4 pb-2">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? 'Update Task' : 'Create Task'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
