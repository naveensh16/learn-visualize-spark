import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AtomData } from "./AtomBuilder";

interface PeriodicTableProps {
  onElementSelect: (element: AtomData) => void;
}

const elements: AtomData[] = [
  { protons: 1, neutrons: 0, electrons: 1, element: "Hydrogen", symbol: "H" },
  { protons: 2, neutrons: 2, electrons: 2, element: "Helium", symbol: "He" },
  { protons: 3, neutrons: 4, electrons: 3, element: "Lithium", symbol: "Li" },
  { protons: 4, neutrons: 5, electrons: 4, element: "Beryllium", symbol: "Be" },
  { protons: 5, neutrons: 6, electrons: 5, element: "Boron", symbol: "B" },
  { protons: 6, neutrons: 6, electrons: 6, element: "Carbon", symbol: "C" },
  { protons: 7, neutrons: 7, electrons: 7, element: "Nitrogen", symbol: "N" },
  { protons: 8, neutrons: 8, electrons: 8, element: "Oxygen", symbol: "O" },
  { protons: 9, neutrons: 10, electrons: 9, element: "Fluorine", symbol: "F" },
  { protons: 10, neutrons: 10, electrons: 10, element: "Neon", symbol: "Ne" },
  { protons: 11, neutrons: 12, electrons: 11, element: "Sodium", symbol: "Na" },
  { protons: 12, neutrons: 12, electrons: 12, element: "Magnesium", symbol: "Mg" },
];

export const PeriodicTable = ({ onElementSelect }: PeriodicTableProps) => {
  return (
    <Card className="element-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent pulse-glow"></div>
          Quick Elements
        </CardTitle>
        <CardDescription>
          Click any element to load its atomic structure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {elements.map((element) => (
            <Button
              key={element.symbol}
              variant="outline"
              className="h-16 flex flex-col items-center justify-center gap-1 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
              onClick={() => onElementSelect(element)}
            >
              <div className="font-bold text-lg">{element.symbol}</div>
              <div className="text-xs text-muted-foreground">{element.protons}</div>
            </Button>
          ))}
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground text-center">
          <p>🧪 Elements 1-12 available for exploration</p>
        </div>
      </CardContent>
    </Card>
  );
};