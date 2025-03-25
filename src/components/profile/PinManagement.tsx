
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { User, updateUserPin } from '@/utils/dummyData';
import { Shield, ShieldCheck } from 'lucide-react';

interface PinManagementProps {
  parent: User;
  children: User[];
  onUpdateParent: (updates: Partial<User>) => void;
}

const PinManagement: React.FC<PinManagementProps> = ({ 
  parent, 
  children,
  onUpdateParent
}) => {
  const [pins, setPins] = useState<Record<string, string>>({
    [parent.id]: parent.pin || '',
    ...children.reduce((acc, child) => {
      acc[child.id] = child.pin || '';
      return acc;
    }, {} as Record<string, string>)
  });
  
  // Create reset keys for each PIN input
  const [resetKeys, setResetKeys] = useState<Record<string, string>>({
    [parent.id]: Date.now().toString(),
    ...children.reduce((acc, child) => {
      acc[child.id] = Date.now().toString();
      return acc;
    }, {} as Record<string, string>)
  });

  const handlePinChange = (userId: string, pin: string) => {
    console.log(`Setting PIN for user ${userId} to:`, pin);
    setPins(prev => ({
      ...prev,
      [userId]: pin
    }));
  };

  const handleSavePin = (userId: string) => {
    const pin = pins[userId];
    if (pin.length !== 4) {
      toast.error("PIN must be 4 digits");
      return;
    }

    // Update the PIN in our dummy data
    const updatedUser = updateUserPin(userId, pin);
    
    if (updatedUser) {
      toast.success(`PIN updated successfully for ${updatedUser.name}`);
      
      // If it's the parent, update the parent state
      if (updatedUser.id === parent.id) {
        onUpdateParent({ pin });
      }
      
      // Reset the input to show updated PIN
      setResetKeys(prev => ({
        ...prev,
        [userId]: Date.now().toString()
      }));
    } else {
      toast.error("Failed to update PIN");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Shield className="h-5 w-5 text-app-blue" />
            PIN Management
          </CardTitle>
          <CardDescription>
            Set or change PINs for profile access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Parent PIN */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor={`pin-${parent.id}`} className="text-base font-medium flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-app-blue" />
                Your PIN
              </Label>
              <Button 
                size="sm" 
                onClick={() => handleSavePin(parent.id)}
                disabled={pins[parent.id].length !== 4}
              >
                Save PIN
              </Button>
            </div>
            <div className="flex justify-center">
              <InputOTP
                key={resetKeys[parent.id]}
                id={`pin-${parent.id}`}
                maxLength={4}
                value={pins[parent.id]}
                onChange={(value) => handlePinChange(parent.id, value)}
                pattern="^[0-9]+$"
                render={({ slots }) => (
                  <InputOTPGroup>
                    {slots.map((slot, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                )}
              />
            </div>
            <div className="text-xs text-gray-400 text-center">
              Current PIN: {pins[parent.id] || "(empty)"}
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Children PINs</h3>
            <div className="space-y-6">
              {children.map(child => (
                <div key={child.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`pin-${child.id}`} className="text-base font-medium">
                      {child.name}
                    </Label>
                    <Button 
                      size="sm" 
                      onClick={() => handleSavePin(child.id)}
                      disabled={pins[child.id].length !== 4}
                    >
                      Save PIN
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <InputOTP
                      key={resetKeys[child.id]}
                      id={`pin-${child.id}`}
                      maxLength={4}
                      value={pins[child.id]}
                      onChange={(value) => handlePinChange(child.id, value)}
                      pattern="^[0-9]+$"
                      render={({ slots }) => (
                        <InputOTPGroup>
                          {slots.map((slot, index) => (
                            <InputOTPSlot key={index} index={index} />
                          ))}
                        </InputOTPGroup>
                      )}
                    />
                  </div>
                  <div className="text-xs text-gray-400 text-center">
                    Current PIN: {pins[child.id] || "(empty)"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PinManagement;
