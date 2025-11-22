import { useState } from 'react';
import { RocketIcon, BulbIcon, BookIcon, TargetIcon } from '../LucideIcons/LucideIcons';
import { ParticlesEffect } from './ParticlesEffect';
import {
  WelcomeContainer,
  WelcomeContent,
  WelcomeTitle,
  WelcomeSubtitle,
  WelcomeFeatures,
  FeatureItem,
  FeatureIcon,
  FeatureText
} from './WelcomeMessageStyle';

interface WelcomeMessageProps {
  isTransitioning: boolean;
  children?: React.ReactNode;
}

export const WelcomeMessage = ({ isTransitioning, children }: WelcomeMessageProps) => {
  const [particlesVisible] = useState(!isTransitioning);
  return (
    <>
      <ParticlesEffect isVisible={particlesVisible} />
      <WelcomeContainer $isTransitioning={isTransitioning}>
        <WelcomeContent $isTransitioning={isTransitioning}>
          <WelcomeTitle>React Agent</WelcomeTitle>
          <WelcomeSubtitle>
            Your intelligent assistant for mastering React with clear explanations, practical examples, and real-time answers.
          </WelcomeSubtitle>

          <WelcomeFeatures>
            <FeatureItem>
              <FeatureIcon className="feature-icon">
                <RocketIcon />
              </FeatureIcon>
              <FeatureText>Instant Answers</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon className="feature-icon">
                <BulbIcon />
              </FeatureIcon>
              <FeatureText>Practical Examples</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon className="feature-icon">
                <BookIcon />
              </FeatureIcon>
              <FeatureText>Detailed Explanations</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon className="feature-icon">
                <TargetIcon />
              </FeatureIcon>
              <FeatureText>Specialized Focus</FeatureText>
            </FeatureItem>
          </WelcomeFeatures>
          
          {/* Area for responsive input */}
          {children}
        </WelcomeContent>
      </WelcomeContainer>
    </>
  );
};