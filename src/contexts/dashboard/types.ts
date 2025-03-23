
import { Task, User, Achievement } from '@/utils/dummyData';

export interface ParentDashboardContextProps {
  parent: User | undefined;
  children: User[];
  selectedChildId: string;
  childTasks: Task[];
  selectedChild: User | undefined;
  childFormOpen: boolean;
  taskFormOpen: boolean;
  achievementFormOpen: boolean;
  childToEdit: User | undefined;
  taskToEdit: Task | undefined;
  achievementToEdit: Achievement | undefined;
  achievements: Achievement[];
  handleSelectChild: (childId: string) => void;
  handleAddChild: () => void;
  handleEditChild: (child: User) => void;
  handleDeleteChild: (childId: string) => void;
  handleSaveChild: (childData: Partial<User>) => void;
  handleAddTask: () => void;
  handleEditTask: (task: Task) => void;
  handleCompleteTask: (taskId: string) => void;
  handleSaveTask: (taskData: Partial<Task>) => void;
  handleAddAchievement: () => void;
  handleEditAchievement: (achievement: Achievement) => void;
  handleSaveAchievement: (achievementData: Partial<Achievement>) => void;
  setChildFormOpen: (open: boolean) => void;
  setTaskFormOpen: (open: boolean) => void;
  setAchievementFormOpen: (open: boolean) => void;
}

export interface ParentDashboardProviderProps {
  children: React.ReactNode;
  parent: User;
}
