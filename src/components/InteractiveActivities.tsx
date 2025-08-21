import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AtomData } from "./AtomBuilder";
import { Beaker, Zap, Puzzle, Lightbulb } from "lucide-react";
import { toast } from "sonner";

interface InteractiveActivitiesProps {
  atom: AtomData;
  onActivityComplete: (activityId: string) => void;
}

export const InteractiveActivities = ({ atom, onActivityComplete }: InteractiveActivitiesProps) => {
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
  const [experimentResults, setExperimentResults] = useState<string[]>([]);

  const runExperiment = (experimentType: string) => {
    const experiments = {
      "charge-test": {
        name: "Charge Test",
        result: atom.protons === atom.electrons ? 
          `✅ This atom is neutral! It has ${atom.protons} protons and ${atom.electrons} electrons.` :
          `⚡ This atom is ${atom.protons > atom.electrons ? 'positively' : 'negatively'} charged!`
      },
      "stability-check": {
        name: "Stability Check", 
        result: Math.abs(atom.protons - atom.electrons) <= 1 ?
          "🟢 This atom appears stable!" :
          "🔴 This atom might be unstable due to charge imbalance."
      },
      "mass-calculation": {
        name: "Mass Calculation",
        result: `📊 The atomic mass is approximately ${atom.protons + atom.neutrons} (${atom.protons} protons + ${atom.neutrons} neutrons)`
      }
    };

    const experiment = experiments[experimentType as keyof typeof experiments];
    if (experiment) {
      setExperimentResults(prev => [...prev, experiment.result]);
      toast.success(`Experiment complete: ${experiment.name}`);
      onActivityComplete("experiment-" + experimentType);
    }
  };

  const challenges = [
    {
      id: "build-carbon",
      title: "Build a Carbon Atom",
      description: "Create a carbon atom with 6 protons, 6 neutrons, and 6 electrons",
      check: () => atom.protons === 6 && atom.neutrons === 6 && atom.electrons === 6,
      reward: "🎉 Perfect! You built carbon - the building block of life!"
    },
    {
      id: "make-ion",
      title: "Create an Ion",
      description: "Make an atom with unequal protons and electrons",
      check: () => atom.protons !== atom.electrons,
      reward: "⚡ Great! You created an ion - a charged atom!"
    },
    {
      id: "heavy-nucleus",
      title: "Heavy Nucleus Challenge",
      description: "Build an atom with more neutrons than protons",
      check: () => atom.neutrons > atom.protons,
      reward: "🏋️ Excellent! Heavy nuclei like this exist in nature!"
    }
  ];

  const checkChallenge = (challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge && challenge.check()) {
      toast.success(challenge.reward);
      onActivityComplete(challengeId);
      setCurrentChallenge(null);
    } else {
      toast.error("Not quite right! Keep trying!");
    }
  };

  const atomFacts = [
    "💡 Did you know? If an atom were the size of a football stadium, the nucleus would be the size of a marble!",
    "🌟 Atoms are mostly empty space - over 99.9% empty!",
    "🔄 Electrons don't actually orbit the nucleus like planets - they exist in probability clouds!",
    "⚛️ The word 'atom' comes from the Greek word 'atomos' meaning 'indivisible'",
    "🌍 Your body contains about 7 billion billion billion atoms!",
    "💎 Diamond and pencil graphite are both made of carbon atoms arranged differently!"
  ];

  return (
    <Card className="element-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Beaker className="w-5 h-5 text-primary" />
          Interactive Learning
        </CardTitle>
        <CardDescription>
          Hands-on activities to explore atomic structure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="experiments" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="experiments">Lab</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="simulator">Simulator</TabsTrigger>
            <TabsTrigger value="facts">Fun Facts</TabsTrigger>
          </TabsList>

          <TabsContent value="experiments" className="space-y-4 mt-4">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Virtual Experiments
              </h4>
              
              <div className="grid gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => runExperiment("charge-test")}
                  className="justify-start"
                >
                  🔬 Test Atomic Charge
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => runExperiment("stability-check")}
                  className="justify-start"
                >
                  🧪 Check Stability
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => runExperiment("mass-calculation")}
                  className="justify-start"
                >
                  ⚖️ Calculate Mass
                </Button>
              </div>

              {experimentResults.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h5 className="font-medium">Experiment Results:</h5>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {experimentResults.map((result, index) => (
                      <div key={index} className="p-2 rounded bg-muted/30 text-sm">
                        {result}
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setExperimentResults([])}
                  >
                    Clear Results
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-4 mt-4">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Puzzle className="w-4 h-4" />
                Building Challenges
              </h4>
              
              <div className="space-y-3">
                {challenges.map((challenge) => (
                  <div key={challenge.id} className="p-4 rounded-lg border">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium">{challenge.title}</h5>
                      <Badge variant={challenge.check() ? "default" : "secondary"}>
                        {challenge.check() ? "Complete" : "Pending"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {challenge.description}
                    </p>
                    <Button 
                      size="sm" 
                      onClick={() => checkChallenge(challenge.id)}
                      disabled={challenge.check()}
                    >
                      Check Answer
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="simulator" className="space-y-4 mt-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Atom Simulator</h4>
              
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h5 className="font-medium mb-2">What happens if...?</h5>
                <div className="space-y-2 text-sm">
                  <div className="p-2 rounded bg-muted/30">
                    <strong>Add more electrons:</strong> The atom becomes negatively charged (anion)
                  </div>
                  <div className="p-2 rounded bg-muted/30">
                    <strong>Remove electrons:</strong> The atom becomes positively charged (cation)
                  </div>
                  <div className="p-2 rounded bg-muted/30">
                    <strong>Add neutrons:</strong> Creates isotopes - same element, different mass
                  </div>
                  <div className="p-2 rounded bg-muted/30">
                    <strong>Change protons:</strong> Creates a completely different element!
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border">
                <h5 className="font-medium mb-2">Current Atom Analysis:</h5>
                <div className="text-sm space-y-1">
                  <p>⚛️ Element type: {atom.element || "Custom atom"}</p>
                  <p>⚡ Charge: {atom.protons - atom.electrons === 0 ? "Neutral" : 
                    (atom.protons - atom.electrons > 0 ? "Positive" : "Negative")}</p>
                  <p>📊 Mass number: {atom.protons + atom.neutrons}</p>
                  <p>🎯 Atomic number: {atom.protons}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="facts" className="space-y-4 mt-4">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Amazing Atomic Facts
              </h4>
              
              <div className="space-y-3">
                {atomFacts.map((fact, index) => (
                  <div key={index} className="p-3 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
                    <p className="text-sm">{fact}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 rounded-lg bg-muted/30">
                <h5 className="font-medium mb-2">🌟 Atomic Size Comparison</h5>
                <p className="text-sm text-muted-foreground">
                  If a hydrogen atom were enlarged to the size of Earth, 
                  a single proton would be about the size of an apple! 
                  That's how tiny the building blocks of matter really are.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};