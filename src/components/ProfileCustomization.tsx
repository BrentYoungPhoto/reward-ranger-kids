
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Image, SmilePlus, User, Sparkles } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User as UserType } from '@/utils/dummyData';
import { Label } from '@/components/ui/label';

interface ProfileCustomizationProps {
  user: UserType;
  onUpdateProfile: (updates: Partial<UserType>) => void;
}

const THEME_OPTIONS = [
  { value: 'default', label: 'Default Purple', color: '#9b87f5', gradient: 'none' },
  { value: 'ocean', label: 'Ocean Blue', color: '#0EA5E9', gradient: 'gradient-ocean' },
  { value: 'sunset', label: 'Sunset Orange', color: '#F97316', gradient: 'gradient-sunset' },
  { value: 'forest', label: 'Forest Green', color: '#22C55E', gradient: 'gradient-forest' },
  { value: 'berry', label: 'Berry Purple', color: '#D946EF', gradient: 'gradient-berry' },
  { value: 'candy', label: 'Pink Candy', color: '#ff758c', gradient: 'gradient-candy' },
];

const MOOD_OPTIONS = [
  { value: 'happy', label: 'Happy 😊' },
  { value: 'excited', label: 'Excited 🤩' },
  { value: 'calm', label: 'Calm 😌' },
  { value: 'tired', label: 'Tired 😴' },
  { value: 'bored', label: 'Bored 🥱' },
];

const ProfileCustomization: React.FC<ProfileCustomizationProps> = ({ user, onUpdateProfile }) => {
  const [displayName, setDisplayName] = useState(user.displayName || user.name);
  const [mood, setMood] = useState(user.mood || 'happy');
  const [theme, setTheme] = useState(user.theme || 'default');
  const [avatarUrl, setAvatarUrl] = useState(user.avatar);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSaveChanges = () => {
    onUpdateProfile({
      displayName,
      mood,
      theme,
      avatar: avatarUrl
    });
    setDialogOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this file to a server
      // For now, we'll just create a local URL for preview
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const getThemeGradient = (themeValue: string) => {
    return THEME_OPTIONS.find(t => t.value === themeValue)?.gradient || 'none';
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 bg-white rounded-full p-3 shadow-lg absolute bottom-6 right-6 border-2 border-dashed border-app-blue"
        >
          <Sparkles size={24} className="text-app-blue" />
          <span className="font-bold text-app-blue">Customize!</span>
        </motion.button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center mb-4">Make it YOURS!</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                  <AvatarImage src={avatarUrl} alt={displayName} />
                  <AvatarFallback>{displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <label htmlFor="avatar-upload" className="absolute -bottom-2 -right-2 bg-background rounded-full p-2 border-2 border-app-blue cursor-pointer shadow-md">
                  <Image size={20} className="text-app-blue" />
                  <input 
                    id="avatar-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileChange} 
                  />
                </label>
              </motion.div>
            </div>
            
            <div className="w-full">
              <Label htmlFor="display-name" className="text-lg mb-1 block">My Nickname</Label>
              <div className="flex items-center gap-2">
                <User size={20} className="text-muted-foreground" />
                <Input
                  id="display-name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your display name"
                  className="flex-1 text-lg"
                />
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="mood-select" className="text-lg mb-2 block">How do you feel today?</Label>
            <div className="grid grid-cols-5 gap-2">
              {MOOD_OPTIONS.map(option => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMood(option.value)}
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
                  onClick={() => setTheme(option.value)}
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
          
          <div className="mt-6 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveChanges}
              className="bg-app-blue text-white py-3 px-8 rounded-full text-lg font-bold shadow-lg"
            >
              I'm done!
            </motion.button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileCustomization;
