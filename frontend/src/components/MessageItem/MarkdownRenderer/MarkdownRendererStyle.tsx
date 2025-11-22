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
  
  /* Add spacing around code blocks */
  .markdown-code-block + .markdown-p,
  .markdown-p + .markdown-code-block {
    margin-top: 0.5rem;
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

  .markdown-li::marker {
    color: ${props => props.theme.textAccent};
  }

  /* Code blocks styling */
  .markdown-code-block {
    background: ${props => props.theme.bgTertiary};
    border: 1px solid ${props => props.theme.borderPrimary};
    border-radius: 8px;
    padding: 1rem;
    margin: 0.75rem 0;
    overflow-x: auto;
    font-family: 'Cascadia Code', 'Fira Code', 'JetBrains Mono', 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
    font-size: 0.875rem;
    line-height: 1.4;
    position: relative;
    box-shadow: 0 2px 4px ${props => props.theme.shadowPrimary};
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, ${props => props.theme.textAccent}, ${props => props.theme.textSecondary});
      border-radius: 8px 8px 0 0;
    }

    code {
      background: transparent !important;
      padding: 0 !important;
      border: none !important;
      border-radius: 0 !important;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      color: ${props => props.theme.textPrimary} !important;
    }

    /* Custom scrollbar for code blocks */
    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: ${props => props.theme.bgQuaternary};
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${props => props.theme.textSecondary};
      border-radius: 3px;
      
      &:hover {
        background: ${props => props.theme.textAccent};
      }
    }
  }

  /* Inline code styling */
  .markdown-code-inline {
    background: ${props => props.theme.bgSecondary};
    color: ${props => props.theme.textAccent};
    padding: 0.125rem 0.375rem;
    border-radius: 4px;
    font-family: 'Cascadia Code', 'Fira Code', 'SF Mono', Consolas, monospace;
    font-size: 0.875em;
    border: 1px solid ${props => props.theme.borderPrimary};
    font-weight: 500;
    box-shadow: 0 1px 2px ${props => props.theme.shadowPrimary};
  }

  /* Override highlight.js styles for better theme integration - ONLY for code blocks */
  .markdown-code-block .hljs {
    background: transparent !important;
    color: ${props => props.theme.textPrimary} !important;
  }
  
  /* Highlight.js syntax highlighting adjustments - ONLY for code blocks */
  .markdown-code-block .hljs-keyword,
  .markdown-code-block .hljs-selector-tag,
  .markdown-code-block .hljs-built_in {
    color: ${props => props.theme.textAccent} !important;
  }
  
  .markdown-code-block .hljs-string,
  .markdown-code-block .hljs-title,
  .markdown-code-block .hljs-section {
    color: ${props => props.theme.textSecondary} !important;
  }
  
  .markdown-code-block .hljs-comment,
  .markdown-code-block .hljs-quote {
    color: ${props => props.theme.textSecondary} !important;
    opacity: 0.7;
  }
`;

export const LoadingIndicator = styled.span`
  color: ${props => props.theme.textAccent};
  animation: ${thinkingPulse} 1.5s infinite;
  margin-left: 0.25rem;
  display: inline;
`;