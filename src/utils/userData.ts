
import { User } from './types';

// Demo users (parent and children)
export const users: User[] = [
  {
    id: 'parent-1',
    name: 'Alex Parent',
    role: 'parent',
    avatar: 'https://i.pravatar.cc/150?img=68',
  },
  {
    id: 'child-1',
    name: 'Sam',
    role: 'child',
    avatar: 'https://i.pravatar.cc/150?img=12',
    age: 8,
    totalPoints: 250,
    displayName: 'Sammy',
    mood: 'happy',
    theme: 'ocean',
  },
  {
    id: 'child-2',
    name: 'Jordan',
    role: 'child',
    avatar: 'https://i.pravatar.cc/150?img=11',
    age: 10,
    totalPoints: 420,
    displayName: 'Jo',
    mood: 'happy',
    theme: 'sunset',
  },
];

// Function to get all children (filtering out parent users)
export const getAllChildren = (): User[] => {
  return users.filter(user => user.role === 'child');
};

// Function to get a child by ID
export const getChildById = (childId: string): User | undefined => {
  return users.find(user => user.id === childId);
};

// Function to update a user
export const updateUser = (userId: string, updates: Partial<User>): void => {
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updates };
  }
};
