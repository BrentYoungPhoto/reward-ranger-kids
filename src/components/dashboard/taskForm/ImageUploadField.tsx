
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { TaskFormValues } from './taskFormSchema';
import { Image, X, Upload } from 'lucide-react';

interface ImageUploadFieldProps {
  form: UseFormReturn<TaskFormValues>;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({ form }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(form.getValues().imageURL || null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
      form.setValue('imageURL', result, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    form.setValue('imageURL', undefined, { shouldValidate: true });
  };

  return (
    <FormField
      control={form.control}
      name="imageURL"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Task Image (Optional)</FormLabel>
          <FormControl>
            <div className="space-y-2">
              {previewUrl ? (
                <div className="relative w-full">
                  <img 
                    src={previewUrl} 
                    alt="Task preview" 
                    className="h-36 w-full object-cover rounded-md" 
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full"
                    onClick={handleRemoveImage}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Drag and drop an image or click to browse
                      </p>
                    </div>
                    <input 
                      id="image-upload" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ImageUploadField;
