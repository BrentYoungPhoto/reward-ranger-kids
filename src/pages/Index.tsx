
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import AnimatedPage from '@/components/AnimatedPage';

interface IndexProps {
  onLogin: () => void;
}

const Index: React.FC<IndexProps> = ({ onLogin }) => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would validate credentials
    onLogin();
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="parent@example.com" 
                    defaultValue="parent@example.com"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    defaultValue="password"
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
      </div>
    </AnimatedPage>
  );
};

export default Index;
