import React from 'react';
import { ParticlesBackground, Particle } from './WelcomeMessageStyle';

interface ParticlesEffectProps {
  isVisible?: boolean;
}

export const ParticlesEffect: React.FC<ParticlesEffectProps> = ({ isVisible = true }) => {
  // Gerar partículas com propriedades organizadas e simples
  const particles = React.useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: -i * 2, // Delay organizado e previsível
      duration: 20, // Duração fixa para consistência
      left: (i * 12) + 10, // Posições organizadas horizontalmente
      size: 3, // Tamanho fixo para uniformidade
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
          delay={particle.delay}
          duration={particle.duration}
          left={particle.left}
          size={particle.size}
          style={{
            opacity: isVisible ? 0.5 : 0
          }}
        />
      ))}
    </ParticlesBackground>
  );
};