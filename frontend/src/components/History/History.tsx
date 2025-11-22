import { HistoryContainer, HistoryHeader, HistoryListItem, CloseButton, HistoryListWrapper, HistoryMeta, HistoryActions, ActionButton, QuestionText, AnswerPreview } from './HistoryStyle';
import { formatDateShort, relativeTimeFromNow } from '../../utils/dateUtils';

export interface HistoryItem {
  id: number;
  question: string;
  answer?: string | null;
  model?: string | null;
  created_at?: string;
}

interface Props {
  items: HistoryItem[];
  onClose: () => void;
  onSelect: (id: number) => void;
  onReload?: () => void;
}

export const History = ({ items, onClose, onSelect, onReload }: Props) => {
  return (
    <HistoryContainer>
      <HistoryHeader>
        <div>Query History — {items.length}</div>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </HistoryHeader>
      <HistoryListWrapper>
        {items.map(item => (
          <HistoryListItem key={item.id}>
            <HistoryMeta>
              <QuestionText onClick={() => onSelect(item.id)} style={{ cursor: 'pointer' }}>{item.question}</QuestionText>
              <div style={{ fontSize: 12, color: '#888' }} title={item.created_at}>{formatDateShort(item.created_at)} · {relativeTimeFromNow(item.created_at)}</div>
            </HistoryMeta>
            <AnswerPreview>{item.answer ?? ''}</AnswerPreview>
            <HistoryActions>
              <ActionButton onClick={async () => {
                const confirmed = confirm('Delete this history entry?');
                if (!confirmed) return;
                try {
                  const res = await fetch(`http://localhost:8000/history/${item.id}`, { method: 'DELETE' });
                  if (res.status === 204) {
                    if (onReload) onReload();
                  } else {
                    const body = await res.text();
                    alert('Failed to delete: ' + res.status + ' ' + body);
                  }
                } catch (err) {
                  alert('Failed to delete: ' + err);
                }
              }}>Delete</ActionButton>

              <ActionButton onClick={async () => {
                const newQuestion = prompt('Edit question', item.question) || item.question;
                const answerPrompt = prompt('Edit answer', item.answer ?? '');
                const newAnswer = (answerPrompt !== null) ? answerPrompt : (item.answer ?? '');
                try {
                  const res = await fetch(`http://localhost:8000/history/${item.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ question: newQuestion, answer: newAnswer })
                  });
                  if (res.ok) {
                    if (onReload) onReload();
                  } else {
                    const body = await res.text();
                    alert('Failed to update: ' + res.status + ' ' + body);
                  }
                } catch (err) {
                  alert('Failed to update: ' + err);
                }
              }}>Edit</ActionButton>
            </HistoryActions>
          </HistoryListItem>
        ))}
        {items.length === 0 && <div style={{ padding: 16 }}>No history yet.</div>}
      </HistoryListWrapper>
    </HistoryContainer>
  );
};

export default History;
