
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DiagnosisEngine } from '../utils/diagnosisEngine';

interface DiagnosisQuestionnaireProps {
  onDiagnosis: (diagnosis: string) => void;
}

const DiagnosisQuestionnaire: React.FC<DiagnosisQuestionnaireProps> = ({ onDiagnosis }) => {
  const [engine] = useState(new DiagnosisEngine());
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(engine.getBestQuestion());
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (answer: boolean) => {
    engine.answerQuestion(answer);
    
    const diagnosis = engine.getDiagnosis();
    if (diagnosis) {
      setIsComplete(true);
      onDiagnosis(diagnosis);
      return;
    }
    
    const nextQuestion = engine.getBestQuestion();
    if (!nextQuestion && engine.getCandidateCount() > 1) {
      const finalDiagnosis = "Multiple possible diagnoses - recommend professional evaluation";
      setIsComplete(true);
      onDiagnosis(finalDiagnosis);
    } else {
      setCurrentQuestion(nextQuestion);
    }
  };

  const resetQuestionnaire = () => {
    engine.reset();
    setCurrentQuestion(engine.getBestQuestion());
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <Card className="w-full bg-white shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-primary text-xl font-semibold text-center">
            Assessment Complete
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-green-600 font-medium">
            Diagnosis generated successfully!
          </p>
          <Button 
            onClick={resetQuestionnaire}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            Start New Assessment
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!currentQuestion) {
    return (
      <Card className="w-full bg-white shadow-lg border-0">
        <CardContent className="text-center py-8">
          <p className="text-gray-600">No more questions available</p>
          <Button 
            onClick={resetQuestionnaire}
            className="mt-4 bg-primary hover:bg-primary/90"
          >
            Restart Assessment
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-primary text-xl font-semibold">
          Medical Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {currentQuestion}
          </h3>
          <p className="text-sm text-gray-600">
            Please answer based on your current symptoms
          </p>
        </div>
        
        <div className="flex space-x-4">
          <Button 
            onClick={() => handleAnswer(true)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3"
          >
            Yes
          </Button>
          <Button 
            onClick={() => handleAnswer(false)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3"
          >
            No
          </Button>
        </div>
        
        <div className="text-xs text-gray-500 text-center">
          <p>⚠️ This is not a substitute for professional medical advice</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiagnosisQuestionnaire;
