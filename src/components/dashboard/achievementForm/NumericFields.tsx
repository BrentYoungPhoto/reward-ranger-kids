
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { AchievementFormValues } from './types';

interface NumericFieldsProps {
  form: UseFormReturn<AchievementFormValues>;
}

const NumericFields: React.FC<NumericFieldsProps> = ({ form }) => {
  return (
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
  );
};

export default NumericFields;
