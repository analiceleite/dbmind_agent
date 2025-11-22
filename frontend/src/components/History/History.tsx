import { HistoryContainer, HistoryHeader, HistoryListItem, CloseButton, HistoryListWrapper, HistoryMeta, HistoryActions, ActionButton, QuestionText, AnswerPreview } from './HistoryStyle';
import { formatDateShort, relativeTimeFromNow } from '../../utils/dateUtils';
import { useState } from 'react';
import Modal from '../Modal/Modal';

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
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<HistoryItem | null>(null);
  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');
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
              <ActionButton onClick={() => { setCurrentItem(item); setDeleteOpen(true); }}>Delete</ActionButton>

              <ActionButton onClick={() => { setCurrentItem(item); setEditQuestion(item.question); setEditAnswer(item.answer ?? ''); setEditOpen(true); }}>Edit</ActionButton>
            </HistoryActions>
          </HistoryListItem>
        ))}
        {items.length === 0 && <div style={{ padding: 16 }}>No history yet.</div>}
      </HistoryListWrapper>
      <Modal isOpen={deleteOpen} title="Delete history entry" onClose={() => setDeleteOpen(false)} onConfirm={async () => {
        if (!currentItem) return;
        try {
          const res = await fetch(`http://localhost:8000/history/${currentItem.id}`, { method: 'DELETE' });
          if (res.status === 204) {
            setDeleteOpen(false);
            setCurrentItem(null);
            if (onReload) onReload();
          } else {
            const body = await res.text();
            // keep simple feedback
            alert('Failed to delete: ' + res.status + ' ' + body);
          }
        } catch (err) {
          alert('Failed to delete: ' + err);
        }
      }} confirmLabel="Delete" cancelLabel="Cancel">
        <div>Are you sure you want to delete this history entry?</div>
        <div style={{ marginTop: 12, fontWeight: 600 }}>{currentItem?.question}</div>
      </Modal>

      <Modal isOpen={editOpen} title="Edit history entry" onClose={() => setEditOpen(false)} onConfirm={async () => {
        if (!currentItem) return;
        try {
          const res = await fetch(`http://localhost:8000/history/${currentItem.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: editQuestion, answer: editAnswer })
          });
          if (res.ok) {
            setEditOpen(false);
            setCurrentItem(null);
            if (onReload) onReload();
          } else {
            const body = await res.text();
            alert('Failed to update: ' + res.status + ' ' + body);
          }
        } catch (err) {
          alert('Failed to update: ' + err);
        }
      }} confirmLabel="Save" cancelLabel="Cancel">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, color: '#999' }}>Question</label>
          <input value={editQuestion} onChange={(e) => setEditQuestion(e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #ddd' }} />
          <label style={{ fontSize: 12, color: '#999' }}>Answer</label>
          <textarea value={editAnswer} onChange={(e) => setEditAnswer(e.target.value)} rows={6} style={{ padding: 8, borderRadius: 6, border: '1px solid #ddd' }} />
        </div>
      </Modal>
    </HistoryContainer>
  );
};

export default History;
