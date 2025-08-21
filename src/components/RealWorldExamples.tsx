import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AtomData } from "./AtomBuilder";
import { Home, Utensils, Car, Smartphone } from "lucide-react";

interface RealWorldExamplesProps {
  atom: AtomData;
}

export const RealWorldExamples = ({ atom }: RealWorldExamplesProps) => {
  const getElementUses = (element: string, protons: number) => {
    const elementUses: Record<string, any> = {
      "Hydrogen": {
        icon: "🚀",
        everyday: [
          { item: "Water", description: "H₂O - Every sip of water contains hydrogen!" },
          { item: "Cleaning products", description: "Hydrogen peroxide for cleaning cuts" },
          { item: "Balloons", description: "Some party balloons use hydrogen gas" }
        ],
        technology: [
          { item: "Rocket fuel", description: "Powers space rockets to reach orbit" },
          { item: "Fuel cells", description: "Clean energy for electric cars" },
          { item: "Food industry", description: "Makes margarine and vegetable oils" }
        ],
        body: [
          { item: "DNA", description: "Hydrogen bonds hold DNA strands together" },
          { item: "Proteins", description: "Essential for protein structure" },
          { item: "Water in body", description: "60% of your body weight is water!" }
        ]
      },
      "Carbon": {
        icon: "💎",
        everyday: [
          { item: "Pencil graphite", description: "The 'lead' in pencils is actually carbon" },
          { item: "Diamonds", description: "The hardest natural material - pure carbon!" },
          { item: "Sugar", description: "All sugars contain carbon atoms" }
        ],
        technology: [
          { item: "Computer chips", description: "Carbon fiber in electronics" },
          { item: "Sports equipment", description: "Tennis rackets, bikes, golf clubs" },
          { item: "Air filters", description: "Activated carbon cleans air and water" }
        ],
        body: [
          { item: "All life", description: "Every living thing is carbon-based!" },
          { item: "DNA", description: "The backbone of genetic material" },
          { item: "Proteins", description: "All proteins contain carbon" }
        ]
      },
      "Oxygen": {
        icon: "🫁",
        everyday: [
          { item: "Breathing", description: "You breathe about 20,000 times per day!" },
          { item: "Water", description: "H₂O - oxygen makes water possible" },
          { item: "Fire", description: "Fire needs oxygen to burn" }
        ],
        technology: [
          { item: "Steel making", description: "Removes impurities from iron" },
          { item: "Medical oxygen", description: "Helps patients breathe in hospitals" },
          { item: "Rocket oxidizer", description: "Helps rocket fuel burn in space" }
        ],
        body: [
          { item: "Cellular respiration", description: "Cells use oxygen to make energy" },
          { item: "Blood transport", description: "Red blood cells carry oxygen" },
          { item: "Brain function", description: "Brain uses 20% of body's oxygen" }
        ]
      },
      "Iron": {
        icon: "🩸",
        everyday: [
          { item: "Buildings", description: "Steel beams in skyscrapers contain iron" },
          { item: "Cars", description: "Car bodies are mostly steel (iron + carbon)" },
          { item: "Kitchen tools", description: "Knives, pots, and appliances" }
        ],
        technology: [
          { item: "Magnets", description: "Iron makes powerful permanent magnets" },
          { item: "Electronics", description: "Transformers and electric motors" },
          { item: "Construction", description: "Reinforcement bars in concrete" }
        ],
        body: [
          { item: "Hemoglobin", description: "Iron carries oxygen in your blood" },
          { item: "Muscle function", description: "Needed for muscle proteins" },
          { item: "Energy production", description: "Helps cells make energy" }
        ]
      }
    };

    return elementUses[element] || {
      icon: "⚛️",
      everyday: [
        { item: "Various products", description: `Element #${protons} has many uses` },
        { item: "Industrial processes", description: "Used in manufacturing" },
        { item: "Scientific research", description: "Important for scientific studies" }
      ],
      technology: [
        { item: "Advanced materials", description: "Used in high-tech applications" },
        { item: "Electronics", description: "Component in electronic devices" },
        { item: "Energy systems", description: "Part of energy production" }
      ],
      body: [
        { item: "Trace amounts", description: "May be present in small quantities" },
        { item: "Biological processes", description: "Could play a role in biology" }
      ]
    };
  };

  const atomInFood = [
    { food: "🍞 Bread", atoms: "Carbon (starch), Hydrogen (water), Oxygen (air), Nitrogen (protein)" },
    { food: "🥛 Milk", atoms: "Calcium (strong bones), Carbon (lactose), Hydrogen (water)" },
    { food: "🍎 Apple", atoms: "Carbon (fructose), Oxygen (water), Potassium (minerals)" },
    { food: "🥩 Meat", atoms: "Iron (hemoglobin), Carbon (proteins), Nitrogen (amino acids)" },
    { food: "🧂 Salt", atoms: "Sodium and Chlorine (table salt = NaCl)" },
    { food: "🍌 Banana", atoms: "Potassium (prevents cramps), Carbon (natural sugars)" }
  ];

  const uses = atom.element ? getElementUses(atom.element, atom.protons) : null;

  return (
    <Card className="element-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="w-5 h-5 text-primary" />
          Real World Connections
        </CardTitle>
        <CardDescription>
          Discover how {atom.element || "atoms"} affect your daily life
        </CardDescription>
      </CardHeader>
      <CardContent>
        {uses ? (
          <Tabs defaultValue="everyday" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="everyday">Daily Life</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="body">In Your Body</TabsTrigger>
              <TabsTrigger value="food">In Food</TabsTrigger>
            </TabsList>

            <TabsContent value="everyday" className="space-y-4 mt-4">
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <span className="text-2xl">{uses.icon}</span>
                  {atom.element} in Daily Life
                </h4>
                
                <div className="space-y-3">
                  {uses.everyday.map((use: any, index: number) => (
                    <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-transparent border border-primary/20">
                      <h5 className="font-medium mb-1 flex items-center gap-2">
                        <Utensils className="w-4 h-4" />
                        {use.item}
                      </h5>
                      <p className="text-sm text-muted-foreground">{use.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 rounded-lg bg-muted/30">
                  <p className="text-sm">
                    <strong>Fun fact:</strong> You interact with millions of {atom.element?.toLowerCase()} atoms every single day, 
                    often without even realizing it!
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="technology" className="space-y-4 mt-4">
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  {atom.element} in Technology
                </h4>
                
                <div className="space-y-3">
                  {uses.technology.map((tech: any, index: number) => (
                    <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-accent/5 to-transparent border border-accent/20">
                      <h5 className="font-medium mb-1 flex items-center gap-2">
                        <Car className="w-4 h-4" />
                        {tech.item}
                      </h5>
                      <p className="text-sm text-muted-foreground">{tech.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 rounded-lg bg-accent/5 border border-accent/20">
                  <p className="text-sm">
                    <strong>Technology Impact:</strong> Modern life would be impossible without {atom.element?.toLowerCase()}! 
                    From your smartphone to space exploration, this element plays a crucial role.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="body" className="space-y-4 mt-4">
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <span className="text-xl">🧬</span>
                  {atom.element} in Your Body
                </h4>
                
                <div className="space-y-3">
                  {uses.body.map((body: any, index: number) => (
                    <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-green-50 dark:from-green-900/20 to-transparent border border-green-200 dark:border-green-800">
                      <h5 className="font-medium mb-1">{body.item}</h5>
                      <p className="text-sm text-muted-foreground">{body.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <p className="text-sm">
                    <strong>Amazing fact:</strong> Your body contains trillions of {atom.element?.toLowerCase()} atoms working together 
                    to keep you alive and healthy every second of every day!
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="food" className="space-y-4 mt-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Atoms in Your Food</h4>
                
                <div className="space-y-2">
                  {atomInFood.map((food, index) => (
                    <div key={index} className="p-3 rounded-lg border">
                      <h5 className="font-medium mb-1">{food.food}</h5>
                      <p className="text-sm text-muted-foreground">{food.atoms}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                  <h5 className="font-medium mb-2">🍽️ Did You Know?</h5>
                  <p className="text-sm">
                    Every bite of food contains millions of atoms from the periodic table! 
                    Your body breaks down these atoms and uses them to build new cells, 
                    create energy, and keep you growing strong.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted/30 text-center">
                    <div className="text-lg font-bold text-primary">25+</div>
                    <div className="text-xs text-muted-foreground">Elements in your body</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 text-center">
                    <div className="text-lg font-bold text-accent">99%</div>
                    <div className="text-xs text-muted-foreground">Made of 6 elements</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Select an element from the periodic table to see how it affects your daily life!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};