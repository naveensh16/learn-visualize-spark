import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Target, BookOpen } from "lucide-react";
import { AtomData } from "./AtomBuilder";

interface LearningProgressProps {
  currentAtom: AtomData;
  elementsExplored: string[];
  activitiesCompleted: string[];
}

export const LearningProgress = ({ currentAtom, elementsExplored, activitiesCompleted }: LearningProgressProps) => {
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  
  const achievements = [
    { id: "first-atom", name: "First Atom", icon: "🔬", unlocked: elementsExplored.length >= 1 },
    { id: "element-explorer", name: "Element Explorer", icon: "🧪", unlocked: elementsExplored.length >= 5 },
    { id: "periodic-master", name: "Periodic Master", icon: "📊", unlocked: elementsExplored.length >= 10 },
    { id: "atom-builder", name: "Atom Builder", icon: "⚛️", unlocked: activitiesCompleted.includes("build-atom") },
    { id: "quiz-champion", name: "Quiz Champion", icon: "🏆", unlocked: activitiesCompleted.includes("quiz-complete") },
    { id: "scientist", name: "Young Scientist", icon: "👩‍🔬", unlocked: elementsExplored.length >= 15 }
  ];

  const learningObjectives = [
    { objective: "Understand what atoms are", completed: elementsExplored.length >= 1 },
    { objective: "Learn about protons, neutrons, and electrons", completed: activitiesCompleted.includes("particle-learning") },
    { objective: "Explore the periodic table", completed: elementsExplored.length >= 3 },
    { objective: "Build your own atoms", completed: activitiesCompleted.includes("build-atom") },
    { objective: "Understand atomic structure", completed: activitiesCompleted.includes("structure-learning") },
    { objective: "Connect atoms to real life", completed: activitiesCompleted.includes("real-world") }
  ];

  useEffect(() => {
    const totalProgress = elementsExplored.length + activitiesCompleted.length * 2;
    setExperience(totalProgress * 10);
    setLevel(Math.floor(totalProgress / 5) + 1);
  }, [elementsExplored, activitiesCompleted]);

  const completedObjectives = learningObjectives.filter(obj => obj.completed).length;
  const progressPercentage = (completedObjectives / learningObjectives.length) * 100;

  return (
    <Card className="element-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Learning Progress
        </CardTitle>
        <CardDescription>
          Track your atomic learning journey!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Level and Experience */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-lg font-semibold">Level {level}</span>
          </div>
          <Progress value={(experience % 100)} className="w-full" />
          <p className="text-sm text-muted-foreground">{experience} XP</p>
        </div>

        {/* Learning Objectives */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Target className="w-4 h-4" />
            Learning Goals ({completedObjectives}/{learningObjectives.length})
          </h4>
          <Progress value={progressPercentage} className="w-full" />
          <div className="space-y-2">
            {learningObjectives.map((obj, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  obj.completed ? 'bg-green-500' : 'bg-muted'
                }`}>
                  {obj.completed && <span className="text-white text-xs">✓</span>}
                </div>
                <span className={obj.completed ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}>
                  {obj.objective}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Achievements
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-3 rounded-lg border text-center transition-all ${
                  achievement.unlocked 
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' 
                    : 'bg-muted/30 border-muted-foreground/20 opacity-50'
                }`}
              >
                <div className="text-lg mb-1">{achievement.icon}</div>
                <div className="text-xs font-medium">{achievement.name}</div>
                {achievement.unlocked && (
                  <Badge variant="secondary" className="mt-1 text-xs">Unlocked!</Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{elementsExplored.length}</div>
            <div className="text-xs text-muted-foreground">Elements Explored</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{activitiesCompleted.length}</div>
            <div className="text-xs text-muted-foreground">Activities Done</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};