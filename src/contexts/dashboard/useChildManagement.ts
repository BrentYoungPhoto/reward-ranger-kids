
import { useState } from 'react';
import { toast } from 'sonner';
import { User, getAllChildren } from '@/utils/dummyData';

export function useChildManagement() {
  const [allChildren, setChildren] = useState(getAllChildren());
  const [childFormOpen, setChildFormOpen] = useState(false);
  const [childToEdit, setChildToEdit] = useState<User | undefined>(undefined);

  const handleAddChild = () => {
    setChildToEdit(undefined);
    setChildFormOpen(true);
  };

  const handleEditChild = (child: User) => {
    setChildToEdit(child);
    setChildFormOpen(true);
  };

  const handleDeleteChild = (childId: string) => {
    // Remove the child from the children array
    setChildren(prev => prev.filter(child => child.id !== childId));
    
    // Return the remaining children for additional processing in the main context
    const remainingChildren = allChildren.filter(child => child.id !== childId);
    toast.success('Child deleted successfully');
    
    return { remainingChildren };
  };

  const handleSaveChild = (childData: Partial<User>) => {
    if (childData.id) {
      // Update existing child
      setChildren(prev => 
        prev.map(child => 
          child.id === childData.id 
            ? { ...child, ...childData } 
            : child
        )
      );
      toast.success(`Updated ${childData.name}'s profile`);
    } else {
      // Add new child
      const newChild: User = {
        id: `child-${Date.now()}`,
        name: childData.name || 'New Child',
        role: 'child',
        avatar: childData.avatar || 'https://i.pravatar.cc/150?img=15',
        age: childData.age || 8,
        totalPoints: childData.totalPoints || 0,
        displayName: childData.displayName,
        mood: 'happy',
        theme: 'default',
      };
      
      setChildren(prev => [...prev, newChild]);
      toast.success(`Added new child: ${newChild.name}`);
      
      return { newChild };
    }
  };

  return {
    allChildren,
    childFormOpen,
    childToEdit,
    setChildFormOpen,
    handleAddChild,
    handleEditChild,
    handleDeleteChild,
    handleSaveChild
  };
}
