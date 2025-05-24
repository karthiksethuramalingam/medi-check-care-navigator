
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HospitalWaitTime } from '../data/waitTimeData';

interface WaitTimeResultsProps {
  diagnosis: string;
  waitTimes: HospitalWaitTime[];
  fastestOption: HospitalWaitTime | null;
}

const WaitTimeResults: React.FC<WaitTimeResultsProps> = ({ 
  diagnosis, 
  waitTimes, 
  fastestOption 
}) => {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatCost = (cost: number) => {
    return cost === 0 ? 'Free' : `$${cost}`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'public': return 'bg-green-100 text-green-800';
      case 'private': return 'bg-blue-100 text-blue-800';
      case 'gp': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-medical-light border-medical-navy border-l-4">
        <CardHeader>
          <CardTitle className="text-medical-navy">Diagnosis Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-medium text-medical-black">{diagnosis}</p>
          <p className="text-sm text-medical-grey mt-2">
            Please consult with a healthcare professional for confirmation and treatment
          </p>
        </CardContent>
      </Card>

      {fastestOption && (
        <Card className="bg-green-50 border-green-200 border-2 glow-effect">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center space-x-2">
              <span>🚀</span>
              <span>Fastest Option</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{fastestOption.hospital}</span>
                <Badge className={getTypeColor(fastestOption.type)}>
                  {fastestOption.type.toUpperCase()}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Wait Time:</span>
                <span className="font-bold text-green-700">{formatTime(fastestOption.waitMinutes)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Estimated Cost:</span>
                <span className="font-bold">{formatCost(fastestOption.cost)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-medical-navy">All Available Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {waitTimes
              .sort((a, b) => a.waitMinutes - b.waitMinutes)
              .map((hospital, index) => (
              <div 
                key={hospital.hospital}
                className={`p-4 rounded-lg border ${
                  hospital === fastestOption 
                    ? 'border-green-300 bg-green-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-medical-black">{hospital.hospital}</h3>
                    <Badge className={`${getTypeColor(hospital.type)} mt-1`}>
                      {hospital.type.toUpperCase()}
                    </Badge>
                  </div>
                  {hospital === fastestOption && (
                    <Badge className="bg-green-600 text-white">
                      FASTEST
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Wait Time:</span>
                    <p className="font-bold">{formatTime(hospital.waitMinutes)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Cost:</span>
                    <p className="font-bold">{formatCost(hospital.cost)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitTimeResults;
