import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { avatarTypes } from "@shared/schema";
import { ArrowLeft, Rocket } from "lucide-react";

interface HeroConfirmationProps {
  avatarId: string;
  heroName: string;
  onBack: () => void;
  onStartMission: () => void;
}

export default function HeroConfirmation({ avatarId, heroName, onBack, onStartMission }: HeroConfirmationProps) {
  const avatar = avatarTypes.find(a => a.id === avatarId);
  
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="font-display text-3xl font-bold text-foreground">
          You're Ready to Start
        </h2>
        <p className="text-muted-foreground">
          Review your profile before beginning the quiz
        </p>
      </div>

      <Card className="max-w-md mx-auto p-8 space-y-6">
        <div className="text-center space-y-4">
          <div className="text-8xl">
            {avatar?.emoji}
          </div>
          
          <div className="space-y-2">
            <h3 className="font-display text-2xl font-bold text-foreground">
              {heroName}
            </h3>
            <p className="text-muted-foreground font-medium">
              {avatar?.name}
            </p>
          </div>

          <div className="flex gap-4 justify-center pt-2">
            <div className="text-center">
              <Badge variant="secondary" className="text-base px-4 py-2">
                Level 1
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">Level</p>
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="text-base px-4 py-2">
                0 XP
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">Experience</p>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-md p-4 space-y-2">
          <h4 className="font-display font-semibold text-foreground">
            About This Quiz
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Test your knowledge about global water access and learn how clean water transforms lives. 
            Each question explores a different aspect of the water crisis and charity:water's mission to end it.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={onBack}
            className="flex-1"
            data-testid="button-go-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <Button
            size="lg"
            onClick={onStartMission}
            className="flex-1 font-display font-semibold"
            data-testid="button-start-mission"
          >
            Start Quiz
          </Button>
        </div>
      </Card>
    </div>
  );
}
