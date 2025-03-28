import { Star, Book, House, Trash, Backpack, Dog, ShoppingCart, Trophy, Award, Medal, Badge, Crown, Gift } from 'lucide-react';

export interface User {
  id: string;
  name: string;
  role: 'child' | 'parent';
  avatar: string;
  age?: number;
  totalPoints?: number;
  displayName?: string;
  mood?: string;
  theme?: string;
  email?: string;
  pin?: string;
}

export type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  points: number;
  completed: boolean;
  dueDate: string;
  icon: keyof typeof icons;
  reward?: Reward;
  recurrence?: RecurrenceType;
  lastCompleted?: string;
  imageURL?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  pointsNeeded: number;
  icon: string;
  unlocked: boolean;
  rewardId?: string;
  level: number;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  icon: string;
  claimed: boolean;
}

export const icons = {
  star: Star,
  book: Book,
  house: House,
  trash: Trash,
  backpack: Backpack,
  dog: Dog,
  cart: ShoppingCart,
  trophy: Trophy,
  award: Award,
  medal: Medal,
  badge: Badge,
  crown: Crown,
  gift: Gift,
};

export const achievementIcons = [
  '🏆', '🌟', '🚀', '🎖️', '🏅', '🥇', '👑', '💎', '⭐', '🔥', 
  '✨', '🎯', '🎮', '📚', '🧩', '🎨', '🎭', '🏆', '🌈', '🦸'
];

export const users: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    role: 'child',
    avatar: 'https://i.pravatar.cc/150?img=11',
    age: 9,
    totalPoints: 175,
    displayName: 'Alex',
    mood: 'happy',
    theme: 'default',
    pin: '1234',
  },
  {
    id: '2',
    name: 'Sam Johnson',
    role: 'child',
    avatar: 'https://i.pravatar.cc/150?img=12',
    age: 11,
    totalPoints: 250,
    displayName: 'Sammy',
    mood: 'excited',
    theme: 'ocean',
    pin: '5678',
  },
  {
    id: '3',
    name: 'Parent Johnson',
    role: 'parent',
    avatar: 'https://i.pravatar.cc/150?img=33',
    email: 'parent@example.com',
    pin: '0000',
  },
];

let tasksData: Task[] = [
  {
    id: '1',
    title: 'Clean Your Room',
    description: 'Make your bed and put away toys',
    assignedTo: '1',
    points: 15,
    completed: false,
    dueDate: '2023-05-10',
    icon: 'house',
    recurrence: 'weekly',
    reward: {
      id: '1',
      title: '30 mins Screen Time',
      description: 'Extra time for games or shows',
      icon: 'star',
      claimed: false,
    },
  },
  {
    id: '2',
    title: 'Do Your Homework',
    description: 'Complete math and science homework',
    assignedTo: '1',
    points: 25,
    completed: true,
    dueDate: '2023-05-09',
    icon: 'book',
    recurrence: 'daily',
  },
  {
    id: '3',
    title: 'Take Out Trash',
    description: 'Empty all trash cans',
    assignedTo: '1',
    points: 10,
    completed: false,
    dueDate: '2023-05-11',
    icon: 'trash',
    recurrence: 'weekly',
    reward: {
      id: '2',
      title: '$5 Pocket Money',
      description: 'Allowance bonus',
      icon: 'star',
      claimed: false,
    },
  },
  {
    id: '4',
    title: 'Walk the Dog',
    description: 'Take Rex for a 15-minute walk',
    assignedTo: '2',
    points: 20,
    completed: false,
    dueDate: '2023-05-10',
    icon: 'dog',
  },
  {
    id: '5',
    title: 'School Project',
    description: 'Work on science fair project',
    assignedTo: '2',
    points: 50,
    completed: true,
    dueDate: '2023-05-08',
    icon: 'backpack',
    reward: {
      id: '3',
      title: 'New Game Download',
      description: 'Choose a new game to download',
      icon: 'star',
      claimed: true,
    },
  },
  {
    id: '6',
    title: 'Help with Groceries',
    description: 'Help unpack groceries when shopping is done',
    assignedTo: '2',
    points: 15,
    completed: false,
    dueDate: '2023-05-12',
    icon: 'cart',
  },
];

let achievementsData: Achievement[] = [];
for (let i = 1; i <= 25; i++) {
  achievementsData.push({
    id: `achievement-${i}`,
    title: `Level ${i} Achievement`,
    description: `Reach ${i * 100} points to unlock this achievement!`,
    pointsNeeded: i * 100,
    icon: achievementIcons[Math.min(i - 1, achievementIcons.length - 1)],
    unlocked: false,
    level: i
  });
}

achievementsData[0].unlocked = true;
achievementsData[1].unlocked = true;

export const achievements = achievementsData;

export const rewards: Reward[] = [
  {
    id: '1',
    title: '30 mins Screen Time',
    description: 'Extra time for games or shows',
    icon: '🎮',
    claimed: false,
  },
  {
    id: '2',
    title: '$5 Pocket Money',
    description: 'Allowance bonus',
    icon: '💰',
    claimed: false,
  },
  {
    id: '3',
    title: 'New Game Download',
    description: 'Choose a new game to download',
    icon: '🎯',
    claimed: true,
  },
  {
    id: '4',
    title: 'Pizza Night',
    description: 'Choose dinner for the family',
    icon: '🍕',
    claimed: false,
  },
  {
    id: '5',
    title: 'Movie Night',
    description: 'Pick a movie for family night',
    icon: '🎬',
    claimed: false,
  },
];

export const getTasksForChild = (childId: string): Task[] => {
  return tasksData.filter(task => task.assignedTo === childId);
};

export const setTasksForChild = (childId: string, tasks: Task[]): Task[] => {
  tasksData = tasksData.filter(task => task.assignedTo !== childId);
  tasksData = [...tasksData, ...tasks];
  return tasks;
};

export const getChildById = (childId: string) => {
  return users.find(user => user.id === childId && user.role === 'child');
};

export const getAllChildren = () => {
  return users.filter(user => user.role === 'child');
};

export const getAllAchievements = () => {
  return [...achievementsData];
};

export const updateAchievement = (achievementId: string, updates: Partial<Achievement>): Achievement | undefined => {
  const achievementIndex = achievementsData.findIndex(achievement => achievement.id === achievementId);
  
  if (achievementIndex !== -1) {
    achievementsData[achievementIndex] = { ...achievementsData[achievementIndex], ...updates };
    return achievementsData[achievementIndex];
  }
  
  return undefined;
};

export const updateUser = (userId: string, updates: Partial<User>): User | undefined => {
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updates };
    return users[userIndex];
  }
  
  return undefined;
};

export const authenticateUser = (email: string, password: string): User | null => {
  const user = users.find(user => user.email === email && user.role === 'parent');
  return user || null;
};

export const verifyPin = (userId: string, pin: string): boolean => {
  const user = users.find(user => user.id === userId);
  return user?.pin === pin;
};

export const updateUserPin = (userId: string, pin: string): User | undefined => {
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], pin };
    return users[userIndex];
  }
  
  return undefined;
};
