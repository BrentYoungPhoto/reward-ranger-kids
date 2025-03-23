
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from 'sonner';
import { 
  Task, 
  User, 
  getTasksForChild,
  setTasksForChild,
  getAllChildren
} from '@/utils/dummyData';

interface ParentDashboardContextProps {
  parent: User | undefined;
  children: User[];
  selectedChildId: string;
  childTasks: Task[];
  selectedChild: User | undefined;
  childFormOpen: boolean;
  taskFormOpen: boolean;
  childToEdit: User | undefined;
  taskToEdit: Task | undefined;
  handleSelectChild: (childId: string) => void;
  handleAddChild: () => void;
  handleEditChild: (child: User) => void;
  handleDeleteChild: (childId: string) => void;
  handleSaveChild: (childData: Partial<User>) => void;
  handleAddTask: () => void;
  handleEditTask: (task: Task) => void;
  handleCompleteTask: (taskId: string) => void;
  handleSaveTask: (taskData: Partial<Task>) => void;
  setChildFormOpen: (open: boolean) => void;
  setTaskFormOpen: (open: boolean) => void;
}

const ParentDashboardContext = createContext<ParentDashboardContextProps | undefined>(undefined);

export const useParentDashboard = () => {
  const context = useContext(ParentDashboardContext);
  if (context === undefined) {
    throw new Error('useParentDashboard must be used within a ParentDashboardProvider');
  }
  return context;
};

interface ParentDashboardProviderProps {
  children: ReactNode;
  parent: User;
}

export const ParentDashboardProvider: React.FC<ParentDashboardProviderProps> = ({ 
  children, 
  parent 
}) => {
  const [allChildren, setChildren] = useState(getAllChildren());
  
  const [selectedChildId, setSelectedChildId] = useState(allChildren[0]?.id || '');
  const [childTasks, setChildTasks] = useState(
    selectedChildId ? getTasksForChild(selectedChildId) : []
  );
  
  const selectedChild = allChildren.find(child => child.id === selectedChildId);

  // State for modals
  const [childFormOpen, setChildFormOpen] = useState(false);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [childToEdit, setChildToEdit] = useState<User | undefined>(undefined);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);

  // Handlers
  const handleSelectChild = (childId: string) => {
    setSelectedChildId(childId);
    setChildTasks(getTasksForChild(childId));
  };

  const handleAddChild = () => {
    setChildToEdit(undefined);
    setChildFormOpen(true);
  };

  const handleEditChild = (child: User) => {
    setChildToEdit(child);
    setChildFormOpen(true);
  };

  const handleDeleteChild = (childId: string) => {
    // Remove the child from the children array
    setChildren(prev => prev.filter(child => child.id !== childId));
    
    // If the deleted child was selected, select another child
    if (selectedChildId === childId) {
      const remainingChildren = allChildren.filter(child => child.id !== childId);
      if (remainingChildren.length > 0) {
        setSelectedChildId(remainingChildren[0].id);
        setChildTasks(getTasksForChild(remainingChildren[0].id));
      } else {
        setSelectedChildId('');
        setChildTasks([]);
      }
    }
    
    toast.success('Child deleted successfully');
  };

  const handleSaveChild = (childData: Partial<User>) => {
    if (childData.id) {
      // Update existing child
      setChildren(prev => 
        prev.map(child => 
          child.id === childData.id 
            ? { ...child, ...childData } 
            : child
        )
      );
      toast.success(`Updated ${childData.name}'s profile`);
    } else {
      // Add new child
      const newChild: User = {
        id: `child-${Date.now()}`,
        name: childData.name || 'New Child',
        role: 'child',
        avatar: childData.avatar || 'https://i.pravatar.cc/150?img=15',
        age: childData.age || 8,
        totalPoints: childData.totalPoints || 0,
        displayName: childData.displayName,
        mood: 'happy',
        theme: 'default',
      };
      
      setChildren(prev => [...prev, newChild]);
      setSelectedChildId(newChild.id);
      toast.success(`Added new child: ${newChild.name}`);
    }
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

  const value = {
    parent,
    children: allChildren,
    selectedChildId,
    childTasks,
    selectedChild,
    childFormOpen,
    taskFormOpen,
    childToEdit,
    taskToEdit,
    handleSelectChild,
    handleAddChild,
    handleEditChild,
    handleDeleteChild,
    handleSaveChild,
    handleAddTask,
    handleEditTask,
    handleCompleteTask,
    handleSaveTask,
    setChildFormOpen,
    setTaskFormOpen,
  };

  return (
    <ParentDashboardContext.Provider value={value}>
      {children}
    </ParentDashboardContext.Provider>
  );
};
