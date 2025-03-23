
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  title, 
  subtitle,
  className,
  children
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
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
