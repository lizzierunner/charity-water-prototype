import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface ImpactStoryProps {
  title: string;
  story: string;
  location: string;
  icon: string;
  onContinue: () => void;
}

export default function ImpactStory({ title, story, location, icon, onContinue }: ImpactStoryProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 to-background flex items-center justify-center p-6">
      <Card className="max-w-3xl w-full p-8 lg:p-12 space-y-6">
        <div className="text-center space-y-4">
          <div className="text-6xl">
            {icon}
          </div>
          
          <div className="space-y-2">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Real Impact Story
            </h2>
            <p className="text-sm font-medium text-muted-foreground">
              {location}
            </p>
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-6 space-y-4">
          <h3 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
            <Heart className="w-5 h-5 text-destructive" />
            {title}
          </h3>
          <p className="text-base text-foreground/90 leading-relaxed">
            {story}
          </p>
        </div>

        <div className="text-center pt-4">
          <Button
            size="lg"
            onClick={onContinue}
            className="font-display font-semibold px-8"
            data-testid="button-continue-mission"
          >
            Continue Quiz
          </Button>
        </div>
      </Card>
    </div>
  );
}
