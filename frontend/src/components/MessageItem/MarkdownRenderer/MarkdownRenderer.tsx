import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { MarkdownContainer } from './MarkdownRendererStyle';
import DotsLoader from '../../Loaders/DotsLoader';
import SimpleTable from '../../SimpleTable/SimpleTable';
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

            // Try to detect a JSON table blob and render a nicer table
            try {
              const parsed = JSON.parse(codeContent);
              const maybeTable = parsed?.type === 'table' ? parsed : parsed;
              if (maybeTable && (Array.isArray(maybeTable.rows) || Array.isArray(maybeTable.data))) {
                // Normalize shape: { columns, rows } or { data: { columns, rows } }
                const payload = maybeTable.rows ? maybeTable : (maybeTable.data ? maybeTable.data : maybeTable);
                return (
                  <div style={{ padding: 8 }}>
                    <SimpleTable data={payload} />
                  </div>
                );
              }
            } catch (e) {
              // not JSON, fallthrough to code block render
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
          table: ({ children, ...props }: any) => {
            // Try to convert the markdown table children into columns/rows
            try {
              function extractText(node: any): string {
                if (node === null || node === undefined) return '';
                if (typeof node === 'string' || typeof node === 'number') return String(node).trim();
                if (Array.isArray(node)) return node.map(extractText).join('').trim();
                if (React.isValidElement(node)) {
                  const props = (node as any).props;
                  return extractText(props?.children);
                }
                return '';
              }

              function collectTRs(node: any): any[] {
                const trs: any[] = [];
                if (node === null || node === undefined) return trs;
                if (Array.isArray(node)) {
                  node.forEach((n) => trs.push(...collectTRs(n)));
                  return trs;
                }
                if (React.isValidElement(node)) {
                  const nAny = node as any;
                  const t = nAny.type;
                  if (t === 'tr') {
                    trs.push(node);
                    return trs;
                  }
                  const props = nAny.props;
                  if (props && props.children) {
                    trs.push(...collectTRs(props.children));
                  }
                }
                return trs;
              }

              const allTRs = collectTRs(children);
              if (allTRs.length === 0) return <table {...props}>{children}</table>;

              // First tr is header
              const headerTR = allTRs[0];
              const headerCells = React.Children.toArray(headerTR.props.children || []).map((th: any) => extractText(th.props ? th.props.children : th));
              const columns = headerCells.map((h: string) => ({ key: h || '', label: h || '' }));

              const bodyTRs = allTRs.slice(1);
              const rows = bodyTRs.map((tr: any) => {
                const cells = React.Children.toArray(tr.props.children || []).map((td: any) => extractText(td.props ? td.props.children : td));
                const row: any = {};
                columns.forEach((col: any, idx: number) => {
                  row[col.key] = cells[idx] ?? '';
                });
                return row;
              });

              return <SimpleTable data={{ columns, rows }} />;
            } catch (e) {
              return <table {...props}>{children}</table>;
            }
          },
        }}
      >
        {content}
      </ReactMarkdown>
      {showLoadingIndicator && (
        <DotsLoader />
      )}
    </MarkdownContainer>
  );
};