
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HospitalWaitTime } from '../data/waitTimeData';
import { Clock, DollarSign } from 'lucide-react';

interface HospitalGridProps {
  waitTimes: HospitalWaitTime[];
  fastestOption: HospitalWaitTime | null;
}

const HospitalGrid: React.FC<HospitalGridProps> = ({ waitTimes, fastestOption }) => {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'public': return 'bg-green-100 text-green-800 border-green-200';
      case 'private': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'gp': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const sortedHospitals = [...waitTimes].sort((a, b) => a.waitMinutes - b.waitMinutes);

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-primary mb-4">Hospital Wait Times Comparison</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {sortedHospitals.map((hospital, index) => (
          <Card 
            key={hospital.hospital}
            className={`relative transition-all duration-200 hover:shadow-lg ${
              hospital === fastestOption 
                ? 'ring-2 ring-primary bg-gradient-to-br from-blue-50 to-white' 
                : 'hover:shadow-md'
            }`}
          >
            {hospital === fastestOption && (
              <div className="absolute -top-2 -right-2 z-10">
                <Badge className="bg-primary text-white shadow-lg">
                  FASTEST
                </Badge>
              </div>
            )}
            
            <CardContent className="p-4 space-y-3">
              <div>
                <h4 className="font-medium text-sm text-gray-900 leading-tight">
                  {hospital.hospital}
                </h4>
                <Badge className={`mt-1 text-xs ${getTypeColor(hospital.type)}`}>
                  {hospital.type.toUpperCase()}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">
                    {formatTime(hospital.waitMinutes)}
                  </span>
                </div>
                
                <div className="flex items-start space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-gray-600 leading-tight">
                    {hospital.cost}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HospitalGrid;
