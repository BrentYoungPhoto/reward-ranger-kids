
import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';

interface MoodOption {
  value: string;
  label: string;
}

interface ThemeOption {
  value: string;
  label: string;
  color: string;
  gradient: string;
}

interface AppearanceTabProps {
  mood: string;
  theme: string;
  onMoodChange: (value: string) => void;
  onThemeChange: (value: string) => void;
}

const MOOD_OPTIONS: MoodOption[] = [
  { value: 'happy', label: 'Happy 😊' },
  { value: 'excited', label: 'Excited 🤩' },
  { value: 'calm', label: 'Calm 😌' },
  { value: 'tired', label: 'Tired 😴' },
  { value: 'bored', label: 'Bored 🥱' },
];

const THEME_OPTIONS: ThemeOption[] = [
  { value: 'default', label: 'Default Purple', color: '#9b87f5', gradient: 'none' },
  { value: 'ocean', label: 'Ocean Blue', color: '#0EA5E9', gradient: 'gradient-ocean' },
  { value: 'sunset', label: 'Sunset Orange', color: '#F97316', gradient: 'gradient-sunset' },
  { value: 'forest', label: 'Forest Green', color: '#22C55E', gradient: 'gradient-forest' },
  { value: 'berry', label: 'Berry Purple', color: '#D946EF', gradient: 'gradient-berry' },
  { value: 'candy', label: 'Pink Candy', color: '#ff758c', gradient: 'gradient-candy' },
];

const AppearanceTab: React.FC<AppearanceTabProps> = ({
  mood,
  theme,
  onMoodChange,
  onThemeChange
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="mood-select" className="text-lg mb-2 block">How do you feel today?</Label>
        <div className="grid grid-cols-5 gap-2">
          {MOOD_OPTIONS.map(option => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onMoodChange(option.value)}
              className={`flex flex-col items-center p-3 rounded-lg ${
                mood === option.value ? 'bg-app-blue text-white' : 'bg-gray-100'
              }`}
            >
              <span className="text-2xl">{option.label.split(' ')[1]}</span>
              <span className="text-xs mt-1">{option.label.split(' ')[0]}</span>
            </motion.button>
          ))}
        </div>
      </div>
      
      <div>
        <Label className="text-lg mb-2 block">Choose your colors!</Label>
        <div className="grid grid-cols-3 gap-3">
          {THEME_OPTIONS.map(option => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onThemeChange(option.value)}
              className={`
                p-3 h-24 rounded-lg flex flex-col items-center justify-center
                ${option.gradient !== 'none' ? `bg-${option.gradient}` : ''}
                ${theme === option.value ? 'ring-4 ring-black' : 'ring-1 ring-gray-200'}
              `}
              style={option.gradient === 'none' ? { backgroundColor: option.color } : {}}
            >
              <span className="font-bold text-white drop-shadow-md">{option.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppearanceTab;
