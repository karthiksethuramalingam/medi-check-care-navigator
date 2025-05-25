
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import WaitTimeBar from '../components/WaitTimeBar';
import DiagnosisQuestionnaire from '../components/DiagnosisQuestionnaire';
import WaitTimeResults from '../components/WaitTimeResults';
import { WaitTimeCalculator } from '../utils/waitTimeCalculator';
import { HospitalWaitTime, liveWaitTimes } from '../data/waitTimeData';

const Index = () => {
  const [waitCalculator] = useState(new WaitTimeCalculator());
  const [currentDiagnosis, setCurrentDiagnosis] = useState<string | null>(null);
  const [waitTimes, setWaitTimes] = useState<HospitalWaitTime[]>([]);
  const [fastestOption, setFastestOption] = useState<HospitalWaitTime | null>(null);
  
  // Use live wait times
  const [currentWaitTimes, setCurrentWaitTimes] = useState({
    ane: liveWaitTimes["Wellington Hospital"],
    gpe: liveWaitTimes["City Medical Centre"],
    private: liveWaitTimes["Wakefield Hospital"]
  });

  useEffect(() => {
    // Simulate minor wait time fluctuations
    const interval = setInterval(() => {
      setCurrentWaitTimes(prev => ({
        ane: Math.max(60, prev.ane + Math.floor(Math.random() * 11) - 5),
        gpe: Math.max(30, prev.gpe + Math.floor(Math.random() * 11) - 5),
        private: Math.max(15, prev.private + Math.floor(Math.random() * 11) - 5)
      }));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleDiagnosis = (diagnosis: string) => {
    console.log('Diagnosis received:', diagnosis);
    setCurrentDiagnosis(diagnosis);
    
    const calculatedWaitTimes = waitCalculator.calculateWaitTimes(diagnosis);
    console.log('Calculated wait times:', calculatedWaitTimes);
    
    setWaitTimes(calculatedWaitTimes);
    const fastest = waitCalculator.getFastestOption(calculatedWaitTimes);
    setFastestOption(fastest);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Wait Time Bar */}
          <div className="lg:col-span-1">
            <WaitTimeBar 
              aneWait={currentWaitTimes.ane}
              gpeWait={currentWaitTimes.gpe}
              privateWait={currentWaitTimes.private}
            />
          </div>
          
          {/* Center Column - Diagnosis Questionnaire */}
          <div className="lg:col-span-1">
            <DiagnosisQuestionnaire onDiagnosis={handleDiagnosis} />
          </div>
          
          {/* Right Column - Results */}
          <div className="lg:col-span-1">
            {currentDiagnosis && waitTimes.length > 0 ? (
              <WaitTimeResults 
                diagnosis={currentDiagnosis}
                waitTimes={waitTimes}
                fastestOption={fastestOption}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="text-gray-600">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏥</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Complete Assessment
                  </h3>
                  <p className="text-sm">
                    Answer the medical questions to get personalized wait time comparisons and cost estimates
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600 text-sm">
          <div className="border-t border-gray-200 pt-8">
            <p className="mb-2">
              <strong>Disclaimer:</strong> This tool is for informational purposes only and does not constitute medical advice.
            </p>
            <p>
              Always consult with a qualified healthcare professional for proper diagnosis and treatment.
            </p>
            <p className="mt-4 text-xs">
              © 2024 Medi-Check.com - Wellington Healthcare Navigator
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
