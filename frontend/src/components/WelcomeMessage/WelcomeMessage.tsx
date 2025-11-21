import { RocketIcon, BulbIcon, BookIcon, TargetIcon } from '../LucideIcons/LucideIcons';
import { WelcomeContainer, WelcomeFeatures, WelcomeSubtitle, WelcomeTitle, FeatureIcon, FeatureItem, FeatureText, StartButton } from './WelcomeMessageStyle';

interface WelcomeMessageProps {
  onStartChat: () => void;
}

export const WelcomeMessage = ({ onStartChat }: WelcomeMessageProps) => {
  return (
    <WelcomeContainer>
        <WelcomeTitle>Welcome to React Agent!</WelcomeTitle>
        <WelcomeSubtitle>
          Your intelligent assistant for learning React in an interactive and practical way.
        </WelcomeSubtitle>

        <WelcomeFeatures>
          <FeatureItem>
            <FeatureIcon><RocketIcon /></FeatureIcon>
            <FeatureText>Real-time responses</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon><BulbIcon /></FeatureIcon>
            <FeatureText>Practical examples</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon><BookIcon /></FeatureIcon>
            <FeatureText>Detailed explanations</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon><TargetIcon /></FeatureIcon>
            <FeatureText>Focus on React</FeatureText>
          </FeatureItem>
        </WelcomeFeatures>

        <StartButton onClick={onStartChat}>
          Start Chat
        </StartButton>
    </WelcomeContainer>
  );
};