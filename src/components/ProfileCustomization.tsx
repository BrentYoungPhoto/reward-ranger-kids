
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Image, SmilePlus, User } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User as UserType } from '@/utils/dummyData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface ProfileCustomizationProps {
  user: UserType;
  onUpdateProfile: (updates: Partial<UserType>) => void;
}

const THEME_OPTIONS = [
  { value: 'default', label: 'Default Theme', color: '#9b87f5' },
  { value: 'ocean', label: 'Ocean Blue', color: '#0EA5E9' },
  { value: 'sunset', label: 'Sunset Orange', color: '#F97316' },
  { value: 'forest', label: 'Forest Green', color: '#22C55E' },
  { value: 'berry', label: 'Berry Purple', color: '#D946EF' },
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

  const handleSaveChanges = () => {
    onUpdateProfile({
      displayName,
      mood,
      theme,
      avatar: avatarUrl
    });
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

  const getThemeColor = (themeValue: string) => {
    return THEME_OPTIONS.find(t => t.value === themeValue)?.color || '#9b87f5';
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full mt-4 border-dashed border-2"
        >
          <Palette size={16} className="mr-2" />
          Customize Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Your Profile</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarUrl} alt={displayName} />
                <AvatarFallback>{displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <label htmlFor="avatar-upload" className="absolute -bottom-2 -right-2 bg-background rounded-full p-1 border cursor-pointer">
                <Image size={18} />
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileChange} 
                />
              </label>
            </div>
            <div className="flex-1">
              <Label htmlFor="display-name">Display Name</Label>
              <div className="flex items-center gap-2">
                <User size={18} className="text-muted-foreground" />
                <Input
                  id="display-name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your display name"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="mood-select">Your Mood</Label>
            <div className="flex items-center gap-2">
              <SmilePlus size={18} className="text-muted-foreground" />
              <Select value={mood} onValueChange={setMood}>
                <SelectTrigger id="mood-select" className="w-full">
                  <SelectValue placeholder="Select your mood" />
                </SelectTrigger>
                <SelectContent>
                  {MOOD_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="theme-select">Dashboard Theme</Label>
            <div className="flex items-center gap-2">
              <Palette size={18} className="text-muted-foreground" />
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger id="theme-select" className="w-full">
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  {THEME_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: option.color }}
                        />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <div className="w-16 h-8 rounded-full" style={{ background: getThemeColor(theme) }}></div>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileCustomization;
