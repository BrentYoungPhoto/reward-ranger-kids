
import React from 'react';
import { Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface AccountTabProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  onCurrentPasswordChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onPasswordChange: () => void;
}

const AccountTab: React.FC<AccountTabProps> = ({
  currentPassword,
  newPassword,
  confirmPassword,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onPasswordChange
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="current-password" className="text-sm font-medium">Current Password</Label>
        <div className="flex items-center gap-2">
          <Lock size={18} className="text-muted-foreground" />
          <Input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => onCurrentPasswordChange(e.target.value)}
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
          onChange={(e) => onNewPasswordChange(e.target.value)}
          placeholder="••••••••"
        />
      </div>
      
      <div>
        <Label htmlFor="confirm-password" className="text-sm font-medium">Confirm New Password</Label>
        <Input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          placeholder="••••••••"
        />
      </div>
      
      <Button 
        onClick={onPasswordChange}
        className="mt-2"
        disabled={!currentPassword || !newPassword || !confirmPassword}
      >
        Update Password
      </Button>
    </div>
  );
};

export default AccountTab;
