
import { Task, User } from '@/utils/dummyData';

export interface ParentDashboardContextProps {
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

export interface ParentDashboardProviderProps {
  children: React.ReactNode;
  parent: User;
}
