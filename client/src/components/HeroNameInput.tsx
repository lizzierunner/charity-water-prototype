import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { presetNames } from "@shared/schema";

interface HeroNameInputProps {
  heroName: string;
  onNameChange: (name: string) => void;
  onContinue: () => void;
}

export default function HeroNameInput({ heroName, onNameChange, onContinue }: HeroNameInputProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-display text-3xl font-bold text-foreground">
          Choose Your Name
        </h2>
        <p className="text-muted-foreground">
          How would you like to be called?
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Your Hero Name</label>
          <Input
            type="text"
            placeholder="Enter your hero name..."
            value={heroName}
            onChange={(e) => onNameChange(e.target.value)}
            className="text-lg h-12"
            data-testid="input-hero-name"
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground text-center">
            Or choose from these suggestions:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {presetNames.map((name) => (
              <Badge
                key={name}
                variant="secondary"
                className="cursor-pointer text-base px-4 py-2 hover-elevate active-elevate-2"
                onClick={() => onNameChange(name)}
                data-testid={`badge-preset-${name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {name}
              </Badge>
            ))}
          </div>
        </div>

        <Button
          size="lg"
          className="w-full font-display font-semibold"
          onClick={onContinue}
          disabled={!heroName.trim()}
          data-testid="button-continue"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
