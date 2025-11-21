import { useState } from 'react';
import { RocketIcon, BulbIcon, BookIcon, TargetIcon } from '../LucideIcons/LucideIcons';
import { WelcomeContainer, WelcomeContent, WelcomeFeatures, WelcomeSubtitle, WelcomeTitle, FeatureIcon, FeatureItem, FeatureText, StartButton } from './WelcomeMessageStyle';
import { ParticlesEffect } from './ParticlesEffect';

interface WelcomeMessageProps {
  onStartChat: () => void;
}

export const WelcomeMessage = ({ onStartChat }: WelcomeMessageProps) => {
  const [particlesVisible, setParticlesVisible] = useState(true);

  const handleStartChat = () => {
    // Fade out particles before starting chat
    setParticlesVisible(false);
    
    // Wait for fade out animation to complete before calling onStartChat
    setTimeout(() => {
      onStartChat();
    }, 600); 
  };

  return (
    <>
      <ParticlesEffect isVisible={particlesVisible} />
      <WelcomeContainer>
        <WelcomeContent>
          <WelcomeTitle>React Agent</WelcomeTitle>
          <WelcomeSubtitle>
            Your intelligent assistant for mastering React with clear explanations, 
            practical examples, and real-time answers.
          </WelcomeSubtitle>

          <WelcomeFeatures>
            <FeatureItem>
              <FeatureIcon className="feature-icon">
                <RocketIcon />
              </FeatureIcon>
              <FeatureText>Instant responses</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon className="feature-icon">
                <BulbIcon />
              </FeatureIcon>
              <FeatureText>Practical examples</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon className="feature-icon">
                <BookIcon />
              </FeatureIcon>
              <FeatureText>Detailed explanations</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon className="feature-icon">
                <TargetIcon />
              </FeatureIcon>
              <FeatureText>Specialized focus</FeatureText>
            </FeatureItem>
          </WelcomeFeatures>

          <StartButton onClick={handleStartChat}>
            Get started now
          </StartButton>
        </WelcomeContent>
      </WelcomeContainer>
    </>
  );
};