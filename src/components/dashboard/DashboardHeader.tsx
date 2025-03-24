
import React from 'react';
import SettingsMenu from './SettingsMenu';

interface DashboardHeaderProps {
  title: string;
  userId?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, userId = '0' }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b sticky top-0 z-10">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          {userId && <SettingsMenu userId={userId} />}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
