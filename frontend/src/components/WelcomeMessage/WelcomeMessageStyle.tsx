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

export const WelcomeContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
  max-width: 90vw;
  width: 100%;
`;

export const WelcomeContent = styled.div`
  padding: 0 2rem;
  animation: ${floatAnimation} 8s ease-in-out infinite;
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

export const StartButton = styled.button`
  background: transparent;
  border: 2px solid ${props => props.theme.textAccent};
  color: ${props => props.theme.textAccent};
  padding: 1rem 2.5rem;
  border-radius: 2px;
  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  opacity: 0;
  animation: ${staggerIn} 0.8s ease-out 1s forwards;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.textAccent};
    transition: left 0.4s ease;
    z-index: -1;
  }
  
  &:hover {
    color: ${props => props.theme.bgPrimary};
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(95, 174, 255, 0.3);
  }
  
  &:hover::before {
    left: 0;
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;