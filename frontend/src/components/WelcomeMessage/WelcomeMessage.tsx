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
          <WelcomeTitle>DBMind Agent</WelcomeTitle>
          <WelcomeSubtitle>
            Your intelligent database assistant that generates SQL queries dynamically and provides accurate answers based on company data.
          </WelcomeSubtitle>

          <WelcomeFeatures>
            <FeatureItem>
              <FeatureIcon className="feature-icon">
                <RocketIcon />
              </FeatureIcon>
              <FeatureText>Dynamic SQL Generation</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon className="feature-icon">
                <BulbIcon />
              </FeatureIcon>
              <FeatureText>Database Insights</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon className="feature-icon">
                <BookIcon />
              </FeatureIcon>
              <FeatureText>Accurate Responses</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon className="feature-icon">
                <TargetIcon />
              </FeatureIcon>
              <FeatureText>Data-Driven Intelligence</FeatureText>
            </FeatureItem>
          </WelcomeFeatures>
          
          {/* Area for responsive input */}
          {children}
        </WelcomeContent>
      </WelcomeContainer>
    </>
  );
};