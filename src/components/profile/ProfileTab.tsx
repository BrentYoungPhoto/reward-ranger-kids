
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, User, Sparkles } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User as UserType } from '@/utils/dummyData';

interface ProfileTabProps {
  user: UserType;
  name: string;
  displayName: string;
  email: string;
  avatarUrl: string;
  onNameChange: (value: string) => void;
  onDisplayNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({
  user,
  name,
  displayName,
  email,
  avatarUrl,
  onNameChange,
  onDisplayNameChange,
  onEmailChange,
  onAvatarChange
}) => {
  return (
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
              onChange={onAvatarChange} 
            />
          </label>
        </motion.div>
      </div>
      
      <div className="w-full space-y-4">
        <div>
          <Label htmlFor="full-name" className="text-sm font-medium">Full Name</Label>
          <div className="flex items-center gap-2">
            <User size={18} className="text-muted-foreground" />
            <Input
              id="full-name"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Your full name"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="display-name" className="text-sm font-medium">Display Name</Label>
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-muted-foreground" />
            <Input
              id="display-name"
              value={displayName}
              onChange={(e) => onDisplayNameChange(e.target.value)}
              placeholder="Your display name"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="your.email@example.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
