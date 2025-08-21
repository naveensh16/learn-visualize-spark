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
  { protons: 13, neutrons: 14, electrons: 13, element: "Aluminum", symbol: "Al" },
  { protons: 14, neutrons: 14, electrons: 14, element: "Silicon", symbol: "Si" },
  { protons: 15, neutrons: 16, electrons: 15, element: "Phosphorus", symbol: "P" },
  { protons: 16, neutrons: 16, electrons: 16, element: "Sulfur", symbol: "S" },
  { protons: 17, neutrons: 18, electrons: 17, element: "Chlorine", symbol: "Cl" },
  { protons: 18, neutrons: 22, electrons: 18, element: "Argon", symbol: "Ar" },
  { protons: 19, neutrons: 20, electrons: 19, element: "Potassium", symbol: "K" },
  { protons: 20, neutrons: 20, electrons: 20, element: "Calcium", symbol: "Ca" },
  { protons: 21, neutrons: 24, electrons: 21, element: "Scandium", symbol: "Sc" },
  { protons: 22, neutrons: 26, electrons: 22, element: "Titanium", symbol: "Ti" },
  { protons: 23, neutrons: 28, electrons: 23, element: "Vanadium", symbol: "V" },
  { protons: 24, neutrons: 28, electrons: 24, element: "Chromium", symbol: "Cr" },
  { protons: 25, neutrons: 30, electrons: 25, element: "Manganese", symbol: "Mn" },
  { protons: 26, neutrons: 30, electrons: 26, element: "Iron", symbol: "Fe" },
  { protons: 27, neutrons: 32, electrons: 27, element: "Cobalt", symbol: "Co" },
  { protons: 28, neutrons: 31, electrons: 28, element: "Nickel", symbol: "Ni" },
  { protons: 29, neutrons: 35, electrons: 29, element: "Copper", symbol: "Cu" },
  { protons: 30, neutrons: 35, electrons: 30, element: "Zinc", symbol: "Zn" },
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
        <div className="grid grid-cols-6 gap-2 max-h-80 overflow-y-auto">
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
          <p>🧪 Elements 1-30 available for exploration</p>
        </div>
      </CardContent>
    </Card>
  );
};