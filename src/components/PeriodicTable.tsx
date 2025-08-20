import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AtomData } from "./AtomBuilder";

interface PeriodicTableProps {
  onElementSelect: (element: AtomData) => void;
}

const getElementTypeColor = (type: string) => {
  switch (type) {
    case 'alkali-metal': return 'bg-red-500/20 border-red-500/50 hover:bg-red-500/30';
    case 'alkaline-earth': return 'bg-orange-500/20 border-orange-500/50 hover:bg-orange-500/30';
    case 'transition-metal': return 'bg-blue-500/20 border-blue-500/50 hover:bg-blue-500/30';
    case 'metal': return 'bg-gray-500/20 border-gray-500/50 hover:bg-gray-500/30';
    case 'metalloid': return 'bg-green-500/20 border-green-500/50 hover:bg-green-500/30';
    case 'nonmetal': return 'bg-yellow-500/20 border-yellow-500/50 hover:bg-yellow-500/30';
    case 'halogen': return 'bg-purple-500/20 border-purple-500/50 hover:bg-purple-500/30';
    case 'noble-gas': return 'bg-cyan-500/20 border-cyan-500/50 hover:bg-cyan-500/30';
    default: return 'bg-primary/20 border-primary/50 hover:bg-primary/30';
  }
};

const elements: AtomData[] = [
  // Period 1
  { protons: 1, neutrons: 0, electrons: 1, element: "Hydrogen", symbol: "H", period: 1, group: 1, type: "nonmetal" },
  { protons: 2, neutrons: 2, electrons: 2, element: "Helium", symbol: "He", period: 1, group: 18, type: "noble-gas" },
  
  // Period 2
  { protons: 3, neutrons: 4, electrons: 3, element: "Lithium", symbol: "Li", period: 2, group: 1, type: "alkali-metal" },
  { protons: 4, neutrons: 5, electrons: 4, element: "Beryllium", symbol: "Be", period: 2, group: 2, type: "alkaline-earth" },
  { protons: 5, neutrons: 6, electrons: 5, element: "Boron", symbol: "B", period: 2, group: 13, type: "metalloid" },
  { protons: 6, neutrons: 6, electrons: 6, element: "Carbon", symbol: "C", period: 2, group: 14, type: "nonmetal" },
  { protons: 7, neutrons: 7, electrons: 7, element: "Nitrogen", symbol: "N", period: 2, group: 15, type: "nonmetal" },
  { protons: 8, neutrons: 8, electrons: 8, element: "Oxygen", symbol: "O", period: 2, group: 16, type: "nonmetal" },
  { protons: 9, neutrons: 10, electrons: 9, element: "Fluorine", symbol: "F", period: 2, group: 17, type: "halogen" },
  { protons: 10, neutrons: 10, electrons: 10, element: "Neon", symbol: "Ne", period: 2, group: 18, type: "noble-gas" },
  
  // Period 3
  { protons: 11, neutrons: 12, electrons: 11, element: "Sodium", symbol: "Na", period: 3, group: 1, type: "alkali-metal" },
  { protons: 12, neutrons: 12, electrons: 12, element: "Magnesium", symbol: "Mg", period: 3, group: 2, type: "alkaline-earth" },
  { protons: 13, neutrons: 14, electrons: 13, element: "Aluminum", symbol: "Al", period: 3, group: 13, type: "metal" },
  { protons: 14, neutrons: 14, electrons: 14, element: "Silicon", symbol: "Si", period: 3, group: 14, type: "metalloid" },
  { protons: 15, neutrons: 16, electrons: 15, element: "Phosphorus", symbol: "P", period: 3, group: 15, type: "nonmetal" },
  { protons: 16, neutrons: 16, electrons: 16, element: "Sulfur", symbol: "S", period: 3, group: 16, type: "nonmetal" },
  { protons: 17, neutrons: 18, electrons: 17, element: "Chlorine", symbol: "Cl", period: 3, group: 17, type: "halogen" },
  { protons: 18, neutrons: 22, electrons: 18, element: "Argon", symbol: "Ar", period: 3, group: 18, type: "noble-gas" },
  
  // Period 4 (first 8 elements)
  { protons: 19, neutrons: 20, electrons: 19, element: "Potassium", symbol: "K", period: 4, group: 1, type: "alkali-metal" },
  { protons: 20, neutrons: 20, electrons: 20, element: "Calcium", symbol: "Ca", period: 4, group: 2, type: "alkaline-earth" },
  { protons: 21, neutrons: 24, electrons: 21, element: "Scandium", symbol: "Sc", period: 4, group: 3, type: "transition-metal" },
  { protons: 22, neutrons: 26, electrons: 22, element: "Titanium", symbol: "Ti", period: 4, group: 4, type: "transition-metal" },
  { protons: 23, neutrons: 28, electrons: 23, element: "Vanadium", symbol: "V", period: 4, group: 5, type: "transition-metal" },
  { protons: 24, neutrons: 28, electrons: 24, element: "Chromium", symbol: "Cr", period: 4, group: 6, type: "transition-metal" },
  { protons: 25, neutrons: 30, electrons: 25, element: "Manganese", symbol: "Mn", period: 4, group: 7, type: "transition-metal" },
  { protons: 26, neutrons: 30, electrons: 26, element: "Iron", symbol: "Fe", period: 4, group: 8, type: "transition-metal" },
];

const createPeriodicGrid = () => {
  const grid = Array(7).fill(null).map(() => Array(18).fill(null));
  
  elements.forEach(element => {
    if (element.period && element.group) {
      grid[element.period - 1][element.group - 1] = element;
    }
  });
  
  return grid;
};

export const PeriodicTable = ({ onElementSelect }: PeriodicTableProps) => {
  const grid = createPeriodicGrid();
  
  return (
    <Card className="element-card w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent pulse-glow"></div>
          Interactive Periodic Table
        </CardTitle>
        <CardDescription>
          Click any element to explore its atomic structure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-18 gap-1 text-xs">
          {grid.map((row, periodIndex) => 
            row.map((element, groupIndex) => {
              if (!element) {
                return (
                  <div 
                    key={`${periodIndex}-${groupIndex}`} 
                    className="aspect-square"
                  />
                );
              }
              
              return (
                <Button
                  key={element.symbol}
                  variant="outline"
                  className={`
                    aspect-square p-1 flex flex-col items-center justify-center gap-0.5
                    transition-all duration-300 hover:scale-105 hover:z-10 relative
                    ${getElementTypeColor(element.type)}
                  `}
                  onClick={() => onElementSelect(element)}
                  title={`${element.element} (${element.symbol}) - Atomic Number: ${element.protons}`}
                >
                  <div className="font-bold text-xs">{element.symbol}</div>
                  <div className="text-[10px] opacity-70">{element.protons}</div>
                </Button>
              );
            })
          )}
        </div>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-red-500/30 border border-red-500/50"></div>
            <span>Alkali Metals</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-orange-500/30 border border-orange-500/50"></div>
            <span>Alkaline Earth</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-500/30 border border-blue-500/50"></div>
            <span>Transition Metals</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-yellow-500/30 border border-yellow-500/50"></div>
            <span>Nonmetals</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-500/30 border border-green-500/50"></div>
            <span>Metalloids</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-purple-500/30 border border-purple-500/50"></div>
            <span>Halogens</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-cyan-500/30 border border-cyan-500/50"></div>
            <span>Noble Gases</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gray-500/30 border border-gray-500/50"></div>
            <span>Other Metals</span>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground text-center">
          <p>🧪 {elements.length} elements available for exploration</p>
        </div>
      </CardContent>
    </Card>
  );
};