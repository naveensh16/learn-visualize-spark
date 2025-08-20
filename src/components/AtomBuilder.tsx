import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AtomVisualizer } from "./AtomVisualizer";
import { PeriodicTable } from "./PeriodicTable";
import { Particle } from "./Particle";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export interface AtomData {
  protons: number;
  neutrons: number;
  electrons: number;
  element?: string;
  symbol?: string;
}

export const AtomBuilder = () => {
  const [atom, setAtom] = useState<AtomData>({
    protons: 1,
    neutrons: 0,
    electrons: 1,
    element: "Hydrogen",
    symbol: "H"
  });

  const addParticle = (type: 'protons' | 'neutrons' | 'electrons') => {
    if (atom[type] >= 20) {
      toast.error(`Maximum ${type} limit reached!`);
      return;
    }
    
    setAtom(prev => ({ 
      ...prev, 
      [type]: prev[type] + 1 
    }));
    
    toast.success(`Added ${type.slice(0, -1)}!`);
  };

  const removeParticle = (type: 'protons' | 'neutrons' | 'electrons') => {
    if (atom[type] <= 0) {
      toast.error(`Cannot remove more ${type}!`);
      return;
    }
    
    setAtom(prev => ({ 
      ...prev, 
      [type]: prev[type] - 1 
    }));
  };

  const resetAtom = () => {
    setAtom({
      protons: 1,
      neutrons: 0,
      electrons: 1,
      element: "Hydrogen",
      symbol: "H"
    });
    toast.success("Atom reset!");
  };

  const loadElement = (elementData: AtomData) => {
    setAtom(elementData);
    toast.success(`Loaded ${elementData.element}!`);
  };

  const getMassNumber = () => atom.protons + atom.neutrons;
  const getCharge = () => atom.protons - atom.electrons;
  const isStable = () => Math.abs(getCharge()) <= 1;

  return (
    <div className="min-h-screen p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Interactive Atomic Structure
        </h1>
        <p className="text-muted-foreground text-lg">
          Build atoms, explore elements, and understand atomic structure
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Atom Visualizer */}
        <Card className="element-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary pulse-glow"></div>
              Atom Visualizer
            </CardTitle>
            <CardDescription>
              {atom.element ? `${atom.element} (${atom.symbol})` : "Custom Atom"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AtomVisualizer atom={atom} />
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Mass Number:</span>
                  <Badge variant="outline">{getMassNumber()}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Charge:</span>
                  <Badge variant={getCharge() === 0 ? "default" : "destructive"}>
                    {getCharge() > 0 ? `+${getCharge()}` : getCharge()}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Stability:</span>
                  <Badge variant={isStable() ? "default" : "destructive"}>
                    {isStable() ? "Stable" : "Unstable"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Atomic Number:</span>
                  <Badge variant="secondary">{atom.protons}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="space-y-6">
          <Card className="element-card">
            <CardHeader>
              <CardTitle>Particle Controls</CardTitle>
              <CardDescription>Add or remove particles to build your atom</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Protons */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                <div className="flex items-center gap-3">
                  <Particle type="proton" size={24} />
                  <div>
                    <div className="font-semibold text-proton">Protons</div>
                    <div className="text-sm text-muted-foreground">Positive charge</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeParticle('protons')}
                    disabled={atom.protons <= 0}
                  >
                    -
                  </Button>
                  <Badge variant="secondary" className="min-w-[2rem]">
                    {atom.protons}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addParticle('protons')}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Neutrons */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                <div className="flex items-center gap-3">
                  <Particle type="neutron" size={24} />
                  <div>
                    <div className="font-semibold text-neutron">Neutrons</div>
                    <div className="text-sm text-muted-foreground">No charge</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeParticle('neutrons')}
                    disabled={atom.neutrons <= 0}
                  >
                    -
                  </Button>
                  <Badge variant="secondary" className="min-w-[2rem]">
                    {atom.neutrons}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addParticle('neutrons')}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Electrons */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                <div className="flex items-center gap-3">
                  <Particle type="electron" size={20} />
                  <div>
                    <div className="font-semibold text-electron">Electrons</div>
                    <div className="text-sm text-muted-foreground">Negative charge</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeParticle('electrons')}
                    disabled={atom.electrons <= 0}
                  >
                    -
                  </Button>
                  <Badge variant="secondary" className="min-w-[2rem]">
                    {atom.electrons}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addParticle('electrons')}
                  >
                    +
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="flex gap-2">
                <Button onClick={resetAtom} variant="outline" className="flex-1">
                  Reset
                </Button>
                <Button 
                  onClick={() => toast.success("Great job building atoms!")} 
                  className="flex-1"
                >
                  Test Knowledge
                </Button>
              </div>
            </CardContent>
          </Card>

          <PeriodicTable onElementSelect={loadElement} />
        </div>
      </div>
    </div>
  );
};