import styled, { keyframes } from 'styled-components';

export const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

export const staggerIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const particleFloat = keyframes`
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
`;

export const particleGlow = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.2);
  }
`;

export const ParticlesBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
  opacity: 1;
  transition: opacity 0.5s ease-out;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    background: ${props => props.theme.textAccent};
    border-radius: 50%;
    animation: ${particleFloat} 15s linear infinite;
    transition: opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &::before {
    left: 10%;
    animation-delay: -5s;
    animation-duration: 20s;
  }

  &::after {
    left: 90%;
    animation-delay: -10s;
    animation-duration: 25s;
  }
`;

export const Particle = styled.div<{ delay: number; duration: number; left: number; size: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.theme.textSecondary};
  border-radius: 50%;
  left: ${props => props.left}%;
  animation: ${particleFloat} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  opacity: 0.4;
  transition: opacity 0.5s ease-out;

  &:nth-child(odd) {
    background: ${props => props.theme.textAccent};
  }
`;

export const WelcomeContainer = styled.div<{ isTransitioning?: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
  max-width: 90vw;
  width: 100%;
  transition: opacity 0.6s ease;
  
  ${props => props.isTransitioning && `
    opacity: 0;
  `}
`;

export const WelcomeContent = styled.div<{ isTransitioning?: boolean }>`
  padding: 0 2rem;
  animation: ${floatAnimation} 8s ease-in-out infinite;
  transition: all 0.6s ease;
  
  ${props => props.isTransitioning && `
    opacity: 0;
    transform: translateY(-30px);
    animation: none;
  `}
`;

export const WelcomeTitle = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 300;
  font-family: "Nebula", sans-serif;
  margin: 0 0 1.5rem 0;
  line-height: 1.1;
  letter-spacing: -0.02em;
  
  background: linear-gradient(135deg, 
    #ffffff 0%, 
    ${props => props.theme.textAccent} 40%, 
    #47c9ff 80%,
    #ffffff 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  /* Fallback para browsers que não suportam background-clip */
  color: ${props => props.theme.textPrimary};
  
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: ${props => props.theme.textAccent};
    opacity: 0.8;
  }
`;

export const WelcomeSubtitle = styled.p`
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  color: ${props => props.theme.textSecondary};
  margin: 0 0 3rem 0;
  line-height: 1.6;
  font-weight: 400;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
`;

export const WelcomeFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem 3rem;
  margin: 3rem 0 4rem 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

export const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.textSecondary};
  transition: all 0.4s ease;
  
  svg {
    width: 24px;
    height: 24px;
    stroke-width: 1.5;
  }
`;

export const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.8rem;
  min-width: 140px;
  transition: all 0.4s ease;
  cursor: default;
  opacity: 0;
  animation: ${staggerIn} 0.8s ease-out forwards;
  
  &:nth-child(1) { animation-delay: 0.2s; }
  &:nth-child(2) { animation-delay: 0.4s; }
  &:nth-child(3) { animation-delay: 0.6s; }
  &:nth-child(4) { animation-delay: 0.8s; }
  
  &:hover {
    transform: translateY(-4px);
    
    .feature-icon {
      transform: scale(1.1);
      color: ${props => props.theme.textAccent};
    }
  }
`;

export const FeatureText = styled.span`
  font-size: 0.95rem;
  color: ${props => props.theme.textSecondary};
  font-weight: 500;
  opacity: 0.8;
  transition: all 0.3s ease;
  
  ${FeatureItem}:hover & {
    opacity: 1;
    color: ${props => props.theme.textPrimary};
  }
`;

export const WelcomeInputForm = styled.form`
  opacity: 0;
  animation: ${staggerIn} 0.8s ease-out 1s forwards;
`;

export const WelcomeInputContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
  background: ${props => props.theme.bgSecondary};
  border: 2px solid ${props => props.theme.textAccent};
  border-radius: 8px;
  padding: 0.5rem;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:focus-within {
    border-color: ${props => props.theme.textAccent};
    box-shadow: 0 0 0 3px rgba(95, 174, 255, 0.1);
  }
`;

export const WelcomeInputField = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: ${props => props.theme.textPrimary};
  font-size: 1rem;
  padding: 0.75rem 1rem;
  
  &::placeholder {
    color: ${props => props.theme.textSecondary};
    opacity: 0.7;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const WelcomeInputButton = styled.button`
  background: ${props => props.theme.textAccent};
  border: none;
  border-radius: 6px;
  color: ${props => props.theme.bgPrimary};
  padding: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: ${props => props.theme.textAccent};
    opacity: 0.9;
    transform: scale(1.05);
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
`;