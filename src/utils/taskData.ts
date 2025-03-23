
import { Task } from './types';

// Demo tasks for children
const childTasks: { [childId: string]: Task[] } = {
  'child-1': [
    {
      id: 'task-1',
      title: 'Clean your room',
      description: 'Make your bed and pick up toys',
      assignedTo: 'child-1',
      points: 15,
      completed: false,
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
      icon: 'home',
      recurrence: 'daily',
      imageURL: 'https://images.unsplash.com/photo-1484069560501-87d72b0c3669?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3',
    },
    {
      id: 'task-2',
      title: 'Homework',
      description: 'Complete math worksheet',
      assignedTo: 'child-1',
      points: 20,
      completed: false,
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // Day after tomorrow
      icon: 'book',
      recurrence: 'weekly',
    },
    {
      id: 'task-3',
      title: 'Help with dishes',
      description: 'Help load the dishwasher after dinner',
      assignedTo: 'child-1',
      points: 10,
      completed: true,
      dueDate: new Date().toISOString().split('T')[0], // Today
      icon: 'star',
      reward: {
        id: 'reward-1',
        title: 'Extra screen time',
        description: '15 minutes of extra screen time',
        icon: '📱',
        claimed: false,
      },
    },
  ],
  'child-2': [
    {
      id: 'task-4',
      title: 'Take out trash',
      description: 'Empty all trash cans and take to curb',
      assignedTo: 'child-2',
      points: 10,
      completed: false,
      dueDate: new Date().toISOString().split('T')[0], // Today
      icon: 'trash',
      recurrence: 'weekly',
    },
    {
      id: 'task-5',
      title: 'Practice piano',
      description: 'Practice for 30 minutes',
      assignedTo: 'child-2',
      points: 15,
      completed: true,
      dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
      icon: 'music',
      reward: {
        id: 'reward-2',
        title: 'Choose dinner',
        description: 'Choose what we have for dinner tomorrow',
        icon: '🍕',
        claimed: false,
      },
    },
  ],
};

// Function to get tasks for a specific child
export const getTasksForChild = (childId: string): Task[] => {
  return childTasks[childId] || [];
};

// Function to update tasks for a specific child
export const setTasksForChild = (childId: string, tasks: Task[]): void => {
  childTasks[childId] = tasks;
};
