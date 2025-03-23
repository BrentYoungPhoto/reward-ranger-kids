
import { z } from 'zod';
import { RecurrenceType } from '@/utils/types';

export const taskFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  points: z.coerce.number().min(1, 'Points must be at least 1'),
  icon: z.string(),
  dueDate: z.date(),
  recurrence: z.enum(['none', 'daily', 'weekly', 'monthly'] as const),
  assignedTo: z.string(),
  imageURL: z.string().optional(),
  reward: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      icon: z.string().optional(),
    })
    .optional(),
});
