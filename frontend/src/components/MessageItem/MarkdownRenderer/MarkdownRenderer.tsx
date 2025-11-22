import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { MarkdownContainer, LoadingIndicator } from './MarkdownRendererStyle';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string;
  showLoadingIndicator?: boolean;
}

export const MarkdownRenderer = ({ content, showLoadingIndicator = false }: MarkdownRendererProps) => {
  return (
    <MarkdownContainer>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Bold text formatting
          strong: ({ children }) => <strong className="markdown-strong">{children}</strong>,
          // Lists
          ul: ({ children }) => <ul className="markdown-ul">{children}</ul>,
          ol: ({ children }) => <ol className="markdown-ol">{children}</ol>,
          li: ({ children }) => <li className="markdown-li">{children}</li>,
          // Code blocks and inline code
          code: ({ inline, className, children, ...props }: any) => {
            const codeContent = String(children);
            const hasMultipleLines = codeContent.includes('\n') || codeContent.split('\n').length > 1;
            
            if (inline || !hasMultipleLines) {
              // Inline code or single line code - no syntax highlighting
              return <code className="markdown-code-inline" {...props}>{children}</code>;
            }
            
            // Multi-line code blocks - with syntax highlighting applied by rehype-highlight
            return (
              <pre className="markdown-code-block">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
      {showLoadingIndicator && (
        <LoadingIndicator></LoadingIndicator>
      )}
    </MarkdownContainer>
  );
};