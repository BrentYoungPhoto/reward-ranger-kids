
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
  return (
    <div className="bg-white/70 backdrop-blur-md shadow-subtle">
      <div className="container max-w-5xl mx-auto py-4 px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <Link to="/">
            <Button variant="ghost" className="flex items-center gap-1 text-sm bg-white/50 backdrop-blur-sm hover:bg-white/80">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">{title}</h1>
          <div className="w-10"></div> {/* For balance */}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
