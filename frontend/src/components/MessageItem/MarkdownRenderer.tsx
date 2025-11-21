import ReactMarkdown from 'react-markdown';
import { MarkdownContainer, LoadingIndicator } from './MarkdownRendererStyle';

interface MarkdownRendererProps {
  content: string;
  showLoadingIndicator?: boolean;
}

export const MarkdownRenderer = ({ content, showLoadingIndicator = false }: MarkdownRendererProps) => {
  return (
    <MarkdownContainer>
      <ReactMarkdown
        components={{
          // Focus only on bold text for now
          strong: ({ children }) => <strong className="markdown-strong">{children}</strong>,
          // Keep paragraphs simple
          p: ({ children }) => <span className="markdown-p">{children}</span>,
          ul: ({ children }) => <ul className="markdown-ul">{children}</ul>,
          ol: ({ children }) => <ol className="markdown-ol">{children}</ol>,
          li: ({ children }) => <li className="markdown-li">{children}</li>,
        }}
      >
        {content}
      </ReactMarkdown>
      {showLoadingIndicator && (
        <LoadingIndicator>●</LoadingIndicator>
      )}
    </MarkdownContainer>
  );
};