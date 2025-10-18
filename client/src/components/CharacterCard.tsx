import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { avatarTypes } from "@shared/schema";

interface CharacterCardProps {
  avatarId: string;
  heroName: string;
  level: number;
  xp: number;
  currentQuestion?: number;
  totalQuestions?: number;
}

export default function CharacterCard({ 
  avatarId, 
  heroName, 
  level, 
  xp,
  currentQuestion,
  totalQuestions 
}: CharacterCardProps) {
  const avatar = avatarTypes.find(a => a.id === avatarId);
  const xpForNextLevel = level * 100;
  const xpProgress = (xp % 100);
  
  return (
    <Card className="p-6 space-y-4">
      <div className="text-center space-y-3">
        <div className="text-6xl">
          {avatar?.emoji}
        </div>
        
        <div className="space-y-1">
          <h3 className="font-display text-xl font-bold text-foreground" data-testid="text-hero-name">
            {heroName}
          </h3>
          <p className="text-sm text-muted-foreground">
            {avatar?.name}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Level {level}</span>
            <span className="text-muted-foreground">{xp} XP</span>
          </div>
          <Progress value={xpProgress} className="h-2" />
        </div>

        {currentQuestion !== undefined && totalQuestions !== undefined && (
          <Badge variant="secondary" className="text-sm" data-testid="text-progress">
            Progress: {currentQuestion}/{totalQuestions}
          </Badge>
        )}
      </div>
    </Card>
  );
}
