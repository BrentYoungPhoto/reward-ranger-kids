
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from '@/utils/dummyData';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Plus, UserRoundPlus, Trash2, LogIn } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface ChildOverviewProps {
  children: User[];
  selectedChildId: string;
  onSelectChild: (id: string) => void;
  onAddChild: () => void;
  onEditChild: (child: User) => void;
  onDeleteChild: (childId: string) => void;
}

const ChildOverview: React.FC<ChildOverviewProps> = ({ 
  children, 
  selectedChildId, 
  onSelectChild,
  onAddChild,
  onEditChild,
  onDeleteChild
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [childToDelete, setChildToDelete] = useState<User | null>(null);
  const isMobile = useIsMobile();

  const handleDeleteClick = (child: User, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent child selection when clicking delete
    setChildToDelete(child);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (childToDelete) {
      onDeleteChild(childToDelete.id);
      setDeleteDialogOpen(false);
      setChildToDelete(null);
    }
  };

  // Get emoji for the mood
  const getMoodEmoji = (mood?: string) => {
    switch (mood) {
      case 'happy': return '😊';
      case 'excited': return '🤩';
      case 'calm': return '😌';
      case 'tired': return '😴';
      case 'bored': return '🥱';
      default: return null;
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Child Overview</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              className="text-app-blue border-app-blue hover:bg-app-blue hover:text-white"
              onClick={onAddChild}
            >
              <UserRoundPlus size={16} className="mr-1" />
              Add Child
            </Button>
          </div>
          <CardDescription>
            Select a child to view and manage their tasks and rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {children.map(child => (
              <motion.div
                key={child.id}
                whileHover={{ scale: 1.02 }}
                className={`overflow-hidden rounded-lg transition-all border shadow-subtle ${
                  selectedChildId === child.id 
                    ? 'border-app-blue border-2 bg-app-blue/5' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div 
                  className="cursor-pointer"
                  onClick={() => onSelectChild(child.id)}
                >
                  {/* Header with avatar, name, and mood */}
                  <div className="p-4 flex items-center gap-3">
                    <Avatar className="h-14 w-14 border-2 border-gray-200">
                      <AvatarImage src={child.avatar} alt={child.name} />
                      <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{child.name}</h3>
                        {child.mood && getMoodEmoji(child.mood) && (
                          <span title={`Mood: ${child.mood}`} className="text-xl">
                            {getMoodEmoji(child.mood)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                        <span className="font-medium text-app-blue">{child.totalPoints} points</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Action buttons */}
                  <div className="p-3 bg-gray-50 flex items-center justify-end gap-2">
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-gray-600 hover:text-app-blue hover:bg-app-blue/10"
                      asChild
                    >
                      <Link to={`/child/${child.id}`}>
                        <LogIn size={16} className="mr-1" />
                        <span>View Dashboard</span>
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-gray-600 hover:text-app-blue hover:bg-app-blue/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditChild(child);
                      }}
                    >
                      <Edit size={16} className="mr-1" />
                      <span>Edit</span>
                    </Button>
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-gray-600 hover:text-destructive hover:bg-destructive/10"
                      onClick={(e) => handleDeleteClick(child, e)}
                    >
                      <Trash2 size={16} className="mr-1" />
                      <span>Delete</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {childToDelete?.name}'s profile along with all their tasks, points, and achievements. 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ChildOverview;
