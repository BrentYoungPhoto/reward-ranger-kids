
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { AchievementFormProps, AchievementFormValues, achievementFormSchema } from './types';
import BasicFields from './BasicFields';
import NumericFields from './NumericFields';
import IconSelector from './IconSelector';
import RewardSelector from './RewardSelector';

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

  // Update form values when achievement changes
  useEffect(() => {
    if (achievement) {
      form.reset({
        title: achievement.title,
        description: achievement.description,
        pointsNeeded: achievement.pointsNeeded,
        icon: achievement.icon,
        rewardId: achievement.rewardId || 'none',
        level: achievement.level
      });
    }
  }, [achievement, form]);

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
            <BasicFields form={form} />
            <NumericFields form={form} />
            <IconSelector form={form} />
            <RewardSelector form={form} rewards={rewards} />

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
