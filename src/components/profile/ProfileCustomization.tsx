
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Image as ImageIcon, User, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User as UserType } from '@/utils/dummyData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileTab from './ProfileTab';
import AppearanceTab from './AppearanceTab';
import AccountTab from './AccountTab';

interface ProfileCustomizationProps {
  user: UserType;
  onUpdateProfile: (updates: Partial<UserType>) => void;
}

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

  // Update local state when the user prop changes
  useEffect(() => {
    setDisplayName(user.displayName || user.name);
    setName(user.name);
    setEmail(user.email || '');
    setMood(user.mood || 'happy');
    setTheme(user.theme || 'default');
    setAvatarUrl(user.avatar);
  }, [user]);

  const handleSaveChanges = () => {
    const updates: Partial<UserType> = {
      name,
      displayName,
      mood,
      theme,
      avatar: avatarUrl,
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
          
          <TabsContent value="profile">
            <ProfileTab 
              user={user}
              name={name}
              displayName={displayName}
              email={email}
              avatarUrl={avatarUrl}
              onNameChange={setName}
              onDisplayNameChange={setDisplayName}
              onEmailChange={setEmail}
              onAvatarChange={handleFileChange}
            />
          </TabsContent>
          
          <TabsContent value="appearance">
            <AppearanceTab 
              mood={mood}
              theme={theme}
              onMoodChange={setMood}
              onThemeChange={setTheme}
            />
          </TabsContent>
          
          <TabsContent value="account">
            <AccountTab 
              currentPassword={currentPassword}
              newPassword={newPassword}
              confirmPassword={confirmPassword}
              onCurrentPasswordChange={setCurrentPassword}
              onNewPasswordChange={setNewPassword}
              onConfirmPasswordChange={setConfirmPassword}
              onPasswordChange={handlePasswordChange}
            />
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
