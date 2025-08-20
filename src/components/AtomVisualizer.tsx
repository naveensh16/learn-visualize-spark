import { AtomData } from "./AtomBuilder";
import { Particle } from "./Particle";

interface AtomVisualizerProps {
  atom: AtomData;
}

export const AtomVisualizer = ({ atom }: AtomVisualizerProps) => {
  const renderNucleus = () => {
    const particles = [];
    const totalNucleusParticles = atom.protons + atom.neutrons;
    
    // Calculate particles in a circular pattern
    for (let i = 0; i < atom.protons; i++) {
      const angle = (i / totalNucleusParticles) * 2 * Math.PI;
      const radius = Math.min(20 + totalNucleusParticles * 2, 60);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      particles.push(
        <div
          key={`proton-${i}`}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
          }}
        >
          <Particle type="proton" size={16} />
        </div>
      );
    }
    
    for (let i = 0; i < atom.neutrons; i++) {
      const angle = ((i + atom.protons) / totalNucleusParticles) * 2 * Math.PI;
      const radius = Math.min(20 + totalNucleusParticles * 2, 60);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      particles.push(
        <div
          key={`neutron-${i}`}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
          }}
        >
          <Particle type="neutron" size={16} />
        </div>
      );
    }
    
    return particles;
  };

  const renderElectronShells = () => {
    const shells = [];
    let remainingElectrons = atom.electrons;
    const shellCapacities = [2, 8, 8, 2]; // Simplified shell model for visualization
    
    for (let shell = 0; shell < 4 && remainingElectrons > 0; shell++) {
      const electronsInShell = Math.min(remainingElectrons, shellCapacities[shell]);
      const shellRadius = 80 + shell * 40;
      
      // Create orbital ring
      shells.push(
        <div
          key={`shell-${shell}`}
          className={shell % 2 === 0 ? "orbital-ring" : "orbital-ring-fast"}
          style={{
            width: `${shellRadius * 2}px`,
            height: `${shellRadius * 2}px`,
            left: `calc(50% - ${shellRadius}px)`,
            top: `calc(50% - ${shellRadius}px)`,
          }}
        />
      );
      
      // Add electrons to shell
      for (let e = 0; e < electronsInShell; e++) {
        const angle = (e / electronsInShell) * 2 * Math.PI + (shell * Math.PI / 4);
        const x = Math.cos(angle) * shellRadius;
        const y = Math.sin(angle) * shellRadius;
        
        shells.push(
          <div
            key={`electron-${shell}-${e}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              animationDelay: `${(shell * 0.2 + e * 0.1)}s`,
            }}
          >
            <Particle type="electron" size={12} />
          </div>
        );
      }
      
      remainingElectrons -= electronsInShell;
    }
    
    return shells;
  };

  return (
    <div className="atom-container relative w-full h-96 rounded-lg border border-border/30">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-lg" />
      
      {/* Nucleus */}
      <div className="absolute inset-0">
        {renderNucleus()}
      </div>
      
      {/* Electron shells */}
      <div className="absolute inset-0">
        {renderElectronShells()}
      </div>
      
      {/* Center point */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full pulse-glow" />
    </div>
  );
};