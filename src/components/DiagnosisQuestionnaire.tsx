
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DiagnosisEngine } from '../utils/diagnosisEngine';

interface DiagnosisQuestionnaireProps {
  onDiagnosis: (diagnosis: string) => void;
}

const DiagnosisQuestionnaire: React.FC<DiagnosisQuestionnaireProps> = ({ onDiagnosis }) => {
  const [engine] = useState(new DiagnosisEngine());
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(engine.getBestQuestion());
  const [isComplete, setIsComplete] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);

  const handleAnswer = (answer: boolean) => {
    engine.answerQuestion(answer);
    setQuestionCount(prev => prev + 1);
    
    const diagnosis = engine.getDiagnosis();
    if (diagnosis) {
      setIsComplete(true);
      onDiagnosis(diagnosis);
      return;
    }
    
    const nextQuestion = engine.getBestQuestion();
    if (!nextQuestion && engine.getCandidateCount() > 1) {
      // No more questions but multiple candidates - take the first one
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
    setQuestionCount(0);
  };

  if (isComplete) {
    return (
      <Card className="w-full bg-white shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-medical-navy text-xl font-semibold text-center">
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
            className="border-medical-navy text-medical-navy hover:bg-medical-navy hover:text-white"
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
          <p className="text-medical-grey">No more questions available</p>
          <Button 
            onClick={resetQuestionnaire}
            className="mt-4 bg-medical-navy hover:bg-medical-black"
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
        <CardTitle className="text-medical-navy text-xl font-semibold">
          Medical Assessment
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-medical-grey">
            <span>Question {questionCount + 1}</span>
            <span>{engine.getCandidateCount()} possible diagnoses</span>
          </div>
          <Progress value={engine.getProgress()} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-medical-light p-4 rounded-lg">
          <h3 className="text-lg font-medium text-medical-black mb-2">
            {currentQuestion}
          </h3>
          <p className="text-sm text-medical-grey">
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
        
        <div className="text-xs text-medical-grey text-center">
          <p>⚠️ This is not a substitute for professional medical advice</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiagnosisQuestionnaire;
