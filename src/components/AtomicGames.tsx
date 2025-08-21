import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AtomData } from "./AtomBuilder";
import { Gamepad2, Target, Brain, Timer } from "lucide-react";
import { toast } from "sonner";

interface AtomicGamesProps {
  atom: AtomData;
  onGameComplete: (gameId: string, score: number) => void;
}

export const AtomicGames = ({ atom, onGameComplete }: AtomicGamesProps) => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameQuestion, setGameQuestion] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [streak, setStreak] = useState(0);

  const games = [
    {
      id: "element-guess",
      name: "Element Guesser",
      description: "Guess the element from its atomic number",
      icon: "🔍",
      difficulty: "Easy"
    },
    {
      id: "build-challenge",
      name: "Atom Builder Challenge",
      description: "Build atoms as fast as you can",
      icon: "⚛️",
      difficulty: "Medium"
    },
    {
      id: "particle-match",
      name: "Particle Memory Match",
      description: "Match particles with their properties",
      icon: "🧠",
      difficulty: "Hard"
    },
    {
      id: "equation-balance",
      name: "Charge Balance",
      description: "Balance atomic charges correctly",
      icon: "⚖️",
      difficulty: "Medium"
    }
  ];

  const elementQuestions = [
    { element: "Hydrogen", atomicNumber: 1, symbol: "H" },
    { element: "Helium", atomicNumber: 2, symbol: "He" },
    { element: "Carbon", atomicNumber: 6, symbol: "C" },
    { element: "Oxygen", atomicNumber: 8, symbol: "O" },
    { element: "Sodium", atomicNumber: 11, symbol: "Na" },
    { element: "Iron", atomicNumber: 26, symbol: "Fe" }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentGame && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && currentGame) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, currentGame]);

  const startGame = (gameId: string) => {
    setCurrentGame(gameId);
    setScore(0);
    setTimeLeft(30);
    setStreak(0);
    generateQuestion(gameId);
  };

  const generateQuestion = (gameId: string) => {
    switch (gameId) {
      case "element-guess":
        const randomElement = elementQuestions[Math.floor(Math.random() * elementQuestions.length)];
        setGameQuestion({
          type: "element-guess",
          question: `What element has atomic number ${randomElement.atomicNumber}?`,
          answer: randomElement.element.toLowerCase(),
          options: [randomElement.element, "Nitrogen", "Fluorine", "Neon"].sort(() => Math.random() - 0.5)
        });
        break;
      
      case "build-challenge":
        const targetElement = elementQuestions[Math.floor(Math.random() * elementQuestions.length)];
        setGameQuestion({
          type: "build-challenge",
          question: `Build ${targetElement.element}`,
          answer: targetElement,
          current: { protons: atom.protons, neutrons: atom.neutrons, electrons: atom.electrons }
        });
        break;

      case "particle-match":
        const particles = [
          { name: "Proton", charge: "Positive", location: "Nucleus" },
          { name: "Neutron", charge: "None", location: "Nucleus" },
          { name: "Electron", charge: "Negative", location: "Orbits" }
        ];
        const randomParticle = particles[Math.floor(Math.random() * particles.length)];
        setGameQuestion({
          type: "particle-match",
          question: `What charge does a ${randomParticle.name} have?`,
          answer: randomParticle.charge.toLowerCase(),
          options: ["Positive", "Negative", "None"].sort(() => Math.random() - 0.5)
        });
        break;

      case "equation-balance":
        const protons = Math.floor(Math.random() * 10) + 1;
        const electrons = Math.floor(Math.random() * 10) + 1;
        setGameQuestion({
          type: "equation-balance",
          question: `An atom has ${protons} protons and ${electrons} electrons. What is its charge?`,
          answer: (protons - electrons).toString(),
          protons,
          electrons
        });
        break;
    }
  };

  const submitAnswer = (answer: string) => {
    if (!gameQuestion) return;

    const isCorrect = answer.toLowerCase() === gameQuestion.answer.toLowerCase();
    
    if (isCorrect) {
      const points = (streak + 1) * 10;
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      toast.success(`Correct! +${points} points`);
    } else {
      setStreak(0);
      toast.error(`Wrong! The answer was: ${gameQuestion.answer}`);
    }

    setTimeout(() => {
      if (timeLeft > 0) {
        generateQuestion(currentGame!);
      }
    }, 1500);
  };

  const endGame = () => {
    if (currentGame) {
      onGameComplete(currentGame, score);
      toast.success(`Game over! Final score: ${score}`);
    }
    setCurrentGame(null);
    setGameQuestion(null);
    setUserAnswer("");
  };

  const renderGameContent = () => {
    if (!currentGame || !gameQuestion) return null;

    switch (gameQuestion.type) {
      case "element-guess":
      case "particle-match":
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-center">
              {gameQuestion.question}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {gameQuestion.options.map((option: string, index: number) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => submitAnswer(option)}
                  className="h-12"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        );

      case "build-challenge":
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-center">
              {gameQuestion.question}
            </h4>
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm mb-2">Current atom:</p>
              <p>Protons: {atom.protons}, Neutrons: {atom.neutrons}, Electrons: {atom.electrons}</p>
            </div>
            <Button
              onClick={() => {
                const correct = atom.protons === gameQuestion.answer.atomicNumber;
                submitAnswer(correct ? "correct" : "wrong");
              }}
            >
              Check if Correct
            </Button>
          </div>
        );

      case "equation-balance":
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-center">
              {gameQuestion.question}
            </h4>
            <div className="flex gap-2 items-center justify-center">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-20 p-2 rounded border text-center"
                placeholder="?"
              />
              <Button onClick={() => submitAnswer(userAnswer)}>
                Submit
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (currentGame) {
    return (
      <Card className="element-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5" />
              {games.find(g => g.id === currentGame)?.name}
            </span>
            <Button variant="ghost" size="sm" onClick={endGame}>
              End Game
            </Button>
          </CardTitle>
          <CardDescription>
            <div className="flex justify-between items-center">
              <span>Score: {score}</span>
              <span>Streak: {streak}x</span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timer */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1">
                <Timer className="w-4 h-4" />
                Time Left
              </span>
              <span className="font-mono">{timeLeft}s</span>
            </div>
            <Progress value={(timeLeft / 30) * 100} className="w-full" />
          </div>

          {/* Game Content */}
          {renderGameContent()}

          {/* Score Display */}
          <div className="flex justify-center gap-4">
            <Badge variant="outline" className="px-3 py-1">
              Score: {score}
            </Badge>
            {streak > 0 && (
              <Badge variant="default" className="px-3 py-1">
                Streak: {streak}x
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="element-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-primary" />
          Atomic Games
        </CardTitle>
        <CardDescription>
          Learn through fun and challenging games!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {games.map((game) => (
            <div key={game.id} className="p-4 rounded-lg border hover:border-primary/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <span className="text-lg">{game.icon}</span>
                  {game.name}
                </h4>
                <Badge variant={
                  game.difficulty === "Easy" ? "default" : 
                  game.difficulty === "Medium" ? "secondary" : "destructive"
                }>
                  {game.difficulty}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {game.description}
              </p>
              <Button 
                size="sm" 
                onClick={() => startGame(game.id)}
                className="w-full"
              >
                Play Game
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <h5 className="font-medium mb-2 flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Why Play Games?
          </h5>
          <p className="text-sm text-muted-foreground">
            Games help you learn by making practice fun! They improve memory, 
            speed up recall, and help you apply knowledge in new situations.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};