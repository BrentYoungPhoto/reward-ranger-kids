
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TaskFormValues } from './taskFormSchema';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface RewardFieldsProps {
  form: UseFormReturn<TaskFormValues>;
  includeReward: boolean;
  setIncludeReward: (include: boolean) => void;
}

const RewardFields: React.FC<RewardFieldsProps> = ({ form, includeReward, setIncludeReward }) => {
  return (
    <div className="border-t pt-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium">Add a Reward</h4>
        <Button 
          variant="outline" 
          size="sm" 
          type="button"
          onClick={() => setIncludeReward(!includeReward)}
        >
          {includeReward ? 'Remove Reward' : 'Add Reward'}
        </Button>
      </div>
      
      {includeReward && (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="rewardTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reward Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Extra Screen Time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="rewardDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reward Description</FormLabel>
                <FormControl>
                  <Input placeholder="Describe the reward" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default RewardFields;
