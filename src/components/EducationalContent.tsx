import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AtomData } from "./AtomBuilder";
import { BookOpen, Lightbulb, Target, Users } from "lucide-react";

interface EducationalContentProps {
  atom: AtomData;
}

export const EducationalContent = ({ atom }: EducationalContentProps) => {
  const getElementFacts = (element: string, protons: number) => {
    const facts: Record<string, any> = {
      "Hydrogen": {
        uses: "Fuel cells, rocket fuel, ammonia production",
        interesting: "Most abundant element in the universe",
        discovery: "Discovered by Henry Cavendish in 1766",
        category: "Nonmetal"
      },
      "Helium": {
        uses: "Balloons, cooling MRI machines, diving gas",
        interesting: "Second most abundant element in the universe",
        discovery: "First detected in the Sun before Earth",
        category: "Noble Gas"
      },
      "Carbon": {
        uses: "Diamond, graphite, steel production, life forms",
        interesting: "Forms more compounds than any other element",
        discovery: "Known since ancient times",
        category: "Nonmetal"
      },
      "Oxygen": {
        uses: "Breathing, combustion, water formation",
        interesting: "Makes up 21% of Earth's atmosphere",
        discovery: "Discovered by Joseph Priestley in 1774",
        category: "Nonmetal"
      },
      "Iron": {
        uses: "Steel production, construction, hemoglobin",
        interesting: "Earth's core is mostly iron",
        discovery: "Used since 5000 BC",
        category: "Transition Metal"
      }
    };

    return facts[element] || {
      uses: "Various industrial and biological applications",
      interesting: `Element with ${protons} protons in its nucleus`,
      discovery: "Part of the periodic table",
      category: protons <= 2 ? "Light Element" : protons <= 18 ? "Main Group" : "Transition Metal"
    };
  };

  const getElectronConfiguration = (electrons: number) => {
    const shells = [2, 8, 8, 18, 18, 32, 32];
    let remaining = electrons;
    const config = [];
    
    for (let i = 0; i < shells.length && remaining > 0; i++) {
      const electronsinShell = Math.min(remaining, shells[i]);
      config.push(`Shell ${i + 1}: ${electronsinShell}`);
      remaining -= electronsinShell;
    }
    
    return config;
  };

  const facts = atom.element ? getElementFacts(atom.element, atom.protons) : null;

  return (
    <Card className="element-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Educational Content
        </CardTitle>
        <CardDescription>
          Learn about {atom.element || "this atom"} and atomic structure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="structure">Structure</TabsTrigger>
            <TabsTrigger value="facts">Facts</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basics" className="space-y-4 mt-4">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Target className="w-4 h-4" />
                Atomic Basics
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="font-medium">Atomic Number</div>
                  <div className="text-muted-foreground">Number of protons: {atom.protons}</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="font-medium">Mass Number</div>
                  <div className="text-muted-foreground">Protons + Neutrons: {atom.protons + atom.neutrons}</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="font-medium">Charge</div>
                  <div className="text-muted-foreground">
                    {atom.protons - atom.electrons === 0 ? "Neutral" : 
                     atom.protons - atom.electrons > 0 ? `+${atom.protons - atom.electrons}` : 
                     `${atom.protons - atom.electrons}`}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="font-medium">Ion Type</div>
                  <div className="text-muted-foreground">
                    {atom.protons === atom.electrons ? "Atom" : 
                     atom.protons > atom.electrons ? "Cation (+)" : "Anion (-)"}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="structure" className="space-y-4 mt-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Electron Configuration</h4>
              <div className="space-y-2">
                {getElectronConfiguration(atom.electrons).map((shell, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Badge variant="outline">{shell}</Badge>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h5 className="font-medium mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Did You Know?
                </h5>
                <p className="text-sm text-muted-foreground">
                  Electrons occupy specific energy levels or "shells" around the nucleus. 
                  The first shell can hold up to 2 electrons, the second up to 8, and so on!
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="facts" className="space-y-4 mt-4">
            {facts && (
              <div className="space-y-4">
                <div className="grid gap-3">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h5 className="font-medium mb-2">Category</h5>
                    <Badge variant="secondary">{facts.category}</Badge>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h5 className="font-medium mb-2">Common Uses</h5>
                    <p className="text-sm text-muted-foreground">{facts.uses}</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h5 className="font-medium mb-2">Interesting Fact</h5>
                    <p className="text-sm text-muted-foreground">{facts.interesting}</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h5 className="font-medium mb-2">Discovery</h5>
                    <p className="text-sm text-muted-foreground">{facts.discovery}</p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="quiz" className="space-y-4 mt-4">
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Users className="w-4 h-4" />
                Quick Knowledge Check
              </h4>
              
              <div className="space-y-3">
                <div className="p-4 rounded-lg border">
                  <p className="font-medium mb-2">Question 1:</p>
                  <p className="text-sm mb-3">What determines an element's identity?</p>
                  <div className="space-y-1 text-sm">
                    <div className="p-2 rounded bg-muted/30">A) Number of electrons</div>
                    <div className="p-2 rounded bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700">
                      ✓ B) Number of protons (Atomic Number)
                    </div>
                    <div className="p-2 rounded bg-muted/30">C) Number of neutrons</div>
                    <div className="p-2 rounded bg-muted/30">D) Mass number</div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border">
                  <p className="font-medium mb-2">Question 2:</p>
                  <p className="text-sm mb-3">What makes an atom electrically neutral?</p>
                  <div className="space-y-1 text-sm">
                    <div className="p-2 rounded bg-muted/30">A) Equal protons and neutrons</div>
                    <div className="p-2 rounded bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700">
                      ✓ B) Equal protons and electrons
                    </div>
                    <div className="p-2 rounded bg-muted/30">C) More neutrons than protons</div>
                    <div className="p-2 rounded bg-muted/30">D) More electrons than neutrons</div>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm">
                    <strong>Remember:</strong> The number of protons defines the element, 
                    while the balance of protons and electrons determines the charge!
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};