
import React from 'react';
import { Task } from '@/utils/dummyData';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  title?: string;
  onComplete?: (id: string) => void;
  onEditTask?: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  title = 'Tasks', 
  onComplete,
  onEditTask
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">No tasks yet.</p>
      </div>
    );
  }

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-4">
      {title && (
        <h2 className="text-lg font-medium">{title}</h2>
      )}
      
      {pendingTasks.length > 0 && (
        <div className="space-y-3">
          {pendingTasks.length > 0 && (
            <h3 className="text-sm font-medium text-muted-foreground">Pending</h3>
          )}
          {pendingTasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onComplete={onComplete}
              onEdit={onEditTask}
            />
          ))}
        </div>
      )}
      
      {completedTasks.length > 0 && (
        <div className="space-y-3 mt-6">
          <h3 className="text-sm font-medium text-muted-foreground">Completed</h3>
          {completedTasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onEdit={onEditTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
