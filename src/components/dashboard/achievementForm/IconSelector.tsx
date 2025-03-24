
import React from 'react';
import { achievementIcons } from '@/utils/dummyData';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { AchievementFormValues } from './types';

interface IconSelectorProps {
  form: UseFormReturn<AchievementFormValues>;
}

const IconSelector: React.FC<IconSelectorProps> = ({ form }) => {
  return (
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
  );
};

export default IconSelector;
