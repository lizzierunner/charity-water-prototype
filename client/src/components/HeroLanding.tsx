import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Droplet, Users, Waves } from "lucide-react";

interface HeroLandingProps {
  onStartMission: () => void;
}

export default function HeroLanding({ onStartMission }: HeroLandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-accent">
      <div className="container mx-auto px-6 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="font-display text-5xl lg:text-7xl font-black text-primary-foreground leading-tight">
              H2O Hero Quiz
            </h1>
            <p className="font-display text-2xl lg:text-3xl font-medium text-primary-foreground/95">
              Test your knowledge. Create real impact.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-full p-8 border-4 border-primary-foreground/30">
              <Waves className="w-20 h-20 text-primary-foreground" />
            </div>
          </div>

          <p className="text-lg lg:text-xl text-primary-foreground/95 max-w-2xl mx-auto leading-relaxed">
            Join charity:water's mission to end the global water crisis.
            Answer quiz questions, learn about clean water access, and discover how you can help create lasting change.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto pt-4">
            <Card className="bg-primary-foreground/95 backdrop-blur-sm p-8 space-y-2 hover-elevate border-2 border-primary-foreground/20">
              <Users className="w-10 h-10 text-destructive mx-auto" />
              <p className="font-display text-4xl font-extrabold text-foreground tabular-nums">
                771M
              </p>
              <p className="text-muted-foreground font-medium">
                People without clean water
              </p>
            </Card>

            <Card className="bg-primary-foreground/95 backdrop-blur-sm p-8 space-y-2 hover-elevate border-2 border-primary-foreground/20">
              <Droplet className="w-10 h-10 text-destructive mx-auto" />
              <p className="font-display text-4xl font-extrabold text-foreground tabular-nums">
                2.2B
              </p>
              <p className="text-muted-foreground font-medium">
                People without basic sanitation
              </p>
            </Card>
          </div>

          <div className="pt-6">
            <Button
              size="lg"
              className="text-xl font-display font-bold px-12 py-8 h-auto shadow-xl"
              onClick={onStartMission}
              data-testid="button-start-mission"
            >
              Start Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
