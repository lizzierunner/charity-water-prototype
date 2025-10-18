import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export default function StepIndicator({ currentStep, totalSteps, stepLabels }: StepIndicatorProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between relative">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={stepNumber} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                {index > 0 && (
                  <div 
                    className={`h-0.5 flex-1 -ml-2 ${
                      isCompleted ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                )}
                
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm border-2 transition-colors ${
                    isCompleted 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : isCurrent
                      ? 'bg-background border-primary text-primary'
                      : 'bg-background border-border text-muted-foreground'
                  }`}
                  data-testid={`step-${stepNumber}`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
                </div>
                
                {index < totalSteps - 1 && (
                  <div 
                    className={`h-0.5 flex-1 -mr-2 ${
                      isCompleted ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                )}
              </div>
              
              <p className={`text-xs mt-2 font-medium ${
                isCurrent ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
