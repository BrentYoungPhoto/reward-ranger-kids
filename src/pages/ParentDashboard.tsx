
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedPage from '@/components/AnimatedPage';
import ProfileCard from '@/components/ProfileCard';
import TaskList from '@/components/TaskList';
import { 
  users, 
  tasks, 
  rewards,
  getAllChildren,
  getTasksForChild
} from '@/utils/dummyData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Plus, 
  User, 
  CheckSquare, 
  Gift, 
  Award
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import RewardCard from '@/components/RewardCard';

const ParentDashboard = () => {
  // For demo purposes, we're using parent with ID 3
  const parent = users.find(user => user.id === '3');
  const children = getAllChildren();
  
  const [selectedChildId, setSelectedChildId] = useState(children[0]?.id || '');
  
  const childTasks = selectedChildId 
    ? getTasksForChild(selectedChildId) 
    : [];
    
  const handleAddTask = () => {
    toast.info("This would open a task creation form!");
  };
  
  const handleAddReward = () => {
    toast.info("This would open a reward creation form!");
  };

  if (!parent) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Parent not found</p>
      </div>
    );
  }

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 pb-10">
        {/* Header */}
        <div className="bg-white shadow-subtle">
          <div className="container max-w-5xl mx-auto py-4 px-4 sm:px-6">
            <div className="flex justify-between items-center">
              <Link to="/">
                <Button variant="ghost" className="flex items-center gap-1 text-sm">
                  <ArrowLeft size={16} />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-xl font-semibold">Parent Dashboard</h1>
              <div className="w-10"></div> {/* For balance */}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-6">
              <ProfileCard user={parent} />
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Child Overview</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-app-blue border-app-blue hover:bg-app-blue hover:text-white"
                    >
                      <Plus size={16} className="mr-1" />
                      Add Child
                    </Button>
                  </div>
                  <CardDescription>
                    Select a child to view and manage their tasks and rewards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {children.map(child => (
                      <motion.button
                        key={child.id}
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center gap-3 p-4 rounded-lg transition-all border ${
                          selectedChildId === child.id 
                            ? 'border-app-blue bg-app-blue/5' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedChildId(child.id)}
                      >
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img 
                            src={child.avatar} 
                            alt={child.name}
                            className="h-full w-full object-cover" 
                          />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium">{child.name}</h3>
                          <p className="text-xs text-muted-foreground">{child.totalPoints} points</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="bg-white rounded-lg shadow-subtle">
                <Tabs defaultValue="tasks" className="w-full">
                  <div className="px-6 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <TabsList>
                        <TabsTrigger value="tasks" className="flex items-center gap-1">
                          <CheckSquare size={16} />
                          <span>Tasks</span>
                        </TabsTrigger>
                        <TabsTrigger value="rewards" className="flex items-center gap-1">
                          <Gift size={16} />
                          <span>Rewards</span>
                        </TabsTrigger>
                        <TabsTrigger value="achievements" className="flex items-center gap-1">
                          <Award size={16} />
                          <span>Achievements</span>
                        </TabsTrigger>
                      </TabsList>
                      
                      <div>
                        <Button 
                          size="sm"
                          className="mr-2 bg-app-green hover:bg-app-green/90"
                          onClick={handleAddTask}
                        >
                          <Plus size={16} className="mr-1" />
                          Add Task
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          className="border-app-purple text-app-purple hover:bg-app-purple hover:text-white"
                          onClick={handleAddReward}
                        >
                          <Plus size={16} className="mr-1" />
                          Add Reward
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <TabsContent value="tasks" className="p-6 pt-0">
                    <TaskList 
                      tasks={childTasks} 
                      title={`${children.find(c => c.id === selectedChildId)?.name || 'Child'}'s Tasks`}
                    />
                  </TabsContent>
                  
                  <TabsContent value="rewards" className="p-6 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {rewards.map(reward => (
                        <RewardCard key={reward.id} reward={reward} />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="achievements" className="p-6 pt-0">
                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                      <p className="text-muted-foreground">
                        Achievement management coming soon!
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Summary</CardTitle>
                  <CardDescription>Overall progress for all children</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-app-blue/10 p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckSquare size={20} className="text-app-blue" />
                        <span>Total Tasks</span>
                      </div>
                      <span className="font-semibold">{tasks.length}</span>
                    </div>
                    
                    <div className="bg-app-green/10 p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckSquare size={20} className="text-app-green" />
                        <span>Completed</span>
                      </div>
                      <span className="font-semibold">{tasks.filter(t => t.completed).length}</span>
                    </div>
                    
                    <div className="bg-app-purple/10 p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gift size={20} className="text-app-purple" />
                        <span>Rewards Given</span>
                      </div>
                      <span className="font-semibold">{rewards.filter(r => r.claimed).length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button className="w-full bg-app-blue hover:bg-app-blue/90 justify-start">
                      <Plus size={16} className="mr-2" />
                      Add New Task
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Gift size={16} className="mr-2" />
                      Create New Reward
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <User size={16} className="mr-2" />
                      Manage Children
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ParentDashboard;
