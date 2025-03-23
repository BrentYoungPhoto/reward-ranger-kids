
import * as z from 'zod';
import { icons } from '@/utils/dummyData';

// Define a type for valid icon names
export type IconName = keyof typeof icons;

export const taskFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(5, { message: "Description must be at least 5 characters" }),
  assignedTo: z.string({ required_error: "Please select a child" }),
  points: z.coerce.number().min(1, { message: "Points must be at least 1" }),
  icon: z.enum(['star', 'book', 'house', 'trash', 'backpack', 'dog', 'cart'] as [string, ...string[]]),
  recurrence: z.enum(['none', 'daily', 'weekly', 'monthly'] as [string, ...string[]]),
  rewardTitle: z.string().optional(),
  rewardDescription: z.string().optional(),
  imageURL: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
