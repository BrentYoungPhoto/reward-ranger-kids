
import { useState } from 'react';
import { toast } from 'sonner';
import { Task, getTasksForChild, setTasksForChild } from '@/utils/dummyData';

export function useTaskManagement(initialChildId: string) {
  const [selectedChildId, setSelectedChildId] = useState(initialChildId);
  const [childTasks, setChildTasks] = useState(
    selectedChildId ? getTasksForChild(selectedChildId) : []
  );
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);

  const handleSelectChild = (childId: string) => {
    setSelectedChildId(childId);
    setChildTasks(getTasksForChild(childId));
  };

  const handleAddTask = () => {
    setTaskToEdit(undefined);
    setTaskFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setTaskFormOpen(true);
  };

  const handleCompleteTask = (taskId: string) => {
    const updatedTasks = childTasks.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    );
    setChildTasks(updatedTasks);
    // Save to the shared data store
    setTasksForChild(selectedChildId, updatedTasks);
    toast.success('Task marked as completed!');
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    let updatedTasks;
    
    if (taskData.id) {
      // Update existing task
      updatedTasks = childTasks.map(task => 
        task.id === taskData.id 
          ? { ...task, ...taskData } as Task
          : task
      );
      setChildTasks(updatedTasks);
      // Save to the shared data store
      setTasksForChild(selectedChildId, updatedTasks);
      toast.success(`Updated task: ${taskData.title}`);
    } else {
      // Add new task
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: taskData.title || 'New Task',
        description: taskData.description || 'Task description',
        assignedTo: taskData.assignedTo || selectedChildId,
        points: taskData.points || 10,
        completed: false,
        dueDate: taskData.dueDate || new Date().toISOString().split('T')[0],
        icon: taskData.icon || 'star',
        reward: taskData.reward,
        recurrence: taskData.recurrence,
        imageURL: taskData.imageURL,
      };
      
      updatedTasks = [...childTasks, newTask];
      setChildTasks(updatedTasks);
      // Save to the shared data store
      setTasksForChild(selectedChildId, updatedTasks);
      toast.success(`Added new task: ${newTask.title}`);
    }
  };

  return {
    selectedChildId,
    childTasks,
    taskFormOpen,
    taskToEdit,
    setTaskFormOpen,
    handleSelectChild,
    handleAddTask,
    handleEditTask,
    handleCompleteTask,
    handleSaveTask
  };
}
