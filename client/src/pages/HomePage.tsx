import { useState } from "react";
import HeroLanding from "@/components/HeroLanding";
import AvatarSelection from "@/components/AvatarSelection";
import HeroNameInput from "@/components/HeroNameInput";
import HeroConfirmation from "@/components/HeroConfirmation";
import QuizQuestion from "@/components/QuizQuestion";
import CharacterCard from "@/components/CharacterCard";
import ImpactStory from "@/components/ImpactStory";
import QuizResults from "@/components/QuizResults";
import StepIndicator from "@/components/StepIndicator";
import { Button } from "@/components/ui/button";
import { RotateCcw, AlertCircle } from "lucide-react";
import { quizQuestions, impactStories } from "@/lib/quizData";
import type { Hero } from "@shared/schema";

type GameState = 
  | "landing"
  | "avatar-selection"
  | "name-input"
  | "confirmation"
  | "quiz"
  | "impact-story"
  | "results";

export default function HomePage() {
  const [gameState, setGameState] = useState<GameState>("landing");
  const [hero, setHero] = useState<Hero>({
    avatarId: "",
    heroName: "",
    level: 1,
    xp: 0,
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [penalties, setPenalties] = useState(0);
  const [showImpactStory, setShowImpactStory] = useState(false);
  const [impactStoryIndex, setImpactStoryIndex] = useState(0);

  const resetGame = () => {
    setGameState("landing");
    setHero({ avatarId: "", heroName: "", level: 1, xp: 0 });
    setCurrentQuestionIndex(0);
    setScore(0);
    setPenalties(0);
    setShowImpactStory(false);
    setImpactStoryIndex(0);
  };

  const handleStartMission = () => {
    setGameState("avatar-selection");
  };

  const handleAvatarSelect = (avatarId: string) => {
    setHero({ ...hero, avatarId });
  };

  const handleNameContinue = () => {
    setGameState("confirmation");
  };

  const handleConfirmationBack = () => {
    setGameState("name-input");
  };

  const handleStartQuiz = () => {
    setGameState("quiz");
  };

  const handleAnswer = (selectedIndex: number, isCorrect: boolean) => {
    if (isCorrect) {
      const question = quizQuestions[currentQuestionIndex];
      setScore(score + 1);
      setHero({
        ...hero,
        xp: hero.xp + question.xpReward,
        level: Math.floor((hero.xp + question.xpReward) / 100) + 1,
      });
    } else {
      // CHALLENGE MECHANIC: Penalty for wrong answers - lose 20 XP
      const xpPenalty = 20;
      setPenalties(penalties + 1);
      setHero({
        ...hero,
        xp: Math.max(0, hero.xp - xpPenalty),
        level: Math.max(1, Math.floor(Math.max(0, hero.xp - xpPenalty) / 100) + 1),
      });
    }

    setTimeout(() => {
      const shouldShowImpactStory = 
        (currentQuestionIndex + 1) % 3 === 0 && 
        currentQuestionIndex + 1 < quizQuestions.length;

      if (shouldShowImpactStory) {
        setShowImpactStory(true);
        setImpactStoryIndex(Math.floor((currentQuestionIndex + 1) / 3) - 1);
        setGameState("impact-story");
      } else if (currentQuestionIndex + 1 < quizQuestions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setGameState("results");
      }
    }, 1500);
  };

  const handleContinueFromImpact = () => {
    setShowImpactStory(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setGameState("quiz");
  };

  const handleLearnMore = () => {
    window.open("https://www.charitywater.org", "_blank");
  };

  const getCreationStep = () => {
    if (gameState === "avatar-selection") return 1;
    if (gameState === "name-input") return 2;
    if (gameState === "confirmation") return 3;
    return 0;
  };

  if (gameState === "landing") {
    return <HeroLanding onStartMission={handleStartMission} />;
  }

  if (gameState === "avatar-selection" || gameState === "name-input" || gameState === "confirmation") {
    const currentStep = getCreationStep();
    
    return (
      <div className="min-h-screen bg-background py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h1 className="font-display text-4xl font-bold text-foreground">
              🎭 Create Your H2O Hero
            </h1>
            <p className="text-muted-foreground text-lg">
              Choose your character and name to begin your water mission!
            </p>
            
            <StepIndicator
              currentStep={currentStep}
              totalSteps={3}
              stepLabels={["Avatar", "Name", "Confirm"]}
            />
          </div>

          {gameState === "avatar-selection" && (
            <AvatarSelection
              onSelect={(avatarId) => {
                handleAvatarSelect(avatarId);
                setGameState("name-input");
              }}
              selectedAvatarId={hero.avatarId}
            />
          )}

          {gameState === "name-input" && (
            <HeroNameInput
              heroName={hero.heroName}
              onNameChange={(name) => setHero({ ...hero, heroName: name })}
              onContinue={handleNameContinue}
            />
          )}

          {gameState === "confirmation" && (
            <HeroConfirmation
              avatarId={hero.avatarId}
              heroName={hero.heroName}
              onBack={handleConfirmationBack}
              onStartMission={handleStartQuiz}
            />
          )}
        </div>
      </div>
    );
  }

  if (gameState === "impact-story") {
    const story = impactStories[impactStoryIndex % impactStories.length];
    return (
      <ImpactStory
        title={story.title}
        story={story.story}
        location={story.location}
        icon={story.icon}
        onContinue={handleContinueFromImpact}
      />
    );
  }

  if (gameState === "results") {
    return (
      <QuizResults
        avatarId={hero.avatarId}
        heroName={hero.heroName}
        score={score}
        totalQuestions={quizQuestions.length}
        finalLevel={hero.level}
        totalXp={hero.xp}
        penalties={penalties}
        onPlayAgain={resetGame}
        onLearnMore={handleLearnMore}
      />
    );
  }

  if (gameState === "quiz") {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    return (
      <div className="min-h-screen bg-background py-8 px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* GAME CONTROLS: Reset button visible during gameplay */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {penalties > 0 && (
                <div className="flex items-center gap-2 bg-destructive/10 text-destructive px-3 py-1.5 rounded-md border border-destructive/20">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">{penalties} {penalties === 1 ? 'penalty' : 'penalties'}</span>
                </div>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={resetGame}
              className="hover-elevate"
              data-testid="button-reset-game"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Quiz
            </Button>
          </div>

          <div className="grid lg:grid-cols-[300px_1fr] gap-8">
            <div className="lg:sticky lg:top-8 h-fit">
              <CharacterCard
                avatarId={hero.avatarId}
                heroName={hero.heroName}
                level={hero.level}
                xp={hero.xp}
                currentQuestion={currentQuestionIndex + 1}
                totalQuestions={quizQuestions.length}
              />
            </div>

            <div>
              <QuizQuestion
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={quizQuestions.length}
                question={currentQuestion.question}
                options={currentQuestion.options}
                correctAnswerIndex={currentQuestion.correctAnswerIndex}
                onAnswer={handleAnswer}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
