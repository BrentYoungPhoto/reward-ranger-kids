
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Achievement, Reward, achievementIcons } from '@/utils/dummyData';

// Schema for achievement form
const achievementFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500, 'Description is too long'),
  pointsNeeded: z.number().int().positive('Points must be a positive number'),
  icon: z.string().min(1, 'Icon is required'),
  rewardId: z.string().optional(),
  level: z.number().int().positive()
});

type AchievementFormValues = z.infer<typeof achievementFormSchema>;

interface AchievementFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (achievementData: Partial<Achievement>) => void;
  achievement?: Achievement;
  rewards: Reward[];
}

const AchievementForm: React.FC<AchievementFormProps> = ({
  open,
  onClose,
  onSave,
  achievement,
  rewards
}) => {
  // Initialize form with achievement data if available
  const form = useForm<AchievementFormValues>({
    resolver: zodResolver(achievementFormSchema),
    defaultValues: {
      title: achievement?.title || '',
      description: achievement?.description || '',
      pointsNeeded: achievement?.pointsNeeded || 100,
      icon: achievement?.icon || '🏆',
      rewardId: achievement?.rewardId || 'none',
      level: achievement?.level || 1
    }
  });

  const handleSubmit = (values: AchievementFormValues) => {
    // Convert 'none' to empty string or undefined for the rewardId
    const submissionValues = {
      ...values,
      rewardId: values.rewardId === 'none' ? undefined : values.rewardId
    };
    
    onSave({
      id: achievement?.id,
      ...submissionValues,
      unlocked: achievement?.unlocked || false
    });
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {achievement ? 'Edit Achievement' : 'Add Achievement'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter achievement title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter achievement description" 
                      className="resize-none h-20" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="pointsNeeded"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Points Needed</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <div className="border rounded-md p-3">
                      <div className="mb-2 text-sm text-muted-foreground">
                        Selected: <span className="text-xl">{field.value}</span>
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        {achievementIcons.map((icon, index) => (
                          <div 
                            key={index} 
                            onClick={() => field.onChange(icon)}
                            className={`flex items-center justify-center text-2xl p-2 rounded-md cursor-pointer hover:bg-accent transition-colors
                              ${field.value === icon ? 'bg-primary/10 border border-primary' : 'bg-background border border-input'}`}
                          >
                            {icon}
                          </div>
                        ))}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rewardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Associated Reward (Optional)</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a reward" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">No reward</SelectItem>
                      {rewards.map(reward => (
                        <SelectItem key={reward.id} value={reward.id}>
                          <div className="flex items-center">
                            <span className="mr-2">{reward.icon}</span>
                            <span>{reward.title}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-app-green hover:bg-app-green/90">
                {achievement ? 'Update Achievement' : 'Add Achievement'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AchievementForm;
