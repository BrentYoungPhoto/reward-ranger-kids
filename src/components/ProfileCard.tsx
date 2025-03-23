
import React from 'react';
import { motion } from 'framer-motion';
import { User } from '@/utils/dummyData';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';

interface ProfileCardProps {
  user: User;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const { name, displayName, avatar, age, totalPoints, mood } = user;

  // Get emoji for the mood
  const getMoodEmoji = () => {
    switch (mood) {
      case 'happy': return '😊';
      case 'excited': return '🤩';
      case 'calm': return '😌';
      case 'tired': return '😴';
      case 'bored': return '🥱';
      default: return '😊';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="neo-card p-6 relative overflow-hidden backdrop-blur-sm bg-white/80"
      style={{ '--app-blue': 'var(--app-accent-color, #9b87f5)' } as React.CSSProperties}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-app-blue/10 rounded-bl-full z-0"></div>
      
      <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden border-4 border-white shadow-subtle"
        >
          <img
            src={avatar}
            alt={displayName || name}
            className="h-full w-full object-cover"
          />
        </motion.div>
        
        <div className="text-center sm:text-left">
          <div className="mb-1 flex flex-wrap gap-2 justify-center sm:justify-start">
            <Badge variant="outline" className="bg-app-blue/10 text-app-blue border-none">
              {age ? `${age} years old` : 'Parent'}
            </Badge>
            
            {mood && (
              <Badge variant="outline" className="bg-app-blue/10 text-app-blue border-none">
                {getMoodEmoji()} {mood.charAt(0).toUpperCase() + mood.slice(1)}
              </Badge>
            )}
          </div>
          
          <h2 className="text-2xl font-semibold mb-1">{displayName || name}</h2>
          
          {totalPoints !== undefined && (
            <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground">
              <Trophy size={18} className="text-app-yellow" />
              <span className="font-medium">{totalPoints} points</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
