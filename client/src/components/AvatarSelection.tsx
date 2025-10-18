import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { avatarTypes } from "@shared/schema";
import { useState } from "react";

interface AvatarSelectionProps {
  onSelect: (avatarId: string) => void;
  selectedAvatarId?: string;
}

export default function AvatarSelection({ onSelect, selectedAvatarId }: AvatarSelectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-display text-3xl font-bold text-foreground">
          Choose Your Avatar
        </h2>
        <p className="text-muted-foreground">
          Select an avatar to represent you on your learning journey
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {avatarTypes.map((avatar) => {
          const isSelected = selectedAvatarId === avatar.id;
          const isHovered = hoveredId === avatar.id;
          
          return (
            <Card
              key={avatar.id}
              className={`p-6 cursor-pointer transition-all duration-200 hover-elevate active-elevate-2 ${
                isSelected 
                  ? 'ring-4 ring-ring border-primary' 
                  : 'border-card-border'
              }`}
              onClick={() => onSelect(avatar.id)}
              onMouseEnter={() => setHoveredId(avatar.id)}
              onMouseLeave={() => setHoveredId(null)}
              data-testid={`card-avatar-${avatar.id}`}
            >
              <div className="space-y-3 text-center">
                <div className={`text-6xl transition-transform ${isHovered ? 'scale-110' : 'scale-100'}`}>
                  {avatar.emoji}
                </div>
                <p className={`font-display font-semibold ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                  {avatar.name}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
