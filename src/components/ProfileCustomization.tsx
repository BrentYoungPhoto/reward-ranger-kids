
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Image, Mail, Lock, User, Sparkles } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User as UserType } from '@/utils/dummyData';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mood, setMood] = useState(user.mood || 'happy');
  const [theme, setTheme] = useState(user.theme || 'default');
  const [avatarUrl, setAvatarUrl] = useState(user.avatar);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleSaveChanges = () => {
    const updates: Partial<UserType> = {
      name,
      displayName,
      mood,
      theme,
      avatar: avatarUrl
    };
    
    if (email) {
      updates.email = email;
    }
    
    onUpdateProfile(updates);
    setDialogOpen(false);
  };
  
  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    if (!currentPassword) {
      alert("Please enter your current password");
      return;
    }
    
    // In a real app, this would validate the current password
    // and update to the new password in the backend
    alert("Password updated successfully!");
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
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

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild id="profile-customization-dialog">
        <button className="hidden">Customize Profile</button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md lg:max-w-lg rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center mb-4">Parent Account Settings</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Palette className="mr-2 h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="account">
              <Lock className="mr-2 h-4 w-4" />
              Account
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
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
              
              <div className="w-full space-y-4">
                <div>
                  <Label htmlFor="full-name" className="text-sm font-medium">Full Name</Label>
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-muted-foreground" />
                    <Input
                      id="full-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      onChange={(e) => setDisplayName(e.target.value)}
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
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-4">
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
          </TabsContent>
          
          {/* Account Tab */}
          <TabsContent value="account" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="current-password" className="text-sm font-medium">Current Password</Label>
                <div className="flex items-center gap-2">
                  <Lock size={18} className="text-muted-foreground" />
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="new-password" className="text-sm font-medium">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <Label htmlFor="confirm-password" className="text-sm font-medium">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              
              <Button 
                onClick={handlePasswordChange}
                className="mt-2"
                disabled={!currentPassword || !newPassword || !confirmPassword}
              >
                Update Password
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSaveChanges}
            className="bg-app-blue text-white py-2 px-4 rounded-lg font-semibold shadow-md"
          >
            Save Changes
          </motion.button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileCustomization;
