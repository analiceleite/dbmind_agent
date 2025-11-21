import styled, { keyframes } from 'styled-components';

export const thinkingPulse = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`;

export const MarkdownContainer = styled.div`
  line-height: 1.5;
  color: ${props => props.theme.textPrimary};

  /* Paragraphs - keep simple */
  .markdown-p {
    margin: 0;
    display: inline;
  }

  /* Bold text formatting - main focus */
  .markdown-strong {
    font-weight: 700;
    color: ${props => props.theme.textAccent};
    text-shadow: 0 0 1px ${props => props.theme.textAccent}20;
  }

  /* Lists - bullets and numbers */
  .markdown-ul, .markdown-ol {
    margin: 0;
    padding-left: 2rem;
  }

  .markdown-ul {
    list-style-type: disc;
  }

  .markdown-ol {
    list-style-type: decimal;
  }

  .markdown-li {
    line-height: 0.5;
  }

  .markdown-li::marker {
    color: ${props => props.theme.textAccent};
  }
`;

export const LoadingIndicator = styled.span`
  color: ${props => props.theme.textAccent};
  animation: ${thinkingPulse} 1.5s infinite;
  margin-left: 0.25rem;
  display: inline;
`;