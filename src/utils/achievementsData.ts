
import { Achievement } from './types';

// Demo achievements - now structured as levels
export const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Task Beginner',
    description: 'Earned 100 points',
    pointsNeeded: 100,
    icon: '🏆',
    unlocked: false,
    level: 1,
    reward: {
      id: 'ar-1',
      title: 'Ice Cream Treat',
      description: 'A special ice cream treat',
      icon: '🍦',
      claimed: false,
    }
  },
  {
    id: '2',
    title: 'Responsibility Rookie',
    description: 'Earned 200 points',
    pointsNeeded: 200,
    icon: '🌟',
    unlocked: false,
    level: 2,
    reward: {
      id: 'ar-2',
      title: 'Movie Night Choice',
      description: 'Pick the next family movie night film',
      icon: '🎬',
      claimed: false,
    }
  },
  {
    id: '3',
    title: 'Helper Hero',
    description: 'Earned 300 points',
    pointsNeeded: 300,
    icon: '🚀',
    unlocked: false,
    level: 3,
    reward: {
      id: 'ar-3',
      title: 'Extra Allowance',
      description: '$5 bonus in allowance',
      icon: '💰',
      claimed: false,
    }
  },
];

// Generate 25 achievement levels (one every 100 points)
export const generateDefaultAchievements = (): Achievement[] => {
  const defaultIcons = ['🏆', '🌟', '🚀', '🎖️', '🏅', '🥇', '👑', '⭐', '✨', '💫'];
  const defaultTitles = [
    'Task Beginner', 'Responsibility Rookie', 'Helper Hero', 'Chore Champion',
    'Achievement Ace', 'Star Student', 'Responsibility Rockstar', 'Task Titan',
    'Super Helper', 'Duty Dynamo', 'Goal Getter', 'Mission Master',
    'Responsibility Royal', 'Task Tycoon', 'Helper Hotshot', 'Chore Chief',
    'Achievement Authority', 'Star Superstar', 'Responsibility Ruler', 'Task Tamer',
    'Helping Heavyweight', 'Duty Dominator', 'Goal Guardian', 'Mission Maestro',
    'Ultimate Achiever'
  ];
  
  const defaultRewards = [
    { title: 'Ice Cream Treat', description: 'A special ice cream treat', icon: '🍦' },
    { title: 'Movie Night Choice', description: 'Pick the next family movie night film', icon: '🎬' },
    { title: 'Extra Allowance', description: '$5 bonus in allowance', icon: '💰' },
    { title: 'Extra Screen Time', description: '30 minutes of extra screen time', icon: '📱' },
    { title: 'Special Outing', description: 'A special trip to a place of your choice', icon: '🚗' }
  ];
  
  return Array.from({ length: 25 }, (_, i) => {
    const level = i + 1;
    const pointsNeeded = level * 100;
    const rewardIndex = i % defaultRewards.length;
    
    return {
      id: `achievement-${level}`,
      title: defaultTitles[i] || `Level ${level} Achievement`,
      description: `Earned ${pointsNeeded} points`,
      pointsNeeded,
      icon: defaultIcons[i % defaultIcons.length],
      unlocked: false,
      level,
      reward: {
        id: `ar-${level}`,
        title: defaultRewards[rewardIndex].title,
        description: defaultRewards[rewardIndex].description,
        icon: defaultRewards[rewardIndex].icon,
        claimed: false,
      }
    };
  });
};

// Function to get achievements for a specific child
export const getAchievementsForChild = (childId: string): Achievement[] => {
  // This would normally pull from a database, but for demo we'll return default achievements
  return generateDefaultAchievements();
};

// Function to update achievements for a specific child
export const updateAchievements = (childId: string, achievements: Achievement[]): Achievement[] => {
  // This would normally save to a database
  return achievements;
};

export const calculateUnlockedAchievements = (achievements: Achievement[], totalPoints: number): Achievement[] => {
  return achievements.map(achievement => ({
    ...achievement,
    unlocked: totalPoints >= achievement.pointsNeeded
  }));
};

