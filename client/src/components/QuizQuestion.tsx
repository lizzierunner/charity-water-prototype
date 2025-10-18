import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, X } from "lucide-react";
import { useState, useEffect } from "react";

interface QuizQuestionProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  onAnswer: (selectedIndex: number, isCorrect: boolean) => void;
}

export default function QuizQuestion({
  questionNumber,
  totalQuestions,
  question,
  options,
  correctAnswerIndex,
  onAnswer,
}: QuizQuestionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedIndex(null);
    setRevealed(false);
  }, [questionNumber]);

  const handleSelect = (index: number) => {
    if (revealed) return;
    
    setSelectedIndex(index);
    setRevealed(true);
    const isCorrect = index === correctAnswerIndex;
    
    setTimeout(() => {
      onAnswer(index, isCorrect);
    }, 1500);
  };

  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-sm" data-testid="text-question-number">
            Question {questionNumber} of {totalQuestions}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="p-8 space-y-6">
        <h3 className="font-display text-2xl font-bold text-foreground leading-tight">
          {question}
        </h3>

        <div className="space-y-3">
          {options.map((option, index) => {
            const isSelected = selectedIndex === index;
            const isCorrect = index === correctAnswerIndex;
            const showCorrect = revealed && isCorrect;
            const showIncorrect = revealed && isSelected && !isCorrect;

            return (
              <Button
                key={index}
                variant={showCorrect ? "default" : showIncorrect ? "destructive" : "outline"}
                className={`w-full justify-start text-left h-auto py-4 px-6 font-medium transition-all ${
                  !revealed ? 'hover-elevate active-elevate-2' : ''
                } ${isSelected && !revealed ? 'ring-2 ring-ring' : ''}`}
                onClick={() => handleSelect(index)}
                disabled={revealed}
                data-testid={`button-answer-${index}`}
              >
                <span className="flex items-center gap-3 w-full">
                  {showCorrect && <Check className="w-5 h-5 flex-shrink-0" />}
                  {showIncorrect && <X className="w-5 h-5 flex-shrink-0" />}
                  <span className="flex-1">{option}</span>
                </span>
              </Button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
