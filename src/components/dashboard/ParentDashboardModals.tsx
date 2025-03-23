
import React from 'react';
import { useParentDashboard } from '@/contexts/ParentDashboardContext';
import ChildForm from '@/components/dashboard/ChildForm';
import TaskForm from '@/components/dashboard/taskForm';

const ParentDashboardModals: React.FC = () => {
  const {
    children,
    childFormOpen,
    taskFormOpen,
    childToEdit,
    taskToEdit,
    setChildFormOpen,
    setTaskFormOpen,
    handleSaveChild,
    handleSaveTask
  } = useParentDashboard();

  return (
    <>
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
    </>
  );
};

export default ParentDashboardModals;
