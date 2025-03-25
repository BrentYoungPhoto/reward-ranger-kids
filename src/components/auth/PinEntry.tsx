
import React, { useState } from 'react';
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

  const handleVerify = () => {
    // In a real app, you would verify with the backend
    // For our demo, we'll compare with the user's pin in dummyData
    if (pin === user.pin) {
      setError("");
      onPinVerified();
    } else {
      setError("Incorrect PIN. Please try again.");
      setPin("");
    }
  };

  const handlePinChange = (value: string) => {
    setPin(value);
    // Clear error when user starts typing again
    if (error) {
      setError("");
    }

    // Add console log to debug
    console.log("PIN changed:", value);
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
              className="gap-2"
              render={({ slots }) => (
                <InputOTPGroup className="gap-2">
                  {slots.map((slot, index) => (
                    <InputOTPSlot 
                      key={index} 
                      {...slot} 
                      index={index} 
                      className="border-2 border-gray-300 focus:border-app-blue bg-white"
                    />
                  ))}
                </InputOTPGroup>
              )}
            />
          </div>
          
          {error && (
            <p className="text-center text-red-500 text-sm font-medium">{error}</p>
          )}
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
