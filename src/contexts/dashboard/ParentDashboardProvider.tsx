
import React, { createContext, useContext } from 'react';
import { User } from '@/utils/dummyData';
import { useChildManagement } from './useChildManagement';
import { useTaskManagement } from './useTaskManagement';
import { useAchievementManagement } from './useAchievementManagement';
import { ParentDashboardContextProps, ParentDashboardProviderProps } from './types';

const ParentDashboardContext = createContext<ParentDashboardContextProps | undefined>(undefined);

export const useParentDashboard = () => {
  const context = useContext(ParentDashboardContext);
  if (context === undefined) {
    throw new Error('useParentDashboard must be used within a ParentDashboardProvider');
  }
  return context;
};

export const ParentDashboardProvider: React.FC<ParentDashboardProviderProps> = ({ 
  children, 
  parent 
}) => {
  const {
    allChildren,
    childFormOpen,
    childToEdit,
    setChildFormOpen,
    handleAddChild,
    handleEditChild,
    handleDeleteChild,
    handleSaveChild
  } = useChildManagement();

  const initialChildId = allChildren[0]?.id || '';
  
  const {
    selectedChildId,
    childTasks,
    taskFormOpen,
    taskToEdit,
    setTaskFormOpen,
    handleSelectChild: baseHandleSelectChild,
    handleAddTask,
    handleEditTask,
    handleCompleteTask,
    handleSaveTask
  } = useTaskManagement(initialChildId);
  
  const {
    achievements,
    achievementFormOpen,
    achievementToEdit,
    setAchievementFormOpen,
    handleAddAchievement,
    handleEditAchievement,
    handleSaveAchievement
  } = useAchievementManagement();
  
  const selectedChild = allChildren.find(child => child.id === selectedChildId);

  // Enhanced child handlers that interact with task state
  const handleSelectChild = (childId: string) => {
    baseHandleSelectChild(childId);
  };

  const enhancedHandleDeleteChild = (childId: string) => {
    const { remainingChildren } = handleDeleteChild(childId);
    
    // If the deleted child was selected, select another child
    if (selectedChildId === childId) {
      if (remainingChildren.length > 0) {
        handleSelectChild(remainingChildren[0].id);
      }
    }
  };

  const enhancedHandleSaveChild = (childData: Partial<User>) => {
    const result = handleSaveChild(childData);
    
    // If this is a new child and it's the first one, select it
    if (!childData.id && result?.newChild && allChildren.length === 0) {
      handleSelectChild(result.newChild.id);
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
    achievementFormOpen,
    childToEdit,
    taskToEdit,
    achievementToEdit,
    achievements,
    handleSelectChild,
    handleAddChild,
    handleEditChild,
    handleDeleteChild: enhancedHandleDeleteChild,
    handleSaveChild: enhancedHandleSaveChild,
    handleAddTask,
    handleEditTask,
    handleCompleteTask,
    handleSaveTask,
    handleAddAchievement,
    handleEditAchievement,
    handleSaveAchievement,
    setChildFormOpen,
    setTaskFormOpen,
    setAchievementFormOpen,
  };

  return (
    <ParentDashboardContext.Provider value={value}>
      {children}
    </ParentDashboardContext.Provider>
  );
};
