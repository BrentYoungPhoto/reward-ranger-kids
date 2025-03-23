
import React from 'react';
import { useParentDashboard } from '@/contexts/ParentDashboardContext';
import ChildForm from './ChildForm';
import TaskForm from './taskForm/TaskForm';
import AchievementForm from './AchievementForm';
import { rewards } from '@/utils/dummyData';

const ParentDashboardModals: React.FC = () => {
  const {
    childFormOpen,
    taskFormOpen,
    achievementFormOpen,
    childToEdit,
    taskToEdit,
    achievementToEdit,
    children,
    handleSaveChild,
    handleSaveTask,
    handleSaveAchievement,
    setChildFormOpen,
    setTaskFormOpen,
    setAchievementFormOpen
  } = useParentDashboard();

  return (
    <>
      <ChildForm 
        open={childFormOpen}
        child={childToEdit}
        onClose={() => setChildFormOpen(false)}
        onSave={handleSaveChild}
      />
      
      <TaskForm 
        open={taskFormOpen}
        onClose={() => setTaskFormOpen(false)}
        onSave={handleSaveTask}
        task={taskToEdit}
        children={children}
      />
      
      <AchievementForm
        open={achievementFormOpen}
        onClose={() => setAchievementFormOpen(false)}
        onSave={handleSaveAchievement}
        achievement={achievementToEdit}
        rewards={rewards}
      />
    </>
  );
};

export default ParentDashboardModals;
