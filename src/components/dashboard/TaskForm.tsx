
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { icons, Task, User, Reward, RecurrenceType } from '@/utils/dummyData';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { CalendarIcon, Plus, RefreshCw } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define a type for valid icon names
type IconName = keyof typeof icons;

const taskFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(5, { message: "Description must be at least 5 characters" }),
  assignedTo: z.string({ required_error: "Please select a child" }),
  points: z.coerce.number().min(1, { message: "Points must be at least 1" }),
  icon: z.enum(['star', 'book', 'house', 'trash', 'backpack', 'dog', 'cart'] as [string, ...string[]]),
  recurrence: z.enum(['none', 'daily', 'weekly', 'monthly'] as [string, ...string[]]),
  rewardTitle: z.string().optional(),
  rewardDescription: z.string().optional(),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
  task?: Task;
  children: User[];
}

const TaskForm: React.FC<TaskFormProps> = ({ isOpen, onClose, onSave, task, children }) => {
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
    }
  });

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

  // Get the current recurrence value
  const recurrenceValue = form.watch('recurrence');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
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
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Clean your room" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe what needs to be done" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign To</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a child" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {children.map((child) => (
                          <SelectItem key={child.id} value={child.id}>
                            {child.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="points"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Points</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an icon" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.keys(icons).map((iconName) => (
                          <SelectItem key={iconName} value={iconName}>
                            {iconName.charAt(0).toUpperCase() + iconName.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            </div>
            
            <FormField
              control={form.control}
              name="recurrence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recurrence</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Set task recurrence" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">One-time task</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  {recurrenceValue !== 'none' && (
                    <p className="text-xs text-muted-foreground mt-1 flex items-center">
                      <RefreshCw size={12} className="mr-1" />
                      This task will repeat {recurrenceValue}
                    </p>
                  )}
                </FormItem>
              )}
            />
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium">Add a Reward</h4>
                <Button 
                  variant="outline" 
                  size="sm" 
                  type="button"
                  onClick={() => setIncludeReward(!includeReward)}
                >
                  {includeReward ? 'Remove Reward' : 'Add Reward'}
                </Button>
              </div>
              
              {includeReward && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="rewardTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reward Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Extra Screen Time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="rewardDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reward Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Describe the reward" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
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
