import { HistoryContainer, HistoryHeader, HistoryListItem, CloseButton, HistoryListWrapper, HistoryMeta, HistoryActions, ActionButton, QuestionText, AnswerPreview, SearchWrapper, SearchInput, ClearButton, HistoryTimestamp, EmptyWrapper, EmptyText, NoResultsWrapper, NoResultsIcon, NoResultsTitle, NoResultsSubtitle, NoResultsActions } from './HistoryStyle';
import { formatDateShort, relativeTimeFromNow } from '../../utils/dateUtils';
import { useState, useMemo } from 'react';
import Modal from '../Modal/Modal';
import { CloseIcon, SearchIcon } from '../LucideIcons/LucideIcons';


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
    const [search, setSearch] = useState('');
    const displayedItems = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return items;
        return items.filter(i => {
            const question = (i.question || '').toLowerCase();
            const answer = (i.answer || '').toLowerCase();
            return question.includes(q) || answer.includes(q);
        });
    }, [items, search]);

    return (
        <HistoryContainer>
            <HistoryHeader>
                <div>Query History — {items.length}</div>
                <CloseButton onClick={onClose}><CloseIcon /></CloseButton>
            </HistoryHeader>
            <SearchWrapper>
                <SearchInput value={search} placeholder="Search history..." onChange={(e) => setSearch(e.target.value)} />
                {search ? <ClearButton onClick={() => setSearch('')}>Clear</ClearButton> : null}
            </SearchWrapper>
            <HistoryListWrapper>
                {displayedItems.map(item => (
                    <HistoryListItem key={item.id}>
                        <HistoryMeta>
                            <QuestionText onClick={() => onSelect(item.id)}>{item.question}</QuestionText>
                            <HistoryTimestamp title={item.created_at}>{formatDateShort(item.created_at)} · {relativeTimeFromNow(item.created_at)}</HistoryTimestamp>
                        </HistoryMeta>
                        <AnswerPreview>{item.answer ?? ''}</AnswerPreview>
                        <HistoryActions>
                            <ActionButton onClick={() => { setCurrentItem(item); setDeleteOpen(true); }}>Delete</ActionButton>
                            <ActionButton onClick={() => { setCurrentItem(item); setEditQuestion(item.question); setEditAnswer(item.answer ?? ''); setEditOpen(true); }}>Edit</ActionButton>
                        </HistoryActions>
                    </HistoryListItem>
                ))}

                {items.length === 0 && (
                    <EmptyWrapper>
                        <EmptyText>No history yet.</EmptyText>
                    </EmptyWrapper>
                )}
                {items.length > 0 && displayedItems.length === 0 && (
                    <NoResultsWrapper>
                        <NoResultsIcon><SearchIcon /></NoResultsIcon>
                        <NoResultsTitle>No results found</NoResultsTitle>
                        <NoResultsSubtitle>Try different keywords, or clear your search to see all history items.</NoResultsSubtitle>
                        <NoResultsActions>
                            <ClearButton onClick={() => setSearch('')}>Clear search</ClearButton>
                        </NoResultsActions>
                    </NoResultsWrapper>
                )}
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
