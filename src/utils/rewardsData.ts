
import { Reward } from './types';

// Demo rewards
export const rewards: Reward[] = [
  {
    id: 'reward-1',
    title: 'Extra screen time',
    description: '15 minutes of extra screen time',
    icon: '📱',
    claimed: false,
  },
  {
    id: 'reward-2',
    title: 'Choose dinner',
    description: 'Choose what we have for dinner tomorrow',
    icon: '🍕',
    claimed: false,
  },
  {
    id: 'reward-3',
    title: 'Movie night',
    description: 'Pick a movie for family movie night',
    icon: '🎬',
    claimed: false,
  },
  {
    id: 'reward-4',
    title: 'New toy under $15',
    description: 'Get a new toy or game under $15',
    icon: '🎮',
    claimed: true,
  },
  {
    id: 'reward-5',
    title: 'Zoo trip',
    description: 'Family trip to the zoo',
    icon: '🦁',
    claimed: false,
  },
];
