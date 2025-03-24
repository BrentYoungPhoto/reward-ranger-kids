
import { z } from 'zod';
import { Achievement } from '@/utils/dummyData';

// Schema for achievement form
export const achievementFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500, 'Description is too long'),
  pointsNeeded: z.number().int().positive('Points must be a positive number'),
  icon: z.string().min(1, 'Icon is required'),
  rewardId: z.string().optional(),
  level: z.number().int().positive()
});

export type AchievementFormValues = z.infer<typeof achievementFormSchema>;

export interface AchievementFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (achievementData: Partial<Achievement>) => void;
  achievement?: Achievement;
  rewards: Achievement['rewards'];
}
