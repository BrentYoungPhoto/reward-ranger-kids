
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from '@/utils/dummyData';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Plus, UserRoundPlus, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useIsMobile } from '@/hooks/use-mobile';

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {children.map(child => (
              <motion.div
                key={child.id}
                whileHover={{ scale: 1.02 }}
                className={`relative flex items-center gap-3 p-4 rounded-lg transition-all border ${
                  selectedChildId === child.id 
                    ? 'border-app-blue bg-app-blue/5' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <button 
                  className="flex items-center gap-3 flex-1 text-left"
                  onClick={() => onSelectChild(child.id)}
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
                </button>
                <div className="absolute top-2 right-2 flex gap-1">
                  <button 
                    className="p-1.5 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50"
                    onClick={() => onEditChild(child)}
                    aria-label={`Edit ${child.name}`}
                  >
                    <Edit size={14} className="text-gray-500" />
                  </button>
                  <button 
                    className="p-1.5 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-destructive hover:text-white hover:border-destructive"
                    onClick={(e) => handleDeleteClick(child, e)}
                    aria-label={`Delete ${child.name}`}
                  >
                    <Trash2 size={14} className="text-gray-500" />
                  </button>
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
