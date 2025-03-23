
import React from 'react';
import { motion } from 'framer-motion';
import { Reward } from '@/utils/dummyData';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Gift, CheckCircle } from 'lucide-react';

interface RewardCardProps {
  reward: Reward;
  onClaim?: (id: string) => void;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward, onClaim }) => {
  const { id, title, description, icon, claimed } = reward;

  const handleClaim = () => {
    if (onClaim) {
      onClaim(id);
      toast.success('Reward claimed!');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className={`neo-card p-4 h-full flex flex-col ${claimed ? 'bg-gray-50' : ''}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        {claimed && <CheckCircle size={18} className="text-app-green" />}
      </div>
      
      <h4 className={`font-medium mb-1 ${claimed ? 'text-gray-500' : ''}`}>{title}</h4>
      <p className={`text-sm flex-1 ${claimed ? 'text-gray-400' : 'text-muted-foreground'}`}>{description}</p>
      
      {!claimed && (
        <Button 
          className="mt-3 w-full bg-app-purple hover:bg-app-purple/90"
          size="sm"
          onClick={handleClaim}
        >
          <Gift size={16} className="mr-1" />
          Claim Reward
        </Button>
      )}
      
      {claimed && (
        <div className="mt-3 w-full text-center text-sm text-muted-foreground border border-gray-200 rounded-md py-1">
          Already Claimed
        </div>
      )}
    </motion.div>
  );
};

export default RewardCard;
