
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  ArrowRight,
  CheckCircle,
  Gift,
  Trophy,
  User
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container max-w-6xl mx-auto py-6 px-4 sm:px-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-app-blue" />
            <span className="font-semibold text-xl">RewardRanger</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/child">
              <Button variant="outline" className="text-app-black bg-transparent hover:bg-gray-100">
                Child Login
              </Button>
            </Link>
            <Link to="/parent">
              <Button className="bg-app-blue hover:bg-app-blue/90">
                Parent Login
              </Button>
            </Link>
          </div>
        </nav>
      </header>
      
      {/* Hero Section */}
      <section className="container max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6">
              <div className="inline-block py-1 px-3 bg-app-blue/10 text-app-blue rounded-full text-sm font-medium">
                For Parents & Kids
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Make Chores <span className="text-app-blue">Fun</span>, Rewards <span className="text-app-purple">Exciting</span>
              </h1>
              
              <p className="text-lg text-muted-foreground md:pr-10">
                RewardRanger helps parents assign tasks and motivate kids with rewards 
                they'll love. Track progress, celebrate achievements, and make responsibility fun.
              </p>
              
              <div className="flex gap-4 pt-2">
                <Link to="/parent">
                  <Button size="lg" className="bg-app-blue hover:bg-app-blue/90">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/child">
                  <Button size="lg" variant="outline">
                    View Demo
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle className="h-5 w-5 text-app-green" />
                  <span>Easy to use</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle className="h-5 w-5 text-app-green" />
                  <span>Kid friendly</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle className="h-5 w-5 text-app-green" />
                  <span>Free</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="relative z-10 bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?auto=format&fit=crop&q=80&w=2070"
                alt="Happy family" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="absolute top-4 -right-10 w-32 h-32 bg-app-purple/10 rounded-full blur-xl z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-app-blue/10 rounded-full blur-xl z-0"></div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How RewardRanger Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A simple, intuitive system that helps parents motivate kids to complete chores 
              while teaching responsibility and the value of rewards.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-subtle"
            >
              <div className="bg-app-blue/10 h-12 w-12 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-app-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Tasks</h3>
              <p className="text-muted-foreground">
                Parents create and assign tasks with clear descriptions and point values.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-subtle"
            >
              <div className="bg-app-purple/10 h-12 w-12 rounded-xl flex items-center justify-center mb-4">
                <Gift size={24} className="text-app-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Set Rewards</h3>
              <p className="text-muted-foreground">
                Define rewards that motivate your children, from screen time to special treats.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-subtle"
            >
              <div className="bg-app-green/10 h-12 w-12 rounded-xl flex items-center justify-center mb-4">
                <Trophy size={24} className="text-app-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-muted-foreground">
                Watch as your kids complete tasks, earn points, and unlock achievements.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="container max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="bg-app-black rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-app-blue/20 rounded-full blur-3xl opacity-70 z-0"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-app-purple/20 rounded-full blur-3xl opacity-70 z-0"></div>
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to make chores rewarding?
            </h2>
            <p className="text-gray-300 mb-8">
              RewardRanger makes it easy to motivate your kids with a balanced system of tasks and rewards.
              Start today and transform the way your family handles responsibilities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/parent">
                <Button size="lg" className="bg-white text-app-black hover:bg-gray-100">
                  <User className="mr-2 h-5 w-5" />
                  Parent Dashboard
                </Button>
              </Link>
              <Link to="/child">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <User className="mr-2 h-5 w-5" />
                  Child Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 py-10">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Star className="h-5 w-5 text-app-blue" />
              <span className="font-medium">RewardRanger</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} RewardRanger. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
