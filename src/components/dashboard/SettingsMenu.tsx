
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { 
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Switch } from '@/components/ui/switch';
import { Toggle } from '@/components/ui/toggle';
import { useTheme } from '@/hooks/useTheme';
import { Settings, Moon, Sun } from 'lucide-react';

interface SettingsMenuProps {
  userId: string;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ userId }) => {
  const { theme, setTheme } = useTheme();

  return (
    <Menubar className="border-none bg-transparent p-0">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer px-2 data-[state=open]:bg-app-blue data-[state=open]:text-white rounded-md">
          <Settings size={18} className="mr-1" />
          <span>Settings</span>
        </MenubarTrigger>
        <MenubarContent className="min-w-[240px]">
          <div className="px-3 py-2 text-sm font-medium border-b">
            Parent Settings
          </div>
          
          <div className="px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {theme === 'dark' ? (
                <Moon size={16} className="text-app-blue" />
              ) : (
                <Sun size={16} className="text-app-yellow" />
              )}
              <span>Dark Mode</span>
            </div>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </div>
          
          <MenubarSeparator />
          
          <MenubarItem>
            <span className="text-sm">Account Settings</span>
          </MenubarItem>
          
          <MenubarItem>
            <span className="text-sm">Notification Preferences</span>
          </MenubarItem>
          
          <MenubarSeparator />
          
          <MenubarItem className="text-red-500">
            <span className="text-sm">Sign Out</span>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default SettingsMenu;
