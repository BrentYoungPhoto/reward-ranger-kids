
import React, { useState, useEffect } from 'react';
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { User } from '@/utils/dummyData';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface PinEntryProps {
  user: User;
  onPinVerified: () => void;
  onBack: () => void;
}

const PinEntry: React.FC<PinEntryProps> = ({ user, onPinVerified, onBack }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const requiredLength = 4;

  // Clear any errors when the pin changes
  useEffect(() => {
    if (error && pin.length > 0) {
      setError("");
    }
  }, [pin, error]);

  useEffect(() => {
    console.log("Current PIN value:", pin); // Debug log
    console.log("PIN length:", pin.length); // Check length
  }, [pin]);

  const handleVerify = () => {
    // In a real app, you would verify with the backend
    // For our demo, we'll compare with the user's pin in dummyData
    console.log("Verifying PIN:", pin, "against user PIN:", user.pin);
    if (pin === user.pin) {
      setError("");
      onPinVerified();
    } else {
      setError("Incorrect PIN. Please try again.");
      setPin("");
    }
  };

  const handlePinChange = (value: string) => {
    // Ensure only numbers are entered
    if (/^\d*$/.test(value) && value.length <= requiredLength) {
      console.log("Setting PIN to:", value); // Debug log
      setPin(value);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md"
    >
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-4 flex flex-col items-center text-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="absolute left-4 top-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <Avatar className="h-24 w-24 mb-2">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div>
            <CardTitle className="text-2xl font-bold text-app-blue">Enter PIN</CardTitle>
            <CardDescription className="mt-2">
              Please enter the PIN for {user.name}'s profile
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <InputOTP
              maxLength={requiredLength}
              value={pin}
              onChange={handlePinChange}
              render={({ slots }) => (
                <InputOTPGroup>
                  {slots.map((slot, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              )}
            />
          </div>
          
          {error && (
            <p className="text-center text-red-500 text-sm font-medium">{error}</p>
          )}
          
          {/* Debug display to ensure PIN is captured */}
          <div className="text-xs text-gray-500 text-center">
            Current PIN state: {pin.length > 0 ? pin : "(empty)"}
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            className="w-full bg-app-blue hover:bg-app-blue/90" 
            onClick={handleVerify}
            disabled={pin.length !== requiredLength}
          >
            Verify PIN
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PinEntry;
