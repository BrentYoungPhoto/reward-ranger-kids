
import React from 'react';
import { motion } from 'framer-motion';
import { User } from '@/utils/dummyData';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';

interface ProfileCardProps {
  user: User;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const { name, avatar, age, totalPoints } = user;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="neo-card p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-app-blue/10 rounded-bl-full z-0"></div>
      
      <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden border-4 border-white shadow-subtle"
        >
          <img
            src={avatar}
            alt={name}
            className="h-full w-full object-cover"
          />
        </motion.div>
        
        <div className="text-center sm:text-left">
          <div className="mb-1">
            <Badge variant="outline" className="bg-app-blue/10 text-app-blue border-none">
              {age ? `${age} years old` : 'Parent'}
            </Badge>
          </div>
          <h2 className="text-2xl font-semibold mb-1">{name}</h2>
          
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
