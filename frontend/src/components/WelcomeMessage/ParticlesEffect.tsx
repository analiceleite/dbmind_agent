import React from 'react';
import { ParticlesBackground, Particle } from './WelcomeMessageStyle';

interface ParticlesEffectProps {
  isVisible?: boolean;
}

export const ParticlesEffect: React.FC<ParticlesEffectProps> = ({ isVisible = true }) => {
  // Generate particles with organized properties
  const particles = React.useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: -i * 2, // Organized deplay
      duration: 20, // Fixed duration for uniformity
      left: (i * 12) + 10, // Horizontal spacing
      size: 3, // Fixed size for uniformity
    })), []
  );

  return (
    <ParticlesBackground 
      style={{ 
        opacity: isVisible ? 1 : 0
      }}
    >
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          $delay={particle.delay}
          $duration={particle.duration}
          $left={particle.left}
          $size={particle.size}
          style={{
            opacity: isVisible ? 0.5 : 0
          }}
        />
      ))}
    </ParticlesBackground>
  );
};