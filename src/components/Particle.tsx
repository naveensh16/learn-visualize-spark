interface ParticleProps {
  type: 'proton' | 'neutron' | 'electron';
  size?: number;
  animated?: boolean;
}

export const Particle = ({ type, size = 20, animated = true }: ParticleProps) => {
  const getParticleClass = () => {
    switch (type) {
      case 'proton':
        return 'particle-proton';
      case 'neutron':
        return 'particle-neutron';
      case 'electron':
        return 'particle-electron';
      default:
        return '';
    }
  };

  const getLabel = () => {
    switch (type) {
      case 'proton':
        return 'p+';
      case 'neutron':
        return 'n';
      case 'electron':
        return 'e-';
      default:
        return '';
    }
  };

  return (
    <div
      className={`
        ${getParticleClass()} 
        flex items-center justify-center text-white font-bold text-xs
        ${animated ? 'transition-all duration-300 hover:scale-110' : ''}
      `}
      style={{ width: size, height: size }}
      title={`${type.charAt(0).toUpperCase() + type.slice(1)}`}
    >
      {size >= 16 && getLabel()}
    </div>
  );
};