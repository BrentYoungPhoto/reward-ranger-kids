
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { User } from '@/utils/dummyData';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { Image, UserRoundPlus, UserRoundCog } from 'lucide-react';

const childFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  age: z.coerce.number().min(1, { message: "Age must be at least 1" }).max(18, { message: "Age must be under 18" }),
  totalPoints: z.coerce.number().optional(),
  displayName: z.string().optional(),
});

type ChildFormValues = z.infer<typeof childFormSchema>;

interface ChildFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (child: Partial<User>) => void;
  child?: User;
}

const ChildForm: React.FC<ChildFormProps> = ({ isOpen, onClose, onSave, child }) => {
  const [avatar, setAvatar] = useState<string>(child?.avatar || 'https://i.pravatar.cc/150?img=15');
  const isEditing = !!child;

  const form = useForm<ChildFormValues>({
    resolver: zodResolver(childFormSchema),
    defaultValues: {
      name: child?.name || '',
      age: child?.age || 8,
      totalPoints: child?.totalPoints || 0,
      displayName: child?.displayName || '',
    }
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, we would upload this to a server
      // For demo, we'll create a temporary URL
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  const onSubmit = (data: ChildFormValues) => {
    const updatedChild: Partial<User> = {
      ...data,
      avatar,
      role: 'child',
      id: child?.id,
    };
    
    onSave(updatedChild);
    toast.success(isEditing ? 'Child updated successfully!' : 'Child added successfully!');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEditing ? (
              <>
                <UserRoundCog className="h-5 w-5" />
                Edit Child Profile
              </>
            ) : (
              <>
                <UserRoundPlus className="h-5 w-5" />
                Add New Child
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Update your child's profile information below."
              : "Fill in the details to add a new child to your account."}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex gap-6">
              <div className="w-1/3">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-gray-200">
                    <img src={avatar} alt="Avatar" className="h-full w-full object-cover" />
                  </div>
                  <Button variant="outline" size="sm" className="mt-2 w-full" asChild>
                    <label>
                      <Image className="mr-2 h-4 w-4" />
                      Change Photo
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Child's full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} max={18} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="totalPoints"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Starting Points</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Nickname or preferred name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
              <Button type="submit">{isEditing ? 'Save Changes' : 'Add Child'}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChildForm;
