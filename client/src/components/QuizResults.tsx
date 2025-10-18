import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { avatarTypes } from "@shared/schema";
import { Trophy, Target, Zap, RotateCcw, ExternalLink, AlertCircle } from "lucide-react";
import { useEffect } from "react";
import confetti from "canvas-confetti";

interface QuizResultsProps {
  avatarId: string;
  heroName: string;
  score: number;
  totalQuestions: number;
  finalLevel: number;
  totalXp: number;
  penalties: number;
  onPlayAgain: () => void;
  onLearnMore: () => void;
}

export default function QuizResults({
  avatarId,
  heroName,
  score,
  totalQuestions,
  finalLevel,
  totalXp,
  penalties,
  onPlayAgain,
  onLearnMore,
}: QuizResultsProps) {
  const avatar = avatarTypes.find(a => a.id === avatarId);
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getRanking = () => {
    if (percentage >= 90) return { title: "Water Champion", icon: Trophy, color: "text-chart-4" };
    if (percentage >= 70) return { title: "Water Guardian", icon: Target, color: "text-accent" };
    if (percentage >= 50) return { title: "Water Warrior", icon: Zap, color: "text-secondary" };
    return { title: "Water Explorer", icon: Trophy, color: "text-primary" };
  };

  const ranking = getRanking();

  // CELEBRATE WINS: Confetti animation for high scores
  useEffect(() => {
    if (percentage >= 70) {
      // Trigger confetti for 70% or higher scores
      const duration = percentage >= 90 ? 3000 : 2000;
      const end = Date.now() + duration;

      const colors = ['#FFC845', '#1A5F7A', '#57C5B6'];

      (function frame() {
        confetti({
          particleCount: percentage >= 90 ? 5 : 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: percentage >= 90 ? 5 : 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, [percentage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="font-display text-5xl font-black text-foreground">
            Quiz Complete!
          </h1>
          <div className="text-7xl font-display font-black text-primary" data-testid="text-final-score">
            {score}/{totalQuestions}
          </div>
        </div>

        <Card className="p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">
              {avatar?.emoji}
            </div>
            <div className="space-y-1">
              <h2 className="font-display text-2xl font-bold text-foreground">
                {heroName}
              </h2>
              <p className="text-muted-foreground">{avatar?.name}</p>
              <Badge variant="secondary" className="text-base">
                Final Level: {finalLevel}
              </Badge>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 space-y-4">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <ranking.icon className={`w-16 h-16 ${ranking.color}`} />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">
                {ranking.title}
              </h3>
              <p className="text-muted-foreground">
                {percentage >= 90 && "You've mastered the art of water knowledge!"}
                {percentage >= 70 && percentage < 90 && "Excellent work protecting our water!"}
                {percentage >= 50 && percentage < 70 && "Great effort on your water journey!"}
                {percentage < 50 && "Every journey begins with a single drop!"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="p-4 text-center space-y-2 bg-muted/30">
              <Zap className="w-8 h-8 text-accent mx-auto" />
              <p className="font-display text-3xl font-bold text-foreground tabular-nums" data-testid="text-total-xp">
                {totalXp}
              </p>
              <p className="text-sm text-muted-foreground">Total XP</p>
            </Card>

            <Card className="p-4 text-center space-y-2 bg-muted/30">
              <Target className="w-8 h-8 text-secondary mx-auto" />
              <p className="font-display text-3xl font-bold text-foreground tabular-nums">
                {score}
              </p>
              <p className="text-sm text-muted-foreground">Correct</p>
            </Card>

            <Card className="p-4 text-center space-y-2 bg-muted/30">
              <Trophy className="w-8 h-8 text-primary mx-auto" />
              <p className="font-display text-3xl font-bold text-foreground tabular-nums">
                {totalQuestions}
              </p>
              <p className="text-sm text-muted-foreground">Total</p>
            </Card>

            <Card className={`p-4 text-center space-y-2 ${penalties > 0 ? 'bg-destructive/10' : 'bg-muted/30'}`}>
              <AlertCircle className={`w-8 h-8 mx-auto ${penalties > 0 ? 'text-destructive' : 'text-muted-foreground'}`} />
              <p className={`font-display text-3xl font-bold tabular-nums ${penalties > 0 ? 'text-destructive' : 'text-foreground'}`} data-testid="text-penalties">
                {penalties}
              </p>
              <p className="text-sm text-muted-foreground">Penalties</p>
            </Card>
          </div>
        </Card>

        <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/5 to-accent/5">
          <h3 className="font-display text-xl font-bold text-foreground text-center">
            Share Your Results
          </h3>
          <p className="text-center text-muted-foreground text-sm">
            Share your knowledge and help spread awareness about the global water crisis
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" size="lg" className="hover-elevate" data-testid="button-share-twitter">
              Share on Twitter
            </Button>
            <Button variant="outline" size="lg" className="hover-elevate" data-testid="button-share-facebook">
              Share on Facebook
            </Button>
            <Button variant="outline" size="lg" className="hover-elevate" data-testid="button-copy-result">
              Copy Result
            </Button>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={onPlayAgain}
            className="font-display font-semibold"
            data-testid="button-play-again"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onLearnMore}
            data-testid="button-learn-more"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Learn More About charity:water
          </Button>
        </div>
      </div>
    </div>
  );
}
