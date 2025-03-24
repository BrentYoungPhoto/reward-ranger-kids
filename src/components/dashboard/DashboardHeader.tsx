
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Settings } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
  onToggleDarkMode?: () => void;
  darkMode?: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  title, 
  subtitle,
  className,
  children,
  onToggleDarkMode,
  darkMode
}) => {
  return (
    <div className={cn(
      "bg-white border-b border-gray-200 shadow-sm",
      className
    )}>
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-4">
            {onToggleDarkMode && (
              <Menubar className="border-none bg-transparent">
                <MenubarMenu>
                  <MenubarTrigger className="p-2 hover:bg-gray-100 rounded-full">
                    <Settings className="h-5 w-5 text-gray-500" />
                  </MenubarTrigger>
                  <MenubarContent align="end">
                    <MenubarItem className="flex items-center justify-between cursor-default">
                      <span>Dark Mode</span>
                      <Switch
                        checked={darkMode}
                        onCheckedChange={onToggleDarkMode}
                      />
                    </MenubarItem>
                    <MenubarItem>
                      Notification Settings
                    </MenubarItem>
                    <MenubarItem>
                      Account Settings
                    </MenubarItem>
                    <MenubarItem>
                      Help & Support
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
