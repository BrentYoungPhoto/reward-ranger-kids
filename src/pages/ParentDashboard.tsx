
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '@/components/AnimatedPage';
import ProfileCard from '@/components/ProfileCard';
import { 
  users, 
  rewards,
  getAllChildren,
  getTasksForChild,
  Task,
  User
} from '@/utils/dummyData';
import { toast } from 'sonner';

// Import the newly created components
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ChildOverview from '@/components/dashboard/ChildOverview';
import ChildTasks from '@/components/dashboard/ChildTasks';
import ActivitySummary from '@/components/dashboard/ActivitySummary';
import QuickActions from '@/components/dashboard/QuickActions';
import ChildForm from '@/components/dashboard/ChildForm';
import TaskForm from '@/components/dashboard/TaskForm';

const ParentDashboard = () => {
  // For demo purposes, we're using parent with ID 3
  const parent = users.find(user => user.id === '3');
  const [children, setChildren] = useState(getAllChildren());
  
  const [selectedChildId, setSelectedChildId] = useState(children[0]?.id || '');
  const [childTasks, setChildTasks] = useState(
    selectedChildId ? getTasksForChild(selectedChildId) : []
  );
  
  const selectedChild = children.find(child => child.id === selectedChildId);

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

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (taskData.id) {
      // Update existing task
      setChildTasks(prev => 
        prev.map(task => 
          task.id === taskData.id 
            ? { ...task, ...taskData } as Task
            : task
        )
      );
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
        icon: taskData.icon as keyof typeof import('@/utils/dummyData').icons || 'star',
        reward: taskData.reward,
      };
      
      setChildTasks(prev => [...prev, newTask]);
      toast.success(`Added new task: ${newTask.title}`);
    }
  };

  if (!parent) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Parent not found</p>
      </div>
    );
  }

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 pb-10">
        {/* Header */}
        <DashboardHeader title="Parent Dashboard" />
        
        {/* Main Content */}
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-6">
              <ProfileCard user={parent} />
              
              <ChildOverview 
                children={children}
                selectedChildId={selectedChildId}
                onSelectChild={handleSelectChild}
                onAddChild={handleAddChild}
                onEditChild={handleEditChild}
              />
              
              <ChildTasks 
                tasks={childTasks}
                rewards={rewards}
                selectedChild={selectedChild}
                onAddTask={handleAddTask}
                onAddReward={() => toast.info("Add reward functionality coming soon!")}
              />
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <ActivitySummary tasks={childTasks} rewards={rewards} />
              <QuickActions 
                onAddTask={handleAddTask}
                onAddChild={handleAddChild}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ChildForm 
        isOpen={childFormOpen}
        onClose={() => setChildFormOpen(false)}
        onSave={handleSaveChild}
        child={childToEdit}
      />

      <TaskForm 
        isOpen={taskFormOpen}
        onClose={() => setTaskFormOpen(false)}
        onSave={handleSaveTask}
        task={taskToEdit}
        children={children}
      />
    </AnimatedPage>
  );
};

export default ParentDashboard;
