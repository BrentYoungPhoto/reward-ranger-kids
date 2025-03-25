
import React from 'react';
import { motion } from 'framer-motion';
import { User } from '@/utils/dummyData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileSelectorProps {
  parent: User;
  children: User[];
  onSelectProfile: (user: User) => void;
  onLogout: () => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ 
  parent, 
  children, 
  onSelectProfile, 
  onLogout 
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md"
    >
      <Card className="border-none shadow-lg">
        <CardHeader className="text-center relative">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onLogout}
            className="absolute right-4 top-4"
          >
            <LogOut className="h-4 w-4" />
          </Button>
          
          <CardTitle className="text-2xl font-bold text-app-blue">Who's using KidPoints?</CardTitle>
          <CardDescription>
            Select your profile to continue
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-4">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 gap-4"
          >
            {/* Parent profile */}
            <motion.div variants={item} className="col-span-2">
              <Button
                variant="outline"
                className="w-full h-auto py-4 flex flex-col items-center text-left border-2 hover:border-app-blue hover:bg-app-blue/5"
                onClick={() => onSelectProfile(parent)}
              >
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={parent.avatar} alt={parent.name} />
                    <AvatarFallback>{parent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <div className="font-semibold text-lg">{parent.name}</div>
                    <div className="text-sm text-muted-foreground">Parent Dashboard</div>
                  </div>
                </div>
              </Button>
            </motion.div>
            
            {/* Children profiles */}
            {children.map((child) => (
              <motion.div key={child.id} variants={item}>
                <Button
                  variant="outline"
                  className="w-full h-auto py-4 flex flex-col items-center text-left border-2 hover:border-app-blue hover:bg-app-blue/5"
                  onClick={() => onSelectProfile(child)}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={child.avatar} alt={child.name} />
                      <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <div className="font-semibold">{child.name}</div>
                      <div className="text-xs text-muted-foreground">{child.totalPoints} points</div>
                    </div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileSelector;
