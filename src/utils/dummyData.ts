import { Star, Book, House, Trash, Backpack, Dog, ShoppingCart } from 'lucide-react';

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
}

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
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  pointsNeeded: number;
  icon: string;
  unlocked: boolean;
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
};

// Demo users
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
  },
  {
    id: '3',
    name: 'Parent Johnson',
    role: 'parent',
    avatar: 'https://i.pravatar.cc/150?img=33',
  },
];

// Demo tasks
export const tasks: Task[] = [
  {
    id: '1',
    title: 'Clean Your Room',
    description: 'Make your bed and put away toys',
    assignedTo: '1',
    points: 15,
    completed: false,
    dueDate: '2023-05-10',
    icon: 'house',
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

// Demo achievements
export const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Task Master',
    description: 'Complete 5 tasks',
    pointsNeeded: 100,
    icon: '🏆',
    unlocked: true,
  },
  {
    id: '2',
    title: 'Responsibility Champion',
    description: 'Complete 10 tasks on time',
    pointsNeeded: 200,
    icon: '🌟',
    unlocked: false,
  },
  {
    id: '3',
    title: 'Super Helper',
    description: 'Earn 300 points total',
    pointsNeeded: 300,
    icon: '🚀',
    unlocked: false,
  },
];

// Demo rewards
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

// Function to get tasks for a specific child
export const getTasksForChild = (childId: string) => {
  return tasks.filter(task => task.assignedTo === childId);
};

// Function to get a child by ID
export const getChildById = (childId: string) => {
  return users.find(user => user.id === childId && user.role === 'child');
};

// Function to get all children
export const getAllChildren = () => {
  return users.filter(user => user.role === 'child');
};
