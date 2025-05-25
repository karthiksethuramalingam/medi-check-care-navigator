
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HospitalWaitTime, treatmentDurations } from '../data/waitTimeData';
import { WaitTimeCalculator } from '../utils/waitTimeCalculator';

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
  const [calculator] = useState(new WaitTimeCalculator());
  const [joinedQueues, setJoinedQueues] = useState<Set<string>>(new Set());

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'public': return 'bg-green-100 text-green-800';
      case 'private': return 'bg-blue-100 text-blue-800';
      case 'gp': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  const getSeverity = (diagnosis: string) => {
    const match = treatmentDurations.find(d => diagnosis.includes(d.injuryType));
    return match ? match.severity : 'unknown';
  };

  const getSeverityBadge = (diagnosis: string) => {
    const severity = getSeverity(diagnosis);
    switch (severity) {
      case 'critical':
        return <Badge className="bg-red-600 text-white ml-2">CRITICAL</Badge>;
      case 'high':
        return <Badge className="bg-orange-600 text-white ml-2">HIGH</Badge>;
      case 'medium':
        return <Badge className="bg-blue-600 text-white ml-2">MEDIUM</Badge>;
      case 'low':
        return <Badge className="bg-yellow-600 text-white ml-2">LOW</Badge>;
      default:
        return <Badge className="bg-gray-400 text-white ml-2">UNKNOWN</Badge>;
      }
    };

  const handleJoinQueue = (hospitalName: string) => {
    const success = calculator.addToQueue(hospitalName, diagnosis);
    if (success) {
      setJoinedQueues(prev => new Set([...prev, hospitalName]));
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-blue-50 border-primary border-l-4">
        <CardHeader>
          <CardTitle className="text-primary">Diagnosis Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <p className="text-lg font-medium text-gray-900">{diagnosis}</p>
            {getSeverityBadge(diagnosis)}
          </div>
          <p className="text-sm text-gray-600 mt-2">
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
                <span className="font-bold">{fastestOption.cost}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-blue-50 shadow-lg border-gray-200">
        <CardHeader>
          <CardTitle className="text-primary">All Available Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-4 w-full overflow-x-auto">
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
                    <h3 className="font-medium text-gray-900">{hospital.hospital}</h3>
                    <Badge className={`${getTypeColor(hospital.type)} mt-1`}>
                      {hospital.type.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {hospital === fastestOption && (
                      <Badge className="bg-green-600 text-white">
                        FASTEST
                      </Badge>
                    )}
                    {joinedQueues.has(hospital.hospital) ? (
                      <Badge className="bg-primary text-white">
                        JOINED QUEUE
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleJoinQueue(hospital.hospital)}
                        className="bg-primary hover:bg-primary/90 text-white"
                      >
                        Join Queue
                      </Button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Wait Time:</span>
                    <p className="font-bold">{formatTime(hospital.waitMinutes)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Cost:</span>
                    <p className="font-bold">{hospital.cost}</p>
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
