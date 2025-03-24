
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { Reward } from '@/utils/dummyData';
import { AchievementFormValues } from './types';

interface RewardSelectorProps {
  form: UseFormReturn<AchievementFormValues>;
  rewards: Reward[];
}

const RewardSelector: React.FC<RewardSelectorProps> = ({ form, rewards }) => {
  return (
    <FormField
      control={form.control}
      name="rewardId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Associated Reward (Optional)</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            value={field.value}
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
  );
};

export default RewardSelector;
