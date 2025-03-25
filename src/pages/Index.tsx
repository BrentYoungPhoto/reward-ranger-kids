
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '@/components/AnimatedPage';
import { authenticateUser, User, getAllChildren } from '@/utils/dummyData';
import { toast } from 'sonner';
import PinEntry from '@/components/auth/PinEntry';
import ProfileSelector from '@/components/auth/ProfileSelector';

interface IndexProps {
  onLogin: (user: User) => void;
}

type AuthStep = 'login' | 'profile-select' | 'pin-verify';

const Index: React.FC<IndexProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("parent@example.com");
  const [password, setPassword] = useState("password");
  const [step, setStep] = useState<AuthStep>('login');
  const [authenticatedParent, setAuthenticatedParent] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [children, setChildren] = useState<User[]>([]);

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = authenticateUser(email, password);
    
    if (user) {
      setAuthenticatedParent(user);
      setChildren(getAllChildren());
      setStep('profile-select');
    } else {
      toast.error("Invalid email or password");
    }
  };

  const handleProfileSelect = (user: User) => {
    setSelectedUser(user);
    setStep('pin-verify');
  };

  const handlePinVerified = () => {
    if (selectedUser) {
      onLogin(selectedUser);
      
      // Navigate to the appropriate dashboard
      if (selectedUser.role === 'parent') {
        navigate('/parent');
      } else {
        navigate(`/child/${selectedUser.id}`);
      }
    }
  };

  const handleLogout = () => {
    setAuthenticatedParent(null);
    setSelectedUser(null);
    setStep('login');
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
        <AnimatePresence mode="wait">
          {step === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-md w-full"
            >
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-app-blue">KidPoints</CardTitle>
                  <CardDescription>
                    Log in to manage your children's tasks and rewards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="parent@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                      />
                    </div>
                    <Button type="submit" className="w-full bg-app-blue hover:bg-app-blue/90">
                      Sign In
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <div className="text-sm text-center text-muted-foreground">
                    <span>For demo purposes, login credentials are pre-filled.</span>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {step === 'profile-select' && authenticatedParent && (
            <ProfileSelector 
              key="profile-select"
              parent={authenticatedParent}
              children={children}
              onSelectProfile={handleProfileSelect}
              onLogout={handleLogout}
            />
          )}

          {step === 'pin-verify' && selectedUser && (
            <PinEntry 
              key="pin-verify"
              user={selectedUser}
              onPinVerified={handlePinVerified}
              onBack={() => setStep('profile-select')}
            />
          )}
        </AnimatePresence>
      </div>
    </AnimatedPage>
  );
};

export default Index;
