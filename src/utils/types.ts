
import { LucideIcon } from 'lucide-react';

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
  achievements?: Achievement[];
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
  level: number;
  reward?: Reward;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  icon: string;
  claimed: boolean;
}

export interface IconType {
  [key: string]: LucideIcon;
}
