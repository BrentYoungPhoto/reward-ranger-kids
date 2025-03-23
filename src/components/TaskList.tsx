
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Task } from '@/utils/dummyData';
import TaskCard from './TaskCard';
import { Button } from '@/components/ui/button';
import { CheckSquare, Square } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  title?: string;
  showCompleted?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, title = "Tasks", showCompleted = true }) => {
  const [showCompletedTasks, setShowCompletedTasks] = useState(showCompleted);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>(
    tasks.filter(task => task.completed).map(task => task.id)
  );

  const handleCompleteTask = (id: string) => {
    setCompletedTaskIds(prev => [...prev, id]);
  };

  const filteredTasks = showCompletedTasks 
    ? tasks 
    : tasks.filter(task => !completedTaskIds.includes(task.id));

  const pendingTasks = tasks.filter(task => !completedTaskIds.includes(task.id));
  const completedTasksCount = completedTaskIds.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-muted-foreground">
            {pendingTasks.length} pending, {completedTasksCount} completed
          </p>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
          onClick={() => setShowCompletedTasks(!showCompletedTasks)}
        >
          {showCompletedTasks ? (
            <>
              <CheckSquare size={16} />
              <span>Hide Completed</span>
            </>
          ) : (
            <>
              <Square size={16} />
              <span>Show Completed</span>
            </>
          )}
        </Button>
      </div>

      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={{
              ...task,
              completed: completedTaskIds.includes(task.id) || task.completed
            }}
            onComplete={handleCompleteTask}
          />
        ))}
        
        {filteredTasks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground bg-gray-50 rounded-lg">
            {pendingTasks.length === 0 ? (
              <p>All tasks completed! Great job!</p>
            ) : (
              <p>No tasks to show. Adjust filters to see more.</p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TaskList;
