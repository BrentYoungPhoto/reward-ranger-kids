
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Task } from '@/utils/types';
import { taskFormSchema } from './taskFormSchema';
import TaskDetailsFields from './TaskDetailsFields';
import ImageUploadField from './ImageUploadField';
import RewardFields from './RewardFields';
import { toast } from 'sonner';

export type TaskFormValues = z.infer<typeof taskFormSchema>;

interface TaskFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (task: Partial<Task>) => void;
  task?: Task;
  childId: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  open,
  onOpenChange,
  onSave,
  task,
  childId,
}) => {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: task
      ? {
          ...task,
          icon: task.icon as string, // Fix for the type issue
          dueDate: task.dueDate ? new Date(task.dueDate) : new Date(),
        }
      : {
          title: '',
          description: '',
          points: 10,
          icon: 'star' as string, // Fix for the type issue
          dueDate: new Date(),
          recurrence: 'none',
          assignedTo: childId,
        },
  });

  const onSubmit = (data: TaskFormValues) => {
    // Convert the date to ISO string format
    const formattedData = {
      ...data,
      dueDate: data.dueDate.toISOString().split('T')[0],
      id: task?.id,
    };

    onSave(formattedData);
    onOpenChange(false);
    form.reset();
    toast.success(task ? 'Task updated successfully!' : 'Task created successfully!');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{task ? 'Edit Task' : 'Create New Task'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Task Details</TabsTrigger>
                <TabsTrigger value="image">Image</TabsTrigger>
                <TabsTrigger value="reward">Reward</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4 py-4">
                <TaskDetailsFields control={form.control} />
              </TabsContent>
              
              <TabsContent value="image" className="space-y-4 py-4">
                <ImageUploadField control={form.control} />
              </TabsContent>
              
              <TabsContent value="reward" className="space-y-4 py-4">
                <RewardFields control={form.control} />
              </TabsContent>
            </Tabs>

            <div className="flex justify-end">
              <Button type="submit">Save Task</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
