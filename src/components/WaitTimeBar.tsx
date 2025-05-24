
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface WaitTimeBarProps {
  aneWait: number;
  gpeWait: number;
  privateWait: number;
}

const WaitTimeBar: React.FC<WaitTimeBarProps> = ({ aneWait, gpeWait, privateWait }) => {
  const maxWait = Math.max(aneWait, gpeWait, privateWait);
  
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <Card className="w-full bg-white shadow-lg border-0">
      <CardHeader className="pb-4">
        <CardTitle className="text-medical-navy text-lg font-semibold">
          Current Average Wait Times
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-medical-black">A&E (Wellington Hospital)</span>
            <span className="text-sm text-medical-grey">{formatTime(aneWait)}</span>
          </div>
          <Progress 
            value={(aneWait / maxWait) * 100} 
            className="h-2"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-medical-black">GP (City Medical Centre)</span>
            <span className="text-sm text-medical-grey">{formatTime(gpeWait)}</span>
          </div>
          <Progress 
            value={(gpeWait / maxWait) * 100} 
            className="h-2"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-medical-black">Private (Wakefield Hospital)</span>
            <span className="text-sm text-medical-grey">{formatTime(privateWait)}</span>
          </div>
          <Progress 
            value={(privateWait / maxWait) * 100} 
            className="h-2"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default WaitTimeBar;
